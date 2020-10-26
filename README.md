# vued3

## 项目介绍

* 测试型项目
* 结合vue，elementui，d3尝试进行数据展示

1. 选择元素
> d3.select()<br/>
d3.selectAll()

2. 绑定数据
	+ var str = "fribble" ;<br/> 
	var body = d3.select("body") ;<br/> 
	var p = body.selectAll("p") ;<br/> 
	p.datum(str) ;<br/> 
	p.text((d, i)=>{return "no" + i + "element is" + d})

	+ var dataset = ["A", "B", "C"] ;<br/> 
	var body = d3.select("body") ;<br/> 
	var p = body.select("p") ;<br/> 
	p.data(dataset).text((d,i)=>d)
	> d代表绑定的data数据，i代表索引，从0开始

3. 插入和删除元素
	+ append(), insert()

	+ remove()

4. 画布，比例尺
	+ html中有两种画布：canvas和svg
	+ 线性比例尺
	+ 序数比例尺
	> linear() <br/>
	var dataset = [1.2, 2.3, 0.9, 1.5, 3.3] <br/> 
	var min = d3.min(dataset) <br/> 
	var max = d3.max(dataset) <br/> 
	var linear = d3.scale.linear().domain([min,max]).range([0,300]) <br/> 
	console.log(linear(0.9)) <br/> 
	console.log(linear(2.3)) <br/> 
	console.log(linear(3.3)) <br/> 
	ordinal() <br/> 
	var index = [0, 1, 2] <br/> 
	var color = ['red', 'green', 'yellow'] <br/> 
	var ordinal = d3.scale.ordianl().domain(index).range(color) <br/> 
	console.log(ordinal(0)) <br/> 
	console.log(ordinal(2))

5. 坐标轴

6. 动效 transition

7. update(), enter(), exit()

8. 添加交互.on()

### 1. bar graph 简单柱状图
1. 先定义一个画布
2. 定义x轴，y轴
3. 开始画坐标轴
4. 背景柱
5. 主柱图
6. 柱图上的数字
7. 题目
> 定义坐标轴：scaleBand().rangeRound("屏幕上的数字").domain("真实世界的数字")<br/>scaleLinear().rangeRound().domain().padding()