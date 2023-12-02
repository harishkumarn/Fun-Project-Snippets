import time
from functools import wraps
def timer(fn):
	@wraps(fn)
	def wrapper(*a):
		st=time.time()
		val  = fn(*a)
		print(time.time()-st)
		return val
	return  wrapper

@timer
def expo(n,p):
	if p== 0:
		return 1
	elif p & 1:
		half = expo(n,p/2)
		return n*half*half
	else:
		half = expo(n,p/2)
		return half*half

#expo=timer(expo)
print(expo.__name__)
print(expo(2,122))
