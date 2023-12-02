import sys
from collections import defaultdict
filePath = sys.argv[1]
index=0
outputbuf=''
loopindexes=[]
byteArray=defaultdict(lambda : 0)
looperror = False
syntaxError = False
infiniteLoopTermination = False
lastLoopValue=None
i  = 0
instructions = ''
with open(filePath,'r') as file:
    for line in file:
        line = line[:-1] if line[-1] == '\n' else line
        instructions+=line.strip(' ')
while i < len(instructions):
    if instructions[i] == '-':
        byteArray[index] = byteArray[index] - 1 if byteArray[index] > 0 else 0
    elif  instructions[i] == '+':
        byteArray[index] += 1
    elif instructions[i] == '>':
        index += 1
    elif instructions[i] == '<':
        index  = index - 1 if index > 0 else 0
    elif instructions[i] == '.':
        outputbuf += chr(byteArray[index])
    elif instructions[i] == '[':
        if byteArray[index] > 0 :
            loopindexes.append((index,i+1))
            lastLoopValue=byteArray[index]
        else:
            tempLoops = 1
            skipToIndex = None
            for j in range(i+1,len(instructions)):
                if instructions[j] not in '[].,+-<>':
                    syntaxError = True
                    break
                if instructions[j] == ']':
                    tempLoops -= 1
                    if tempLoops == 0 :
                        skipToIndex=j
                        break
                    elif tempLoops < 0:
                        looperror= True
                        break
                elif instructions[j] == '[':
                    tempLoops+=1
            if syntaxError or looperror :
                break
            elif tempLoops > 0 :
                looperror = True
                break
            else:
                i=skipToIndex
    elif instructions[i] == ']':
        if len(loopindexes) == 0:
            looperror= True
            break
        if byteArray[loopindexes[-1][0]] > 0:
            if lastLoopValue == byteArray[loopindexes[-1][0]]:
                infiniteLoopTermination = True
                break
            else:
                i = loopindexes[-1][1]
                continue
        else :
            loopindexes.pop()
    elif instructions[i] == ',':
        byteArray[index] = ord(raw_input()[0])
    else:
        syntaxError = True
        break
    i+=1
        
if infiniteLoopTermination:
    print '\nERROR_3 : infiniteLoopTermination\n'
elif looperror or len(loopindexes) > 0:
    print '\nERROR_2 : bracesNotMatched\n'
elif syntaxError:
    print '\nERROR_1 : invalidSyntax\n'
else:
    print '\n',outputbuf,'\n'

