from collections import defaultdict
from itertools import permutations
t=int(raw_input())
p=list(permutations([100,75,50,25],4))
total_profit=0
for _ in range(t):
    n=int(raw_input())
    grid=defaultdict(lambda :{'12':0,'3':0,'6':0,'9':0})
    movieStat={'A':0,'B':0,'C':0,'D':0}
    for i in range(n):
        movie,time=input().split(' ')
        grid[movie][time]+=1
        movieStat[movie]=max(movieStat[movie],grid[movie][time])
    
    a=movieStat.values()
    loss=100*len(filter(lambda a:a==0,a))
    profit=0
    if loss <400:
        profit=max(map(lambda i:i[0]*a[0]+i[1]*a[1]+i[2]*a[2]+i[3]*a[3],p))
    total_profit += profit-loss
    print(profit-loss)

print(total_profit)
