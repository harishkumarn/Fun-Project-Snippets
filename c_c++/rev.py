def reverse(s):
    temp=''
    final=''
    for i  in range(len(s)-1,-1,-1):
        if s[i] !=' ' :
            temp=s[i]+temp
        else:
            final+=' '+temp
            temp=''
        
    final+=' '+temp
    return final[1:]


print reverse('Harish is a play boy')
        
