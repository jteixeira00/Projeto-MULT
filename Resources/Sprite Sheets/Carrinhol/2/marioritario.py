import time
import random


def maxi():
    i = 25000
    while(i!=32500):
        ti = time.time()
        marioritario(i,ran(i))
        tf = time.time()
        print(tf - ti)
        i+=1000
        
    

def marioritario(n,linha):
    linha = linha.split()
    for x in linha:
        if conta_elem(x,n,linha) > n/2:
            #print(x)
            return 0
    #print("Sem elemento.")
            
    
    
def conta_elem(k,n,linha):
    cont = 0
    for i in linha:
        if(i == k):
            cont+=1
    return cont

def ran(n):
    linha = ""
    for i in range(n):
        linha += str(random.randint(1,20)) + " "
    return linha
            
        

if __name__ == '__main__':
    maxi()
 
