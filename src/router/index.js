import Vue from 'vue'
import Router from 'vue-router'
import slide from '@/pages/slide'
import bargraph from '@/pages/bar-graph'
import areagraph from '@/pages/area-graph'
import piegraph from '@/pages/pie-graph'
import linergraph from '@/pages/liner-graph'
import radargraph from '@/pages/radar-graph'
import scattergraph from '@/pages/scatter-graph'
import combbargraph from '@/pages/comb-bar-graph'
import treegraph from '@/pages/tree-graph'
import forcegraph from '@/pages/force-graph'
import mapgraph from '@/pages/map-graph'
import wordcloud from '@/pages/word-cloud'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'slide',
      component: slide,
      children:[
      {
      	path:'/bargraph',
      	name:'bargraph',
      	component:bargraph
      },
      {
      	path:'/areagraph',
      	name:'areagraph',
      	component:areagraph
      },
      {
      	path:'/piegraph',
      	name:'piegraph',
      	component:piegraph
      },
      {
      	path:'/linergraph',
      	name:'linergraph',
      	component:linergraph
      },
      {
      	path:'/radargraph',
      	name:'radargraph',
      	component:radargraph
      },
      {
      	path:'/scattergraph',
      	name:'scattergraph',
      	component:scattergraph
      },
      {
      	path:'/combbargraph',
      	name:'combbargraph',
      	component:combbargraph
      },
      {
      	path:'/treegraph',
      	name:'treegraph',
      	component:treegraph
      },
      {
      	path:'/forcegraph',
      	name:'forcegraph',
      	component:forcegraph
      },
      {
      	path:'/mapgraph',
      	name:'mapgraph',
      	component:mapgraph
      },
      {
      	path:'/wordcloud',
      	name:'wordcloud',
      	component:wordcloud
      }
      ]
  }
  ]
})
