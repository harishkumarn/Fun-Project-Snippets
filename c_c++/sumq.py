def sumq(a,b,c):
    ret=0
    for i in a:
        for j  in  b:
            if i <=  j:
                for k in c:
                    if j >= k:
                        ret+=((i+j)*(j+k))
    return  ret
                        
    
print(sumq([1,2,3],[5],[4,5,6]) %1000000007)
