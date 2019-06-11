# BaseFamily

Base全家桶

## 简介

手动撸 Base全家桶编码，涉及 Base64、Base32、Base16。

## 使用方法

使用前请先将字符转为 UTF-8 编码，如果你是 UTF-16 编码的字符，可以使用 `utf16to8()` 方法转换，Like This：

```javascript
var str = 'biubiubiu';
console.log(base64Encode(utf16to8(str)));
``` 

## 待完成

- [] Base16 编码
- [] Java 实现版本