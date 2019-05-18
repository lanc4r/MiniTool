package ImageLoveQRCode;

import com.boat.visualqrcode.VisualQRCode;
import java.awt.Color;

import java.io.IOException;

public class ImageLoveQrcode {

    public static void main(String[] args) {

        String content = "https://chllan.cc"; // 二维码中隐藏的数据
        String bgImgSource = "source.jpg";
        String targetImg = "target.png";
        createQrcode(bgImgSource, targetImg, content);
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
    public static void createQrcode(String bgImgSource, String targetImg, String content) {
        try {
            VisualQRCode.createQRCode(content, bgImgSource, targetImg, 'H', new Color(2, 85, 43), null, null, 449, true,
                    VisualQRCode.POSITION_DETECTION_SHAPE_MODEL_RECTANGLE, VisualQRCode.FILL_SHAPE_MODEL_CIRCLE);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
