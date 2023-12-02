import sys
def solve(a):
	i=0
	ret=''
#	print(a)
	while i < len(a):
		k=i
		while k < len(a) and a[i] ==a[k]:
			k+=1
		if (k -i ) &  1:
			ret+=a[i]
		i=k
	if len(a) == len(ret):
		return ret
	else:
		return solve(ret)

print(solve(sys.argv[-1]))
#except:
#	print("nope")
