<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <div class="ArtName">
              <img class="image" :src="ProfileImg" alt="Image" />
              <div class="title">{{ Name }}</div>
            </div>
          </h5>
          <div class="content-div">
  <div class="limited-content" v-show="!showFullContent" @click="toggleContent">
    <p class="card-text">{{ limitedText }}...</p>


  </div>
  <div class="full-content" v-show="showFullContent" @click="toggleContent"  >
    <p class="card-text">{{ Paragraph1 }}</p>

          <div>
            <h6>Contact details:</h6>
            Email: <a :href="email1">{{ email }}</a
            ><br />
            Mobile no: {{ number }}<br />
            Link:
            <a :href="link" target="_blank" rel="noopener noreferrer">{{
              link
            }}</a>
          </div>
  </div>

</div>

        
          <div class="imgdiv">
            <img
              class="image1"
              src="https://images.unsplash.com/photo-1531564701487-f238224b7ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9zdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt="event image"
            />
          </div>
        </div>
      </div>
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
      Name: "Art Name",
      ProfileImg: require("../assets/pexels-mohamed-abdelghaffar-771742.jpg"),
      Paragraph1:
        "In the second part of the program we have created a method and the method also has an object.Here we create a Msgmethod which returns a string. Inside the method, we access data object property by using this and finally we added in the template tag. Illustrate the end result of the above declaration by using the use of the following snapshot.",
      email: "taposh@gmail.com",
      number: "7017676564",
      maxWords:25,
      link: "https://www.google.com/",
      email1: "mailto:taposh@gmail.com",
      image: require("../assets/logo.png"),
      showFullContent:false
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
      
        axios.get("http://localhost:5000/check")
        .then(response=>{
            console.log(response.data)
            
            if(response.data !=="authorized"){
                console.log("hii")
                
            }
        })
        .catch(err=>{
          this.$router.push({name:"login"})
            console.log(err.response.data)
           
        })
    }
    },
  methods: {
    toggleContent() {
      this.showFullContent = !this.showFullContent;
    }
  },
  computed:{
    limitedText() {
      const words = this.Paragraph1.split(' ');
      return words.slice(0, this.maxWords).join(' ');
    },
  }
};
</script>

<style scoped>
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
</style>
