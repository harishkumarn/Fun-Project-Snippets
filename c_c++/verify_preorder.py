
class Node:
    def __init__(self,val,left=None,right=None):
        self.val = val
        if ( left and left.val > val ) or (right and right.val < val):
            raise Exception
        self.left = left
        self.right = right


lst = map(int,raw_input().split(','))


def testPreOrder():
    global lst


