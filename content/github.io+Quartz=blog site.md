---
title: 基于github.io以及Quartz项目的个人博客搭建小白教程
description: 主页
tags:
  - 技术
date: 2025-10-12
---
## 准备工作
1. 安装 Node.js，同时安装npm，自行搜索最新的安装以及配置教程。我是参考了[2025版 Node.js 下载安装及环境配置详细教程【保姆级】_nodejs2025淘宝镜像](https://blog.csdn.net/m0_66434421/article/details/147276925))，Quartz 4 项目对 Node 的版本要求比较高，至少需要 `v22`的版本，可上官网确认([Welcome to Quartz 4](https://quartz.jzhao.xyz/))
2. 安装git，自行搜索教程，可参考[Git - 安装 Git](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
3. github账号，自行注册。

## 1. Github仓库与ssh设置
### 1.1 创建github仓库
官方的模板仓库地址为：[https://github.com/jackyzha0/quartz](https://github.com/jackyzha0/quartz)
我们可以直接`Fork`或者`Use this template`创建一个新仓库，需要先登录自己的 Github 账号再进行操作。如下图，这个建议用`Use this template`（用一个全新的、独立的仓库来快速启动一个新项目，且不包含原有的提交历史）。

![use this template](https://s2.loli.net/2025/10/12/2b4claKSdnF3kDJ.png)


然后进入下图界面，在 `Repository name` 输入框里，输入 `你的用户名.github.io`。（**注意**：必须严格按照这个格式，例如，如果你的用户名是 `xxx`，那么仓库名就是 `xxx.github.io`。）
选择 `Public` (公开)，然后点击 `Create repository` 创建仓库。

![新建仓库](https://s2.loli.net/2025/10/12/cvlzF7TdH1NUnKI.png)
### 1.2 配置 SSH 密钥
具体可看这这官方教程：[新增 SSH 密钥到 GitHub 帐户 - GitHub 文档](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
如下图所示，按照里面的这三步来就行，得到ssh密匙后，上github个人设置界面进行添加即可。

![image.png](https://s2.loli.net/2025/10/12/QC8fwiyvARZ5cs1.png)
![image.png](https://s2.loli.net/2025/10/12/SYHAN945clmFjEh.png)

## 2. 搭建你的本地博客
在你的电脑上找一个合适的位置，打开终端。

![image.png](https://s2.loli.net/2025/10/12/y4joe8xu2htVKbM.png)

依次输入以下指令来下载你仓库里的 Quartz 的模板代码
```bash
git clone https://github.com/你的用户名/你的用户名.github.io.git
cd 你的用户名.github.io
npm install
npx quartz create
```
![如图所示](https://s2.loli.net/2025/10/12/nycgQPbCzG91vXd.png)


## 3. 在本地运行和写作
运行以下命令，启动一个本地的开发服务器：
```bash
npx quartz build --serve
```
然后得到这个网址http://localhost:8080，如下图所示，按住`Ctrl`然后鼠标点击进去，就能预览你的网站了

![image.png](https://s2.loli.net/2025/10/12/jQtKa5lAi3XZGgf.png)

你的所有博客文章都存放在 `content` 目录下，可以使用 Markdown 格式（`.md` 文件）来撰写你的文章。目前项目本身自带的这个index.md的文件就是你的主页。
尝试修改 `content/index.md` 文件，保存后，本地预览的网页会自动刷新，就能看到修改后的效果在 `content` 目录下创建新的 `.md` 文件，每个文件都会成为一个新的页面。

## 4. 配置和部署到 GitHub Pages
### 4.1 配置部署脚本
打开项目里的 `.github/workflows/ `文件夹，在这里新建一个`deploy.yml`文件，填入以下内容。
```yml
name: Deploy Quartz site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22 # 使用兼容最新 Quartz 的 Node.js 版本
          cache: "npm"
      - name: Install dependencies
        run: npm install
      - name: Build Quartz
        run: npx quartz build # 关键！运行构建命令
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public # 关键！只上传构建好的 public 文件夹

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4.2 连接本地项目到你的 GitHub 仓库
回到你的终端（确保在你的项目文件夹内）运行以下指令：
```bash
git remote remove origin #先移除项目自带的旧远程地址
git remote set-url origin git@github:你的用户名/你的用户名.github.io.git #添加你自己的仓库地址（使用 SSH 格式）
git branch -M main #将主分支命名为 `main`
```
### 4.3 **设置 GitHub Actions 用于自动部署**:
在你的 GitHub 仓库页面，点击 **"Settings"** -> **"Pages"**。
在 "Build and deployment" 下的 "Source" 部分，选择 **"GitHub Actions"**。

### 4.4 部署推送到博客站
使用标准的“三步曲”来完成首次发布。
```bash
# 第一步：添加你做的所有修改
git add .
# 第二步：创建一个提交记录
git commit -m "Initial commit: Setup Quartz blog"
# 第三步：推送到 GitHub
git push origin main
```

在你项目的Actions界面看到绿色的勾，说明部署成功了，你可以通过`https://你的用户名.github.io/`，来访问你的网站。
![image.png](https://s2.loli.net/2025/10/12/xcEld7kbH4ISvr1.png)

>如果显示部署失败，可以点进详情页，把错误信息反馈给AI，可能需补充几个设置，然后重新部署即可。
