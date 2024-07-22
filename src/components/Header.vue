<template>
    <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary border-bottom border-body" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
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
            <div v-if="this.signedIn" class="d-flex">
              <li class="nav-item">
                <router-link class="nav-link" to="/posts">Posts</router-link>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="signout" class="nav-link" to="/signout">SignOut</button>
              </li>
            </div>
            <div class="d-flex" v-else>
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

<!-- <script>
import axios form 'axios'
export default {

    methods: {
      signout () {
        axios.delete(`http://localhost:3000/api/artists/${artist.id}`)
      }
    }
  }
</script> -->
<script>
import axios from 'axios'
export default {
  data(){
    return {
      signedIn: false
    }
    
  },
  methods: {
      signout () {
        if(localStorage.getItem('token') == null){
          
        }else {
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
      },
      isSignedIn() {
            if(localStorage.getItem('token') == null){
              // console.log(this.signedIn)
              this.signedIn = false
              this.$router.push({name: 'home'})
              console.log(this.signedIn)
              
            }
            else{
              this.signedIn = true
              //localStorage.setItem('token','eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlNTc2YzYyMy1kNjc4LTQ3OTEtOTRkOS0xNzk5ZGQyMDE5ZDEiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzIxNjEzNjI1LCJleHAiOjE3MjE3MDAwMjV9.egCo5X4Ls25Glusoy2hDm76t_7KE2IAGbMyfDuoIvB0')
              this.$router.push({name: 'signin'})
              console.log(this.signedIn)
              
            }
        }

    },created(){
        this.isSignedIn()
    },updated(){
        this.isSignedIn()
    }
}
</script>

