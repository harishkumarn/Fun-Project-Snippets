class Node:
    def __init__(self,val):
        self.val = val
        self.left = None
        self.right = None
def insertTree(node, val):
    global root
    if node is None:
        return Node(val)
    if node.val > val:
        if node.left is None:
            node.left  = Node(val)
            return node
        else :
            node.left = insertTree(node.left,val)
            return node
    else:
        if node.right is None:
            node.right = Node(val)
            return node
        else:
            node.right = insertTree(node.right,val)
            return node
            
        
arr = [8,3,4,5,6]

root = None
for  i  in arr:
    root = insertTree(root,i)

lru_cache = {}
def findClosest(node,val):
    if lru_cache.get(val) is not None:
        return lru_cache[val]
    if node.val == val:
        return val
    elif node.left is not None and node.right is not None:
        if val > node.left.val and val < node.right.val:
            return node.left.val if ( val - node.left.val ) < (node.right.val - val) else node.right.val
        elif val > node.val:
            return findClosest(node.right,val)
        else:
            return findClosest(node.left,val)
    elif node.left is not None:
        if node.left.val < val:
            return
        return findClosest(node.right,val)
    elif node.right is not None:
        return findClosest(node.left,val)
    else:
        return node.val

