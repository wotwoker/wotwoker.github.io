---
title: "Introductory C Programming Specialization 学习笔记——Course 2: Writing, Running, and Fixing Code in C"
date: 2025-11-24
updated: 2025-11-24
categories: 课程笔记
tags:
  - 课程
  - 笔记
---

## Module 1: Writing Code

**Revisiting Step 1:**    
The first step to devising an algorithm is to work an instance of the problem yourself. However, you have to not only be able to do the problem, but also do it methodically enough that you can analyze what you did and generalize it.    

**Revisiting Step 2:**    
Write Down What You Just Did. (for example, that the price of bread , we will have to find a way to properly _represent_ a rectangle using a number (or several))   

**Step 3: Generalizing Values**, Repetitions，     
we need to generalize to all instances of the problem, think about _why_ you did what you did, recognize patterns, and figure out how to deal with any possible inputs.   

![使用错误的算法得到错误的实例](../pic/Pasted%20image%2020251124144405.png)

>**To find the intersection of two rectangles, r1 and r2:**  
>**Make a rectangle (called ans) with**  
>>**left: maximum of r1's left and r2's left**  
>>**bottom: maximum or r1's bottom and r2's bottom**  
>>**right: minimum of r1's right and r2's right**  
>>**top: minimum of r1's top and r2's top**  
>
>**That rectangle called ans is your answer.**  



