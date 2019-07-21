
// 判断当前浏览器是否支持 FileReader 对象
if(typeof FileReader == 'undefined'){
	result.InnerHTML="<p>你的浏览器不支持接口，下个 Chrome 吧！</p>";
	//使选择控件不可操作  
	file.setAttribute("disabled","disabled");
}

// 存储用户导入的数据
var dataArr = new Array();

// 与随机的逻辑有关
var randomIndex = 0;				// 得到随机的下标值
var intervalalue = 0;				// 保存 setInterval() 函数返回值
var currentRandomFlag;				// 当前已循环的次数
var totalRandomCount;				// 允许循环的次数
var viewNum;
var randomButton;					// 循环按钮

// 结果容器相关
var resultContainer;							// 最外层结果显示区域
var viewContainerName = "view_container_";		// 结果显示容器名称前缀
var viewContainerCount = 0;						// 结果显示容器的数量
var viewContainerFlag = 0;						// 当前显示出来的容器容器标识

// 定义四个显示区域
var importDataView;
var chooseRandonCountView;
var randomView;
var chooseNextOptionView;
// 增加图片容器
var imageDataView;

function $(id){
	return document.getElementById(id);
}

// 页面加载完成初始化相应数据
window.onload = function (){
	importDataView = $("import_data");
	chooseRandonCountView = $("choose_random_count");
	randomView = $("random");
	chooseNextOptionView = $("choose_next_option");
	viewNum = $("view_num");
	imageDataView = $("image_data");
	// 获取结果显示容器
	resultContainer = $('resultContainer');
	// 随机按钮
	randomButton = $("chick_button");
}


function changeMsgColorBefore(obj){
	var msg_a = $(obj.id);
	msg_a.style.color = "red";
}


function changeMsgColorBefore2(obj){
	var msg_a = $(obj.id);
	msg_a.style.color = "gray";
}

function changeMsgColorAfter(obj){
	var msg_a = $(obj.id);
	msg_a.style.color = "black";
}

function readAsText(){  
	var file = document.getElementById("file").files[0];  
	var reader = new FileReader();  
	//将文件以文本形式读入页面  
	reader.readAsText(file);  
	reader.onload=function(f){  
		$("data").innerHTML = this.result; 
    } 
}  


// 加载字符串到全局变量
function initData(){
	dataArr = $("data").innerHTML.split("\n");
	// 初始化结果容器相关数据，将当前显示容器和容器总数都置为1
	viewContainerFlag = 1;
	viewContainerCount = 1;

	setViewShowAndHide(chooseRandonCountView, importDataView);
}


// 加载选择的次数
function initNum(){
	currentRandomFlag = 0;
	totalRandomCount = parseInt($("random_count").value);
	setViewShowAndHide(randomView, chooseRandonCountView);
}



// 开始进行 接下来开始 随机抽取数字了，let we go

// 获取随机的一个值，然后返回这个值，并且让其在数组中删除掉
function controllLoop(){
	if (randomButton.value == "Run"){
		if (currentRandomFlag == totalRandomCount){
			exitLoop();
			return ;
		}
		intervalValue = window.setInterval("startLoop()", 50);
		randomButton.value = "Stop";
	} else if (randomButton.value == "Stop"){
		window.clearInterval(intervalValue);
		afterLoop();
		randomButton.value = "Run";
	}

}


// 循环开始的地方
function startLoop(){
	// 执行随机逻辑——得到一个随机的下标值
	randomIndex = Math.floor(Math.random() * dataArr.length);
	//temp_value = num_arr[randomIndex];
	viewNum.innerHTML = dataArr[randomIndex];
}

// 保存 之前得到的那个随机值到 HTML 页面中，并且将对应的下标在数组中删除
function afterLoop(){
	// 获取显示容器中的 div 结果显示区域
	var viewContainerId = viewContainerName + viewContainerFlag;
	var viewContainer = $(viewContainerId);
	var resultView = viewContainer.childNodes.item(1);
	// 存放显示标记位，让后将其添加到容器中
	createResultViewer(resultView, dataArr[randomIndex]);
	// 删除数组中的当前位置元素
	dataArr.splice(randomIndex, 1);
	// 之前设置循环次数的标识，不能丢
	currentRandomFlag++;
}

// 退出循环，到达循环次数的时候退出循环
function exitLoop(){
	setViewShowAndHide(chooseNextOptionView, randomView);
	viewNum.innerHTML = "";
}


// 创建结果显示容器，并返回当前的容器
/*
* id —— 容器的ID属性值
*/
function createResultViewContainer(id){
	// 创建新的元素节点 —— 外层 Div
	var divContainer = document.createElement('div');
	divContainer.setAttribute("id", id);

	// 为 Div 增加第一个孩子节点 span，用于标识当前的结果显示容器
	var spanContainer = document.createElement('span');
	spanContainer.setAttribute("style", "color: gray; margin-left: 38%; margin-top: 2%; font-family: 'cuteFont'; font-size: 20px;");
	// 后面注意这个 viewContainerFlag 是否能够对得上
	spanContainer.innerHTML = "Group-" + viewContainerFlag;
	divContainer.appendChild(spanContainer);

	// 增加一个 div 用去存取结果
	var divResultView = document.createElement('div');
	divResultView.setAttribute("id", "view");
	divContainer.appendChild(divResultView);

	// 添加当前容器到显示区域中
	resultContainer.appendChild(divContainer);
}

