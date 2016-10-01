
var w = window.innerWidth - 10,
    h = window.innerHeight - 10;

var indexToVetPos = function (i) {
    return (h * 0.1 + (h * 0.8) * (i) / 7);
}

//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
                         .x(function (d) { return d.x; })
                         .y(function (d) { return d.y; })
                         .interpolate("linear");//linear,cardinal,monotone
var lineEdge = d3.svg.line()
                         .x(function (d) { return d.x; })
                         .y(function (d) { return d.y; })
                         .interpolate("linear");


class Graph {
    constructor()
    {
        this.Nodes = [];
        this.Edges = [];
        for (var i = 0; i < 8; i++) {
            this.Nodes[i] = { id: i, x: 50, y: indexToVetPos(i), r: 20, color: "white", Edges:[] };
        }
        for (var i = 0; i < (8-1); i++) {
            this.Edges[i] = { start: i, end: i + 1, path: [{ "x": 1, "y": 5 }, { "x": 20, "y": 20 }] };
        }
    }
    updateEdgesCoord() {//needed after update Nodes coord, use here edge nodes ids
        for (var i = 0; i < this.Edges.length; i++) {
            var startNode = this.Edges[i].start;
            var endNode = this.Edges[i].end;
            this.Edges[i].xs = this.Nodes[startNode].x;
            this.Edges[i].ys = this.Nodes[startNode].y;
            this.Edges[i].xe = this.Nodes[endNode].x;
            this.Edges[i].ye = this.Nodes[endNode].y;
        }
    }
    updateNode(index, x, y) {
        Nodes[index].x = x;
        Nodes[index].y = y;
        this.updateEdgesCoord();
    }
}

var graph = new Graph();

var Nodes = [];

for (var i = 0; i < 8; i++) {
    Nodes[i] = { id: i, x: 50, y: indexToVetPos(i), r: 20, color: "white" };
}

var CurrentMoved = null;
var CurrentMovedId = null;
document.onmousemove = function (e) {
    if (CurrentMoved != null)
    {
        CurrentMoved.attr("transform", "translate(" + e.pageX + "," + e.pageY + ")");
        graph.updateNode(CurrentMovedId, e.pageX, e.pageY);
        Nodes[CurrentMovedId].x = e.pageX;
        Nodes[CurrentMovedId].y = e.pageY;
        //The line SVG Path we draw
        svgo.select("path")
                                    .attr("d", lineFunction(Nodes))
                                    .attr("stroke", "blue")
                                    .attr("stroke-width", 2)
                                    .attr("fill", "none");
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



var MyMouseUp = function () {
    var g = d3.select(this);
    g.select("circle").style("fill", "blue");
    CurrentMoved = null;
    CurrentMovedId = null;
}

var MyMouseDown = function () {
    var g = d3.select(this);
    var c = g.select("circle");
    c.style("fill", "black");
    CurrentMoved = g;
    CurrentMovedId = g.datum().id;
}
var MyTouchDown = function () {
    var g = d3.select(this);
    var c = g.select("circle");
        c.style("fill", "green");
        if (CurrentMoved == null)//otherwise do not override
        {
            CurrentMoved = g;
            CurrentMovedId = g.datum().id;
        }
}


var r = h / 30;
if (r < 5) r = 5;
if (r > 30) r = 30;

svgo.selectAll("g").data(Nodes).enter().append("g")
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
    //.transition().duration(500)
    .attr("transform", function (d, i) { return "translate(50," + indexToVetPos(i) + ")"; })
;

//svgo.selectAll("path").data(Nodes).enter().append("path")
svgo.append("path")
                                .attr("d", lineFunction(Nodes))
                                .attr("stroke", "blue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");
//mousedown();

