<template>
    <div class="offset-lg-3 col-lg-6 col-md-12 col-sm-12">
        <h3 class="text-center">Post Edit</h3>
        <form action="" @submit.prevent="updatePost" class="p-3">
            <div class="form-gruop">
                <label for="name" class="form-label">Title</label>
                <input type="text"
                    v-model="post.title" 
                    name="title" id="title" 
                    class="form-control">
            </div>
            <div class="form-gruop">
                <label for="artistName" class="form-label">Content</label>
                <textarea rows="10" 
                    v-model="post.content"
                    name="content" id="content"
                    class="form-control"></textarea>
            </div>
            <input type="submit" value="Edit Post" class="btn btn-primary my-2">
        </form>
    </div>

</template>

<script>
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

export default {
    data() {
        return {
            post : [],
            currentUser: '',
            post_id : this.$route.params.id
        }
    },
    methods: {
        updatePost() {
            if(this.currentUser == this.post.user_id){
                axios.put(`http://localhost:3000/api/posts/${this.post_id}`,this.post,{
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response=>{
                    this.post = []
                    alert("Update Post Successfully!")
                    this.$router.push({name: 'posts'})
                })
                .catch(error=>{
                    console.log(error)
                })
            }else{
                alert("You don't have permission to edit this route")
            }
        }
    },
    mounted(){
        const decodeData = jwtDecode(localStorage.getItem('token'))
        this.currentUser = decodeData.sub
        axios.get(`http://localhost:3000/api/posts/${this.post_id}`,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response=>{
            this.post= response.data
        })
        .catch(error=>console.log(error))
    }
}

</script>