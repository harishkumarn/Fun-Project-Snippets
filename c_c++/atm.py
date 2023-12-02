from collections import defaultdict
last_transactions=defaultdict(lambda :[])


class ATM:
    def __init__(self,money):
        self.cash = money
        self.denomination = {}
        n = money / 100000
        self.denomination[1000] = 20 * n
        self.denomination[500] = 100 * n
        self.denomination[100] = 300 * n
    
    def __str__(self):
        print self.denomination

    def withDraw(self, amount):
        deno={100:0,1000:0,500:0}
        if ( amount < 100 and amount > 10000 ) or amount % 100 != 0:
            return 'Not possible'
        if amount <= 5000:
            if amount < 1000:
                if self.denomination[100] >= amount/100:
                    deno[100]=amount/100
                    self.denomination[100] -= amount/100
                else:
                    return 'No enough cash :('
            else:
                if amount <= 2000:
                    hund,thou = 0,0
                    if self.denomination[1000] >= amount/1000:
                        deno[1000] += 1
                        amount -= 1000
                        thou+=1
                    if self.denomination[100] >= amount/100:
                        deno[100] += amount/100
                        amount = 0
                        hund += amount/100
                    if amount > 0 :
                        return 'No enough cash :('
                    else:
                        self.denomination[1000] -= thou
                        self.denomination[100] -= hund
                else:
                    hund,thou,five = 0,0,0
                    if self.denomination[1000] >= 1:
                        thou+=1
                        self.denomination[1000]-=1
                        amount-=1000
                    if self.denomination[100] >= 10:
                        hund+=10
                        amount-=1000
                        self.denomination[100]-=10
                    if self.denomination[500] >= amount/500:
                        five+=amount/500
                        self.denomination[500]-= amount/500
                        amount%=500
                    if self.denomination[100] >= amount/100:
                        hund+=amount/100
                        self.denomination[500] -= amount/100:
                        amount%=100
                    if amount > 0 :
                        return 'No enough cash :('
                    else:
                        self.denomination[1000] -= thou
                        self.denomination[100] -= hund
                        self.denomination[500] -= five
        else: # > 5000
            hund,thou,five = 0,0,0
            deno[1000]+=3
            deno[500]+=2
            deno[100]+=10
            amount-=5000
            deno[500]+=amount/500
            amount%=500
            deno[100]+=amount/100
        return deno
class Account:

while True:
    print withDraw(int(raw_input('Enter amount : ' )))


