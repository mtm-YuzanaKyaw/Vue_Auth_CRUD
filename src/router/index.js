import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import Posts from '@/views/Posts/Posts.vue' 
import PostEdit from '@/views/Posts/PostEdit.vue'
import PostShow from '@/views/Posts/PostShow.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },{
    path: '/signin',
    name: 'signin',
    component:  Signin
  },{
    path: '/signup',
    name: 'signup',
    component: Signup
  },{
    path: '/posts',
    name: 'posts',
    component: Posts
  },{
    path: '/posts/:id',
    name: 'postEdit',
    component: PostEdit
  },{
    path: '/posts/:id',
    name: 'postShow',
    component: PostShow
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  // Check if the route requires authentication and the user is not logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the requested route
  }
});


export default router
