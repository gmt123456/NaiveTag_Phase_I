/**
 * @Author: 高梦婷
 * @Description:
 * @Date: Created in 2018/3/18
 */

var fileList = new Array();
var fileIndex = 0;

//初始化label
window.onload = function () {
    $.getJSON("test.json",function(json){
       // alert("JSON Data: " + json.task_type);
    });

    setTask(300);//选择任务类型
    var labellist1 = new Array("呆滞","开心","激动","无语","略略略");
    newCollapseLeft("心情", labellist1);
    setDescription("将小蓝圈出来，再把小绿圈出来:>");
    fileList.push("image/greenandblue.jpg");
    fileList.push("image/img_the_scream.jpg");
    setPicture(fileList[fileIndex]);
}

function setTask(taskID) {
    switch (taskID){
        case 100:
            setTask100();
            break;
        case 101:
            setTask101();
            break;
        case 200:
            setTask200();
            break;
        case 201:
            setTask201();
            break;
        case 300:
            setTask300();
            break;
        case 301:
            setTask301();
            break;
        case 400:
            setTask400()
            break;
        case 401:
            setTask401();
            break;
    }
}

function setTask100() {
    //对图片整体标
    stopCollapse = false;
    hideButtonRect();
    pushCollapse();
    hideButtonLine();
}

function setTask101() {
    //对图片整体注
    stopCollapse = true;
    hideButtonRect();
    addInputBox();
    hideButtonLine();
}

function setTask200() {
    //对图片单框标
    onlyOnce = true;
    hideButtonLine();
    document.getElementById("toggle").click();
}

function setTask201() {
    //对图片单框注
    onlyOnce = true;
    stopCollapse = true;
    addInputBox();
    hideButtonLine();
    document.getElementById("toggle").click();
}

function setTask300() {
    //对图片进行多框标
    onlyOnce = false;
    hideButtonLine();
    document.getElementById("toggle").click();
}

function setTask301() {
    //对图片进行多框注
    onlyOnce = false;
    useInputBox = true;
    hideButtonLine();
    document.getElementById("toggle").click();
}

function setTask400() {
    //对图片进行边界标
    hideButtonRect();
    document.getElementById("polygon").click();
}

function setTask401() {
    //对图片进行边界注
    useInputBox = true;
    hideButtonRect();
    document.getElementById("polygon").click();
}

function hideButtonRect() {
    document.getElementById("toggle").style.display="none";
    document.getElementById("backR").style.display="none";
}

function hideButtonLine() {
    document.getElementById("polygon").style.display="none";
    document.getElementById("backP").style.display="none";
}

function setDescription(text) {
    document.getElementById("description").innerHTML = text;
}

function setPicture(url) {
    canvas.style.backgroundImage = "url('" + url + "')";
}

$("#last").click(function () {
    if(fileIndex > 0){
        fileIndex = fileIndex - 1;
        setPicture(fileList[fileIndex]);
    }
})

$("#next").click(function () {
    if(fileIndex < fileList.length - 1){
        fileIndex = fileIndex + 1;
        setPicture(fileList[fileIndex]);
    }
})
