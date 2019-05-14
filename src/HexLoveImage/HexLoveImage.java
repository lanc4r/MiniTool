package HexLoveImage;

import java.io.*;

/**
 * 此类用于 十六进制数据 和 图片数据的转换
 */

public class HexLoveImage {

    public static void main(String[] args) {

        // 测试
        String sourceImageAddr = "a.jpg";
        String destinationImageAddr = "a-copy.jpg";

        String hexStr = image2Hex(sourceImageAddr);
        System.out.println("hexStr: " + hexStr);
        hex2Image(hexStr.toUpperCase(), destinationImageAddr);
    }

    // 传入图片地址，返回十六进制数据
    /**
     * 标记：后期可以设计从多种途径获取图片数据，包括但不仅限于：
     *  1. 本地文件
     *  2. Url 获取二进制数据
     *
     * @param imgAddr
     *      本地文件的图片地址
     */
    public static String image2Hex(String imgAddr){
        try{
            StringBuffer sb = new StringBuffer();
            FileInputStream fis = new FileInputStream(imgAddr);
            BufferedInputStream bis = new BufferedInputStream(fis);
            java.io.ByteArrayOutputStream bos = new java.io.ByteArrayOutputStream();

            byte[] buff = new byte[1024];
            int len = 0;
            while((len = fis.read(buff)) != -1){
                bos.write(buff,0, len);
            }

            byte[] result = bos.toByteArray();
            String str = byteData2Hex(result);
            return str;
        }catch(IOException e){
            e.printStackTrace();
            return null;
        }
    }

    // 二进制数据转换为十六进制字符串
    private static String byteData2Hex(byte[] data){
        if (data == null || data.length <= 0) {
            return null;
        }

        StringBuilder stringBuilder = new StringBuilder("");
        for (int i = 0; i < data.length; i++) {
            int v = data[i] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }

    /**
     * 将十六进制数据保存成本地文件，注意 imageAddr 包含文件的后缀，具体什么类型的文件需要自己指定
     *
     * @param hexData
     *      十六进制数据
     * @param imageAddr
     *      本地图片路径
     */
    public static void hex2Image(String hexData, String imageAddr){

        if(hexData == null || hexData.length() == 0){
            return;
        }

        try{
            FileOutputStream out = new FileOutputStream(new File(imageAddr));
            byte[] bytes = hexData.getBytes();
            for(int i = 0; i < bytes.length; i += 2){
                out.write(charToInt(bytes[i]) * 16 + charToInt(bytes[i+1]));
            }
            out.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    // 二进制数据转换为十进制数值
    private static int charToInt(byte ch){
        int val = 0;
        if(ch >= 0x30 && ch <= 0x39){
            val = ch - 0x30;
        }else if(ch >= 0x41 && ch <= 0x46){
            val = ch - 0x41 + 10;
        }
        return val;
    }
}


