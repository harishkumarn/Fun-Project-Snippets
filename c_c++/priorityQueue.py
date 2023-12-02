queue=[]
def enqueue(val,prio):
    global queue
    if len(queue)==0:
        queue+=[(val,prio)]
    else:
        temp_prio=queue[0][1]
        for i in range(0,len(queue)):
            if prio > temp_prio:
                queue=queue[:i]+[(val,prio)]+queue[i:]
                break
            elif i == len(queue)-1:
                queue+=[(val,prio)]
                break
            else:
                temp_prio=queue[i][1]
    return

enqueue(1,5)
enqueue(4,6)
enqueue(2,5) # 4,1,2

printQueue=lambda a: [i[0] for i in a]
print printQueue(queue)
