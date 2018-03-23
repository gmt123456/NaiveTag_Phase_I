/**
 * @Author: 高梦婷
 * @Description: 标记界面[filename]红色错误是编辑器的问题
 * @Date: Created in 2018/3/18
 */
var fileIndex = 0;
var filePath;//根据fileindex得到的filePath
var fileNum = 2;//总共多少file

var taskType = 100;

//初始化界面
window.onload = function () {
    //需要初始化的有：fileIndex(0)、filePath、fileNum(1)、和json数据：taskType、classes、description
    //例：
    localStorage.clear();

    taskType = 301;
    var classes = ["name1", "name2", "name3", "name4"];
    var description = "这是任务描述";

    fetchImg(fileIndex,1,function (xmlHttp) {
        var list=xmlHttp.responseText;
        console.log(list);
        filePath = list[0];
    })
    startTask(taskType, classes, description);

    /*
    $.getJSON("test.json",function(json){
        taskType = 401;

    });
*/
}


function save100(filename, labelname, index) {
    var value = {[filename]: {"label": labelname}};
    localStorage.setItem(index ,JSON.stringify(value));
}

function return100(content) {
    if(content == null){
        if(taskType == 100){
            pushCollapse();
        }
        else{
            addInputBox();
        }
    }else{
        var labelname = content["label"];
        if(taskType == 100){
            pushCollapse();
            var label = new Label(labelname,"noTagHead0-Label0_card-right-0");
            arrayright[0].addLabel(label.label);
        }else{
            addInputBox();
            boxArray[0].input.value = labelname;
        }
    }
}

function save200(filename, labelname, index, Rect) {
    var pos =  [Rect.x, (Rect.x+Rect.width), Rect.y, (Rect.y+Rect.height)];
    var value = {[filename]: {"label": labelname, "pos": pos}};
    localStorage.setItem(index, JSON.stringify(value));
}

function return200(content) {
    if(content == null){
        if(taskType == 201){
            addInputBox();
        }
    }else{
        var labelname = content["label"];
        var pos = content["pos"];
        if(taskType == 200){
            pushCollapse();
            var label = new Label(labelname,"noTagHead0-Label0_card-right-0");
            arrayright[0].addLabel(label.label);
        }else{
            addInputBox();
            boxArray[0].input.value = labelname;
        }
        var rect = new Rect(pos[0], pos[2], pos[1], pos[3]);
        arrayRect.push(rect);
        drawRect();
    }
}

function save300(filename, labelnameList, index, rectList, number) {
    var content = new Array();
    for(var i=0;i<number;i++){
        var Rect = rectList[i];
        var pos =  [Rect.x, (Rect.x+Rect.width), Rect.y, (Rect.y+Rect.height)];
        var item = {"label": labelnameList[i], "pos": pos};
        content.push(item);
    }
    var value = {[filename]: content};
    localStorage.setItem(index, JSON.stringify(value));
}

function return300(content) {
    if(content == null){
    }else{
        for(var i=0;i<content.length;i++){
            var item = content[i];
            var labelname = item["label"];
            var pos = item["pos"];
            if(taskType == 300){
                pushCollapse();
                var label = new Label(labelname,"noTagHead0-Label0_card-right-"+i);
                arrayright[i].addLabel(label.label);
            }else{
                addInputBox();
                boxArray[i].input.value = labelname;
            }
            var rect = new Rect(pos[0], pos[2], pos[1], pos[3]);
            alert(arrayRect.length);
            arrayRect.push(rect);
            drawRect();
        }

    }
}

function save400(filename, index, pointList, number) {
    var content = new Array();
    for(var i=0;i<number;i=i+2){
        var p1 = pointList[i];
        var p2 = pointList[i+1];
        var pos =  [p1.x, p1.y, p2.x, p2.y];
        content.push(pos);
    }
    var value = {[filename]: {"pos": content}};
    localStorage.setItem(index, JSON.stringify(value));
}


function return400(content) {
    if(content == null){
    }else{
        var pos = content["pos"];
        var polygon = new Polygon();
        for(var i in pos){
            var item = pos[i];
            var point1 = new Point(item[0],item[1]);
            var point2 = new Point(item[2],item[3]);
            polygon.set.push(point1);
            polygon.set.push(point2);
        }
        array.push(polygon);
        drawPolygon();
    }
}

function save401(filename, labelname, index, pointList, number) {
    var content = new Array();
    for(var i=0;i<number;i=i+2){
        var p1 = pointList[i];
        var p2 = pointList[i+1];
        var pos =  [p1.x, p1.y, p2.x, p2.y];
        content.push(pos);
    }
    var value = {[filename]: {"label": labelname, "pos": content}};
    localStorage.setItem(index, JSON.stringify(value));
}

function return401(content) {
    if(content == null){
    }else{
        var labelname = content["label"];
        var pos = content["pos"];
        var polygon = new Polygon();
        for(var i in pos){
            var item = pos[i];
            var point1 = new Point(item[0],item[1]);
            var point2 = new Point(item[2],item[3]);
            polygon.set.push(point1);
            polygon.set.push(point2);
        }
        array.push(polygon);
        drawPolygon();
        pushCollapse();
        var label = new Label(labelname,"noTagHead0-Label0_card-right-0");
        arrayright[0].addLabel(label.label);
    }
}

