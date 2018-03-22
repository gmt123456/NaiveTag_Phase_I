/**
 * Created by 陈俊宇 on 2018/3/22.
 */

var beginIndex = 0, footstep = 9;
$(function () {
    var a = 161050084;
    var itemPerRow = 5;
    var item;
    var xmlHttp = new XMLHttpRequest();
    var responseResult ;

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            responseResult=JSON.parse(xmlHttp.responseText);
            console.log(responseResult);
            addImg();
            beginIndex=beginIndex+footstep;
        }
    }

    $('#loadPic').click(function () {
        xmlHttp.open("GET", "/naive/dataList.html?beginIndex=" + beginIndex + "&footstep=" + footstep, true);
        xmlHttp.send();

    })

    $('#loadPic').trigger('click');



    function addImg() {
        console.log("add");
        for (var i = 0; i < responseResult.length; i++) {
            var src = responseResult[i];
            item = '<div class="img-box"><a href="index.htm"><img src="' + src + '"></a></div>';
            $("#img-container").append(item);
        }
    }

})