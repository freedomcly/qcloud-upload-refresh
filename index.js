const path = require('path')
const dir = require('node-dir')
const cosSdk = require('cos-nodejs-sdk-v5')
const qcloudSDK = require('qcloud-cdn-node-sdk')
const cdnConfig = require('../../cdn.config.json')

const {bucket, region, secretId, secretKey, cdnPath, cdnDomain, sourcePath} = cdnConfig
const base = path.resolve(__dirname, `../../${sourcePath}`)

const cos = new cosSdk({
  SecretId: secretId,
  SecretKey: secretKey
})

qcloudSDK.config({secretId, secretKey})

dir.files(base, (err, files) => {
  if (err) return console.error(err)
  return files.forEach((file, index) => {
    // for cross platform: windows and linux
    const key = file.replace(base, cdnPath).split(path.sep).join('/')
    const tempArr = key.split('/')
    const fileName = tempArr.slice(2).join('/')

    if (fileName.slice(0, 1) === '.') {
      console.log('refuse upload')
      console.log(`${file}`)
      return
    }

    cos.sliceUploadFile({
      Bucket: bucket,
      Region: region,
      Key: key,
      FilePath: file
    }, (err) => {
      if (err) {
        console.log(err)
        return
      }

      qcloudSDK.request('RefreshCdnUrl', {
        'urls.0': `${cdnDomain}/${cdnPath}/${fileName}`,
      }, (res) => {
        console.log('cdn upload and refresh success')
        console.log(`${cdnDomain}/${cdnPath}/${fileName}`)

      })
    })
  })
})
