<template>
  <div class="artist">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 details">
          <div>
            <div class="profile">
              <h2 class="display-4">{{ firstname }} &nbsp;{{ lastname }}</h2>
              <h3>{{ myprofile }}</h3>
            </div>
            <div class="description">
              <p>
                
                {{ description }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="image-container">
            <figure class="wave">
              <img
                :src="profilepic"
                alt="profile"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid acheive">
    <div class="row">
      <div class="col acheivements">
        <div>
          <h1>
            <img src="../assets/acheivement.png" alt="" height="40" />
            Acheivements
          </h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="(acheivement, i) in acheivements" :key="i" class="col-4">
        <div class="content">
          <div class="row g-0">
            <div class="col-1" style="display: flex; justify-content: center">
              <i class="bi-disc-fill"></i>
            </div>
            <div class="col-11">
              <p>{{ acheivement}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid workContainer">
    <div class="row">
      <div class="col work">
        <div>
          <h1>
            <img src="../assets/creative-process.png" alt="" height="40" /> Best
            Work
          </h1>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="(image, i) in images" :key="i" class="col-3">
        <div class="content">
          <div class="row g-0">
            <img class="dummy" :src="image" />
          </div>
        </div>
      </div>
      <button @click="explore">Explore</button>
    </div>
    <div class="row">
      <button @click="connectToArtist">Connect</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ArtistProfile",
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
      artistwork:[],
      images: [
  
      ],
    };
  },
  created(){
    const id = this.$route.params.id;
    this.id= id
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
      if(resposne.data.length>0){
      this.acheivements = data[0].achievement
      this.firstname=data[0].artistfirstname
      this.lastname=data[0].artistlastname
      this.myprofile=data[0].name
      this.description=data[0].about
      this.profilepic=this.getImageUrl(data[0].artistpic)
      for(let i = 0;i<data.length;i++){
        this.artistwork.push(this.getImageUrl(data[i].image))
      }
      if(this.artistwork.length>=4){
        for(let i=0;i<4;i++){
          this.images.push(this.artistwork[i])
        }
      }else{
        this.images=this.artistwork
      }
    }else{
      this.$router.push({name:"createprofile"})
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
    console.log(this.id)
      this.$router.push({name:"AllWork", params:{id:this.id}})
    },
    connectToArtist(){
   
    const user = JSON.parse(localStorage.getItem("user"));
        if(user===null){
            this.$router.push({name:"login"})
        }else{
            this.token = user.token
            // console.log(this.token)
      axios.defaults.headers.common["Authorization"] = this.token ;
    axios.post('http://localhost:5000/connect',{id:this.id})
    .then(resposne=>{
      console.log(resposne)
    
    })
    .catch(err=>{
      console.log(err)
    })
    }
  }
}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,600;1,600&display=swap");

.workContainer {
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 50px;
  background-color: rgb(183, 192, 232);
}

.work {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

.content {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}
.acheive {
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 50px;
  background-color: antiquewhite;
}
.acheivements {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}
.image-container {
  display: flex;
  justify-content: center;
}

.rounded-circle {
  border-radius: 50%;
  width: 300px;
  height: 300px;
}

.profile {
  margin-bottom: 20px;
}

.description {
  line-height: 1.6;
}
.artist {
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  color: white;

  background-image: url("../assets/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-concrete_1258-72085.avif");
  background-repeat: no-repeat;
  background-size: cover;
}
.details {
  font-family: "Crimson Text", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
}
.wave {
  float: left;
  margin: 20px;
  animation: wave ease-in-out 8s infinite alternate;
  transform-origin: center -36px;
}

.wave:hover {
  animation-play-state: paused;
  cursor: pointer;
}

.wave img {
  border: 5px solid #f8f8f8;
  display: block;
  width: 250px;
  height: 300px;
}

.wave figcaption {
  text-align: center;
}

.wave:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1.5px solid #ffffff;
  top: -10px;
  left: 50%;
  border-bottom: none;
  border-right: none;
  transform: rotate(35deg);
}

.wave:before {
  content: "";
  position: absolute;
  top: -23px;
  left: 50%;
  display: block;
  height: 44px;
  width: 47px;
  background-image: url(https://cdn.hashnode.com/res/hashnode/image/upload/v1602040503586/FW6g79WBY.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  z-index: 16;
}

.dummy {
  /* border: 5px black; */

  border: 10px solid whitesmoke;
  transition: 50ms ease-in;
  width: 90%;

  /* border-radius: 50%; */
}
.dummy:hover {
  transition: 750ms ease-in;
  border-radius: 0;
  border: none;
  width:100%;

  /* z-index: 2; */
  /* box-shadow: 0px -2px 92px 24px rgba(0, 0, 0, 0.38);
  -webkit-box-shadow: 0px -2px 92px 24px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 0px -2px 92px 24px rgba(0, 0, 0, 0.38); */
  box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
  -webkit-box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
  -moz-box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
}

@keyframes wave {
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
