import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import echartRouter from './echarts/echart'

const arrrout=[
    {
        path: '/about',
        name: 'about',
        component: ()=>import('../views/About.vue')
    },
    {
        path: '/buss',
        name: 'buss',
        component: ()=>import('../views/bus/component/buschilder.vue')
    },
    {
        path: '/map',
        name: 'map',
        component: ()=>import('../views/baidu/runmap.vue'),
        children:[
            {
                path: '/map/xianshi',
                name: 'xianshi',
                component: ()=>import('../views/baidu/map.vue'),
            },
            {
                path: '/map/yundong',
                name: 'yundong',
                component: ()=>import('../views/baidu/yundong/index.vue')
            },
            {
                path: '/map/nummap',
                name: 'nummap',
                component: ()=>import('../views/baidu/yundong/numap.vue')
            },
        ]
    },
    {
        path: '/bus',
        name: 'bus',
        component: ()=>import('../views/bus/busdome.vue')
    },
    {
        path:"/model",
        name:'model',
        component:()=>import('../views/model/index.vue')
    },
    {
        path: '/captcha',
        name: 'captcha',
        component: ()=>import('../views/captcha/capTcha.vue')
    },
    {
        path: '/vuescroll',
        name: 'vuescroll',
        component: ()=>import('../views/vuescroll/vuescroll.vue')
    },
    {
        path: '/pring',
        name: 'pring',
        component: ()=>import('../views/Printing/Printing.vue')
    },
]
const router=new Router({
    routes:[
     
        {
            path: '/404',
            name: '404',
            component: ()=>import('../components/404.vue')
        },
        {
            path: '*',
            component: ()=>import('../components/404.vue')
        },
        {
            path: '/',
            name: 'layout',
            component: ()=>import('../views/layou.vue'),
            children:[...echartRouter,...arrrout]
        },

        
    ]
})

export default router