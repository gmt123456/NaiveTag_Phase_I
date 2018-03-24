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
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/bootstrap-grid.css">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/popper.js/1.12.5/umd/popper.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
    <script src="js/loadoutput.js"></script>
    <script src="js/upload.js"></script>
    <script src="js/ok.js"></script>



</head>
<body>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
    <ul class="navbar-nav" >
        <li class="nav-item">
            <a class="nav-link" id="loadHistoryPic" data-toggle="modal" data-target="#chooseFileModal" >查看历史标注</a>
        </li>
    </ul>
</nav>

<div id="container">
    <div id="img-container" class="top-margin img-container">
    </div>

    <div class="modal fade" id="chooseFileModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- 模态框头部 -->
                <div class="modal-header">
                    <label class="mx-auto">选择历史文件</label>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- 模态框主体 -->

                <div id="modalBody" class="modal-body">
                    <form id="uploadForm" class="form-group" method="post" enctype="multipart/form-data">
                        <input type="file" name="dataSet" id="dataSet" class="form-control" style="display: none" >
                        <div class="border vertical-gap  input-group" >
                            <input id="fakeFile" class=" form-control border-right-only " type="text">
                            <div>
                                <label class="text-center btn btn-link " onclick="$('input[id=dataSet]').click();">
                                    选择
                                </label>
                            </div>
                        </div>
                        <input class="btn btn-primary btn-block" type="submit" value="确定"/>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <div id="attempt">
    </div>
</div>


</body>
</html>
