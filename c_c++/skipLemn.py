
import sys
splitLen=lambda a,b:[a[i*b:(i+1)*b]  for i in range(len(a)/b)] + [a[b*(len(a)/b) : ]]
#print(sys.argv[1],sys.argv[2])
print splitLen(sys.argv[1],int(sys.argv[2]))

