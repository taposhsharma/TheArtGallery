<template>
    <div>
        <div class="card" style="width: 18rem;">
  <img src="" class="card-img-top" alt="...">
  <div class="card-body">
    <router-link to='/createPost' class="nav-link ">Add Event</router-link>
  </div>
</div>
<div class="card" style="width: 18rem;">
  <img src="" class="card-img-top" alt="...">
  <div class="card-body">
    <router-link to='/allevents' class="nav-link ">Update Events</router-link>
  </div>
</div>
    </div>
</template>

<script>


export default{
    name:"EventManager",
    data(){
        return{

        }
    }
}


</script>

<style scoped>


</style>
