<template>

  <div class=" container-fluid" style="margin-top: 50px;">
    <div class = "row" style="padding: 20px;">
      <div  class="col-6 image-container" v-for="(image,id) in images" :key="id">  
      <div>
        <div class="card shadow-lg" style="height: 700px;">
         
            <div class="">
              <div class="imgdiv">
              <img
              class="image1"
              :src="image"
              alt="event image"
            />
  <div class="overlay-text">{{ aboutImage[id] }}</div>
</div>
          
          </div>
         
   
  <div class="card-body" style="text-align: center;">
    <h2> {{ imagename[id] }}</h2>
   
      </div>

     
</div>
      
      </div>
    </div>
    </div>
  </div>
  <div>
   
    
   
   
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
      const data = resposne.data.res
      this.acheivements = data[0].achievement
      this.firstname=data[0].artistfirstname
      this.lastname=data[0].artistlastname
      this.myprofile=data[0].name
      this.description=data[0].about
      this.profilepic=this.getImageUrl(data[0].artistpic)
      for(let i = 0;i<data.length;i++){
        this.artistwork.push(this.getImageUrl(data[i].image))
        this.imagename.push(data[i].imagename)
        this.aboutImage.push(data[i].description)
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
.image1 {
    max-width: 100%;
  max-height: 100%;
  /* width: auto;
  height: auto; */
}
.imgdiv {
    margin:10px;
  border: 1px solid black;
  background-color: whitesmoke;
  /* width: 100%; */
  display: flex;
  align-items: center;
  /* margin-left: 0px;
    margin-right: 0px; */
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  /* overflow:  ; */
}
.image-container {
  position: relative;
  display: inline-block;
}

.overlay-text {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: justify;
  transform: translate(-0%, -0%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 50px;
  opacity: 0;
  transition: opacity 1s ease;
}

.image-container:hover .overlay-text {
  opacity: 5;
  width:100%;
  height:100%
}

</style>