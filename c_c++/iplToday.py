import urllib2
import re
from bs4 import BeautifulSoup
import time
import sys
mode  =  'ipl' if len(sys.argv) <= 1 else sys.argv[-1]
ipl=mode ==  'ipl'
noofovers= 20 if mode ==  'ipl' or mode == 't20' else 50
noofballs=noofovers * 6
def getMatchStats(matchObj):
    stats={}
    stats['runs'] = int(re.match(r'\s*(\d+).*',matchObj.group(1)).group(1))
    overs= map(int,re.match(r'\s*\((\S+)\)\s*',matchObj.group(2)).group(1).split("."))
    stats['over'] =overs[0]
    stats['ball'] = 0 if len(overs) == 1 else overs[1]
    stats['runRate'] = stats['runs'] / float(6*stats['over']+stats['ball'])*6
    return stats

opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
#url="http://www.google.com/search?q=ipl+today&rlz=1C5CHFA_enIN874IN874&sxsrf=AOaemvLk5UFFc6J5TPZvMO6TCnWyRqoKpg%3A1633527385292&ei=WaZdYfSNEdf99QP1npOwAw&ved=0ahUKEwi0np_c87XzAhXXfn0KHXXPBDYQ4dUDCA4&uact=5&oq=ipl+today&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyEAgAEIAEEIcCELEDEIMBEBQyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATIQCAAQgAQQhwIQsQMQgwEQFDILCAAQsQMQgwEQkQIyCAgAELEDEIMBOgcIIxCwAxAnOgcIABBHELADOgoILhDIAxCwAxBDOhAILhDHARCvARDIAxCwAxBDOgYIABAHEB46BQgAEJECSgUIOBIBMUoECEEYAFDYCViRLGDJLWgCcAJ4AIABgwOIAcMKkgEHMS4yLjEuMpgBAKABAcgBDMABAQ&sclient=gws-wiz"
#url="http://www.google.com/search?q=ind+vs+eng&rlz=1C5CHFA_enIN874IN874&oq=id+vs+en&aqs=chrome.1.69i57j0l7.1629j0j7&sourceid=chrome&ie=UTF-8"
url="http://www.google.com/search?q=wc+today+match&rlz=1C5CHFA_enIN874IN874&sxsrf=AOaemvINl9iQnDiovtaoSvfwCJri5V4lQw%3A1636651341941&ei=TVGNYcrqOJWFr7wPqPuF0A4&oq=wc+tod&gs_lcp=Cgdnd3Mtd2l6EAMYADILCAAQgAQQsQMQgwEyCggAELEDEIMBEEMyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCAAQRxCwAzoHCAAQsAMQQzoKCC4QyAMQsAMQQzoECCMQJzoLCC4QgAQQsQMQgwE6CAgAELEDEIMBOggIABCABBCxAzoECAAQQzoKCC4QsQMQgwEQQzoMCAAQsQMQgwEQChBDOgcIABCABBAKSgUIOBIBMUoECEEYAFDfD1i6IWDrJ2gDcAJ4AYAB6wKIAdQKkgEHMC43LjAuMZgBAKABAcgBD8ABAQ&sclient=gws-wiz&shem=ssmd"
url="http://www.google.com/search?q=ind.+vs+sa&rlz=1C5CHFA_enIN874IN874&oq=ind.+vs+sa&aqs=chrome..69i57j0l7.4492j0j7&sourceid=chrome&ie=UTF-8"
url="http://www.google.com/search?q=ind.+vs+wi&rlz=1C5CHFA_enIN874IN874&oq=ind.+vs+w&aqs=chrome.1.69i57j0l7.3443j0j7&sourceid=chrome&ie=UTF-8"
html = opener.open(url).read()
#print html
parser = BeautifulSoup(html,features="html5lib")
hour,min = time.localtime().tm_hour , time.localtime().tm_min
if ipl and  hour == 19 and min < 30:
    toss = parser.findAll('div',{'class':'imso_mh__score-txt imso-ani imspo_mh_cricket__summary-sentence span'})
elif ipl:
    teams=parser.findAll('div',{'class':'BNeawe s3v9rd AP7Wnd lRVwie'})[:3]
    obj = re.compile(r'.*>(.*)</div>$')
    team1, team2 = map(lambda team: obj.match(team.__str__()).group(1),teams[1:])
    matchNum  =obj.match(parser.find('div',{'class':'BNeawe tAd8D AP7Wnd'}).__str__()).group(1)

print('\n')
if ipl and hour < 19:
    time = '%s , 7.30 PM' % (re.findall('<span.*>(.*)</span>,',teams[0].__str__())[0])
    print(matchNum+' : '+time)
    print('\n')
    print "%s VS %s\n" % (team1, team2)
elif ipl and hour  == 19 and min < 30:
    print "toss"
else:
    print(matchNum)
    print('\n')
    print "%s VS %s\n" % (team1, team2)
    scoreParser = re.compile(r'<div.*AP7Wnd"\s*>(.*)<span.*>\s*(.*)\s*</span>\s*</div>')
    score1,score2 = map(lambda score:scoreParser.match(score.__str__()),parser.findAll('div',{'class':'BNeawe deIvCb AP7Wnd'})[1:3])
    print '%s : %s\n' % (team1,score1.group(1)+score1.group(2))
    print '%s : %s\n' % (team2,score2.group(1)+score2.group(2) if score2 else 'Yet to bat')
    
    teams1Stats = getMatchStats(score1)
    
    if not score2:
        if teams1Stats['over'] < noofovers:
            print 'Current Run Rate : %.2f \n' % (teams1Stats['runRate'])
            print 'Predicted score : %d \n' % (teams1Stats['runRate']*noofovers)
        else:
            print '%s need %d runs to win \n' % (team2,teams1Stats['runs']+1)
    else:
        teams2Stats =getMatchStats(score2)
	target = teams1Stats['runs']+1
        if teams2Stats['over'] == noofovers or  teams2Stats['runs'] > target:
            winner = team2 if teams2Stats['runs'] > teams1Stats['runs'] else team1
            print '%s won the match !! \n' % (winner)
        else:
            
            print '%s need %d runs to win with %d balls left\n' % (team2,target-teams2Stats['runs'],noofballs - ( 6 * teams2Stats['over'] + teams2Stats['ball']))
            print 'Current Run Rate : %.2f \n' % (teams2Stats['runRate'])
            print 'Required Run Rate : %.2f \n' % ((target - teams2Stats['runs'])/float(noofballs-(6*teams2Stats['over'])-teams2Stats['ball'])*6)
#nrr1,nrr2


print('\n')
