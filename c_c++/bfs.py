def bfs(v,adjList):
    global visited
    visited[v]=0
    parent={v:None}
    frontier=[v]
    level=1
    while frontier:
        next=[]
        for i in frontier:
            for u in adj[i]:
                if u not in visited.keys():
                    visited[u]=level
                    parent[u]=i
                    next.append(u)
        frontier=next
        level+=1
    return parent

visited={}
adj={}
adj['a']=['s','z']
adj['c']=['d','f','v','x']
adj['d']=['c','f','x']
adj['f']=['c','d','v']
adj['s']=['a','x']
adj['v']=['c','f']
adj['x']=['c','d','s']
adj['z']=[]

parent =  bfs('d',adj)

print 'All vertices are', adj.keys()

dist = raw_input('Enter vertice to find distance : ')
if dist in adj.keys():
    route=[dist]
    next = parent[dist]
    while next:
        route.append(next)
        next=parent[next]
    for i in route[:-1]:
        print i,'->'
    print route[-1]

