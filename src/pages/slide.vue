<template>
	<div class="fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="5"  style="min-height: 100%;">
				<el-menu style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-document"></i>D3图表</template>
						<el-menu-item index="bargraph">柱状图</el-menu-item>
						<el-menu-item index="areagraph">面积图</el-menu-item>
						<el-menu-item index="piegraph">饼图</el-menu-item>
						<el-menu-item index="linergraph">线状图</el-menu-item>
						<el-menu-item index="radargraph">雷达图</el-menu-item>
						<el-menu-item index="scattergraph">散点图</el-menu-item>
						<el-menu-item index="combbargraph">组合柱状图</el-menu-item>
						<el-menu-item index="treegraph">树状图</el-menu-item>
						<el-menu-item index="forcegraph">力导向图</el-menu-item>
						<el-menu-item index="mapgraph">地图</el-menu-item>
						<el-menu-item index="wordcloud">词云</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="19" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>
<script>
export default {}
</script>
<style>
</style>