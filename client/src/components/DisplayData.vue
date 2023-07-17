<template>
    <div>
 <button @click="displayData">click me to get data</button>
 <div v-for="(value,i ) in images" :key="i"> 
<img :src="value" alt="image not found" height="200" width="200"/>
 </div>
    </div>
</template>

<script>
  import axios from "axios"

export default {
  
    name:"DisplayData",
    data(){
        return{
            values:[],
            images:[]
        }

    },
    methods:{
       displayData(){
        axios.get("http://localhost:5000/display")
        .then(response =>{
            // console.log(response)
            this.values = response.data
            for(let i = 0; i< this.values.length;i++){
                console.log(this.values[i])
               const source =  this.getImageUrl(this.values[i].p_image)
               this.images.push(source)
            }
        })
        .catch(error=>{
            console.log(error)
        }
        )
       },
       getImageUrl(image){
        // console.log(image)
        if(image==null){
         return require('@/assets/pexels-mohamed-abdelghaffar-771742.jpg')
        }else{
        const base64 = window.btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
       
        return `data:${image.contentType};base64,${base64}`;
       }
    }
    }
   
}
</script>
