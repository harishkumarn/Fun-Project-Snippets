from __future__ import division
import math
import sys
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
    ifft=map(lambda a:a.real /n,ifft)
    return ifft
    
    
def mul(p1,p2):
    p3=[]
    for  i  in range(len(p1)):
        sm=0
        for j in range(i+1):
            sm+=p1[j]*p2[i-j]
        p3.append(sm)
    return p3
    
def zeropadding(p):
    n=len(p)
    exp=math.ceil(math.log(n,2))
    ln=2**(exp+1)
    return p +[0]*int((ln-n))
    
if __name__=='__main__':
    p1=zeropadding(map(int,sys.argv[1].split(",")))
    p2=zeropadding(map(int,sys.argv[2].split(",")))
    
    fft1=FFT(p1)
    fft2=FFT(p2)
    
    print(IFFT(map(lambda a:a[0]*a[1],zip(fft1,fft2))))
    
    




