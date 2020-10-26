<template>
  <svg width="1000" height="500">
  </svg>
</template>
<script>
  import * as d3 from 'd3';
  export default{
    name:'tree-graph',
    data(){
    return{}
    },
    mounted(){
      //定义边界
      var marge = {top:50, bottom:0, left:10, right:0};
    
      var svg = d3.select("svg");
      var width = svg.attr("width");
      var height = svg.attr("height");
      
      var g = svg.append("g")
        .attr("transform","translate("+marge.top+","+marge.left+")");
      
      var scale = svg.append("g")
        .attr("transform","translate("+marge.top+","+marge.left+")");
      //数据
      var dataset = {
        name:"中国",
        children:[
          {
            name:"浙江",
            children:[
              {name:"杭州" ,value:100},
              {name:"宁波",value:100},
                  {name:"温州",value:100},
                  {name:"绍兴",value:100}
            ]
          },
          {
            name:"广西",
            children:[
              {
                name:"桂林",
                children:[
                  {name:"秀峰区",value:100},
                        {name:"叠彩区",value:100},
                        {name:"象山区",value:100},
                        {name:"七星区",value:100}
                ]
              },
              {name:"南宁",value:100},
                  {name:"柳州",value:100},
                  {name:"防城港",value:100}
            ]
          },
          {
            name:"黑龙江",
            children:[
              {name:"哈尔滨",value:100},
                  {name:"齐齐哈尔",value:100},
                  {name:"牡丹江",value:100},
                  {name:"大庆",value:100}
            ]
          },
          {
            name:"新疆" , 
              children:
              [
                  {name:"乌鲁木齐"},
                  {name:"克拉玛依"},
                  {name:"吐鲁番"},
                  {name:"哈密"}
              ]
          }
        ]
      };

var hierarchyData = d3.hierarchy(dataset)
        .sum(function(d){
          return d.value;
        });
        //创建一个树状图
      var tree = d3.tree()
        .size([width-400,height-200])
        .separation(function(a,b){
          return (a.parent==b.parent?1:2)/a.depth;
        })

var treeData = tree(hierarchyData);

var nodes = treeData.descendants();
      var links = treeData.links();
      //输出节点和边
      console.log(nodes);
      console.log(links);

var Bézier_curve_generator = d3.linkHorizontal()
        .x(function(d) { return d.y; })
        .y(function(d) { return d.x; });

//绘制边
      g.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("d",function(d){
          var start = {x:d.source.x,y:d.source.y};
          var end = {x:d.target.x,y:d.target.y};
          return Bézier_curve_generator({source:start,target:end});
        })
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",1);

var gs = g.append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform",function(d){
          var cx = d.x;
          var cy= d.y;
          return "translate("+cy+","+cx+")";
        });

//绘制节点
      gs.append("circle")
        .attr("r",6)
        .attr("fill","white")
        .attr("stroke","blue")
        .attr("stroke-width",1);
        
      //文字
      gs.append("text")
        .attr("x",function(d){
          return d.children?-40:8;
        })
        .attr("y",-5)
        .attr("dy",10)
        .text(function(d){
          return d.data.name;
        })

  }
}
</script>
<style>
</style>