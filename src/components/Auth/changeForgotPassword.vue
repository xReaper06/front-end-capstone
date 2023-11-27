<template>
  <div class="pt-5 mt-5 authentication">
    <v-container fluid class="mt-3 pt-5 pa-3">
      <v-card
      class="mx-auto pt-5 mt-5 registration elevation-16 text-center" max-width="344"
      >
      <img src="../tiavvsLogo.png" alt="" srcset="" style="height: 75px; width: 75px;">
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">NEW PASSWORD</p>
      <v-form @submit.prevent="handleChangePassword">

      <v-container>
   
      <v-text-field
        v-model="password"
        color="primary"
        label="New Password"
        placeholder="Enter your password"
        variant="underlined"
        type="password"
        required
        @keyup="isStrongPassword"
      ></v-text-field>
      <div class="text-error" v-if="passmsgVisible">
              {{ passmsg }}
            </div>
      <v-text-field
        v-model="confirm_password"
        color="primary"
        label="confirm New Password"
        placeholder="Enter your password"
        variant="underlined"
        required
        type="password"
      ></v-text-field>
    </v-container> 
    <div class="text-danger">{{ error }}</div>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      
      <v-btn class="text-center" type="submit" color="success" :disabled="loading">
        <span v-if="!loading">Submit New Password</span>
        <span v-else>Loading...</span>
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
  </v-form>
  </v-card>
    </v-container>
  </div>

</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute,useRouter } from "vue-router";

const confirm_password = ref('');
const password = ref('');
const token = ref('')
const msg = ref('')
const route = useRoute();
const router = useRouter();
token.value = route.params.token;

const isStrongPassword = (password) => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  // Check if the password meets the criteria
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  );
};

const handleChangePassword = async()=>{
    if(confirm_password.value !== password.value){
        msg.value ='Password doesnt Match'
    }else if (!isStrongPassword(password.value)) {
    msg.value = 'Password is not strong enough';
  } else {

    const headers = {
            'Content-Type': 'application/json', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
    
        const config = { headers }
        try {
            const response = await axios.post('http://localhost:8084/api/change-forgot-password',{
                password:password.value
            },config);
            if(response){
                console.log(response.data);
                router.push('/');
            }
            console.log(response.data.msg);
        } catch (error) {
            console.log(error)
        }
    }
}

</script>
