import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import DisplayData from "./components/DisplayData"
import ArtistProfile from "./components/ArtistProfile"
import CreateProfile from "./components/CreateProfile"
import HomePage from './components/HomePage'
import CreatePost from "./components/CreatePost"

const routes =[
  {path:'/' ,name:"home" ,component:HomePage},
  {path:'/login' ,name:"login" , component:LoginPage},
  {path:"/signup", component:SignupPage},
  {path:'/display', component:DisplayData} ,
  {path:"/artistProfile",component:ArtistProfile},
  {path:"/createProfile",component:CreateProfile},
  {path:"/createPost",name:"createPost",component:CreatePost}
]




const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;