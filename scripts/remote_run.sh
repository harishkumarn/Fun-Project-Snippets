#!/bin/bash
# $Id$
# Script for starting the server from a remote PC. Part of provisioning module.

log()
{
	logger -p local2.info -t \($USER\) remote_run[$$] $@
}

server_id=$@
bin_dir=`dirname $0`
cd $bin_dir
export JAVA_HOME=~/dad/jdk

. ./constants.sh

# Time-out in seconds for wget command (def. 15)
WGET_TIMEOUT=15
isIpv6Address()
{
    echo $1 |grep ":"  > /dev/null
    exit_status=$?
    if [ $exit_status -eq 0 ] ; then
        return 0     #IPv6 address true
    else
        return 1     #IPv6 address false
    fi
}

logKillAndExit()
{
        log "Exiting with status: $1"
        killall -9 java >/dev/null 2>&1
        exit $1
}

createSymLinkIfGridPresent()
{
	if [ -d $WEBAPP_HOME/grid ]; then
		if [ $unlinkStatus -eq -1 ] || [ $unlinkStatus -eq 0 ]; then
			ln -s $WEBAPP_HOME/ROOT/WEB-INF/conf $WEBAPP_HOME/grid/WEB-INF/conf_root
			log "Creating symbolic link $WEBAPP_HOME/grid/WEB-INF/conf_root. Link status : $?"
		else
			log "Unlink of $WEBAPP_HOME/grid/WEB-INF/conf_root did not happen as expected. Exiting with status 5."
			logKillAndExit 5
		fi
	else
		log "Not creating symbolic link $WEBAPP_HOME/grid/WEB-INF/conf_root as grid/ is not present."
	fi
}

checkAndHandleInstallationError()
{
	local lockFile="/home/sas/dad/INSTALLATION_ERROR"
	if [ -f $lockFile ] ; then
		log "Cannot (re)start App. Server. App. binary extraction/setup failed before. `cat $lockFile`. Check previous log messages in sas.log for error details and reinstall this App. Server after fixing the error/root cause. Exiting... "
		exit 161
	fi
}

checkAndHandleInstallationError

# Find out the IP of this machine
hostIP=$(hostname -i | sed 's/^[ \t]*//;s/[ \t]*$//')
echo $hostIP | grep " " > /dev/null 2>&1
if [ $? -eq 0 ]; then
    log "This is a multi-homed machine with IPs: $hostIP. Selecting the first IP ..."
    hostIP=$(echo $hostIP | cut -d " " -f1)
fi
log "App. Server IP  : $hostIP"
isIpv6Address $hostIP
exit_status=$?
if [ $exit_status -eq 0 ]; then
    hostIP="[$hostIP]"
    log "Address is IPv6 added [] to  $hostIP"
fi

# Presence of ROOT.war or grid.war is mandatory, failing which AppServer will not start
if [ ! -f $WEBAPP_HOME/ROOT.war ] && [ ! -f $WEBAPP_HOME/grid.war ] ; then
    log "APP_SERVER_EXIT_CODE[154] Either ROOT.war or grid.war should be present. Exiting AppServer startup with status 154..."
    exit 154
fi


http_port=8080
https_port=8443
instance_no=`echo $USER | grep sas[1-9]$ | sed 's/sas//g'`
log "sas instance_no : $instance_no"
TMCT_CONF_DIR=$CONTAINER_HOME/conf

if [ "x$instance_no" != "x" ]; then
	http_port=`expr $http_port + $instance_no`
	https_port=`expr $https_port + $instance_no`
	log "Replacing HTTP($http_port) and HTTPS($https_port) port numbers in server.xml ..."

	sed 's/port=\"8080\"/port=\"'$http_port'\"/g' $TMCT_CONF_DIR/server.xml.orig > $TMCT_CONF_DIR/server.xml
	sed -i 's/port=\"8443\"/port=\"'$https_port'\"/g' $TMCT_CONF_DIR/server.xml
	sed -i 's/redirectPort=\"8443\"/redirectPort=\"'$https_port'\"/g' $TMCT_CONF_DIR/server.xml
	log "Replaced port numbers in server.xml."
else
	cp $TMCT_CONF_DIR/server.xml.orig $TMCT_CONF_DIR/server.xml
	log "Copied server.xml.orig to server.xml and retained the default ports(8080, 8443)"
fi


killall -9 java >/dev/null 2>&1
killall -9 cpu >/dev/null 2>&1

rm -f $HOME/dad/AdventNet/Sas/bin/server.softkill

mkdir -p $HEAP_DUMP_PATH

saveLogDir="$PERMANENT_LOG_DIR/logs`date +-%F-%H-%M-%S`"

mkdir -p $saveLogDir
log "Created dir $saveLogDir"

if [ -L $SERVER_LOGS ]; then
        log "$SERVER_LOGS is a symbolic link"
