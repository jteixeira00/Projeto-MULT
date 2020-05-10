import time
import random

def maxi():
    i = 1000
    while(i!=26000):
        marioritario(i)
        i+=1000

def marioritario(n):
    linha = ran(n)
    linha = linha.split()
    ti = time.time()
    soma = [0,0,0,0,0,0,0,0]
    for x in linha:        
        soma = soma_bin(bin(int(x)).split("b")[1],soma)
    num = 0    
    for i in range (8):        
        if soma[i] > n /2:
            if i == 0:
                num+=128
            if i == 1:
                num+=64
            if i == 2:
                num+=32
            if i == 3:
                num+=16
            if i == 4:
                num+=8
            if i == 5:
                num+=4
            if i == 6:
                num+=2
            if i == 7:
                num+=1
    conta = 0            
    for x in linha:
        if int(x) == num:
            conta+=1
    if(conta > n/2):
        print(time.time()-ti)
        #print(num)
    else:
        print(time.time()-ti)
        #print("Sem elemento.")                
    
        
def soma_bin(bina,soma):
    i = 1
    while(i != len(bina) + 1):
        soma[-i] += int(bina[-i])
        i += 1
    return soma

def ran(n):
    linha = ""
    for i in range(n):
        linha += str(random.randint(1,20)) + " "
    return linha
                  
        

if __name__ == '__main__':
    maxi() 
