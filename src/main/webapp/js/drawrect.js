/**
 * Created by 陈俊宇 on 2018/3/18.
 */

var stopCollapse = false;
var onlyOnce = false;
var useInputBox = false;

function popThingsRight() {
    if(useInputBox){
        popInputBox()
    }else{
        popCollapse();
    }
}
function pushThingsRight() {
    if(useInputBox){
        addInputBox()
    }else{
        pushCollapse();

    }
}

function Rect(x, y, x1, y1) {
    this.x = Math.min(x, x1);
    this.y = Math.min(y, y1);
    this.width = Math.abs(x1 - x);
    this.height = Math.abs(y1 - y);
}
function Point(x, y) {
    this.x = x;
    this.y = y;
}

var disableRect = true;

//$(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var isDrawingRect = false;

    var xRect = 0;
    var yRect = 0;
    var arrayRect = new Array();
    var indexRect;              //被选中的矩形在array中的索引


    $('#canvas').mousedown(function (e) {
        if (!disableRect) {
            isDrawingRect = true;
            newOne = true;
            xRect = e.offsetX;
            yRect = e.offsetY;
        }

    }).mouseup(function (e) {
        if (!disableRect) {
            isDrawingRect = false;
            if(onlyOnce){//added by gmt in 2018/3/21
                if(arrayRect.length > 0){
                    arrayRect.pop();
                    popThingsRight();
                }
            }
            arrayRect.push(new Rect(xRect, yRect, e.offsetX, e.offsetY));
            if(!stopCollapse){//added by gmt in 2018/3/18
                pushThingsRight();
            }
            drawRect();//added by gmt in 2018/3/21
        }
    }).mousemove(function (e) {
        if (isDrawingRect && !disableRect) {
            drawRect();
            ctx.strokeRect(xRect, yRect, e.offsetX - xRect, e.offsetY - yRect);
            drawText(arrayRect.length + 1 + "", xRect, yRect);//added by gmt in 2018/3/19
        }
    }).click(function (e) {
        if (disableRect) {
            if (findRect(e.offsetX, e.offsetY, 5)) {
                drawRect();
                onclickcollapse("card-right-" + indexRect);//added by gmt in 2018/3/21
            } else {
                indexRect = -1;
            }

            console.log("index= " + indexRect);
        }

    });

    function findRect(x, y, tolerance) {
        for (v in arrayRect) {
            var item = arrayRect[v];
            if (onRect(x, y, item)) {
                indexRect = v;
                console.log("v= " + v);
                return true;
            }
        }
        return false;
    }

    function drawRect() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var value in arrayRect) {
            var rect = arrayRect[value];
            if (value === indexRect) {
                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
                ctx.restore();
            } else
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

            drawText(parseInt(value) + 1, rect.x, rect.y);//added by gmt in 2018/3/19
        }
    }

    function onRect(x, y, rect) {
        return onEdge(x, y, rect.x, rect.y, rect.x, rect.y + rect.height) ||
            onEdge(x, y, rect.x, rect.y, rect.x + rect.width, rect.y) ||
            onEdge(x, y, rect.x, rect.y + rect.height, rect.x + rect.width, rect.y + rect.height) ||
            onEdge(x, y, rect.x + rect.width, rect.y, +rect.x + rect.width, rect.y + rect.height);
    }

    function onEdge(x, y, x1, y1, x2, y2) {
        var distance;
        var tolerance = 3;    //允许误差
        console.log("x =" + x + "y = " + y + "x1 =" + x1 + "y1 =" + y1 + "x2 =" + x2 + "y2 = " + y2);
        if (x1 === x2 && y < Math.max(y1, y2) + tolerance && y > Math.min(y1, y2) - tolerance) {
            distance = Math.abs(x - x1);
        } else if (y1 === y2 && x < Math.max(x1, x2) + tolerance && x > Math.min(x1, x2) - tolerance) {
            distance = Math.abs(y - y1);
        }
        console.log("distance" + distance);

        if (distance < tolerance)
            return true;
        else
            return false;
    }


    $("#toggle").click(function () {
        disableRect = !disableRect;
        index = -1;
        drawRect();

        if(!disableRect){//added by gmt in 2018/3/19
            document.getElementById("toggle").setAttribute("class","btn active btn-block btn-outline-primary");
        }else
            document.getElementById("toggle").setAttribute("class","btn btn-block btn-outline-primary");
    })

    /**
     * next created by gmt in 2018/3/19
     */
    function drawText(text, x, y) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ff0000";
        ctx.fillText(text+"", x, y);
    }

    $("#backR").click(function () {
        arrayRect.pop();
        drawRect();
        if(!stopCollapse){
            popThingsRight();//added by gmt in 2018/3/18
        }

    })
//})
