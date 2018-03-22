<%@ page contentType="text/html;charset=UTF-8" language="java" %><%--
  Created by IntelliJ IDEA.
  User: iznauy
  Date: 2018/3/19
  Time: 上午11:25
  To change this template use File | Settings | File Templates.
--%>
<html>
<head>
    <title>Title</title>
    <script src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <script>
        $(function () {
            var a = 161050084;
            var itemPerRow = 5;
            var item;
            var xmlHttp=new XMLHttpRequest();
            $("#img-container").append('<div class="img-row">');
            for (i = 0; i < 60; i++) {
                var src = "Images/image1/data/" + a + ".jpg";
                item = '<div class="img-box"><a href="index.htm"><img src="' + src + '"></a></div>';
                $("#img-container").append(item);
              
                a++;
            }

            xmlHttp.onreadystatechange=function () {
                if (xmlHttp.readyState==4&&xmlHttp.status==200){
                    console.log(xmlHttp.responseText);
                }
            }
            
            $('#loadPic').click(function () {
                xmlHttp.open("GET","/naive/dataList.html?index=1&count=2",true);
                xmlHttp.send();
            })
        })
    </script>
</head>
<body>
<div class="container" id="container">
    <div id="img-container">
    </div>

    <button id="loadPic" class="btn btn-primary">
        more
    </button>
</div>
</body>
</html>
