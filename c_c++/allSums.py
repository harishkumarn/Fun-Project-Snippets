def func(X,M,N,st=''):
    if X<N:
        return 0
    elif X == N:
        return 1
    else:
        if N == 1:
            if X <= M:
                #print st[3:]+' + '+str(X)
                return 1
            else:
                return 0
        else:
            total=0
            for i in range(1,M+1):
                if i  <= X :
                    total+=func(X-i,M,N-1,st+' + '+str(i))
            return total

print func(M=4,N=2,X=1)
print func(M=2,N=2,X=3)
print func(M=6,N=3,X=8)
print func(M=4,N=2,X=5)
print func(M=4,N=3,X=5)
