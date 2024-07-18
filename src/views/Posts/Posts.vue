<template>
    <h3 class="m-3 text-center">Posts</h3>
      <div class="col-lg-6 col-md-12 col-sm-12 ">
        <div v-for="post in posts" :key="post.id">
            <div class="card m-2 p-3">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.content }}</p>
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
                </div>
              </div>
        </div>
      </div>
</template>


<script>

import axios from 'axios'
export default {
    data(){
        return {
            posts: [],
            signedIn: false
        }
    },
    created(){
        this.isSignedIn()
    },
    methods: {
        setError (error, text) {
            this.error = (error.response && error.response.data && error.response.data.error) || text
        },
        isSignedIn() {
            if(localStorage.token == null){
                this.signedIn = false
                this.$router.push({name: 'signin'})               
            }
            else{
                this.signedIn = true
                // this.$router.push({name: 'home'})
            }
        }
    },
    mounted(){
        axios.get('http://localhost:3000/api/posts',{
            headers: {
                'Authorization': 'Beaer' + localStorage.getItem('token')
            }
        })
        .then(response => {
            this.posts = response.data
            console.log(this.posts)
        }).catch(error => {
            this.setError(error, 'Something went wrong. Try aganin!')
        })
    }
}
</script>