# HexLoveImage

将图片的二进制数据 和 十六进制的数据进行转换，主要方法如下：

- image2Hex(String imgAddr)
- hex2Image(String hexData, String imageAddr)

## image2Hex

将图片数据转换为十六进制字符串，入参为图片地址。

### 注意
当前只支持从本地图片地址读取数据，后期会考虑支持输入网络地址。