from collections import defaultdict
def func(A,n):
    ret = []
    lesserLenStr = defaultdict(lambda :  False)
    for i in filter(lambda a:len(a) <  n  ,  A):
        lesserLenStr[i]=True
    for i in filter(lambda a:len(a) ==  n  ,  A):
        for j in lesserLenStr.keys():
            ln = len(j)
            if j  == i[:ln] and lesserLenStr[i[(ln-n):]]:
                ret.append(i)
                break
            elif j == i[(ln-n):] and lesserLenStr[i[:ln]]:
                ret.append(i)
                break
    return ret
    
print func(['dog','tail','dogtail','sky','or','hotdog','tailor','hot'],6)
                
                
                
        
