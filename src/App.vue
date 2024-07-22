<template>
  <div id="app">
    <Header :isAuth="isSignin" :currentUser="currentUser" @signout="handleSignout" />
    <route-view :currentUser="currentUser" class="m-2"/>
  </div>
  
</template>

<script>
import { ref,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export default {
  components: {
    Header
  },
  setup(){
    const isSignin = ref(false)
    const currentUser = ref({})
    const route = useRoute()
    const router = useRouter()

    watch(route ,() => {
      const userToken = localStorage.getItem('token')
      isSignin.value = !!userToken
      if(isSignin.value){
        const user_id = jwtDecode(userToken).sub
        axios.get(`http://localhost:3000/api/users/${user_id}`)
        .then(response=> {
          currentUser.value = response.data
        }).catch(error=>{console.log(error)})
      }
    })

    const handleSignout = () => {
      localStorage.removeItem('token')
      isSignin.value = false
      currentUser.value = {}
      router.push('/login')
    }

    return {
      isSignin,
      currentUser,
      handleSignout
    }
    
  }
  
}
</script>
