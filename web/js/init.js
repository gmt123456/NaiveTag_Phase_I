
//初始化label
window.onload = function () {
    var labellist1 = new Array("呆滞","开心","激动","无语","略略略");
    newCollapseLeft("心情", labellist1);
    var labellist2 = new Array("蓝色","绿色","灰不拉几","黄不拉几");
    newCollapseLeft("颜色", labellist2);
    var labellist3 = new Array("他们是情侣","你是单身狗","他们都是男的");
    newCollapseLeft("属性", labellist3);
}


//拖拽代码
function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    //如果复制被拖拽的标签则使用下面的代码：
    //ev.target.appendChild(document.getElementById(data).cloneNode(true));
    ev.target.appendChild(document.getElementById(data));
}
