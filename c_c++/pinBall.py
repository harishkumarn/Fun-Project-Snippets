n=int(input("Enter total number of rounds : "))

m=int(input("Enter total number of players : "))

scoreboard=[0]*m

for i in  range(n-1):
    print("\n----ROUND ",i+1,"----\n")
    for player  in range(m):
        pins=10
        for chance in (1,2):
            print("Player ",player+1," / chance ",chance)
            hit=int(input())
            pins-=hit
            scoreboard[player]+=hit
            if hit==10:
                print("STRIKE")
                scoreboard[player] += 10
                break
            if pins ==  0:
                print("SPARE")
                scoreboard[player]+= 5
                
        print("\nPLAYER : ",player+1," SCORE : ",scoreboard[player],"\n")
        
bonus=[]
for player  in range(m):
    print("\n----ROUND ",n,"----\n")
    pins=10
    for chance in (1,2):
        print("Player ",player+1," / chance ",chance)
        hit=int(input())
        pins-=hit
        scoreboard[player]+=hit
        if hit==10:
            print("STRIKE")
            bonus.append(player)
            scoreboard[player] += 10
            break
        if pins ==  0:
            print("SPARE")
            bonus.append(player)
            scoreboard[player]+= 5
            
    print("\nPLAYER : ",player+1," SCORE : ",scoreboard[player],"\n")
    
if len(bonus) >0:
    print("\n----BONUS ROUND----\n")
    for player in  bonus:
        pins=10
        for chance in (1,2):
            print("Player ",player+1," / chance ",chance)
            hit=int(input())
            pins-=hit
            scoreboard[player]+=hit
            if pins==0:
                break
                

print("------LeaderBoard-----")

print("Player------Score")

for  player,score in  sorted(enumerate(scoreboard),key=lambda a:a[0],reverse=True):
    print(player+1,"-----",score)
