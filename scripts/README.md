## 上传文件到阿里云OSS
### 用法
#### 1. 指定具体的文件名或者通配符,文件目录基于项目根目录
```
// 指定一个或者多个文件
npm run upload xxx.png
npm run upload xxx.png yyy.jpg
npm run upload assets/xxx.jpeg
npm run upload xxx.png yyy.jpg assets/xxx.jpeg

// 支持 通配符
npm run assets/**/*.jpg
npm run assets/imgs/*

// 文件目录暂不支持，防止上传过多文件
npm run upload assets ❎ 

```
上传结果为
```
你所上传的文件路径为:  [ '/Users/bjhl/Documents/work/mp-scaffold-template/home.jpeg' ]
上传成功!
请及时保存文件地址: https://hks.gsxcdn.com/mp/assets/home.jpeg
```

