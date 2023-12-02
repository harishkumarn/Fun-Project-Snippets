import math
def FFT(p,inverse=False):
    n=len(p)
    if n ==1:
        return  p
    ye,yo = FFT(p[::2],inverse),FFT(p[1::2],inverse)
    mul = -2 if inverse else 2
    w = math.e ** ((mul*math.pi*1j)/n)
    y=list(range(n))
    half= int(n/2)
    for k  in  range(half):
        wk =  w ** k
        y[k] = ye[k] + wk * yo[k]
        y[k+half] = ye[k] - wk * yo[k]
    return y
def IFFT(p):
    ifft=FFT(p,True)
    n=len(p)
    ifft=map(lambda a:round(a.real /n),ifft)
    return list(ifft)
   
def zeropadding(p):
    n=len(p)
    exp=math.ceil(math.log(n,2))
    ln=2**(exp+1)
    return p +[0]*int((ln-n))
    
t=int(input())
for  _ in range(t):
    n=int(input())
    p1=list(map(int,input().split(' ')))
    p2=list(map(int,input().split(' ')))
    
    p1=zeropadding(p1)
    p2=zeropadding(p2)
    
    fft1=FFT(p1)
    fft2=FFT(p2)
    
    p1p2=IFFT(list(map(lambda a:a[0]*a[1],zip(fft1,fft2))))[:2*n+1]
    print(*p1p2,sep=' ')
