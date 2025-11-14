#!/usr/bin/env python
# coding: utf-8

# In[1]:


#1Write a program in python to find even and prime number from given list using seperate function
#checkeven() and checkprime()
lst=[12,15,8,3,74,36]
def checkeven(x):
    findeven=[]
    for i in x:
        if i%2==0:
            findeven.append(i)
    return findeven
def checkprime(y):
    findprime=[]
    for i in y:
        for j in (2,i):
            if i%j==0:
                break
            else:
                findprime.append(i)
    return findprime

result1=checkeven(lst)
print("Even numbers are:",result1)
result2=checkprime(lst)
print("Prime numbers are:",result2)
    


# In[2]:


#2 Write down a menudrive program to peform sorting in a list mylist=[12,2,9,3,8,19] using either 
#bubble sort or insertion sort algorithm
def bubblesort(x):
    print("Before sorting:",x)
    n=len(x)
    for i in range(n):
        for j in range(0,n-i-1):
            if x[j]>x[j+1]:
                x[j],x[j+1]=x[j+1],x[j]
    print("After bubble sort:",x)
    
def insertionsort(x):
    print("Before sorting:",x)
    n=len(x)
    for i in range(1,n):
        key=x[i]
        j=i-1
        while j>=0 and key<x[j]:
            x[j+1]=x[j]
            j-=1
        x[j+1]=key
    print("After insertion sort:",x)

mylist=[12,2,9,3,8,19]
ch=int(input("Press 1 to perform bubble sort\nPress 2 to perform insertion sort"))
if ch==1:
    bubblesort(mylist)
elif ch==2:
    insertionsort(mylist)
else:
    print("Invalid choice")


# In[14]:


#3 Write a program to perform factorial of a number using seperate function fact()
def fact(n):
    p=1
    for i in range(1,n+1):
        p=p*i
    return p
val=int(input("Enter number to find factorial:"))
f=fact(val)
print("factorial is=",f)


# In[28]:


#4 Write a program to generate fibonacci series
def fibo(sv,nv,ev):
    lst=[]
    lst.append(sv)
    while nv<ev:
        lst.append(nv)
        nv=sv+nv
        sv=nv-sv
    return lst
sv=int(input("Enter starting value:"))
nv=int(input("Enter next value:"))
ev=int(input("Enter end value:"))
fib=fibo(sv,nv,ev)
print(fib)


# In[29]:


#5 Find output of following program after executing it-
def changeval(M,N):
    for i in range(N):
        if M[i]%5==0:
            M[i]//=5
        if M[i]%3==0:
            M[i]//=3
L=[25,8,75,12]
changeval(L,4)
for i in L:
    print(i,end="#")


# In[30]:


#6 Find output of following program after executing it-
S='WELCOME'
def change(T):
    T='HELLO'
    print(T,end="@")
change(S)
print(S)


# In[7]:


#7 Find output of following program after executing it-
def Diff(N1,N2):
    if N1>N2:
        return N1-N2
    else:
        return N2-N1
NUM=[10,23,14,54,32]
for i in range(4,0,-1):
    A=NUM[i]
    B=NUM[i-1]
    print(Diff(A,B),'#',end=' ')


# In[11]:


#8 Find output of following program after executing it-
def intrest(price,time=2,rate=0.10):
    return (price*time*rate)
print(intrest(6100,1))
print(intrest(5000,rate=0.05))
print(intrest(5000,3,0.12))
print(intrest(time=4,price=5000))


# In[1]:


#9 Write a program to create a function to calculate simple intrest using three types of argument i.e,
#positional argument,keyword argument, default argument
def sicalc(p,r,t=1):
    si=p*r*t/100
    return si
val1=int(input("enter principle amount:"))
val2=float(input("enter rate of interest:"))
val3=int(input("enter the tenure:"))
r1=sicalc(val1,val2,val3)
r2=sicalc(p=val1,r=val2,t=val3)
r3=sicalc(val1,val2)
print("Using positional parameter:",r1)
print("Using keyword parameter:",r2)
print("Using default parameter:",r3)


