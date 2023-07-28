<template>
    <div class="row mybody" style="margin-top: 30px;"  >
  
     
      <div class="col-12 mysidebar" >
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <div v-for="(data1,id) in data" :key="id">
        <div class="card mycard">
          <div class="card-body">
            
              <h5 class="card-title">
              <div class="ArtName">
                <img class="image" :src="this.getImageUrl(data1.userimage)" alt="Image" />
                <div class="title" style="width:100%">{{ data1.fname }}  {{ data1.lname }} </div>
             <div class="updateclass">   <button class="btn btn-outline-light" @click="updatepost(data1.pid)" > Update</button></div>
              </div>
            </h5>
            <div class="content-div">
                  <div
                    class="limited-content"
                    v-show="!showFullContent[id]"
                    @click="toggleContent(id)"
                  >
                    <p class="card-text" style="text-align: justify">
                      {{ limitedText(data1.pcaption) }}...
                    </p>
                  </div>
                  <div
                    class="full-content"
                    v-show="showFullContent[id]"
                    @click="toggleContent(id)"
                  >
                    <p class="card-text" style="text-align: justify">
                      {{ data1.pcaption }}
                    </p>

                    <div>
                      <h6>Contact details:</h6>
                      Email:
                      <a :href="getemail(data1.pemail)">{{ data1.pemail }}</a
                      ><br />
                      Mobile no: {{ data1.pnumber }}<br />
                      Link:
                      <a
                        :href="data1.plink"
                        target="_blank"
                        rel="noopener noreferrer"
                        >{{ data1.plink }}</a
                      >
                    </div>
                  </div>
                </div>
  
          
  <div class="imgdiv">
              <img
                class="image1"
                :src="this.getImageUrl(data1.pimage)"
                alt="event image"
              />
            </div>
            </div>
          
       
  
          </div>
        </div>
          </div>
        </div>
        
        <ul class="pagination b-pagination pagination-md justify-content-center pagination1">
  <li class="page-item">
    <button class="page-link btn-dark" @click="prevPage()">Prev</button>
  </li>
  <li class="page-item active">
    <button class="page-link disabled">{{ currentPage }}</button>
  </li>
  <li class="page-item">
    <button class="page-link btn-dark" @click="nextPage()">Next</button>
  </li>
</ul>
      </div>
      
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default {
    name: "HomePage",
    components: {},
  
    data() {
      return {
        id:null,
        role:null,
        linktoprofile:'',
        hoverImageSrc: require('../assets/artist.png'),
        originalImageSrc: require('../assets/painter.png'),
        isHovered: false,
        hoverImageSrc1: require('../assets/user (1).png'),
        originalImageSrc1: require('../assets/user.png'),
        isHovered1: false,
  
        hoverImageSrc2: require('../assets/portfolio (1).png'),
        originalImageSrc2: require('../assets/portfolio.png'),
        isHovered2: false,
  
        hoverImageSrc3: require('../assets/calendar (1).png'),
        originalImageSrc3: require('../assets/calendar.png'),
        isHovered3: false,
        currentPage:1,
        perPage:4,
        data:[],
       
            email: "taposh@gmail.com",
        number: "7017676564",
        maxWords:25,
        link: "https://www.google.com/",
        email1: "mailto:taposh@gmail.com",
        image: require("../assets/logo.png"),
        showFullContent: [],
        // bgimage: { backgroundImage: require("./assets/tree420.jpg") }
      };
    },
  
    created(){
          const user = JSON.parse(localStorage.getItem("user"));
          if(user===null){
              this.$router.push({name:"login"})
          }else{
              this.token = user.token
              // console.log(this.token)
        axios.defaults.headers.common["Authorization"] = this.token ;
        
          axios.get(`http://localhost:5000/general/updatemypost?limit=${this.perPage}&page=${this.currentPage}`)
          .then(response=>{
              console.log(response.data)
              this.id=response.data.id
              this.role = response.data.role
              this.linktoprofile="/artistprofile/"+this.id
              this.data = response.data.result
              console.log(this.data)
              for (let i = 0; i < this.data.length; i++) {
            this.showFullContent.push(false);
          }
          })
          .catch(err=>{
            this.$router.push({name:"login"})
              console.log(err.response.data)
             
          })
      }
      },
    methods: {
      callData() {
      const url = `http://localhost:5000/general/post?limit=${this.perPage}&page=${this.currentPage}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          window.scrollTo({top:0,behavior:'smooth'})
          if (response.data.result.length == 0) {
            console.log("hello");
            this.prevPage();
          }
          this.data = response.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
      toggleContent(i) {
      this.showFullContent[i] = !this.showFullContent[i];
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
      },
      limitedText(data1) {
      console.log(data1);
      const words = data1.split(" ");
      return words.slice(0, this.maxWords).join(" ");
    },
      getemail(email){
        return "mailto:"+email
      },
      prevPage() {
        if (this.currentPage !== 1) {
          this.currentPage--;
          this.callData();
        }
      },
      nextPage() {
        this.currentPage++;
        this.callData();
      },
      updatepost(id){
        this.$router.push({name:"updatePost",params:{id:id}})
      }
    
    },
    
    computed:{
     
    }
  };
  </script>
  
  <style scoped>
  .mybody{
    
    /* width: 100%;
     */
     /* overflow: hidden; */
     font-family: "Aladin", cursive;
  
  }
  
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24px;
    padding: 10px;
  }
  
  .Main-Container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
  
    padding-top: 100px;
    padding-bottom: 100px;
    color: white;
  }
  
  .ArtName {
    display: flex;
    flex-direction: row;
  }
  
  .oval {
    border-radius: 50%;
    width: 200px;
  }
  
  .Contact {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .dummy {
    border: 10px solid whitesmoke;
    transition: 50ms ease-in;
    width: 40%;
  }
  
  .dummy:hover {
    transition: 750ms ease-in;
    border-radius: 0;
    border: none;
    width: 50%;
  
    box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
    -webkit-box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
    -moz-box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
  }
  
  .image {
    max-height: 50px;
    min-width: 50px;
    border-radius: 50%;
    border: 1px solid black;
  }
  .image1 {
      max-width: 100%;
    max-height: 100%;
    /* width: auto;
    height: auto; */
  }
  .imgdiv {
      margin-top:10px;
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
    height: 400px;
    /* overflow:  ; */
  }
  .show-more-button {
    
    background-color: #fff;
    border: none;
    
    text-decoration: none;
    cursor: pointer;
   
  }
  .content-div {
   
  }
  
  .limited-content {
     
  }
  
  .full-content {
    display: block; /* Hide the full content by default */
  }
  /* .imgdiv img{
      height: 400px;
    } */
    .button1{
      display: flex;
      justify-content: right;
    }
    .mycard{
      margin-top:20px;
    background-color: rgb(24, 47, 42);
    color:white;
    box-shadow: 4px 4px 12px rgba(56, 53, 53, 0.2);
    }
    .pagination1{
      margin-top:20px;
      margin-bottom:20px
    }
    
    .mybar{
      display: flex;
      justify-content: center;
      align-items: center;
      width:100%;
      
    }
    li{
      margin-top:20px;
      /* margin-left:10px; */
      
    }
    .newbar{
    
    }
    .updateclass{
        display: flex;
    justify-content: end;
    /* justify-items: flex-end; */
    align-items: center;
    float: right;
    width: 100%;
    }

.btn-dark {
    background-color: #343a40;
    color: #fff;
  }

  </style>
  