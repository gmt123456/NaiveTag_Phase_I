<%--
  Created by IntelliJ IDEA.
  User: iznauy
  Date: 2018/3/19
  Time: 上午10:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>上传数据集</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/upload.js"></script>
</head>
<body>
<c:if test="${!empty error}">
    <p>错误：${error}，请重新上传</p>
</c:if>

<div id="uploadContainer" class="container">
    <form class="form-group" method="post" enctype="multipart/form-data" action="<c:url value="uploadCheck.html"/>">
        <input type="file" name="dataSet" id="dataSet" class="form-control" style="display: none" >
        <div class="border vertical-gap  input-group" >
            <input id="fakeFile" class=" form-control border-right-only " type="text">
            <div>
                <label class="text-center btn btn-link " onclick="$('input[id=dataSet]').click();">
                    选择
                </label>
            </div>
        </div>
        <input class="btn btn-primary btn-block" type="submit" value="上传"/>
    </form>

</div>
</body>
</html>
