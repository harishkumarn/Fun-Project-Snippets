trie={}

def insert(word,trie):
    for i in range(len(word)):
        if word[i] in trie:
            trie[word[i]]=insert(word[i+1:],trie[word[i]])
        else:
            trie[word[i]]=None
    return trie
            
