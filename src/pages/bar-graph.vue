<template>
  <svg width="1000" height="500">
  </svg>
</template>
<script>
  import * as d3 from 'd3';
  export default{
    name:'bar-graph',
    data(){
    return{}
    },
    mounted(){
      //定义数据
      const data =[
      { letter: '一', frequency: 0.08167 },
      { letter: '二', frequency: 0.13492 },
      { letter: '三', frequency: 0.02782 },
      { letter: '四', frequency: 0.04253 },
      { letter: '五', frequency: 0.12702 },
      { letter: '六', frequency: 0.02288 },
      { letter: '日', frequency: 0.22288 }]
      //定义位置与边长等数据
      let margin = {top:50,right:50,bottom:50,left:50}
      let rawWidth = 1000
      let rawHeight = 500
      let width = rawWidth - margin.right - margin.left
      let height = rawHeight - margin.top - margin.bottom
      let barWidth = width / data.length * 0.9
      //
      let stepArray = d3.ticks(0,d3.max(data,d=>d.frequency),10)
      console.log(stepArray)
      let colors = ['#ccc', '#ddd']

      let svg = d3.select("svg").attr("height",rawHeight).attr("width",rawWidth)

      let x = d3
        .scaleBand()
        .range([0,width])
        .padding(0.1)
        .domain(data.map(d=>d.letter))

      let y = d3
        .scaleLinear()
        .range([height,0])
        .domain([0,d3.max(data,d=>d.frequency)])

      let g = svg
        .append("g")
        .attr("transform","translate("+margin.top+","+margin.left+")")

      g.append("g")
        .attr("transform","translate(0,"+height+")")
        .call(d3.axisBottom(x))

      g.append("g")
        .call(d3.axisLeft(y).ticks(10,"%"))

      g.append("g")
        .selectAll("rect")
        .data(d3.range(stepArray.length-1))
        .enter()
        .append("rect")
        .attr("strock","none")
        .attr("width",width)
        .attr("height",(d,i)=>y(stepArray[i])-y(stepArray[i+1]))
        .attr("fill",(d,i)=>colors[i%2])
        .attr("y",(d,i)=>y((i+1)*stepArray[1]))
        .attr("x",1)

      g.append("g")
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr('fill', '#8a2be2')
        .attr("class","bar")
        .attr("y",height)
        .attr("x",(d,t)=>x(d.letter))
        .attr("width",x.bandwidth())
        .attr("height",0)
        .transition()
        .ease(d3.easeBounceInOut)
        .duration(200)
        .delay((d,t)=>200*t)
        .attr("y",(d,t)=>y(d.frequency))
        .attr("height",(d,t)=>height-y(d.frequency))

      g.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d=>(d.frequency*100).toFixed(2)+"%")
        .attr("fill","orange")
        .attr("text-anchor","middle")
        .attr("x",d=>x(d.letter))
        .attr("y",d=>y(d.frequency))
        .attr("font-size","14px")
        .attr("dx",barWidth/2)
        .attr("dy","14px")

      svg.append("g")
        .append("text")
        .text("简单柱状图")
        .attr("x",rawWidth/2)
        .attr("y",30)
        .attr("font-size","26px")
        .attr("font-weight","700")
        .attr("text-anchor","middle")
        .attr("fill","black")
  }
}


</script>
<style>
</style>