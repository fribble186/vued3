<template>
  <svg width="1000" height="500">
  </svg>
</template>
<script>
  import * as d3 from 'd3';
  export default{
    name:'pie-graph',
    data(){
    return{}
    },
    mounted(){
      const data =[
      { age: '<5', population: 2704659 },
      { age: '5-13', population: 4499890 },
      { age: '14-17', population: 2159981 },
      { age: '18-24', population: 3853788 },
      { age: '25-44', population: 14106543 },
      { age: '45-64', population: 8819342 },
      { age: '≥65', population: 612463 }]
      const containerWidth = 1000
      const margin = { top: 80, right: 60, bottom: 80, left: 60 }
      const width = containerWidth - margin.left - margin.right
      const height = 600 - margin.top - margin.bottom

      let chart = d3
        .select("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      const radius = Math.min(width, height) / 2
      const sumData = d3.sum(data, function(d){return d.population})
      let colors = d3
        .scaleOrdinal()
        .range([
          '#98abc5',
          '#8a89a6',
          '#7b6888',
          '#6b486b',
          '#a05d56',
          '#d0743c',
          '#ff8c00'
        ])
      colors.domain(d3.map(data, function(d) {return d.age}).keys())
      let g = chart
        .append('g')
        .attr('transform','translate(' +(width / 2 + margin.left) +',' +(margin.top + radius) +')')
      let arc = d3
        .arc()
        .innerRadius(0)
        .padAngle(0)
      let startPointArc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 10)
      let percentLabelArc = d3
        .arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 60)

      let populationLabelArc = d3
        .arc()
        .outerRadius(radius + 40)
        .innerRadius(radius + 40)
      let pie = d3
        .pie()
        .sort(null)
        .value(function(d) {return d.population})
      const arcs = pie(data)
      g.selectAll('.arc')
        .data(arcs)
        .enter()
        .append('path')
        .attr('cursor', 'pointer')
        .attr('class', 'arc')
        .attr('stroke', function(d) {return colors(d.data.age)})
        .style('fill', function(d) {return colors(d.data.age)})
        .each(function(d) {
          let tem = { ...d, endAngle: d.startAngle }
          d.outerRadius = radius - 10
          this._currentData = tem
        })
        .on('mouseover', arcTween(radius + 20, 0))
        .on('mouseout', arcTween(radius - 10, 150))
        .transition()
        .duration(100)
        .delay(function(d, i) {return i * 100})
        .attrTween('d', function(next) {
          var i = d3.interpolate(this._currentData, next)
          this._currentData = i(0)
          return function(t) {return arc(i(t))}
        })

      let linkLine = g.append('g')
      let links = []
      arcs.forEach(function(d) {
        const startPoint = startPointArc.centroid(d)
        const endPoint = populationLabelArc.centroid(d)
        links.push({
          source: [startPoint[0], startPoint[1]],
          target: [endPoint[0], endPoint[1]]
        })
      })

      linkLine
        .selectAll()
        .data(links)
        .enter()
        .append('path')
        .attr('class', 'link-line')
        .style('stroke', '#999')
        .style('stroke-width', 1)
        .attr('fill', 'none')
        .attr('d',d3
          .linkHorizontal()
          .source(function(d) {
            return d.source
          })
          .target(function(d) {
            return d.target
          })
        )

      let label = g.append('g')

      arcs.forEach(function(d) {
        const c = percentLabelArc.centroid(d)
        label
          .append('text')
          .attr('class', 'age-text')
          .attr('fill', '#cddc39')
          .attr('font-weight', '700')
          .attr('font-size', '14px')
          .attr('text-anchor', 'middle')
          .attr('x', c[0])
          .attr('y', c[1])
          .text(((d.data.population * 100) / sumData).toFixed(1) + '%')
      })

      arcs.forEach(function(d) {
        var c = populationLabelArc.centroid(d)
        label
          .append('text')
          .attr('class', 'age-text')
          .attr('fill', '#000')
          .attr('font-size', '12px')
          .attr('text-anchor', function(d) {
            return c[0] >= 0 ? 'start' : 'end'
          })
          .attr('x', c[0])
          .attr('y', c[1])
          .text(
            d.data.age + '岁 : ' + (d.data.population / 10000).toFixed(2) + '万人'
          )
      })
      chart
        .append('g')
        .attr('class', 'arc--title')
        .append('text')
        .attr('fill', '#fff')
        .attr('font-size', '14px')
        .attr('font-weight', '700')
        .attr(
          'transform',
          'translate(' +
            (width / 2 + margin.left) +
            ',' +
            (margin.top + radius) +
            ')'
        )
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', 0)
        .text('XX市人口年龄结构')

      function arcTween(outerRadius, delay) {
        return function() {
          d3.select(this)
            .transition()
            .delay(delay)
            .attrTween('d', function(d) {
              var i = d3.interpolate(d.outerRadius, outerRadius)
              return function(t) {
                d.outerRadius = i(t)
                return arc(d)
              }
            })
        }
      }
  }
}


</script>
<style>
</style>