<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bootstrap 4, from LayoutIt!</title>

    <meta name="description" content="Source code generated using layoutit.com">
    <meta name="author" content="LayoutIt!">

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

</head>
<body>



<div class="container-fluid">
    <div class="row">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">

            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">1</a>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">2 <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">3</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" href="http://example.com"
                           data-toggle="dropdown">Dropdown link</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">4</a> <a class="dropdown-item" href="#">Another action</a> <a
                                class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider">
                            </div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                </ul>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="text">
                    <button class="btn btn-primary my-2 my-sm-0" type="submit">
                        Search
                    </button>
                </form>
                <ul class="navbar-nav ml-md-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Link <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" href="http://example.com"
                           data-toggle="dropdown">Dropdown link</a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Action</a> <a class="dropdown-item" href="#">Another
                            action</a> <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider">
                            </div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>


</div>

<%
    List<String> picList = (List<String>)session.getAttribute("pic");
    String url = session.getAttribute("filePath").toString();
    for (String pic: picList) {
        out.println("<img alt=\"ok\" src=\"/NaiveTag_Phase_I" + url + pic + "\">");
    }
%>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>