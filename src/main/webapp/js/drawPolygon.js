/**
 * Created by 陈俊宇 on 2018/3/18.
 */
function Rect(x, y, x1, y1) {
    this.x = x;
    this.y = y;
    this.width = Math.abs(x1 - x);
    this.height = Math.abs(y1 - y);
}
function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Polygon() {
    this.set = new Array();
}

$(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var newOne = false;
    var x = 0;
    var y = 0;
    var count = 0;
    var polygon;
    var array = new Array();


    $('#canvas').mousedown(function (e) {
        isDrawing = true;
        x = e.offsetX;
        y = e.offsetY;
        polygon = new Polygon();

    }).mouseup(function (e) {
        isDrawing = false;
        polygon.set.push(new Point(e.offsetX, e.offsetY));
        array.push(polygon);
        drawPolygon();
        console.log("points " + polygon.set.length);
    }).mousemove(function (e) {
        if (isDrawing) {
            count++;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            polygon.set.push(new Point(e.offsetX, e.offsetY));
        } else {
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }
    });


    function drawPolygon() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (value in array) {
            var set = array[value].set;
            ctx.beginPath();
            ctx.moveTo(set[0].x, set[0].y);
            for (v in set) {
                ctx.lineTo(set[v].x, set[v].y)
            }
            //ctx.closePath();
            ctx.fillStyle = 'rgba(0,191,255,0.6)';
            ctx.fill();
        }
    }

    $("#back").click(function () {
        array.pop();
        drawRect();
    })
})