function returnData(Index) {
    var nothing = false;
    if (localStorage.getItem(Index) === null){
        nothing = true;
    }
    var content = null;
    if(!nothing){
        var json = JSON.parse(localStorage.getItem(Index));
        content = json[filePath];
    }
    //alert(JSON.stringify(content));
    //alert(localStorage.getItem(Index+""));
    switch (taskType){
        case 100:
            return100(content);
            break;
        case 101:
            return100(content);
            break;
        case 200:
            return200(content);
            break;
        case 201:
            return200(content);
            break;
        case 300:
            return300(content);
            break;
        case 301:
            return300(content);
            break;
        case 400:
            return400(content);
            break;
        case 401:
            return401(content);
            break;
        default:
            break;
    }

}

function startTask(taskID, arrayTag, description) {
    setTask(taskID);//选择任务类型
    setDescription(description);
    if(taskID==401){
        newCollapseLeft("标签", arrayTag);
    }else if(taskID==400){

    }else if(taskID % 2 ==0){
        newCollapseLeft("标签", arrayTag);
    }
    setPicture(filePath);
}


function setTask(taskID) {
    switch (taskID) {
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
            setTask400();
            break;
        case 401:
            setTask401();
            break;
        default:
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
    document.getElementById("choosetag").style.display="none";
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
    document.getElementById("choosetag").style.display="none";
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
    document.getElementById("choosetag").style.display="none";
}

function setTask401() {
    //对图片进行边界标
    hideButtonRect();
    document.getElementById("polygon").click();
}

function setTask400() {
    //对图片进行边界注
    stopCollapse = true;
    hideButtonRect();
    document.getElementById("polygon").click();
    document.getElementById("yourtag").style.display="none";
    document.getElementById("choosetag").style.display="none";
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
        document.getElementById("save").click();
        fileIndex = fileIndex - 1;
        filePath = "image/greenandblue.jpg";
        setPicture(filePath);
        delAll();
        returnData(fileIndex);

    }
})

$("#next").click(function () {
    if(fileIndex < fileNum - 1){
        document.getElementById("save").click();
        fileIndex = fileIndex + 1;
        filePath = "image/img_the_scream.jpg";
        setPicture(filePath);
        delAll();
        returnData(fileIndex);
    }
})

function delAll() {
    delCollapse();
    delInputBox();
    delPolygon();
    delRect();
}

function checkCollapse() {
    for(var i in arrayright){
        var collapse = arrayright[i];
        var labelArray = collapse.labelArray;
        if(labelArray.length === 0){
            return false;
        }else{
            return true;
        }
    }
}

function checkInputBox() {
    for(var i in boxArray){
        var inputbox = boxArray[i];
        if (inputbox.input.value === null || inputbox.input.value === ""){
            return false;
        }else{
            return true;
        }
    }
}

function checkRect(){
    if(arrayRect.length===0){
        return false;
    }else{
        return true;
    }
}

function checkPolygon() {
    if(array.length === 0){
        return false;
    }else{
        return true;
    }
}

$("#save").click(function () {
    switch (taskType){
        case 100:
            if(checkCollapse()){
                save100(filePath,arrayright[0].labelArray[0].name,fileIndex);
            }
            break;
        case 101:
            if(checkInputBox()){
                if(boxArray[0].input.value==""){
                    boxArray[0].input.setAttribute("style","box-shadow:0 0 8px rgba(255, 0,0,0.8);");
                }else{
                    boxArray[0].input.setAttribute("style","");
                    save100(filePath,boxArray[0].input.value,fileIndex);
                }
            }
            break;
        case 200:
            if(checkCollapse() && checkRect()){
                save200(filePath,arrayright[0].labelArray[0].name,fileIndex,arrayRect[0]);
            }
            break;
        case 201:
            if(checkInputBox() && checkRect()){
                if(boxArray[0].input.value==""){
                    boxArray[0].input.setAttribute("style","box-shadow:0 0 8px rgba(255, 0,0,0.8);");
                }else{
                    boxArray[0].input.setAttribute("style","");
                    save200(filePath,boxArray[0].input.value,fileIndex,arrayRect[0]);
                }
            }
            break;
        case 300:
            if(checkCollapse() && checkRect()){
                var labelnamelist = new Array();
                for(var i=0;i<arrayright.length;i++){
                    labelnamelist.push(arrayright[i].labelArray[0].name);
                }
                save300(filePath,labelnamelist,fileIndex,arrayRect,arrayRect.length);
            }
            break;
        case 301:
            if(checkInputBox() && checkRect()){
                var labelnamelist = new Array();
                for(var i=0;i<boxArray.length;i++){
                    labelnamelist.push(boxArray[i].input.value);
                }
                save300(filePath,labelnamelist,fileIndex,arrayRect,arrayRect.length);
            }
            break;
        case 400:
            if(checkPolygon()){
                var pointlist = array[0].set;
                var number = pointlist.length;
                if(number%2!=0){
                    pointlist.pop();
                    number--;
                }
                save400(filePath,fileIndex,pointlist,number);
            }
            break;
        case 401:
            if(checkPolygon()){
                var pointlist = array[0].set;
                var number = pointlist.length;
                if(number%2!=0){
                    pointlist.pop();
                    number--;
                }
                save401(filePath,arrayright[0].labelArray[0].name,fileIndex,pointlist,number);
            }
            break;
        default:
            break;
    }
})
