def readNum(a):
    prev , curr , count , say = a%10 , None , 0 , ''
    while a != 0 :
        curr = a%10
        if curr != prev:
            say = '%d%d%s' % (count,prev,say)
            prev = curr
            count=1
        else:
            count+=1
        a/=10
    say = '%d%d%s' % (count,prev,say)
    return int(say)

def looknsay(a):
    if a == 1:
        print '1 '
        return 1
    else:
        elem = looknsay(a-1)
        say = readNum(elem)
        print '%d \n' % (say)
        return say


looknsay(20)


