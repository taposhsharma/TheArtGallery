<template>
    <div>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" v-model="formData.name" class="form-control">
        </div>
        <div class="mb-3">
          <label for="about" class="form-label">About</label>
          <textarea id="about" v-model="formData.about" class="form-control"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Achievements</label>
          <div v-for="index in achievementCounter" :key="index" class="input-group mb-3">
          <input type="text" v-model="formData.achievements[index-1]" class="form-control">
          <button type="button" class="btn btn-outline-danger" @click="removeAchievement(index-1)">Remove</button>
        </div>
        <button type="button" class="btn btn-outline-primary" @click="addAchievement">Add Achievement</button>
      </div>
      <div class="mb-3">
        <label class="form-label">Images</label>
        <div v-for="index in imageCounter" :key="index" class="input-group mb-3">
          <input type="file" @change="handleImageUpload($event, index-1)" class="form-control-file" required>
          <input type="text" v-model="formData.imageNames[index-1]" class="form-control mt-2" placeholder="Image Name" required>
          <input type="text" v-model="formData.aboutImages[index-1]" class="form-control mt-2" placeholder="About Image" required>
          <button type="button" class="btn btn-outline-danger" @click="removeImage(index-1)">Remove</button>
        </div>
        <button type="button" class="btn btn-outline-primary" @click="addImage">Add Image</button>
      </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
 import axios from "axios";
  export default {
    name:'CreateProfile',
    data() {
      
      return {
        formData: {
          name: '',
          about: '',
          images: [],
          achievements:[],
        imageNames: [],
        aboutImages: []
      },
      imageCounter: 0,
        achievementCounter:0,
        token:null
      };
    },
    created(){
        const user = JSON.parse(localStorage.getItem("user"));
        if(user===null){
            this.$router.push({name:"login"})
        }else{
            this.token = user.token
            console.log(this.token)
      axios.defaults.headers.common["Authorization"] = this.token ;
      
        axios.get("http://localhost:5000/artist/check")
        .then(response=>{
            console.log(response.data)

            if(response.data !=="authorized"){
                console.log("hii")
                
            }
        })
        .catch(err=>{
           
            console.log(err.response.data)
            this.$router.push({name:"home"})
        })
    }
    },

    methods: {
        addAchievement() {
      this.formData.achievements.push('');
      console.log(this.achievementCounter)
      this.achievementCounter++;
    },
    removeAchievement(index) {
      this.formData.achievements.splice(index, 1);
      this.achievementCounter--;
    },
    addImage() {
      this.formData.images.push(null);
      this.formData.imageNames.push('');
      this.formData.aboutImages.push('');
      this.imageCounter++;
    },
    removeImage(index) {
      this.formData.images.splice(index, 1);
      this.formData.imageNames.splice(index, 1);
      this.formData.aboutImages.splice(index, 1);
      this.imageCounter--;
    },
    handleImageUpload(event, index) {
      const file = event.target.files[0];
      this.formData.images[index] = file;
    },
      submitForm() {
    
        console.log(this.formData);
        const data={
            name: this.formData.name,
          about:this.formData.about,
        achievements:this.formData.achievements,
        imageNames: this.formData.imageNames,
        aboutImages: this.formData.aboutImages
        }
        const formData = new FormData();
      for (let i = 0; i < this.formData.images.length; i++) {
        formData.append("images", this.formData.images[i]);
        
      }
      formData.append("data",JSON.stringify(data))
      console.log(formData)
      axios.defaults.headers.common["Authorization"] = this.token ;
         axios.post("http://localhost:5000/artist/createprofile",formData)
         .then(response=>{
            console.log(response)
         })
         .catch(err=>{
            console.log(err)
         })

      }
    }
  };
  </script>
  