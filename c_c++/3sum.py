from functools import  lru_cache
from collections import defaultdict

keyDict =defaultdict(lambda : 0)

@lru_cache(maxsize=128)
def  two_sum(n,crntNum):
    for i  in arr:
        if i==crntNum:
            print('skip',i,n,crntNum)
            continue
        keyDict[i]=True
        if keyDict[n-i]:
            print('match',i,n,crntNum)
            return True
        
def three_sum(n):
    for  i in arr:
        keyDict[i]=True
        if two_sum(n-i,i):
            return True
    return False

arr=[1,2,3,4,5,6]

print(three_sum(5))
print(three_sum(66))

        