else
        if [ -d $SERVER_LOGS ]; then
            log "Moving $SERVER_LOGS to $saveLogDir ..."
            mv -f $SERVER_LOGS/* $saveLogDir 1>/dev/null 2>&1

# Even if $SERVER_HOME/logs could not be moved, then just delete it; it's ok if
# some old logs are lost, we want the symbolic linking to succeed.
            rm -rf $SERVER_LOGS
        fi

        ln -s $PERMANENT_LOG_DIR $SERVER_LOGS
        status=$?
        if [ $status -eq 0 ]; then
                log "$SERVER_LOGS is now a symbolic link to $PERMANENT_LOG_DIR"
        else
                log "Failed to make $SERVER_LOGS as a symbolic link to $PERMANENT_LOG_DIR ($status)"
        fi
fi


# Move any previous logs that were not moved properly to "logs<date>" based
# directory.
sh mvlogs.sh

unlinkStatus=-1
grid_conf_root=$WEBAPP_HOME/grid/WEB-INF/conf_root
if [ -L $grid_conf_root ]; then
	log "$grid_conf_root is symbolically linked to $WEBAPP_HOME/ROOT/WEB-INF/conf already. Unlinking..."
	unlink $grid_conf_root
	unlinkStatus=$?
	log "Unlink status : $unlinkStatus"
	if [ $unlinkStatus -ne 0 ]; then
		log "Unlink failed. Exiting with status 4"
		exit 4
	fi
else
        log "$WEBAPP_HOME/grid/WEB-INF/conf_root symbolic link does not exist. Not unlinking..."
fi

# Start run_production.sh with nohup as prefix?
sh run_production.sh $server_id > nohup.out 2>&1 &

latest="$SERVER_LOGS/latest"

if [ -L $latest ]; then
    unlink $latest
fi
ln -s $saveLogDir $latest


chmod u+x startApache.sh
./startApache.sh


JAVA_PID_FILE="server.pid"
startTime=`date +%s`
endTime=0
timeTaken=0
javaRunning=0
isColdStart=0
log "Started polling for java process"
while true
do
	JAVA_PROCESS_PID=`ps -u $USER -ww -o pid,user,args  | grep java | grep $SERVER_STARTER_CLASS | awk '{print $1}'`
	if [ ! -z "${JAVA_PROCESS_PID}" ]; then
                echo $JAVA_PROCESS_PID > $JAVA_PID_FILE
		output=`wget --server-response -q -T $WGET_TIMEOUT -t 1 http://$hostIP:$http_port/_app/health?internalcheck=true -O - 2>&1`
		exitStatus=$?
		appHealthStatusCode=`echo $output | awk '{print $2}'`
		healthCheckSuccessCode=`echo $output | grep -q -i 'sastrue';echo $?`
		if [ $exitStatus -eq 0 ] && [ $healthCheckSuccessCode -eq 0 ];then
			if [ -f $WEBAPP_HOME/grid.cold_war ]; then
				log "Assuming this to be a cold start, due to the presence of grid.cold_war"
				isColdStart=1
				mv $WEBAPP_HOME/grid.cold_war $WEBAPP_HOME/grid.war;sed -i 's/autoDeploy=\"true\"/autoDeploy=\"false\"/g' $TMCT_CONF_DIR/server.xml.orig
				log "Renamed grid.cold_war to grid.war"
			fi
			if [ -f $WEBAPP_HOME/grid.war ];then
				output=`wget --server-response -q -T $WGET_TIMEOUT -t 1 http://$hostIP:$http_port/grid/_app/health?internalcheck=true -O - 2>&1`
				exitStatus=$?
				gacHealthStatusCode=`echo $output | awk '{print $2}'`
				healthCheckSuccessCode=`echo $output | grep -q -i 'sastrue';echo $?`
			fi
			if [ $exitStatus -eq 0 ] && [ $healthCheckSuccessCode -eq 0 ];then
				killall -9 cpu >/dev/null 2>&1
				chmod a+x cpu
				./cpu $JAVA_PROCESS_PID >/dev/null 2>&1 &
				createSymLinkIfGridPresent
				log "Application Server started successfully. Exiting with status 0."
				exit 0
			fi
			
		fi
		if [[ "$appHealthStatusCode" = "404" || "$gacHealthStatusCode" = "404" ]] && [ $isColdStart -eq 0 ]; then
			log "App health status code : $appHealthStatusCode ; Grid health status code : $gacHealthStatusCode"
			logKillAndExit 1
		fi
		javaRunning=1
	else
		javaRunning=0
	fi
	sleep 1
	endTime=`date +%s`
        timeTaken=$[endTime - startTime]
        if [ $timeTaken -ge $JAVA_NOT_RUNNING_TIMEOUT_IN_SECONDS ] && [ $javaRunning -eq 0 ]; then
                log "Java process not running since: "$timeTaken" sec. Exiting with status 2"
                exit 2
        fi
        if [ $timeTaken -ge $APP_SERVER_STARTUP_TIMEOUT_IN_SECONDS ] && [ $javaRunning -eq 1 ]; then
                log "Application Server not started since: "$timeTaken" sec"
                logKillAndExit 3
        fi
done
