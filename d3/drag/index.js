
var w = window.innerWidth - 10,
    h = window.innerHeight - 10;

var CurrentMoved = null;
document.onmousemove = function (e) {
    if (CurrentMoved != null)
    {
        CurrentMoved.attr("transform", "translate(" + e.pageX + "," + e.pageY + ")");
    }
}

document.ontouchmove = function (ev) {
    if (CurrentMoved != null)
    {
        if (ev.touches.length > 0)
        {
            CurrentMoved.attr("transform", "translate(" + ev.touches[0].pageX + "," + ev.touches[0].pageY + ")");
        }
    }
}

document.ontouchstart = function (ev) {
    if (CurrentMoved != null) {
        if (ev.touches.length > 0) {
            console.log("Document Touch start");
        }
    }
}

var color = d3.scale.category10();

d3.select("body").style("background-color", "white");
	
var svgo = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
	.append("g")
    .attr("transform", "translate(5,5)");

var Buttons = [];
for(var i=0;i<8;i++)
{
    Buttons[i] = { id: 0, x: 10, y: 10, r: 20, color: "white" };
}

var indexToVetPos = function(i)
{
    return (h * 0.1 + (h * 0.8) * (i) / 7);
}

var MyMouseUp = function () {
    var g = d3.select(this);
    g.select("circle").style("fill", "blue");
    CurrentMoved = null;
}

var MyMouseDown = function () {
    var g = d3.select(this);
    g.select("circle").style("fill", "black");
    CurrentMoved = g;
}
var MyTouchDown = function () {
    var g = d3.select(this);
    g.select("circle").style("fill", "green");
    if (CurrentMoved == null)//otherwise do not override
        CurrentMoved = g;
    console.log("My Touch Down");
}


var r = h / 30;
if (r < 5) r = 5;
if (r > 30) r = 30;

svgo.selectAll("g").data(Buttons).enter().append("g")
        .on("mousedown", MyMouseDown)
        .on("touchstart", MyTouchDown)
        .on("mouseup", MyMouseUp)
        .on("touchend", MyMouseUp)
        .append("circle")
        .attr("r", r)
        .style("fill", "purple")
        .style("stroke", "#000")
        .style("stroke-width", "2px")
        .attr("onmouseover", "evt.target.setAttribute('opacity', '0.5');")
        .attr("onmouseout", "evt.target.setAttribute('opacity', '1');")
        //.attr("onmousedown", function (d, i) { return MyMouseDown(d,i) })
;

    svgo.selectAll("g")
        .transition().duration(500)
        .attr("transform", function (d, i) { return "translate(50," + indexToVetPos(i) + ")"; })
    ;

//mousedown();

