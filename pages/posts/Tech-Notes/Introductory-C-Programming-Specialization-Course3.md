---
title: "Introductory C Programming Specialization 学习笔记——Course 3: Pointers, Arrays, and Recursion"
date: 2025-12-02
updated: 2025-12-02
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
The right-hand side (the _y_ in the statement _x = y_;) is called the _rvalue_. This is the value that will be placed inside the box/lvalue. With the introduction of pointers, we add two new types of expressions that can appear in rvalues: the address of an lvalue (_&x_), and dereferencing a pointer (_*p_).    
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

