腾讯云上传刷新工具。

# 安装

    npm install qcloud-upload-refresh

# 配置

首先，在项目根目录下新建文件`cdn.config.json`

    {
        "bucket": "",
        "region": "",
        "secretId": "",
        "secretKey": "",
        "cdnPath": "",
        "cdnDomain": "",
        "sourcePath": ""
    }

bucket、region、secretId、secretKey可以在腾讯云后台获取。
cdnPath：上传到bucket中的文件路径。
cdnDomain：cdn域名。
sourcePath：需要上传的文件夹相对路径。如：src/modules/assets。
上传到cdn后，文件访问路径就是：{cdnDomain}/{cdnPath}/{fileName}。

然后，在`package.json`中写入

    {
        "scripts": {
            "cdn": "node ./node_modules/qcloud-upload-refresh/index.js"
        }
    }

完成配置。

# 使用

每次上传cdn时，运行：

    npm run cdn


# 策略

* 上传到cdn的文件会立即执行url刷新。
* 重名文件会直接覆盖之前的文件。
* 本地删除文件，再执行上传命令，cdn会一直保留被删除的文件。


# 已解决

- [x] linux和windows跨平台问题。问题：由于两边的目录路径符号不同，腾讯云只支持linux目录，引发了windows平台不能上传的问题。
- [x] 上传后立即刷新。问题：由于cdn缓存问题，同名图片即使已经上传，cdn也不能立即更新，需要手动刷新。
- [x] 通用配置。
- [x] 支持多级目录。
- [x] 新版本的cos-nodejs-sdk-v5报错。——2018.06.20
- [x] 拒绝目录下的隐藏文件被上传，如.DS_Store文件等。——2018.06.21
