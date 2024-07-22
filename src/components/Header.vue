<template>
    <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary border-bottom border-body" data-bs-theme="dark">
      <div class="container-fluid">
        <router-link v-if="isAuth" to="/" class="navbar-brand" href="#">Navbar</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <div v-if="isAuth" class="d-flex">
              <li class="nav-item">
                <router-link class="nav-link" to="/posts">Posts</router-link>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="signout" class="nav-link" to="/signout">SignOut</button>
              </li>
            </div>
            <div class="d-flex" v-if="!isAuth">
              <li class="nav-item">
                <router-link class="nav-link" to="/signin">SignIn</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/signup">SignUp</router-link>
              </li>
            </div>
            
            
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
</template>


<script>
import axios from 'axios'
export default {
  name: "Header",
  props: {
    isAuth: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      require: false,
      defaultd: () => ({})
    }
  },
  data(){
    return {
      signedIn: false
    }
    
  },
  methods: {
      signout () {
        if(localStorage.getItem('token') != null){
          axios.delete('http://localhost:3000/logout', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token') 
            }
          })
          .then(response=>{
            console.log(response.data)
            localStorage.removeItem('token')
            alert(response.data.messagge)
            this.$router.push('/signin')
          }).catch(error=>{console.log(error)} )
        }
        this.$emit('signout')
      },


    }
}
</script>

