def depth(exp):
    if not isinstance(exp,(tuple,list)):
        return 0
    ret = 1
    for i in exp:
        ret = max(ret,1+depth(i))
    return ret


print depth('x')

print depth(('expt', 'x', 2))

print depth(('+', ('expt', 'x', 2), ('expt', 'y', 2)))

print depth(('/', ('expt', 'x', 5), ('expt', ('-', ('expt', 'x', 2),
                                              1), ('/', 5, 2))))

print depth([['/', ['expt', 'x', 5], ['expt', ['-', ['expt', 'x', 2], '1'], ['/', 5, 2]]]])
