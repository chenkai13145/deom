<template>
    <div>
        <h5>vue中数据双向绑定原理</h5>
        <div>
            <input type="text" id="txt"/>
            <p id="model"></p>
            <input type="button" value="提交"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
    this.eventFun()
    },
    methods:{
        //绑定事件
        eventFun(){
            var obj={}
            Object.defineProperty(obj,'init',{
                get:function(){
                  return obj
                },
                set:function(newVal){
                    document.getElementById('txt').value=newVal
                    document.getElementById('model').innerHTML=newVal
                }
            })
            document.getElementById('txt').addEventListener('keyup',function(e){
                 obj.init = e.target.value
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
