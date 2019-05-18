package ImageLoveQRCode;

import com.boat.visualqrcode.VisualQRCode;
import java.awt.Color;

import java.io.IOException;

public class ImageLoveQrcode {

    public static void main(String[] args) {

        // 二维码中需要隐藏的地址
        String content = "https://chllan.cc";
        // 背景图片地址，目前只支持文件系统读取，后续会支持从网络流中读取
        String bgImgSource = "source.jpg";
        // 输出的图片地址
        String targetImg = "target.png";
        // Color 类用于指定二维码颜色(R、G、B)
        Color color = new Color(2, 85, 43);
        createQrcode(bgImgSource, targetImg, content, color);
        System.out.println("ok~");
    }

    /**
     * 创建二维码
     *
     * @param bgImgSource
     *            背景图片地址
     * @param content
     *            二维码隐藏的内容
     */
    public static void createQrcode(String bgImgSource, String targetImg, String content, Color color) {
        try {
            VisualQRCode.createQRCode(content, bgImgSource, targetImg, 'H', color, null, null, 449, true,
                    VisualQRCode.POSITION_DETECTION_SHAPE_MODEL_RECTANGLE, VisualQRCode.FILL_SHAPE_MODEL_CIRCLE);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
