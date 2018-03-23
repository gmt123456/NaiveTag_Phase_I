/**
 * Created by 陈俊宇 on 2018/3/22.
 *
 */


function fetchImg(beginIndex, footstep, func) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            func(xmlHttp);
        }
    };
    xmlHttp.open("GET", "/naive/dataList.html?beginIndex=" + beginIndex + "&footstep=" + footstep, true);
    xmlHttp.send();
    console.log("fetchImg");
}
var beginIndex = 0, footstep = 9;
$(function () {
    var a = 161050084;
    var itemPerRow = 5;
    var item;
    var responseResult;


    $('#loadPic').click(function () {
        console.log("click");
        fetchImg(beginIndex, footstep, function (xmlHttp) {
            responseResult = JSON.parse(xmlHttp.responseText);
            console.log(responseResult);
            addImg();
            beginIndex = beginIndex + footstep;
        })
    })

    $('#loadPic').trigger('click');

    bindFakeInput();

    $('#uploadForm').submit(function () {
        console.log("submit")
        loadOutput('dataSet');
    })

    function addImg() {
        console.log("add");
        for (var i = 0; i < responseResult.length; i++) {
            var src = responseResult[i];
            item = '<div class="img-box "><a href="index.htm"><img class="img-fluid" src="' + src + '"></a></div>';
            $("#img-container").append(item);
        }
    }

})