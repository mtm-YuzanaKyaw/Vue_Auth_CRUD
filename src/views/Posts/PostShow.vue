<template>
    <div class="offset-lg-3 col-lg-6 col-md-12 col-sm-12 ">
        <div>
            <div class="card m-2 p-3">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.content }}</p>
                  
              </div>
              <router-link to="/posts" class="btn btn-secondary m-2"> Post List </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            post_id : this.$route.params.id,
            post: []
        }
    },
    mounted(){
        axios.get(`http://localhost:3000/api/posts/${this.post_id}`,{
            headers: {
                "Authorization" : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response=>{
            this.post = response.data
            // console.log(this.post)
        }).catch(error => console.log(error))
    }
}
</script>