// 创建结果显示器，展示随到的结果
/*
* obj —— 结果显示容器
* resultVal —— 结果值
*/
function createResultViewer(obj, resultVal){
	var spanViewer = document.createElement('input');
	spanViewer.setAttribute("type", "text");
	spanViewer.setAttribute("readonly", "readonly");
	spanViewer.setAttribute("size", "13");
	spanViewer.setAttribute("class", "num");
	spanViewer.setAttribute("value", resultVal);
	obj.appendChild(spanViewer);
}




// 这里表示 选择的 [x] 个数字已经抽取完了，接下来提示需要重新来 还是继续抽取

// 如果选择继续我们需要 ：跳到 第二个 页面，重新选择一次 抽取个数，然后 将显示的 部分 修改为最近一个 显示为 none 的 页面
function chooseContinue(){

	// 1. 隐藏当前显示的
	var viewContainerId = viewContainerName + viewContainerFlag;
	$(viewContainerId).style.display = "none";

	// 2. 新增一个结果显示容器，并将之前的所有容器都显示
	viewContainerId = viewContainerName + (++viewContainerFlag);
	createResultViewContainer(viewContainerId);
	// 容器总数+1
	viewContainerCount++;		

	// 跳转到 第二个页面，重新选择一下 抽取的个数

	setViewShowAndHide(chooseRandonCountView, chooseNextOptionView);

	// 再 重新初始化一下 flag，并且需要重新设置 input 的 id,这个后面有时间其实可以设置为 使用 js 动态生成，感觉这样比较好啊
	currentRandomFlag = 1;
}



// 如果选择 重新来，我们就清除 目前的哪些全局遍历数据、以及显示部分的哪些数据 （这个写一个清理函数，然后跳转到 第一个页面( block 和 none 的区别)）
function chooseRestart(){
	location.reload();
}

// 向前翻页的逻辑：
// 如果当前的页数大于 1，即可向前翻页
// 将 前一个的容器显示为 block，然后将当前的容器设置为 none
function beforeViewDiv(){
	if (viewContainerFlag > 1){
		var closeContainerId = viewContainerName + (viewContainerFlag);
		var openContainerId = viewContainerName + (--viewContainerFlag);
		setViewShowAndHide($(openContainerId), $(closeContainerId));
	}
}


// 向后翻页的逻辑：
// 如果当前的页数小于容器个数，即可向前后页
// 将 后一个的容器显示为 block，然后将当前的容器设置为 none
function nextViewDiv(){
	if (viewContainerFlag < viewContainerCount){
		var closeContainerId = viewContainerName + (viewContainerFlag);
		var openContainerId = viewContainerName + (++viewContainerFlag);
		setViewShowAndHide($(openContainerId), $(closeContainerId));
	}
}

// 设置元素的 style 的 显示和隐藏
function setViewShowAndHide(showView, hideView){
	showView.style.display = "block";
	hideView.style.display = "none";
}


/*****************************************  二期增加图片的操作  ******************************************************/
function showImageView(){
	// 除了导入图片区域，区域区域全部隐藏
	setViewShowAndHide(imageDataView, importDataView);
	setViewShowAndHide(imageDataView, chooseRandonCountView);
	setViewShowAndHide(imageDataView, randomView);
	setViewShowAndHide(imageDataView, chooseNextOptionView);
}

function fileSelect1(e){
	var files = e.files;

	// 新的逻辑将上传的图片添加到一个框中
	var boxs = $("boxs");

	//var show = $('img-box');
	for (var i=0; i<files.length; ++i){

		// 循环将每一张图片设置为
		var reader = new FileReader();
		reader.onload = (function (file){
			return function(e){
				//var img = document.createElement('img');
				//img.setAttribute("src", this.result);
				//img.setAttribute("class", "cover-img");
				//show.appendChild(img);
				createImg(this.result, boxs);
			};
		})(files[i]);
		reader.readAsDataURL(files[i]);
		console.log(files[i]);
	}
}

// 传入 base64 编码的数值，生成一个图片 div，并将其添加到父节点中
function createImg(content, parent){
	var img = document.createElement('img');
	img.setAttribute("src", content);

	var divDelete = document.createElement('div');
	divDelete.innerHTML = "x";
	divDelete.setAttribute("class", "delete");
	divDelete.addEventListener("click", function (){
		removeImg(this);
	});
	//divDelete.setAttribute("onclick", "removeImg(this);");

	var div = document.createElement('div');
	div.setAttribute("class", "box");

	div.appendChild(img);
	div.appendChild(divDelete);
	parent.appendChild(div);

	/*
	var img = $("<img src=" + content + ">");
	var divDelete = $("<div class='delete' onclick='removeImg(this);'>x</div>");
	var div = $("<div class='box'></div>");
	div.append(img);
	div.append(divDelete);
	parent.append(div);*/
}

function removeImg(obj){
	//$(obj).parent().remove();
	//  妈耶，真的服了 JS，难写得一批
	obj.parentNode.parentNode.removeChild(obj.parentNode)
}

