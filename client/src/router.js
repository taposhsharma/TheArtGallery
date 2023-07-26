import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import DisplayData from "./components/DisplayData";
import ArtistProfile from "./components/ArtistProfile";
import CreateProfile from "./components/CreateProfile";
import HomePage from "./components/HomePage";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import UpdateProfile from "./components/UpdateProfile";
import UserProfile from "./components/UserProfile";
import ArtistPage from "./components/ArtistPage";
import EventManager from "./components/EventManager";
import AllEvents from "./components/AllEvents"
import NotFound from './components/NotFound.vue';
import AllWork from "./components/AllWork"

const routes = [

  { path: "/", name: "home", component: HomePage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/signup", name: "signup", component: SignupPage },
  { path: "/display", component: DisplayData },
  {
    path: "/artistProfile/:id",
    name: "artistprofile",
    component: ArtistProfile,
  },
  {
    path: "/createProfile",
    name:'createprofile',
    component: CreateProfile,
  },
  {
    path: "/createPost",
    name: "createPost",
    component: CreatePost,
  },
  {
    path: "/updatePost/:id",
    name: "updatePost",
    component: UpdatePost,
  },
  {
    path: "/updateprofile",
    name: "updateProfile",
    component: UpdateProfile,
  },
  {
    path: "/userprofile",
    name: "userprofile",
    component: UserProfile,
  },
  {
    path: "/artistpage",
    name: "artistpage",
    component: ArtistPage,
  },
  {
    path: "/events",
    name: "eventmanager",
    component: EventManager,
  },
  {
    path:"/allevents",
    name:"AllEvents",
    component:AllEvents
  },
  {
    path:"/allwork/:id",
    name:'AllWork',
    component:AllWork,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
