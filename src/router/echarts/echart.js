const echarts=[
    {
        path:'/echarts',
        component:()=>import('../../views/echarts/line/index.vue'),
        name:'echarts',
        redirect:"/echarts/line",
        children:[
            {
                path:'/echarts/line',
                component:()=>import('../../views/echarts/line/line.vue'),
                name:'line'
            },
            {
                path:'/echarts/bar',
                component:()=>import('../../views/echarts/bar/bar.vue'),
                name:'bar'
            },
            {
                path:'/echarts/pie',
                component:()=>import('../../views/echarts/pie/pie.vue'),
                name:'pie'
            }
        ]
    },
   
    // {
    //     path:'/echarts',
    //     component:()=>import('../../views/echarts/line/index.vue'),
    //     name:'echarts'
    // }
]

export default echarts