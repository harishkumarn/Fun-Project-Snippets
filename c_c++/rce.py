import  subprocess
import  re
class Test:
	def __init__(self,command):
		self.cmd  = list(map(lambda  a:a.strip(' '),re.split(r'\s+',command)))
	def  __reduce__(self):
		return  (subprocess.call,(self.cmd,))




import pickle

dbfile = open('examplePickle', 'wb')

pickle.dump(Test('ls -l'),dbfile)


dbfile = open('examplePickle', 'rb')

db = pickle.load(dbfile) 

print(db)
