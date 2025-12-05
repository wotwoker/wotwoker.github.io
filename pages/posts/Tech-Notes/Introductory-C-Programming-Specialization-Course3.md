---
title: "Introductory C Programming Specialization 学习笔记——Course 3: Pointers, Arrays, and Recursion"
date: 2025-12-02
updated: 2025-12-05
categories: 课程笔记
tags:
  - 课程
  - 笔记
  - C
---
## Module 1: Pointers
### Pointer Basics
Pointers are way of referring to the _location_ of a variable. Instead of storing a value like 5 or the character 'c', *a pointer's value is the location of another variable*.    

**Declaring a pointer**     
In C, "pointer" (by itself) is not a type. It is a _type constructor_.    

`char * my_char_pointer;` declares a variable with the name **my_char_pointer** with the type _pointer to a char_ (a variable that points to a character).    
- the name of the variable(pointer):  `my_char_pointer`     
- and type of variable that this pointer will be pointing to: `char`   
![x的值通过指针的解引用变成6了](./pic/Pasted%20image%2020251202104024.png)

Conceptually, the **&** operator (the symbol is called an "ampersand", and the operator is named the "address-of" operator) gives us an arrow pointing at its operand.   
The code **xPtr = &x;**_,_ for example, sets the value of the variable **xPtr** to the _address of_ **x**. After it is initialized, **xPtr** points to the variable **x**.    

It is important to note that the address of a variable is not itself an lvalue, and thus not something that can be changed by the programmer. The code **&x = 5;** will not compile. A programmer can access the location of a variable, but it is not possible to change the location of a variable.    

**Dereferencing a pointer**（解引用）    
`*xPtr = 6;` changes the value that xPtr points to (_i.e._, the value in the box at the end of the arrow—namely, x’s box)—to 6.

Do not be confused by the two contexts in which you will see the star (_*_) symbol.     
- In a variable declaration `int * xPtr`:   
	`int *` is the type of xPtr
- In an expression, the star is the dereference operator.
	`r = *p;` gives the variable _r_ a new value
	`*p = r;` changes the value inside the box that p points at to be a new value
	`int * q = &y;` is the same as the two statements `int *q;` `q = &y;`

**When working with pointers, _always draw pictures_.**      
The right-hand side (the _y_ in the statement _x = y_ ;) is called the _rvalue_. This is the value that will be placed inside the box/lvalue. With the introduction of pointers, we add two new types of expressions that can appear in rvalues: the address of an lvalue (_&x_), and dereferencing a pointer (_*p_).    
![declare assign dereference](./pic/Pasted%20image%2020251202111940.png)

通过调用函数，交换两个指针（地址)指向的值，
```c
void swap(int *x, int *y) { //int * 声明x和y是保存地址的指针
  int temp = *x;
  *x = *y;
  *y = temp;
}
int main(void) {
  int a = 3;
  int b = 4;
  swap(&a, &b); //所以传入函数的参数是地址
  printf("a = %d, b = %d\n", a, b);
  return EXIT_SUCCESS;
}
```

### pointers under the hood
![look under the hood at the hardware representation](./pic/Pasted%20image%2020251203104244.png)
The figure above is hardware representation of the declaration and initialization of one 4-byte integer, four 1-byte characters, and finally two 4-byte pointers. **Each variable has a base address**.   

Consequently, lines like these are illegal: _int *ptr = &3_; and int _*ptr = &(x + y_);. **Note that _3_ and (_x+y_) are not lvalues**—they do not name boxes, which is why they cannot have an address  

On a 32-bit machine, addresses are 32 bits in size. Therefore **pointers are always 4 bytes in size**, regardless of the size of the data they point to.   

![swap with hardware](./pic/Pasted%20image%2020251203111517.png)
（右图为了画图方便，把4个字节“打包”进了一个红色的框里而已）

### pointers to other types

**Pointers to Structs**    
![dereferencing a pointer to a struct and selecting a field](./pic/Pasted%20image%2020251203113105.png)
- `*a.b` : it means \*(a.b)—a should be a struct, which we look inside to find a field named _b_ (which should be a pointer), and we dereference that pointer.
- `*q.x` we would receive a compiler error, as _q_ is not a struct, and the order of operations would say to do _q.x_ first (which is not possible, since _q_ is not a struct).
- `q->x`: (which means exactly the same thing as `(*q).x`)
- For our more complex example, we could instead write` q->r->s->t` (which is easier to read and modify).

