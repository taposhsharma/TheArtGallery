<template>
  <h1>Artist Profiles</h1>
  <div class="container-fluid">
      <div class="row">
        <!-- Artist Profiles will be rendered here -->
        <div class="col-12 col-md-3" v-for="artist in artists" :key="artist.id">
            
          <div class="text-center" @click="artistprofile(artist.id)">
            <img :src="getImageUrl(artist.image)" class="profile-image" alt="Artist Profile Image" >
            <h4>{{ artist.firstname}} {{ artist.lastname}}</h4>
            <p>{{ artist.profile }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import { artists } from '@/artists';
import axios from 'axios'

export default {
  name: 'ArtistList',
  data() {
    return {
      artists: [],
      perPage:20,
      currentPage:1
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
      
        axios.get(`http://localhost:5000/general/profile?limit=${this.perPage}&page=${this.currentPage}`)
        .then(response=>{
            console.log(response.data)
            this.artists = response.data
         
        })
        .catch(err=>{
          this.$router.push({name:"login"})
            console.log(err.response.data)
           
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
    artistprofile(id){
        this.$router.push({name:"artistprofile",params: { id: id}})
    }
  }
};
</script>

<style scoped>

  .artist-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  .artist{
    margin-bottom: 20px; ;
  }

  .profile-image{
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
  }

</style>