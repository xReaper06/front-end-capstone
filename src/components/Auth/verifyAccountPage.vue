<template>
    <loadingComponent v-if="loading" :isLoading="loading">
    </loadingComponent>
    <div class="pt-5 mt-5 authentication" v-else>
      <v-alert v-if="error"
    color="error"
    icon="$error"
    title="Error"
    :text="error"
  ></v-alert>
      <v-container fluid class="mt-3 pt-5 pa-3">
        <v-card
        class="mx-auto pt-5 mt-5 registration elevation-16 text-center" max-width="344"
        >
        <img src="tiavvsLogo.png" alt="" srcset="" style="height: 75px; width: 75px;">
        <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">Account is Not verified</p>
  
        <v-container>
         <v-btn @click="sendEmailtoVerify">Send to your Email</v-btn>
      </v-container> 
      
      <v-divider></v-divider>
      <v-container>
        <v-card-actions>
          <v-btn class="bg-danger" @click="logout">
            Logout
          </v-btn>
        </v-card-actions>
      </v-container>
   
    </v-card>
      </v-container>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import AuthenticationService from '@/services/AuthenticationService';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';


const user =ref('');
const email = ref('');
const id = ref('')
user.value = localStorage.getItem('user')
email.value = JSON.parse(user.value)
const routes = useRouter();

const sendEmailtoVerify = async()=>{
    try {
        const response = await AuthenticationService.sendEmailtoVerify({
          id:email.value.id,
            email:email.value.email
        })
        if(response){
            console.log(response.data.msg)
            logout()
        }
    } catch (error) {
        console.log(error)
    }
}
const logout = async ()=>{
      try{  
          const authStore = useAuthStore();
          id.value = JSON.parse(user.value)
          const response = await AuthenticationService.logout({id:id.value.id});
          if(!response){
            console.log('Cannot Logout');
          }
          authStore.logOut()
          routes.push('/')
      }catch(err){
          console.error('Error Logout')
      }
    }

</script>
