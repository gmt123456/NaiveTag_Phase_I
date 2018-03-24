/**
 * @Author: 高梦婷
 * @Description: 标记界面[filename]红色错误是编辑器的问题
 * @Date: Created in 2018/3/18
 */
var fileIndex = 1;
var filePath;//根据fileindex得到的filePath
var jsonString = undefined;//需要加载的json文件字符串格式

var taskType = 300;


var arrayKeyN;
var arrayKey = new Array();
//初始化界面
window.onload = function () {
    //需要初始化的有：fileIndex(1)、filePath、jsonString、和jsontask数据：taskType、classes、description

    //sessionStorage.clear();

    //例：
/*
    jsonString="{\n" +
        "  \"Images/image1/data/161050086.jpg\":\n" +
        "  [\n" +
        "    {\"label\":\"name3\",\n" +
        "    \"pos\":[97,151,254,337]}\n" +
        "  ]\n" +
        ",\"Images/image1/data/161050085.jpg\":\n" +
        "[\n" +
        "  {\"label\":\"name4\",\"pos\":[444,684,121,288]}\n" +
        ",{\"label\":\"name2\",\"pos\":[164,236,207,336]}\n" +
        "]\n" +
        "}";
*/
    jsonString = sessionStorage.tagJSon;
    //alert(typeof(jsonString));
    //alert(jsonString);
    if(jsonString === "undefined"){
        //alert("undfin"+jsonString);
        fileIndex = parseInt(window.location.search.replace("?", ""));

        fetchImg(fileIndex, 1, function (xmlHttp) {
            var list = xmlHttp.responseText;
            console.log(list);
            filePath = JSON.parse(list)[0];
            setAndStartJsonTask(findTaskUrl());
            loadJsonData();
            console.log(jsonString);
        })
    }else{
        alert("history!");
        fileIndex = 0;
        for(var i in JSON.parse(jsonString)){
            arrayKey.push(i);
        }
        arrayKeyN = arrayKey.length;
        filePath = arrayKey[fileIndex];
        alert("yes"+filePath);
        setAndStartJsonTask(findTaskUrl());
        loadJsonData();
    }
    //alert(window.location.search.replace("?",""));
    //alert(typeof(fileIndex));
    //alert(fileIndex);

    /*
     function sleep(d) {
     for (var t = Date.now(); Date.now() - t <= d;);
     }

     $.getJSON("test.json",function(json){
     taskType = 401;

    */
    alert("taskType"+taskType);

}

function getfilePath() {
    //在拥有json文件时从这里得到filePath
    return arrayKey[fileIndex];
}

function findTaskUrl() {
    var length = filePath.length;
    var num = 0;
    var i;
    for(i = length-1;num<2;i--){
        if(filePath[i] === "/"){
            num++;
        }
    }
    var url = filePath.substr(0,i+2)+"task.json";
    return url;
}

function setAndStartJsonTask(url) {
    $.getJSON(url,function(json){
        taskType = json.taskType;
        var classes = json.classes;
        var description = json.description;
        startTask(taskType, classes, description);

    })
}

function save100(filename, labelname, index) {
    var value = {[filename]: {"label": labelname}};
    sessionStorage.setItem(index, JSON.stringify(value));
}

function return100(content) {
    if (content == null) {
        if (taskType == 100) {
            pushCollapse();
        }
        else {
            addInputBox();
        }
    } else {
        var labelname = content["label"];
        if (taskType == 100) {
            pushCollapse();
            var label = new Label(labelname, "noTagHead0-Label0_block-card-right-0");
            arrayright[0].addLabel(label.label);
            //alert(arrayright[0].labelArray[0].label.getAttribute("onclick"));
        } else {
            addInputBox();
            boxArray[0].input.value = labelname;
        }
    }
}

function save200(filename, labelname, index, Rect) {
    var pos = [Rect.x, (Rect.x + Rect.width), Rect.y, (Rect.y + Rect.height)];
    var value = {[filename]: {"label": labelname, "pos": pos}};
    sessionStorage.setItem(index, JSON.stringify(value));
}

