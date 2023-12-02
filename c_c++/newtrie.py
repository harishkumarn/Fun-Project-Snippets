
        
        
class Trie(object):

    def __init__(self):
        self.root = {}
        

    def insert(self, word):
        currentlayer=self.root
        for i in range(1,len(word)+1):
            if  currentlayer.get(word[:i]) == None:
                currentlayer[word[:i]]={}
                currentlayer=currentlayer[word[:i]]
            else:
                currentlayer=currentlayer.get(word[:i])
            
        
        

    def search(self, word):
        currentlayer=self.root
        for i in range(1,len(word)+1):
            if  currentlayer.get(word[:i]) ==  None:
                return False
            else:
                currentlayer=currentlayer.get(word[:i])
                print  currentlayer
        return True
        

    def startsWith(self, prefix):
        """
        Returns if there is any word in the trie that starts with the given prefix.
        :type prefix: str
        :rtype: bool
        """
        



trie=Trie()
trie.insert('search')
trie.insert('cycletron')
trie.insert('cycle')
print trie.root
print trie.search('search')

