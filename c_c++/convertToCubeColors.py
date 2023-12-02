import sys
from  PIL  import Image
getSingleNum = lambda *a: ( a[0] << 16 ) | ( a[1] << 8 ) | a[2]

colorGrid={}

colorGrid[getSingleNum(255,165,0)] = (255,165,0) #  orange
colorGrid[getSingleNum(255,255,255)] = (255,255,255)  # white
colorGrid[getSingleNum(0,0,255)] = (0,0,255) # blue
colorGrid[getSingleNum(0,255,0)]=(0,255,0) #  green
colorGrid[getSingleNum(255,0,0)]  = (255,0,0)  # red
colorGrid[getSingleNum(255,255,0)] = (255,255,0) # yellow
colorGrid[getSingleNum(154,205,50)] = (154,205,50) # yellow green
colorGrid[getSingleNum(5,60,73)] = (5,60,73) # blue green
colorGrid[getSingleNum(54,17,89)] = (54,17,89) # blue violet
colorGrid[getSingleNum(127,0,255)] = (127,0,255) # blue violet
colorGrid[getSingleNum(199, 21, 133)] = (199, 21, 133) # red violet
colorGrid[getSingleNum(255,69,0)] = (255,69,0) # red orange
colorGrid[getSingleNum(100,68,26)] = (100,68,26) # yellow orange
colorGrid[getSingleNum(0,0,0)] = (0,0,0) # black
colorGrid[getSingleNum(251,243,233)] = (251,243,233)  # kitten  white


colorGridKeys = sorted(colorGrid.keys())

def  getClosestColor(color):
    index = 0
    for i in range(0,len(colorGridKeys)):
        if color < colorGridKeys[i]:
            index = i
            break
    if index != 0 :
        if (colorGridKeys[index] -  color ) < ( color -  colorGridKeys[index-1] ):
            return  colorGrid[colorGridKeys[index]]
        else:
            return  colorGrid[colorGridKeys[index-1]]
    else:
        return (0,0,0)

img = Image.open(sys.argv[1])
pxl  = img.load()
cSize = int(sys.argv[2])
ln,br=img.size
for  i in range(0,ln,cSize):
    for j in range(0,br,cSize):
        blockSum = 0
        for  k in range(cSize):
            try:
                blockSum += sum([getSingleNum(*pxl[i+k,l]) for l in range(j,j+cSize)])
            except IndexError:
                pass
        closestCol = getClosestColor(blockSum/(cSize**2))
        for x in range(cSize):
            for y in range(cSize):
                try:
                    pxl[x+i,j+y] = closestCol
                except IndexError:
                    pass

img.show()
img.close()

