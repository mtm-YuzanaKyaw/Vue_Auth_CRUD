<template>
    <h3 class="text-center">SignIn</h3>
    <div class="col-lg-6 offset-lg-3 col-md-10 col-sm-12">
        <form action="" @submit.prevent="signin" class="m-2">
            <div class="form-group mt-3">
                <label for="email" class="form-label">Email</label>
                <input 
                    v-model="user.email"
                    type="text" 
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
                email: '',
                password: ''
            },
            error: '',
            signedIn: false
        }
    }, 
    methods: {
        setError (error, text) {
            this.error = (error.response && error.response.data && error.response.data.error) || text
        },
        signin() {
            axios.post('http://localhost:3000/login',{user: this.user})
            .then(response=>{
                console.log(response.data.status.token)
                
                localStorage.setItem('token',response.data.status.token)
                alert(response.data.status.message)
                this.$router.push({name: 'home'})
            })
        },
        isSignedIn() {
            if(localStorage.token == null){
                this.signedIn = false
                this.$router.push({name: 'signin'})               
            }
            else{
                this.signedIn = false
                this.$router.push({name: 'home'})
            }
        }
    },created(){
        this.isSignedIn()
    },updated(){
        this.isSignedIn()
    }
}
</script>
