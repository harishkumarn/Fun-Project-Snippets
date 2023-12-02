
from functools  import lru_cache
@lru_cache(maxsize=128)
def func(n,you=True):
	if n<=3:
		return you	
	else:
		return func(n-1,not  you) or  func(n-2,not you) or func(n-3 ,not you)

print(func(8))
