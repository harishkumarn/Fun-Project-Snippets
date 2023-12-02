def getWeight(a):
    ret = 0
    for i,j in enumerate(a):
        ret+=((101**i)*ord(j))
    return ret
              
def count_pattern(pat,lst):
    pat = map(str,pat)
    patWght = getWeight(pat)
    size = len(pat)
    count=0
    subWght = getWeight(lst[:size])
    if subWght == patWght:
        count+=1
    removeInd = 0
    mxPow = size-1
    for i in range(size,len(lst)):
        subWght = (subWght-ord(lst[removeInd]))/101 + ((101**mxPow)*ord(lst[i]))
        removeInd+=1
        if patWght == subWght:
            count+=1
                    
    return count
              
                                                  
print count_pattern(('a', 'b', 'a'), ('g', 'a', 'b', 'a', 'b', 'a',
                                      'b', 'a'))

print  count_pattern( ('a', 'b'), ('a',
                                   'b', 'c', 'e', 'b', 'a', 'b', 'f'))

print count_pattern( [1, [2,3]], [1, [2,3], 2, 3, 1, [2,3,4]] )
