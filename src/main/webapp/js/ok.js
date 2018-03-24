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

}
var beginIndex = 0, footstep = 25;
$(function () {
    var homePageContent;
    var item;
    var responseResult;
    var idle;


    $('#loadPic').trigger('click');

    bindFakeInput();

    $('#uploadForm').submit(function () {
        loadOutput('dataSet');
        alert('upload');
        $('#img-container').empty();
        $('#img-container').append("新的页面");
    })

    function fecthAndAddImg() {
        idle = false;
        fetchImg(beginIndex, footstep, function (xmlHttp) {
            responseResult = JSON.parse(xmlHttp.responseText);
            console.log(responseResult);
            addImg();
            if (responseResult.length == footstep)
                idle = true;
        })
    }

    fecthAndAddImg();

    $(window).scroll(function () {
        var htmlHeight = document.body.scrollHeight;
        var clientHeight = document.body.clientHeight;
        var scrollTop = document.body.scrollTop;
        if (scrollTop + clientHeight > htmlHeight - 200 && idle) {
            fecthAndAddImg();

        }
    })

    $('#loadHistoryPic').click(function () {
        homePageContent= $('#img-container').children();
        $('#img-container').empty();
        $('#temp').load('load.html', function () {
            var history=JSON.parse($('#temp').text());
            sessionStorage.tagJSon=$('#temp').text();
            for (var key in history){
                addImgItem('',key);
            }
            console.log("tagJSon"+ sessionStorage.tagJSon);
        });



    })

    $('.img-box').click(function () {
        console.log("img-box click");
    })




    $('#homePage').click(function () {
        $('#img-container').empty();
        console.log(homePageContent);
        $('#img-container').append(homePageContent);
    })

    function addImg() {
        for (var i = 0; i < responseResult.length; i++) {
            var src = responseResult[i];
            addImgItem(beginIndex,src, i);
            beginIndex++;
        }
    }

    function addImgItem(index,src, i) {
        item = '<div class="img-box "><a id=' + i + ' href="index.htm?' + index + '"><img class="img-fluid" src="' + src + '"></a></div>';
        $("#img-container").append(item);
    }

})