# In[15]:


#10 Write a function that recieves an octal number and prints the equivalent number in decimal,binary
#& hexadecimal equivalent
def oct2others(n):
    print("Passed octal number:",n)
    numstring=str(n)
    decNum=int(numstring,8)
    print("Number in Decimal:",decNum)
    print("Number in Binary:",bin(decNum))
    print("Number in Hexadecimal:",hex(decNum))
num=int(input("Enter an octal number:"))
oct2others(num)


# In[1]:


#11 Create a file handeling program to store sum of two numbers in a text file
fw=open(r'C:\Users\achar\OneDrive\Desktop\myfile.txt','w')
x=int(input("Enter value 1:"))
y=int(input("Enter value 2:"))
z=x+y
print('output is=',z)
fw.write(str(z))
fw.close()


# In[2]:


#12 Create a file handeling program in Python to store five metro politan cities from India
fw=open(r'C:\Users\achar\OneDrive\Desktop\city.txt','w')
for i in range(5):
    city=input("Enter Metropolitan city name:")
    fw.write(city+'\n')
fw.close()
print("Writing Over")

ch=input("Enter r or R to read from file:")
if ch=='r' or ch=='R':
    fr=open(r'C:\Users\achar\OneDrive\Desktop\city.txt','r')
    for i in range(5):
        print(fr.readline().strip())
    fr.close()
else:
    print('Thank You')


# In[1]:


#13 Write a program in python that defines and calls the user defined function (a)add():to accept and
#add data of an employee to a csv file'furdata.csv'. Each record consists of a list with field
#elements as fid,fname & fprice to same furniture id,name & price respectively.(b):search:to display
#the records of furniture where price is more than 10000
import csv

def add():
    fw = open('furdata.csv', 'w', newline='')  # Removed unnecessary space in newline
    cw = csv.writer(fw)
    hr = ['fid', 'fname', 'fprice']
    cw.writerow(hr)  # Writing header row
    furdetails = []
    n = int(input('Enter no. of furniture: '))
    for i in range(n):
        fid = input('Enter furniture id: ')
        fname = input('Enter furniture name: ')
        fprice = float(input('Enter furniture price: '))
        furdetails.append([fid, fname, fprice])  # Append record to the list
    cw.writerows(furdetails)  # Write all records to CSV
    fw.close()
    print("Writing Done")
    
def search():
    pvalue = float(input('Enter furniture price to filter records: '))
    fr = open('furdata.csv', 'r') 
    cr = csv.reader(fr)
    mylist = list(cr)  
    print("Records with price greater than", pvalue, ":")
    for i in mylist[1:]:  
        if float(i[2]) > pvalue:  
            print(i)  
    fr.close()

print('Press 1 for adding new records\nPress 2 for finding out records:')
ch = int(input('Enter your choice: '))
if ch == 1:
    add()
elif ch == 2:
    search()
else:
    print('Invalid input')


# In[2]:


print('Press 1 for adding new records\nPress 2 for finding out records:')
ch = int(input('Enter your choice: '))
if ch == 1:
    add()
elif ch == 2:
    search()
else:
    print('Invalid input')


# In[1]:


#16 linear searching in array(linear list)
#searching through a linear list
def lsearch(lst,sv):
    i=0
    while i<len(lst) and lst[i]!=sv:
        i=i+1
        
    if i<len(lst):
        return i
    else:
        return False
mylist=[10,12,13,14,16,17,18,20,23]
sv=int(input('Enter searech value='))
index=lsearch(mylist,sv)
if index:
    print('Element found at=',index+1,'position')
else:
    print('Element not found')


# In[2]:


