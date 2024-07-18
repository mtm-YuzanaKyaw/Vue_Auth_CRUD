<template>
    <h3 class="text-center">SignIn</h3>
    <div class="col-lg-6 offset-lg-3 col-md-10 col-sm-12">
        <form action="" @submit.prevent="signin" class="m-2">
            <div class="form-group mt-3">
                <label for="name" class="form-label">Name</label>
                <input 
                    v-model="user.name"
                    type="text" 
                    name="name" id="name" 
                    class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="email" class="form-label">Email</label>
                <input 
                    v-model="user.email"
                    type="email" 
                    name="email" id="email" 
                    class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="" class="form-label">Password</label>
                <input 
                    v-model="user.password"
                    type="password" 
                    name="password" id="password"
                    class="form-control">
            </div>
            <input type="submit" value="Login" class="btn btn-primary mt-3">
        </form>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            user : {
                name: '',
                email: '',
                password: ''
            },
            error: ''
        }
    }, 
    methods: {
        signin() {
            axios.post('http://localhost:3000/signup',{user: this.user})
            .then(response=>{
                console.log(response.data.status.token)
                
                localStorage.setItem('auth_token',response.data.status.token)
                alert(response.data.status.message)
                this.$router.push({name: 'home'})
            })
        },
        isSignedIn() {
            if(localStorage.auth_token == null){
                this.$router.push({name: 'signin'})
            }
            else{
                this.$router.push({name: 'home'})
            }
        }
    }
}
</script>
