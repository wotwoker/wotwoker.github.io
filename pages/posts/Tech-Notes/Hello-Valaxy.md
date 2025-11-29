---
title: Valaxy博客框架使用笔记
date: 2025-11-22
updated: 2025-11-22
categories: 技术笔记
tags:
  - valaxy
  - 笔记
---

>官方教程：[开始 - VALAXY](https://valaxy.site/guide/getting-started)  
>其他参考教程：[超可爱！使用 Valaxy 搭建自己的博客 - -Yuumi's Blog-](https://www.yuumi.link/posts/valaxy)  

## 在本地创建

按[官方教程](https://valaxy.site/guide/getting-started)安装好需要的包，并<span id="point1">创建模版项目</span>。  
进入创建好后的文件夹目录后，执行以下命令。 譬如：`cd valaxy-blog`。  
```bash
# install 安装依赖  
pnpm i  
# start 启动预览  
pnpm dev  
```
![image.png](https://s2.loli.net/2025/11/22/Fezc2KqaWkylXNd.png)

>输入 `r` 重新构建预览  
>输入 `o` 自动打开预览网页  
>输入 `e` 自动打开vscode编辑项目文件  

- `pages` 文件夹：存放页面/文章
- `valaxy.config.ts` Valaxy 配置文件
- `package.json` 记录依赖

## 使用Github部署
  
>[官方部署教程 - VALAXY](https://valaxy.site/guide/deploy)

>在使用 `pnpm create valaxy` [创建模版项目](#point1)时，已内置文件[`.github/workflows/gh-pages.yml`](https://github.com/YunYouJun/valaxy/blob/main/packages/create-valaxy/template-blog/.github/workflows/gh-pages.yml) 以实现 GitHub Actions 的自动部署工作流。
- 选择 Github Repo，打开 `Settings`-> `Action` -> `General` -> `Workflow permissions`，选择 `read and write permissions`。
- 上传至 GitHub Repo，打开 `Settings` -> `Pages`，选择 `gh-pages` 分支。
> `gh-pages` 已由 `.github/workflows/gh-pages.yml` 自动部署。
> 注意修改 `gh-pages.yml` 中的 `on.push.branches` 为你源代码所在的分支，默认为 `main`。

在本地文件夹下：  
```bash
# 1. 初始化仓库 (如果还没初始化过)
git init  

# 2. 关联远程仓库 (把链接换成你自己的)  
# git remote add origin https://github.com/你的用户名/你的用户名.github.io.git  
git remote add origin git@github.com:你的用户名/你的用户名.github.io.git # 需配置ssh  

# 3. 把所有文件加入暂存区  
git add .  

# 4. 提交  
git commit -m "first commit: blog init"  

# 5. 推送到 main 分支  
git branch -M main  
git push -u origin main  
```
“源码在 `main`，网页在 `gh-pages`。工作流会监听 `main` 的变动，然后把生成的网页发布到 `gh-pages`。”  
**以后的每一次更新（写文章、换头像、改配置），只需要做这“三板斧”：**  
```bash
git add .  
git commit -m "写了篇新文章"  
git push  
```

  
  
  

## 碎碎念