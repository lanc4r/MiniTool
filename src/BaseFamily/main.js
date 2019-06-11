
/**************************   UTF16 和 UTF8 互转   *****************************/
function utf16to8(str){

	var out, a, i;
	out = "";


	for (i = 0; i < str.length; i++){
		//alert(str.charCodeAt(i));
		a = str.charCodeAt(i);

		// 如果在 1-0x7F 之间，则不进行移位运算，if (a <= 0x7F) 最后写成如下这样
		if ((a >= 0x0001) && (a <= 0x007F)){
			out += str.charAt(i);
		}else if(a > 0x07FF){
			// 要进行三次移位运算
			out += String.fromCharCode(0xE0 | (a >> 12));
			out += String.fromCharCode(0x80 | ((a >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | (a & 0x3F));
		}else{
			out += String.fromCharCode(0xC0 | (a >> 6));
			out += String.fromCharCode(0x80 | (a & 0x3F));
		}
	}

	return out;

}

function utf8to16(str){
	var i, len, out, c1, c2, c3;
	i = 0; len = str.length; out = "";

	while (i < len){
		 if (str.charCodeAt(i) <= 0x7F){
		 	out += str.charAt(i);
		 	i++;
		 }else if (str.charCodeAt(i) > 0xE0){
		 	c1 = str.charCodeAt(i++);
		 	c2 = str.charCodeAt(i++);
		 	c3 = str.charCodeAt(i++);
		 	out += String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F));
		 }else{
		 	c1 = str.charCodeAt(i++);
		 	c2 = str.charCodeAt(i++);
		 	out += String.fromCharCode(((c1 & 0x1F) << 6) | (c2 & 0x3F));
		 }
	}

	return out;

}



/**************************   Base64 编解码   *****************************/
function base64Encode(str){
	var encode_str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var len, i, out, c1, c2, c3, c4;
	out = "";
	i = 0;
	len = str.length;

	while (i < len){
		c1 = str.charCodeAt(i++);
		// 判断 c1 是不是最后一个字符  i == len 判断 简单粗暴....  if (str.charCodeAt(i) == NaN)
		if (i == len){
			out += encode_str.charAt(c1 >> 2);
			out += encode_str.charAt((c1 & 0x03) << 4);
			out += "==";
			break;
		}
		out += encode_str.charAt(c1 >> 2);

		c2 = str.charCodeAt(i++);
		// 同样判断 c2 是不是最后一个字符
		if (i == len){
			out += encode_str.charAt(((c1 & 0x03) << 4) | (c2 >> 4));
			out += encode_str.charAt((c2 & 0x0F) << 2);
			out += "=";
			break;
		}
		out += encode_str.charAt(((c1 & 0x03) << 4) | (c2 >> 4));

		c3 = str.charCodeAt(i++);
		out += encode_str.charAt(((c2 & 0x0F) << 2) | (c3 >> 6));
		out += encode_str.charAt(c3 & 0x3F);
	}

	return out;

}

function base64Decode(str){

	var i, len, out, c1, c2, c3, c4;
	var decode_arr = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

	len = str.length;
	i = 0;
	out = "";

	while (i < len){
		c1 = decode_arr[str.charCodeAt(i++)];

		c2 = decode_arr[str.charCodeAt(i++)];

		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		c3 = decode_arr[str.charCodeAt(i++)];
		if (c3 == -1) break;
		out += String.fromCharCode(((c2 & 0x0F) << 4) | ((c3 & 0x3C) >> 2));

		c4 = decode_arr[str.charCodeAt(i++)];
		if (c4 == -1) break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | (c4 & 0x3F));
		
	}

	return out;
}



/**************************   Base32 编解码   *****************************/
function base32Encode(str){
	var out, len, i;
	var encode_str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

	len = str.length;
	i = 0;
	out = "";

	while(i < len){
		c1 = str.charCodeAt(i++);
		if (i == len){
			out += encode_str.charAt(c1 >> 3);
			out += encode_str.charAt((c1 & 0x07) << 2);
			out += "======";
			break;
		}
		out += encode_str.charAt(c1 >> 3);

		c2 = str.charCodeAt(i++);
		if (i == len){
			out += encode_str.charAt(((c1 & 0x03) << 2) | ((c2 & 0xC0) >> 6));
			out += encode_str.charAt((c2 & 0x3E) >> 1);
			out += encode_str.charAt((c2 & 0x01) << 4);
			out += "===="
			break;
		}
		out += encode_str.charAt(((c1 & 0x03) << 2) | ((c2 & 0xC0) >> 6));
		out += encode_str.charAt((c2 & 0x3E) >> 1);

		c3 = str.charCodeAt(i++);
		if (i == len){
			out += encode_str.charAt(((c2 & 0x01) << 4) | ((c3 & 0xF0) >> 4));
			out += encode_str.charAt((c3 & 0x0F) << 1);
			out += "===";
			break;
		}
		out += encode_str.charAt(((c2 & 0x01) << 4) | ((c3 & 0xF0) >> 4));

		c4 = str.charCodeAt(i++);
		if (i == len){
			out += encode_str.charAt(((c3 & 0x0F) << 1) | ((c4 & 0x80) >> 7));
			out += encode_str.charAt((c4 & 0x7C) >> 2);
			out += encode_str.charAt((c4 & 0x03) << 3);
			out += "=";
			break;
		}
		out += encode_str.charAt(((c3 & 0x0F) << 1) | ((c4 & 0x80) >> 7));
		out += encode_str.charAt((c4 & 0x7C) >> 2);

		c5 = str.charCodeAt(i++);
		out += encode_str.charAt(((c4 & 0x03) << 3) | ((c5 & 0xE0) >> 5));
		out += encode_str.charAt(c5 & 0x1F);
	}

	return out;
}

function base32Decode(str){
	var i, len, out;
	var decode_arr = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 26, 27, 28, 29, 30, 31, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);

	i = 0;
	len = str.length;
	out = "";

	while(i < len){
		c1 = decode_arr[str.charCodeAt(i++)];
		
		c2 = decode_arr[str.charCodeAt(i++)];
		out += String.fromCharCode((c1 << 3) | ((c2 & 0x1C) >> 2));

		c3 = decode_arr[str.charCodeAt(i++)];
		if (c3 == -1) break;
		c4 = decode_arr[str.charCodeAt(i++)];
		out += String.fromCharCode(((c2 & 0x03) << 6) | (c3 << 1) | ((c4 & 0x10) >> 4));

		c5 = decode_arr[str.charCodeAt(i++)];
		if (c5 == -1) break;
		out += String.fromCharCode(((c4 & 0x0F) << 4) | ((c5 & 0x1E) >> 1));

		c6 = decode_arr[str.charCodeAt(i++)];
		if (c6 == -1) break;
		c7 = decode_arr[str.charCodeAt(i++)];
		out += String.fromCharCode(((c5 & 0x01) << 7) | (c6 << 2) | ((c7 & 0x18) >> 3));

		c8 = decode_arr[str.charCodeAt(i++)];
		if (c8 == -1) break;
		out += String.fromCharCode(((c7 & 0x07) << 5) | c8);
	}

	return out;
}