import time
from functools import wraps
visited=None
grid = None
size=0
def explore(i,j):
    toBe=[]
    if i!=0 and grid[i-1][j] == '.':#up
        toBe.append((i-1,j))
    if j!=0 and grid[i][j-1] == '.':#left
        toBe.append((i,j-1))
    if i!= size-1 and grid[i+1][j] == '.': #down
        toBe.append((i+1,j))
    if j!= size-1 and grid[i][j+1] == '.': #right
        toBe.append((i,j+1))
    return toBe

def decor(fn):
    @wraps(fn)
    def inner(a):
        start=time.time()
        print(fn(a))
        print(time.time()-start)
    return inner

@decor
def path_finder(maze):
    global grid
    grid=maze.split('\n')
    global size
    size=len(grid)
    if size==1:
        return grid[0][0] == '.'
    global visited
    visited=[[False for col in range(size)] for row in range(size)]
    visited[0][0]=True
    toBeVisited=explore(0,0)
    visitCount=0
    while toBeVisited:
        temp=set()
        for i,j in toBeVisited:
            visitCount+=1
            if i==size-1 and j==size-1 :
                return True
            visited[i][j]=True
            for x,y in explore(i,j):
                if not visited[x][y] and not (x,y) in toBeVisited:
                    temp.add((x,y))
        toBeVisited=temp
    return visited[size-1][size-1]

# 2,4
# (1,4),(2,3),(3,4),(2,5)