#17 Binary searching in array
def bsearch(lst,sv):
    beg=0
    last=len(lst)-1
    while beg<last:
        mid=(beg+last)//2
        if lst[mid]==sv:
            return mid
        elif lst[mid]<sv:
            beg=mid+1
        elif lst[mid]>sv:
            last=mid-1
        else:
            return False
mylist=[10,12,13,14,16,17,18,20,23]
sv=int(input('Enter searech value='))
index=bsearch(mylist,sv)
if index:
    print('Element found at=',index+1,'position')
else:
    print('Element not found')  


# In[4]:


#18 write a python program to implement stack operation
def isEmpty(stk):
    if stk==[]:
        return True 
    else:
        return False
def push(stk,i):
    stk.append(i)
    top=len(stk)-1
def pop(stk):
    result=isEmpty(stk)
    if result:
        print('Underflow')
    else:
        print(stk.pop(),'value removed')
        top=len(stk)-1
def display(stk):
    result=isEmpty(stk)
    if result:
        print('Underflow')
    else:
        for i in stk:
            print(i)
stk=[]
top=None
while True:
    print('1 for push')
    print('2 for pop')
    print('3 for display')
    print('4 for exit')
    ch=int(input('Enter your choice='))
    if ch==1:
        mno=int(input('Enter book number='))
        mname=input('Enter book name=')
        push(stk,[mno,mname])
    elif ch==2:
        pop(stk)
    elif ch==3:
        display(stk)
    elif ch==4:
        break
    print('stack closed')


# In[3]:


#19 write a program to reverse a string using stack
def isEmpty(stk):
    if stk == []:
        return True
    else:
        return False

def push(stk, i):
    stk.append(i)

def pop(stk):
    if isEmpty(stk):
        print('Underflow')
        return None
    else:
        return stk.pop()

def reverse(string):
    n = len(string)
    stack = []
    for i in range(n):
        push(stack, string[i])
    reversed_string = ''
    for i in range(n):
        reversed_string += pop(stack)
    
    return reversed_string

string = 'This is it'
print('Original string:', string)
reversed_str = reverse(string)
print('Reversed string:', reversed_str)


# In[13]:


#Write the code which reads the following record from the table named 'Student' and display only those records who have 
#greater than 75
          #Roll no.-integer
          #Name-strimg
          #Class-integer
          #marks-integer
#Establish connection between python and mysql
          #username is root
          #password is tiger
          #the table exist in a mysql database named 'school'
import mysql.connector as mysql
con1 = mysql.connect(host='localhost', user='root', password='tiger', database='school')
mycursor = con1.cursor()

mycursor.execute('SELECT * FROM Student WHERE Marks > 75')
data = mycursor.fetchall()

for record in data:
    print(record)

con1.close()


# In[15]:


#Write a code to update the marks of the student whose roll no is 15 from the 'student' 
          #Roll no.-integer
          #Name-strimg
          #Class-integer
          #marks-integer
#Establish connection between python and mysql
          #username is root
          #password is tiger
          #the table exist in a mysql database named 'school'
import mysql.connector as mysql
con1 = mysql.connect(host='localhost', user='root', password='tiger', database='school')
mycursor = con1.cursor()

mycursor.execute('UPDATE Student SET Marks = Marks + 10 WHERE Roll_no = 15')
con1.commit()
print('Record Updated')
con1.close()


# In[12]:


#Write a code to update the marks of the student whose roll no is 15 from the 'student' 
          #Roll no.-integer
          #Name-strimg
          #Class-integer
          #marks-integer
#Establish connection between python and mysql
          #username is root
          #passwimport mysql.connector as mysql
import mysql.connector as mysql
con1 = mysql.connect(host='localhost', user='root', password='tiger', database='school')
mycursor = con1.cursor()

mycursor.execute('UPDATE Student SET Marks = Marks + 10 WHERE Roll_no = 15')
con1.commit()
print('Record Updated')
con1.close()



# In[ ]:




