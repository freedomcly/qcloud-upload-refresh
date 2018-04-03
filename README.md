qcloud upload and refresh.

# 安装

    npm install qcloud-upload-refresh

# 配置

首先，在项目根目录下新建文件`cdn.config.js`

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