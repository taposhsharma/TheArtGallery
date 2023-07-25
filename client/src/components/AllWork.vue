<template>
  <div>
   
    <div v-for="(image,id) in images" :key="id">  
            <img :src="image" alt="no image">
    <div> {{ imagename[id] }}</div>
    <div> {{ aboutImage[id] }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios"


export default {
  name:"AllWork",
  data() {
    return {
      id:null,
      firstname:'',
      lastname:'',
      myprofile:'',
      description:'',
      profilepic:'',
      acheivements: [
  
      ],
      aboutImage:[],
      imagename:[],
      artistwork:[],
      images: [
  
      ],
    };
  },

  created(){
    const id = this.$route.params.id
    console.log(id)
    const user = JSON.parse(localStorage.getItem("user"));
        if(user===null){
            this.$router.push({name:"login"})
        }else{
            this.token = user.token
            // console.log(this.token)
      axios.defaults.headers.common["Authorization"] = this.token ;
    axios.get('http://localhost:5000/data/'+id)
    .then(resposne=>{
      console.log(resposne)
      const data = resposne.data
      this.acheivements = data[0].achievement
      this.firstname=data[0].artistfirstname
      this.lastname=data[0].artistlastname
      this.myprofile=data[0].name
      this.description=data[0].about
      this.profilepic=this.getImageUrl(data[0].artistpic)
      for(let i = 0;i<data.length;i++){
        this.artistwork.push(this.getImageUrl(data[i].image))
        this.imagename.push(data[0].imagename)
        this.aboutImage.push(data[0].description)
      }
      if(this.artistwork.length>=4){
        for(let i=0;i<4;i++){
          this.images.push(this.artistwork[i])
    
        }
      }else{
        this.images=this.artistwork
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
},
methods:{
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
    },
    explore(){
    
      this.$router.push({name:"AllWork", params:{id:this.id}})
    }
}
}
</script>

<style scoped>

</style>