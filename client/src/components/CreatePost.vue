<template>
   <div class="container-fluid" style="margin-bottom: 50px;">
  <div class="row">
    <div class="col-3">
     
    </div>
    <div class="col-6">
        <div class="mt-5">
    <div class="card shadow-lg">
      <div class="card-body">
        <div class="text-center"><h3 class="card-title">Add Event</h3></div>
        <br>
        
  
      <form @submit.prevent="submitForm">
       
  
        <div class="mb-3">
          <label for="caption" class="form-label">Caption:</label>
          <textarea id="caption" v-model="caption" class="form-control" required ></textarea>
         
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number:</label>
          <input type="tel" id="phoneNumber" v-model="phoneNumber" pattern="[0-9]{10}" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="link" class="form-label">Link:</label>
          <input type="text" id="link" v-model="link" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Upload Image:</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*" required>
          <div class="imgdiv">
            <img
              class="image1"
              :src="imagePreview"
              alt="event image"
            />
          </div>
        </div>
    
        <div class="d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-secondary">Add</button>
</div>
      </form>
      </div>
    </div>
  </div>
    </div>
    <div class="col-3">
      
    </div>
  </div>
</div>
    <div class="container">
      
    </div>
  </template>
  
  <script>
  import axios from "axios"
  export default {
    name:"CreatePost",
    data() {
      return {
        image: [],
        imagePreview: require('../assets/addevent1001.logowik.com.webp'),
        caption: '',
        email: '',
        phoneNumber: '',
        link: '',
        token:null
      };
    },
    created(){
        const user = JSON.parse(localStorage.getItem("user"));
        if(user===null){
            this.$router.push({name:"login"})
        }else{
            this.token = user.token
     
        }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
     
    if(file){
      this.image.push(file)
      this.imagePreview = URL.createObjectURL(file);
    }
     
      
      },
      submitForm() {

        const data={
            caption: this.caption,
        email: this.email,
        phoneNumber: this.phoneNumber,
        link: this.link,
        }
        console.log(data)
        const formData = new FormData();
      for (let i = 0; i < this.image.length; i++) {
        formData.append("images[]", this.image[i]);
      }
      formData.append("data", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = this.token ;
        axios.post("http://localhost:5000/post/createPost",formData)
        .then(response=>{
            console.log(response)
            alert("Event Added Successfully")
            this.$router.push({name:'home'})
        })
        .catch(err=>{
            console.log(err)
        })
      },
    },
  };
  </script>
  
  <style scoped>
  .img-thumbnail {
    width: 400px;
    height: 400px;
    object-fit: cover;
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
  height: 300px;
  /* overflow:  ; */
}
.image1 {
    max-width: 100%;
  max-height: 100%;
  /* width: auto;
  height: auto; */
}
  </style>
  