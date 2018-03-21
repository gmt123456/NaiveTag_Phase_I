/**
 * Created by 陈俊宇 on 2018/3/18.
 */

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

$(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var disable = true;
    var x = 0;
    var y = 0;
    var array = new Array();
    var index;              //被选中的矩形在array中的索引


    $('#canvas').mousedown(function (e) {
        if (!disable) {
            isDrawing = true;
            newOne = true;
            x = e.offsetX;
            y = e.offsetY;
        }

    }).mouseup(function (e) {
        if (!disable) {
            isDrawing = false;
            array.push(new Rect(x, y, e.offsetX, e.offsetY));
            pushCollapse();//added by gmt in 2018/3/18
        }
    }).mousemove(function (e) {
        if (isDrawing && !disable) {
            drawRect();
            ctx.strokeRect(x, y, e.offsetX - x, e.offsetY - y);
            drawText(array.length + 1 + "", x, y);//added by gmt in 2018/3/19
        }
    }).click(function (e) {
        if (disable) {
            if (findRect(e.offsetX, e.offsetY, 5)) {
                drawRect();

            } else {
                index = -1;
            }
            console.log("index= " + index);
        }

    });

    function findRect(x, y, tolerance) {
        for (v in array) {
            var item = array[v];
            if (onRect(x, y, item)) {
                index = v;
                console.log("v= " + v);
                return true;
            }
        }
        return false;
    }

    function drawRect() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var value in array) {
            var rect = array[value];
            if (value === index) {
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
        disable = !disable;
        index = -1;
        drawRect();

        if(!disable){//added by gmt in 2018/3/19
            document.getElementById("toggle").setAttribute("class","btn active btn-block btn-outline-primary");
        }else
            document.getElementById("toggle").setAttribute("class","btn btn-block btn-outline-primary");
    })

    /**
     * next created by gmt in 2018/3/19
     */
    function drawText(text, x, y) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#0275d8";
        ctx.fillText(text+"", x, y);
    }

    $("#back").click(function () {
        array.pop();
        drawRect();
        popCollapse();//added by gmt in 2018/3/18
    })
})