def boundary(root):
    print(root.val,end=" ")
    
    tovisit=[]
    if root.left:
        tovisit.append(root.left)
    if root.right:
        tovisit.append(root.right)
        
    right=[]
    printright=True
    while len(tovisit)>0:
        temp=[]
        for i in tovisit:
            if i.left:
                temp.append(i.left)
            if i.right:
                temp.append(i.right)
        
        if len(temp)>0:
            print(tovisit[0].val,end=" ")
            if printright and len(tovisit) >1:
                right.append(tovisit[-1].val)
            else:
                printright=False
        else:
            for i in tovisit:
                print(i.val,end=" ")
        tovisit=temp
    if printright:
        for i in right[::-1]:
            print(i,end=" ")
    
class Node:
    def __init__(self,val,left=None,right=None):
        self.val,self.left,self.right=val,left,right
    
a=Node(10)
b=Node(14)
c=Node(12,a,b)
d=Node(4)
e=Node(8,d,c)

root=Node(20,e,Node(22,None,Node(25)))
        
boundary(root)
    
            
    
