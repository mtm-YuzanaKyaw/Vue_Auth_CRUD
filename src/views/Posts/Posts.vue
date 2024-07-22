<template>
    <h3 class="m-3 text-center">Posts</h3>
    <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12">
        <form action="" @submit.prevent="addPost" class="p-3">
            <div class="form-gruop">
                <label for="name" class="form-label">Title</label>
                <input type="text"
                    v-model="newPost.title" 
                    name="title" id="title" 
                    class="form-control">
            </div>
            <div class="form-gruop">
                <label for="artistName" class="form-label">Content</label>
                <textarea rows="10" 
                    v-model="newPost.content"
                    name="content" id="content"
                    class="form-control"></textarea>
            </div>
            <input type="submit" value="Create Post" class="btn btn-primary my-2">
        </form>
    </div>
      <div class="col-lg-6 col-md-12 col-sm-12 ">
        <div v-for="post in posts" :key="post.id">
            <div class="card m-2 p-3">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.content }}</p>
                  <div class="button-group" v-if="currentUser==post.user_id">
                    <router-link :to="{ name:'postEdit', params:{ id: post.id } }" class="btn btn-outline-info m-3">Edit</router-link>
                    <button @click.prevent="deletePost(post)" class="btn btn-outline-danger m-3">Delete</button>
                  </div>
                  <div class="" v-else></div>
                  <router-link :to="{ name:'postShow', params:{id: post.id} }" class="btn btn-outline-primary m-3">Show</router-link>
                </div>
              </div>
        </div>
      </div>
    </div>

      
</template>


<script>

import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export default {
    data(){
        return {
            posts: [],
            signedIn: false,
            newPost: {
                title: '',
                content: ''
            },
            currentUser : ''
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
        },
        addPost(){
            axios.post('http://localhost:3000/api/posts',this.newPost ,{
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response=> {
                console.log(response.data)
                this.posts.unshift(response.data)
                alert("Create Post Successfully!")
                this.newPost = []
            }).catch(error=> {
                this.setError(error, "Post cannot create")
            })
        },
        deletePost(post){
            
            if(currentUser == post.user_id){
                // alert("current user "+ currentUser + ' post user '+ post.user_id)
                axios.delete(`http://localhost:3000/api/posts/${post.id}`, {
                    headers: {
                        'Authorization' : "Bearer " + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.posts.splice(this.posts.indexOf(post),1)
                    alert("Delete Post Successfully!")
                }).catch(error=>{
                    this.setError(error,'Post connot delete')
                })
            }else{
                alert("You don't have permission to delete this route")
            }
            
                
            
        },
        
    },
    mounted(){
        const decodeData = jwtDecode(localStorage.getItem('token'))
        this.currentUser = decodeData.sub
        axios.get('http://localhost:3000/api/posts',{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
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