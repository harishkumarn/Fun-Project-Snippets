trie={}
def insertTrie(subword,trieInstance):
    if trieInstance is None:
        return {subword:None}
    for i in range(1,len(subword)+1):
        if subword[:i]  in trieInstance.keys():
            trieInstance[subword[:i]] = insertTrie(subword[:i],trieInstance[subword[:i]])
        else:
            trieInstance[subword]=None
    return trieInstance
        
def getTrie(*words):
    global trie
    for word in words:
        for i in range(1,len(word)+1):
            trie=insertTrie(word[:i],trie)
    print trie
                


getTrie("oath","pea","eat","rain")
