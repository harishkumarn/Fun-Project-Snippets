class defaultdict:
	def __init__(self,fn):
		self.fn=fn
		self.dct={}
	def  __getitem__(self,key):
		if  self.dct.get(key):
			return self.dct[key]
		else:
			self.dct[key]=self.fn()
			return self.fn()
	def __setitem__(self,key,val):
		self.dct[key]=val



