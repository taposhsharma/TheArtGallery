<template>
    <div>
      <h1>Image Upload</h1>
  
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="image" class="form-label">Upload Image:</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*">
          <img :src="imagePreview" v-if="imagePreview" class="img-thumbnail" alt="Uploaded Image">
        </div>
  
        <div class="mb-3">
          <label for="caption" class="form-label">Caption:</label>
          <input type="text" id="caption" v-model="caption" class="form-control">
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control">
        </div>
  
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number:</label>
          <input type="tel" id="phoneNumber" v-model="phoneNumber" pattern="[0-9]{10}" class="form-control">
        </div>
  
        <div class="mb-3">
          <label for="link" class="form-label">Link:</label>
          <input type="text" id="link" v-model="link" class="form-control">
        </div>
  
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios"
  export default {
    name:"CreatePost",
    data() {
      return {
        image: [],
        imagePreview: null,
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
     
    
      this.image.push(file)
      this.selectedImage = URL.createObjectURL(file);
      console.log(this.selectedImage)
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
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  </style>
  