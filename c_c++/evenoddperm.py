def reorder(arr):
        rarr=[None for i in arr]
        evenind=1
        oddind=0
        for i in arr:
            if i  &  1:
                rarr[oddind]=i
                oddind+=2
            else:
                rarr[evenind]=i
                evenind+=2
        print(rarr)
        

reorder([3,7,1,9,2,8,4,6])
	
