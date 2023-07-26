<template>
  <div class="container mycontainer">
    <h1>Update Your Portfolio</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Profile</label>
        <input type="text" id="name" v-model="formData.name" class="form-control">
      </div>
      <div class="mb-3">
        <label for="about" class="form-label">About Yourself</label>
        <textarea id="about" v-model="formData.about" class="form-control" style="resize: none;" rows="4"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Achievements</label>
        <div v-for="index in achievementCounter" :key="index" class="input-group mb-3">
        <input type="text" v-model="formData.achievements[index-1]" class="form-control">
        <button type="button" class="btn btn-outline-danger" @click="removeAchievement(index-1)">Remove</button>
      </div>
      <div><button type="button" class="btn btn-outline-secondary" @click="addAchievement">Add </button>
    </div>
      </div>
    <div class="">
      <label class="form-label">Work</label>
      <div v-for="index in imageCounter" :key="index" class="">
        <div class="row">
          <div class="col-5">

        <input type="file" v-if="formData.imageId[index-1]==0" @change="handleImageUpload($event, index-1)" class="form-control-file" required>
        <input type="file" v-if="formData.imageId[index-1]!=0" @change="handleImageUpload($event, index-1)" class="form-control-file" >
        
        <div class="mb-3">
     
       <div class="imgdiv">
         <img
           class="image1"
           :src="formData.imagePreview[index-1]"
           alt="event image"
         />
       </div>
     </div>
          </div>
          <div class="col-7" style="padding-top:50px">
          
          
            <input type="text" v-model="formData.imageNames[index-1]" class="form-control mt-2" placeholder="Work Name" required>
        
            <textarea v-model="formData.aboutImages[index-1]" class="form-control mt-2" style="resize: none;" rows="5" placeholder="About Work" ></textarea>
             <div> 
              <button type="button" class="btn btn-sm btn-outline-danger mt-2" @click="removeImage(index-1)">Remove</button>
             </div>
        
   
          </div>
        </div>
           </div>
    <div>
      <button type="button" class="btn btn-outline-secondary" @click="addImage()">Add</button>
    </div>
    
    </div>
    <div class="d-grid gap-2 col-6 mx-auto mybtn" >
         <button type="submit" class="btn btn-secondary">Update</button>
</div>
    </form>
  </div>
</template>

  
  <script>
 import axios from "axios";
  export default {
    name:'CreateProfile',
    data() {
      
      return {
        id:'',
        formData: {
          name: '',
          about: '',
          images: [],
          achievements:[],
          imageId:[],
        imageNames: [],
        aboutImages: [],
        imagePreview:[]
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
      axios.defaults.headers.common["Authorization"] = this.token ;
      
        axios.get("http://localhost:5000/artist/updateProfile")
        .then(response=>{
            console.log(response.data)
            const data = response.data
            console.log(data[0])
            this.formData.name = data[0].name
            this.formData.about = data[0].about
            for(let i =0;i<data[0].achievement.length;i++){
                this.achievementCounter =data[0].achievement.length
                this.formData.achievements.push(data[0].achievement[i])

            }
            for(let i=0;i<data.length;i++){
              if(data[i].image!=null){
                this.formData.images.push(null)
                this.formData.imageId.push(data[i].image_id)
                this.formData.imagePreview.push(this.getImageUrl(data[i].image))
                // console.log()
                this.formData.imageNames.push(data[i].imagename)
                this,this.formData.aboutImages.push(data[i].description)
                this.imageCounter=data.length
              }
            }

            if(response.data !=="authorized"){
                console.log("hii")
                
            }
        })
        .catch(err=>{
           
            console.log(err)
             this.$router.push({name:"home"})
        })
    }
    },

    methods: {
        addAchievement() {
          const len = this.formData.achievements.length
          if(len==0){
            this.formData.achievements.push('');
      console.log(this.achievementCounter)
      this.achievementCounter++;
          }else if(this.formData.achievements[len-1].trim()==''){
            alert("Before Adding new new first fill the detail of current acheivement")
          }else{
            this.formData.achievements.push('');
      console.log(this.achievementCounter)
      this.achievementCounter++;
          }
    },
    removeAchievement(index) {
      this.formData.achievements.splice(index, 1);
      this.achievementCounter--;
    },
    addImage() {
      const len = this.formData.images.length
    
      if(len==0 || this.formData.imageId[len-1]!=0){
        this.formData.images.push(null);
      this.formData.imageNames.push('');
      this.formData.aboutImages.push('');
      this.formData.imageId.push(0)
      this.formData.imagePreview.push(null)
      this.imageCounter++;

      }
      
      else if (this.formData.images[len-1]==null || this.formData.imageNames[len-1].trim()=='' || this.formData.aboutImages[len-1].trim()==""){
        alert('Before Adding new Work first fill the detail of current work')
      }else{
      this.formData.images.push(null);
      this.formData.imageNames.push('');
      this.formData.aboutImages.push('');
      this.formData.imageId.push(0)
      this.imagePreview.push(null)
      this.imageCounter++;
      }
    },
    removeImage(index) {
      this.formData.images.splice(index, 1);
      this.formData.imageId.splice(index,1);
      this.formData.imageNames.splice(index, 1);
      this.formData.aboutImages.splice(index, 1);
      this.imageCounter--;
    },
    handleImageUpload(event, index) {
      const file = event.target.files[0];
      this.formData.imageId[index]=0
      this.formData.images[index] = file;
      this.formData.imagePreview[index]=URL.createObjectURL(file)
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
      submitForm() {
    
        console.log(this.formData);
        const data={
            name: this.formData.name,
          about:this.formData.about,
        achievements:this.formData.achievements,
        image_id:this.formData.imageId,
        imageNames: this.formData.imageNames,
        aboutImages: this.formData.aboutImages
        }
        const formData = new FormData();
      for (let i = 0; i < this.formData.images.length; i++) {
        const message = "No image uploaded";

// Create a Blob with the message as text content
const blob = new Blob([message], { type: "text/plain" });

// Create a file object with the Blob
const fileObject = new File([blob], "no-image.txt", { type: "text/plain" });


         console.log("image ",this.formData.images[i])
        formData.append("images", this.formData.images[i] || fileObject);
        
      }
      formData.append("data",JSON.stringify(data))
      console.log(formData)
      axios.defaults.headers.common["Authorization"] = this.token ;
         axios.post("http://localhost:5000/artist/updateProfile",formData)
         .then(response=>{
            console.log(response)
            alert('Portfolio Updated Successfully')
            this.$router.push({name:'home'})
         })
         .catch(err=>{
            console.log(err)
         })

      }
    }
  };
  </script>
    <style scoped>
    .mybtn{
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .mycontainer{
      margin-top: 50px;
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