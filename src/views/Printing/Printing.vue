<template>
    <div>
        <button @click="Printing">只能打印一次</button>
        <button @click="openPrinting">新窗口打印</button>
        <button @click.prevent="openUrlPrinting()">打印通过url获取的内容</button>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{

        }
    },
    methods:{
        Printing(){
            var newstr = document.getElementById('app').innerHTML;//得到需要打印的元素HTML
            var oldstr = document.body.innerHTML
            document.body.innerHTML = newstr;
            window.print()
            document.body.innerHTML = oldstr;
        },
        openPrinting(){
            var printHtml = document.getElementById("app").innerHTML;//这个元素的样式需要用内联方式，不然在新开打印对话框中没有样式
            var wind = window.open("",'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            wind.document.body.innerHTML = printHtml;
            wind.print();
       },
       openUrlPrinting(url){
           var wind = window.open('https://uland.taobao.com/sem/tbsearch?refpid=mm_26632258_3504122_32538762&keyword=%E5%A5%B3%E8%A3%85&clk1=c82686c9ff98003dc52987d5270388a6&upsid=c82686c9ff98003dc52987d5270388a6','newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
         
       }
    }
}
</script>
<style lang="sass" scoped>

</style>