**Pointers to Pointers**    
For example, an `int *` is a pointer to a pointer to an int. An `int**` is a pointer to a pointer to a pointer to an int.  
![pointers to pointers](./pic/Pasted%20image%2020251204095252.png)
If we were to write `* r`, it would refer to `q`’s box.     
we have four names for a’s box: `a`, `*p`, `**q`, and `***r`. Whenever we have more than one name for a box, we say that the names _alias_ each other—that is, we might say `*p` **aliases** `**q`.   

>“I wrote _x = 4_;, then look I don’t assign to _x_ anywhere in this code, but now it is 47!” Generally such behavior indicates that you alias the variable in question (although you may not have meant to).

```c
float f = 3.14;
int * p = (int *) &f;  // generally a bad idea!
printf("%d\n", *p); //prints _078523331 as output
// Here, f is an alias for *p, although f is declared to be a float
//floating point encoding of 3.14 works out to ( 0x4048F5C3 in hex, 1078523331 in decimal)

float f = 3.14; 
int x = (int) f; //cast a float to an int
printf("%d\n", x); 
```


**const** [course2笔记也有类似总结](Introductory-C-Programming-Specialization-Course2.md#了解下**指针**：)
```c
const int x = 3; // assigning to x is illegal

const int * p = &x; // declared p as a pointer to a const int
int const * p = &x; // same as const int * p
int * const p = &x; // p is a const pointer to a (modifiable) int
const int * const p = &x; // both is const


```

| Can we change **p           | Can we change *p | Can we change p |     |
| --------------------------- | ---------------- | --------------- | --- |
| int ** p                    | Yes              | Yes             | Yes |
| const int ** p              | No               | Yes             | Yes |
| int * const * p             | Yes              | No              | Yes |
| int ** const p              | Yes              | Yes             | No  |
| const int * const * p       | No               | No              | Yes |
| const int ** const p        | No               | Yes             | No  |
| int * const * const p       | Yes              | No              | No  |
| const int * const * const p | No               | No              | No  |

```c
int x = 3;
const int * p = &x;
x = 4;
//not allowed to change *p, 
// the value we find at *p can still be changed by assigning to x


const int y = 3;
int * q = &y; // this line is an error
*q = 4;
//assign &y (which has type const int *) to q (which has type int *)
//discarding the const qualifier (const is called a qualifier because it modifies a type).

```


**Pointer Arithmetic**   
Like all types in C, pointers are variables with numerical values.   
```c
int x = 4;
float y = 4.0;
int *ptr = &x;

x = x + 1;
y = y + 1;
ptr = ptr + 1;
```
For both integers and floating point numbers, adding 1 has the basic semantics of “**one larger**”. For the integer pointer ptr (which initially points to x), adding 1 has the semantics of “**one integer later** in memory”.    
(_e.g._, +1 means to change the numerical value of the pointer by +4). Likewise, when adding N to a pointer to any type T, the compiler generates instructions which add _(N * the number of bytes for values of type T)_ to the numeric value of the pointer—causing it to point N Ts further in memory.   

Incrementing the pointer will point it at _some_ location in memory, we just do not know what. It _could_ be the box for y, the return address of the function, or even the box for ptr itself.     
We will note that simply performing arithmetic on pointers such that they do not point to a valid box is not, by itself, an error—only dereferencing the pointer while we do not know what it points at is the problem.


**Memory Checker Tools**    
it is crucial to use memory checker tools, such as **valgrind** and/or the compiler option **-fsanitize=address**.   


**pointer to pointer e.g.  **    
```c test.c
#include <stdio.h>
#include <stdlib.h>

int f(int ** r, int ** s) {
  int temp = ** r;
  int temp2 = **s;
  int * z = *r;
  *r = *s;
  *s = z;
  printf("**r = %d\n",**r);
  printf("**s = %d\n",**s);
  *z += 3;
  **s -= 8;
  **r -= 19;
  return temp + temp2;
}

int main(void) {
  int a = 80;
  int b = 12;
  int * p = &a;
  int * q = &b;
  int x = f(&p, &q);
  printf("x = %d\n", x);
  printf("*p = %d\n", *p);
  printf("*q = %d\n", *q);
  printf("a = %d\n", a);
  printf("b = %d\n", b);
  return EXIT_SUCCESS;
}
```

对应的makefile文件
```Makefile 
# 1. 定义变量（可选，但更易维护） 
CC = gcc # 编译器 
CFLAGS = -std=gnu99 -pedantic -Wall # 编译选项（你的命令参数） 
TARGET = test # 目标文件名 
# 2. 主目标：最终要生成的可执行文件（test） 
# 依赖：test.o（编译生成的目标文件） 
$(TARGET): test.o 
	$(CC) $(CFLAGS) test.o -o $(TARGET) # 命令行（前面必须是 Tab 键！） 
# 3. 子目标：编译 .c 文件生成 .o 目标文件（可选，覆盖 make 隐式规则） 
# 依赖：test.c（源文件） 
test.o: test.c 
	$(CC) $(CFLAGS) -c test.c -o test.o # -c 表示只编译不链接 
# 4. 清理目标（可选，但非常实用） 
.PHONY: clean # 声明 clean 是伪目标，避免目录中有 clean 文件时失效 
clean: 
	rm -f $(TARGET) *.o # 删除可执行文件和所有 .o 目标文件
```

```makefile
# 简化写法
.PHONY: all clean 
all: # 默认目标，执行 make 直接编译 
	gcc test.c -std=gnu99 -pedantic -Wall -o test
clean: 
	rm -f test # 只需要删除可执行文件，没有 .o 要清理
```
`all` 被声明为伪目标，只影响 “是否检查文件”，不影响它 “作为第一个目标被默认执行” 的特性。  

## Module 2: Arrays
### Arrays Basics
An _array_ is a sequence of items of the same type.    
```c
int myArray[4]; // Array Declaration
// myArray just names a pointer to the first box in the array

int myArray[4] = {42, 39, 16, 7}; //declaration and initialization
int myArray[4] = {0}; // initialize all elements to 0
int myArray[] = {42, 39, 16, 7}; // compiler figures out [4]

point p = {3, 4}; //initialize structs
//initialize the first field of p to 3 and the second field to 4
point p = { .x = 3, .y = 4};
point myPoints[] = { {.x = 3, .y = 4},
                     {.x = 5, .y = 7},
                     {.x = 9, .y = 2} }; //声明并初始化结构体数组
```

**Accessing an Array**     
It is important to note that in C (and C++ and Java), array indexes are __zero-based__ — the first element of the array is _myArray_[0].

>**pointer arithmetic** and **array indexing** are exactly the same under the hood, the compiler **turns _myArray_[i] into \*(myArray + i)** (This definition leads to a “stupid C trick” that you can use to perplex your friends: _i_[myArray] looks ridiculous, but is perfectly legal. Why? _i_[myArray] = \*(_i + myArray_). Since addition is commutative, that is the same as \*(_myArray + i_), which is the same as _myArray_[i].    
>if we take `&myArray[i]`, it is equivalent to `&*(myArray +i)`, and the & and * cancel (as we learned previously, they are inverse operators), so it is just **myArray + i**. This result is fortunate, as it lines up with what we would hope for: &myArray[i] says “give me an arrow pointing at the _ith_ box of _myArray_” while _myArray + i_ says “give me a pointer i boxes after where _myArray_ points”—these are two different ways to describe the same thing.    
>在编程语言（如 C/C++）中，数组越界访问属于未定义行为（Undefined Behavior）：1. 语言标准未规定越界访问的结果，程序行为完全不可控。

**`data`(Array) is not a lvalue, just names a pointer to the first box in the array:**  
Array Access with Pointer Arithmetic：
![Array Access with Pointer Arithmetic](./pic/Pasted%20image%2020251205110917.png)
Array Access with Pointer Indexing：
![Array Access with Pointer Indexing](./pic/Pasted%20image%2020251205111337.png)

### Writing code with Arrays

**Passing Arrays as Parameters**    
In general, when we want to pass an array as a parameter, we will want to pass a pointer to the array, as well as an integer specifying how many elements are in the array.     
**There is no way to get the size of an array in C, other than passing along that information explicitly**, and we often want to make functions which are generic in the size of the array they can operate on (_i.e._, we do not want to hardcode a function to only work on an array of a particular size). If we wanted, we could make a struct which puts the array and its size together, as one piece of data—then pass that struct around.
```c
int myFunction(int * myArray, int size) {
  // we can index myArray like an array
}

int myFunction(int myArray[], int size) {
  // whatever code...
}
```


**find Index of Largest Element:  ** 
```C
int findLargestIndex(int * array, int n){
	//lf n is less than or equal to O, give an answer of -1
	if(n<=0）{
		return -1;
	}
	int largestIndex = 0;
	for (int i=1;i< n;i++){
		if (array[i] > array[largestIndex]){
			ilargestIndex = i;
		}
	}
	return largestIndex;
}
```

**find closest point using array:**
![Closest Point Step-Through](./pic/Pasted%20image%2020251205120002.png)

