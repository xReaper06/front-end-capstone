<template>
  <div class="pt-5 mt-5 authentication">
    <v-container fluid class="mt-3 pt-5 pa-3">
      <v-card
      class="mx-auto pt-5 mt-5 registration elevation-16 text-center" max-width="344"
      >
      <img src="tiavvsLogo.png" alt="" srcset="" style="height: 75px; width: 75px;">
    <p>Forgot Password</p>

      <v-container>
        <v-text-field
        type="Email"
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
        required
      ></v-text-field>
    </v-container> 
    <div class="text-danger">{{ error }}</div>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      
      <v-btn class="text-center" @click="sendForgotPassword" color="success" :disabled="loading">
        <span v-if="!loading">Send Through Email</span>
        <span v-else>Loading...</span>
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
  <div class="pb-3">
    <v-card-actions class="align-center ms-3">
      <router-link to="/" class="text-center ms-1" color="success">Sign in Account</router-link>
    </v-card-actions>
  </div>
  </v-card>
    </v-container>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const email = ref('');
const msg = ref('')

const sendForgotPassword = async()=>{
    try {
        const response = await axios.post('http://localhost:8084/api/forgot-password',{
            email:email.value
        })
        if(response){
            email.value = null;
            msg.value = response.data.msg;
        }else{
            msg.value = response.data.msg;
        }
    } catch (error) {
        console.log(error)
    }
}
</script>
