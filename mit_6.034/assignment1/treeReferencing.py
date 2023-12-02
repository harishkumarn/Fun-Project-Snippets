def tree_ref(tree,index):
    if len(index) == 1:
        return tree[index[0]]
    else:
        return tree_ref(tree[index[0]],index[1:])

tree =  (((1, 2), 3), (4, (5, 6)), 7, (8, 9, 10))

print tree_ref(tree, (1, 1, 1))

print tree_ref(tree, (3, 1))

print tree_ref(tree, (0,))
