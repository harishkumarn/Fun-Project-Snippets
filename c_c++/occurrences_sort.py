from collections import Counter
from collections import defaultdict
a=[1,2,2,1,3]

counter = Counter(a)

freq_map = defaultdict(lambda :[])
for i,j in counter.items():
    freq_map[j].append(i)

final_res=[]
for _ , lst in sorted(freq_map.items(),key = lambda a:a,reverse = True):
    final_res+=sorted(lst,reverse = True)

print final_res