function return200(content) {
    if (content == null) {
        if (taskType == 201) {
            addInputBox();
        }
    } else {
        var labelname = content["label"];
        var pos = content["pos"];
        if (taskType === 200) {
            pushCollapse();
            var label = new Label(labelname, "noTagHead0-Label0_block-card-right-0");
            arrayright[0].addLabel(label.label);
        } else {
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
    for (var i = 0; i < number; i++) {
        var Rect = rectList[i];
        var pos = [Rect.x, (Rect.x + Rect.width), Rect.y, (Rect.y + Rect.height)];
        var item = {"label": labelnameList[i], "pos": pos};
        content.push(item);
    }
    var value = {[filename]: content};
    sessionStorage.setItem(index, JSON.stringify(value));
}

function return300(content) {
    if (content == null) {
    } else {
        for (var i = 0; i < content.length; i++) {
            var item = content[i];
            var labelname = item["label"];
            var pos = item["pos"];
            if (taskType == 300) {
                pushCollapse();
                var label = new Label(labelname, "noTagHead0-Label0_block-card-right-" + i);
                arrayright[i].addLabel(label.label);
            } else {
                addInputBox();
                boxArray[i].input.value = labelname;
            }
            var rect = new Rect(pos[0], pos[2], pos[1], pos[3]);
            arrayRect.push(rect);
            drawRect();
        }

    }
}

function save400(filename, index, pointList, number) {
    var content = new Array();
    for (var i = 0; i < number; i = i + 2) {
        var p1 = pointList[i];
        var p2 = pointList[i + 1];
        var pos = [p1.x, p1.y, p2.x, p2.y];
        content.push(pos);
    }
    var value = {[filename]: {"pos": content}};
    sessionStorage.setItem(index, JSON.stringify(value));
}


function return400(content) {
    if (content == null) {
    } else {
        var pos = content["pos"];
        var polygon = new Polygon();
        for (var i in pos) {
            var item = pos[i];
            var point1 = new Point(item[0], item[1]);
            var point2 = new Point(item[2], item[3]);
            polygon.set.push(point1);
            polygon.set.push(point2);
        }
        array.push(polygon);
        drawPolygon();
    }
}

function save401(filename, labelname, index, pointList, number) {
    var content = new Array();
    for (var i = 0; i < number; i = i + 2) {
        var p1 = pointList[i];
        var p2 = pointList[i + 1];
        var pos = [p1.x, p1.y, p2.x, p2.y];
        content.push(pos);
    }
    var value = {[filename]: {"label": labelname, "pos": content}};
    sessionStorage.setItem(index, JSON.stringify(value));
}

function return401(content) {
    if (content == null) {
    } else {
        var labelname = content["label"];
        var pos = content["pos"];
        var polygon = new Polygon();
        for (var i in pos) {
            var item = pos[i];
            var point1 = new Point(item[0], item[1]);
            var point2 = new Point(item[2], item[3]);
            polygon.set.push(point1);
            polygon.set.push(point2);
        }
        array.push(polygon);
        drawPolygon();
        addInputBox();
        boxArray[0].input.value = labelname;
    }
}

function returnData(Index) {
    var nothing = false;
    if (sessionStorage.getItem(Index) === null) {
        nothing = true;
        loadJsonData();
    }
    var content = null;
    if (!nothing) {
        var json = JSON.parse(sessionStorage.getItem(Index));
        content = json[filePath];
    }
    //alert(JSON.stringify(content));
    //alert(sessionStorage.getItem(Index+""));
    switch (taskType) {
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
    if (taskID == 401 || taskID == 400) {
    } else if (taskID % 2 == 0) {
        newCollapseLeft("标签", arrayTag);
    }
    alert(filePath);
    setPicture(filePath);
    alert("success");
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
    document.getElementById("choosetag").style.display = "none";
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
    document.getElementById("choosetag").style.display = "none";
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
    document.getElementById("choosetag").style.display = "none";
}

function setTask400() {
    //对图片进行边界
    stopCollapse = true;
    hideButtonRect();
    document.getElementById("polygon").click();
    document.getElementById("yourtag").style.display = "none";
    document.getElementById("choosetag").style.display = "none";
}

function setTask401() {
    //对图片进行边界注
    useInputBox = true;
    onlyOnce = true;
    hideButtonRect();
    document.getElementById("polygon").click();
    document.getElementById("yourtag").style.display = "none";
    document.getElementById("choosetag").style.display = "none";
}

function hideButtonRect() {
    document.getElementById("toggle").style.display = "none";
    document.getElementById("backR").style.display = "none";
}

function hideButtonLine() {
    document.getElementById("polygon").style.display = "none";
    document.getElementById("backP").style.display = "none";
}

function setDescription(text) {
    document.getElementById("description").innerHTML = text;
}

function setPicture(url) {
    canvas.style.backgroundImage = "url('" + url + "')";
}

$("#last").click(function () {
    if (checkAll()) {
        if (fileIndex > 0) {
            saveWeb();
            //alert("beforefet:fileIndex:"+fileIndex);
            fileIndex = fileIndex - 1;
            if(jsonString === "undefined"){
                fetchImg(fileIndex, 1, function (xmlHttp) {
                    var list = xmlHttp.responseText;
                    console.log(list);
                    filePath = JSON.parse(list)[0];
                    changePicData(fileIndex);
                });
            }else{
                filePath = getfilePath();
                changePicData(fileIndex);
            }

            //alert("afterfet:fileIndex:"+fileIndex);
            //sleep(5000);

        }
    }
})

function changePicData(fileIndex) {
    setPicture(filePath);
    delAll();
    returnData(fileIndex);
}

$("#next").click(function () {
    if (checkAll()) {
        if(jsonString === "undefined"){
            saveWeb();
            fileIndex = fileIndex + 1;
            fetchImg(fileIndex, 1, function (xmlHttp) {
                var list = xmlHttp.responseText;
                console.log(list);
                filePath = JSON.parse(list)[0];
                changePicData(fileIndex);
            });
        }else{
            if (fileIndex < arrayKeyN) {
                saveWeb();
                fileIndex = fileIndex + 1;
                filePath = getfilePath();
                changePicData(fileIndex);
            }
        }

    }
})

function delAll() {
    delCollapse();
    delInputBox();
    delPolygon();
    delAllRect();
}

function checkAll() {
    var success = true;
    switch (taskType) {
        case 100:
            success = checkCollapse();
            break;
        case 101:
            success = checkInputBox();
            break;
        case 200:
            success = checkCollapse() && checkRect();
            break;
        case 201:
            success = checkInputBox() && checkRect();
            break;
        case 300:
            success = checkCollapse() && checkRect();
            break;
        case 301:
            success = checkInputBox() && checkRect();
            break;
        case 400:
            success = checkPolygon();
            break;
        case 401:
            success = checkInputBox() && checkPolygon();
            break;
        default:
            break;
    }
    return success;
}

function checkCollapse() {
    for (var i in arrayright) {
        var collapse = arrayright[i];
        var labelArray = collapse.labelArray;
        if (labelArray.length === 0) {
            return false;
        } else {
            return true;
        }
    }
}

function checkInputBox() {
    for (var i in boxArray) {
        var inputbox = boxArray[i];
        if (inputbox.input.value === null || inputbox.input.value === "") {
            return false;
        } else {
            return true;
        }
    }
}

function checkRect() {
    if (arrayRect.length === 0) {
        return false;
    } else {
        return true;
    }
}

function checkPolygon() {
    if (array.length === 0) {
        return false;
    } else {
        return true;
    }
}

function saveWeb() {
    switch (taskType) {
        case 100:
            save100(filePath, arrayright[0].labelArray[0].name, fileIndex);
            break;
        case 101:
            if (boxArray[0].input.value == "") {
                boxArray[0].input.setAttribute("style", "box-shadow:0 0 8px rgba(255, 0,0,0.8);");
            } else {
                boxArray[0].input.setAttribute("style", "");
                save100(filePath, boxArray[0].input.value, fileIndex);
            }
            break;
        case 200:
            save200(filePath, arrayright[0].labelArray[0].name, fileIndex, arrayRect[0]);
            break;
        case 201:
            if (boxArray[0].input.value == "") {
                boxArray[0].input.setAttribute("style", "box-shadow:0 0 8px rgba(255, 0,0,0.8);");
            } else {
                boxArray[0].input.setAttribute("style", "");
                save200(filePath, boxArray[0].input.value, fileIndex, arrayRect[0]);
            }
            break;
        case 300:
            var labelnamelist = new Array();
            for (var i = 0; i < arrayright.length; i++) {
                labelnamelist.push(arrayright[i].labelArray[0].name);
            }
            save300(filePath, labelnamelist, fileIndex, arrayRect, arrayRect.length);
            break;
        case 301:
            var labelnamelist = new Array();
            for (var i = 0; i < boxArray.length; i++) {
                labelnamelist.push(boxArray[i].input.value);
            }
            save300(filePath, labelnamelist, fileIndex, arrayRect, arrayRect.length);
            break;
        case 400:
            var pointlist = array[0].set;
            var number = pointlist.length;
            if (number % 2 != 0) {
                pointlist.pop();
                number--;
            }
            save400(filePath, fileIndex, pointlist, number);
            break;
        case 401:
            var pointlist = array[0].set;
            var number = pointlist.length;
            if (number % 2 != 0) {
                pointlist.pop();
                number--;
            }
            save401(filePath, boxArray[0].input.value, fileIndex, pointlist, number);
            break;
        default:
            break;
    }
}


function delAllRect() {
    //删除全部矩形
    for (; arrayRect.length > 0;) {
        arrayRect.pop();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function delCollapse() {
    //删除全部手风琴
    cardbodyright.innerHTML = "";
    for (; arrayright.length > 0;) {
        arrayright.pop();
    }
}

function delPolygon() {
    //删除全部线条
    for (; array.length > 0;) {
        array.pop();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function delInputBox() {
    //删除全部输入框
    cardbodyright.innerHTML = "";
    for (; boxArray.length > 0;) {
        boxArray.pop();
    }
}

function loadJsonData() {
    //加载json标记数据
    if(jsonString === "undefined" || jsonString.length == 0){
    }else{
        var jsonfileStr = JSON.parse(jsonString);
        var content = jsonfileStr[filePath];
        var json = {[filePath]:content};
        sessionStorage.setItem(fileIndex,JSON.stringify(json));
        returnData(fileIndex);
    }
}

var arrayString;

var startI;
var endI;
$("#save").click(function () {
    if (checkAll()) {
        saveWeb();
        var arrayJson = new Array();
        for(endI =  fileIndex;sessionStorage.getItem(index) != null;endI++){
        }
        for(startI = fileIndex;sessionStorage.getItem(index) != null;startI--){
            console.log(startI);
        }
        for(var index = startI;index<=endI;index++){
            var s = sessionStorage.getItem(index);
            arrayJson.push(s.substr(1,s.length-2));
        }

        arrayString = "{"+arrayJson.join(",")+"}";

        console.log("arrayString" +arrayString);
        $('#fakeSaveResult').val(arrayString);
        $('#saveForm').submit(alert('save'));
        $('#fakeSave').click();

    }
})