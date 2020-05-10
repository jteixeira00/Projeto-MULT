import random

def ran():
    n = int(input())
    linha = ""
    for i in range(n):
        linha += str(random.randint(0,20)) + " " + "5 "
    print(linha)




if __name__ == "__main__":
    ran()
