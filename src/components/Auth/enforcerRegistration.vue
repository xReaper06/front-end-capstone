<template>
  <div class="pt-5 mt-5 authentication">
    <v-container fluid class="mt-3 pt-5 pa-3">
      <v-card
      class="mx-auto pt-5 mt-5 registration elevation-16 text-center" max-width="344"
      >
      <img src="../tiavvsLogo.png" alt="" srcset="" style="height: 75px; width: 75px;">
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">ENFORCER SIGN UP</p>
      <v-form @submit.prevent="enforcerRegistration">

      <v-container>
        <v-text-field
        v-model="nickname"
        color="primary"
        label="nickname"
        variant="underlined" @keyup="checkNickname"
        required
      ></v-text-field>
      <div class="text-error" v-if="nicknameHasSpaces"><span>
        {{ nicknameMsg }}
      </span>
    </div>
        <v-text-field
        type="Email"
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
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
        label="confirm Password"
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
        <span v-if="!loading">Sign up</span>
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
import {ref} from 'vue';
import axios from 'axios';
import { useRoute,useRouter } from 'vue-router';

 const nickname = ref('');
    const email = ref('')
    const password = ref('');
    const confirm_password = ref('');
    const msg = ref(null);
    const loading = ref(false)
    const nicknameHasSpaces = ref(false);
    const nicknameMsg = ref(null);
    const passmsg = ref(null);
    const passmsgVisible = ref(false)
    const token = ref('')
    const route = useRoute();
    const router = useRouter();
    token.value = route.params.token;

    const checkNickname = () => {
      if(nickname.value.includes(' ')){
        nicknameHasSpaces.value = true;
        nicknameMsg.value = "Please Remove the spaces";
      }else if(nickname.value == ''){
        nicknameHasSpaces.value = false;
      }else{
        nicknameHasSpaces.value = false;
      }
     
    };
    
    const isStrongPassword = () => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password.value);
  const hasLowercase = /[a-z]/.test(password.value);
  const hasNumber = /\d/.test(password.value);

  // Check if the password meets the criteria
  if (
    password.value.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    passmsgVisible.value = false;
    passmsg.value = "Password is Strong";
  } else if(password.value == ''){
    passmsgVisible.value = false;
  } else {
    passmsgVisible.value = true;
    passmsg.value = "Password is Weak";
  }
};


    const enforcerRegistration = async ()=>{
      const headers = {
            'Content-Type': 'application/json', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
    
        const config = { headers }
      loading.value = true;
      if (password.value !== confirm_password.value) {
        msg.value = "Password doesn't match";
        loading.value = false;
      } else {
        try {
          if(email.value === '' || nickname.value === '' || password.value === '' || confirm_password.value === ''){
            msg.value = 'Empty Inputs';
        loading.value = false;
          }else{
            const response = await axios.post('http://localhost:8084/api/enforcer-registration',{
              nickname:nickname.value,
              email:email.value,
              password:password.value
            },config);
            if(response){
              setTimeout(() => {
                email.value= ''
                nickname.value = '';
                password.value = '';
                confirm_password.value = '';
                msg.value = response.data.msg; // Set success message
              },1000)
              router.push('/');
          loading.value = false;
            }
          }
        } catch (err) {
          console.error(err);
          msg.value = err.response.data.msg;
        loading.value = false;
        }
      }
    }
</script>

