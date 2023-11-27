<template>
  <div class="pt-5 mt-5 authentication">
    <v-container fluid class="mt-3 pt-5 pa-3">
      <div v-if="success">
        <v-alert
    color="success"
    icon="$success"
    title="Success"
    :text="msg"
  ></v-alert>
      </div>
      <div v-if="error">
        <v-alert
    color="error"
    icon="$error"
    title="Error"
    :text="msg"
  ></v-alert>
      </div>
      <v-card
      class="mx-auto pt-5 mt-5 registration elevation-16 text-center" max-width="344"
      >
      <img src="tiavvsLogo.png" alt="" srcset="" style="height: 75px; width: 75px;">
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">SIGN UP ACCOUNT</p>
      <v-form @submit.prevent="userRegistration">

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
    
    <v-card-actions>
      <v-spacer></v-spacer>
      
      <v-btn class="text-center" type="submit" color="success">
        <span v-if="!loading">Sign up</span>
        <span v-else>Loading...</span>
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
  </v-form>
  <div class="pb-3">
    <v-card-actions class="align-center ms-3">I already have an 
      <router-link to="/" class="text-center ms-1" color="success"> Account</router-link>
    </v-card-actions>
  </div>
  </v-card>
    </v-container>
  </div>

</template>

<script setup>
import router from '@/router';
import AuthenticationService from '@/services/AuthenticationService';
import { ref } from 'vue';

    const nickname = ref('');
    const email = ref('')
    const password = ref('');
    const confirm_password = ref('');
    const msg = ref(null);
    const loading = ref(false)
    const passmsg = ref(null)
    const passmsgVisible = ref(false);
    const nicknameHasSpaces = ref(false);
    const nicknameMsg = ref(null);
    const error = ref(false);
    const success = ref(false);

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

    const userRegistration = async ()=>{
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
            const response = await AuthenticationService.userRegistration({
              nickname:nickname.value,
              email:email.value,
              password:password.value
            });
            if(response){
              setTimeout(() => {
                email.value= ''
                nickname.value = '';
                password.value = '';
                confirm_password.value = '';
                success.value = true;
                msg.value = response.data.msg; // Set success message
              },2000)
          router.push('/');
            }
          }
        } catch (err) {
          console.error(err);
          error.value = true
          msg.value = err.response.data.msg;
        loading.value = false;
        }
      }
    }
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* This centers vertically within the viewport */
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 0.4em;
  background-color: #171717;
  border-radius: 20px;
}

#heading {
  text-align: center;
  margin: 2em;
  color: rgb(0, 255, 200);
  font-size: 1.2em;
}

.field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}

.input-icon {
  height: 1.3em;
  width: 4.7em;
  fill: rgb(0, 255, 200);
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: rgb(0, 255, 200);
}

.form .btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2.5em;
}

.button1 {
  padding: 0.5em;
  padding-left: 1.1em;
  padding-right: 1.1em;
  border-radius: 5px;
  margin-right: 0.5em;
  border: none;
  outline: none;
  transition: .4s ease-in-out;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  color: rgb(0, 0, 0);
}

.button1:hover {
  background-image: linear-gradient(163deg, #00642f 0%, #13034b 100%);
  color: rgb(0, 255, 200);
}

.button2 {
  padding: 0.5em;
  padding-left: 2.3em;
  padding-right: 2.3em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: .4s ease-in-out;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  color: rgb(0, 0, 0);
}

.button2:hover {
  background-image: linear-gradient(163deg, #00642f 0%, #13034b 100%);
  color: rgb(0, 255, 200);
}

.button3 {
  margin-bottom: 3em;
  padding: 0.5em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: .4s ease-in-out;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  color: rgb(0, 0, 0);
  text-align: center;
}

.button3:hover {
  background-image: linear-gradient(163deg, #a00000fa 0%, #d10050 100%);
  color: rgb(255, 255, 255);
}

.card {
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 22px;
  transition: all .3s;
}

.card2 {
  border-radius: 0;
  transition: all .2s;
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
}
a.router-link-exact-active {
  text-decoration: none;
}
.card:hover {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
}</style>

