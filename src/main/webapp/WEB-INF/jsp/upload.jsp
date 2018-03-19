<%--
  Created by IntelliJ IDEA.
  User: iznauy
  Date: 2018/3/19
  Time: 上午10:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"
    pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>上传数据集</title>
</head>
<body>
    <c:if test="${!empty error}">
        <p>错误：${error}，请重新上传</p>
    </c:if>
    <h1>选择您的数据集</h1>
    <form method="post" enctype="multipart/form-data" action="<c:url value="uploadCheck.html"/>">
        选择一个文件：
        <input type="file" name="dataSet" /><br/>
        <input type="submit" value="上传" />
    </form>
</body>
</html>
