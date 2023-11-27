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
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">SIGN IN YOUR ACCOUNT</p>
      <v-form @submit.prevent="handleLogin">

      <v-container>
        <v-text-field
        type="Email"
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
        type="password"
      ></v-text-field>
    </v-container> 
    
    
    <v-card-actions>
      <v-spacer></v-spacer>
      
      <v-btn class="text-center" type="submit" color="success">
        <span v-if="!loginloading">Sign in</span>
        <span v-else>Loading...</span>
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-actions class="align-center">Create an Account 
      <v-btn text to="/userRegistration" class="text-center" color="success" >Sign Up</v-btn>
    </v-card-actions>
  </v-form>
  <div class="pb-3">
    <v-btn>
      <router-link color="success" to="/forgot-password" class="button3" style="text-decoration: none;">Forgot-Password</router-link>
    </v-btn>
  </div>
  </v-card>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import router from '../router/index'
import { useAuthStore } from '@/store/index.js';
import { ref } from 'vue';
import { onMounted } from 'vue';
import loadingComponent from './loadingpages/loadingComponent.vue';
export default {
  name: 'HelloWorld',
  components:{
    loadingComponent
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loginloading = ref(false)
    const routes = router;
    const user = ref('')

    const loading = ref(true);

    onMounted(() => {
      // Simulate loading content (replace with your actual loading logic)
      setTimeout(() => {
        loading.value = false; // Set loading to false when content is ready
      }, 2000); // Simulate a 2-second loading time (adjust as needed)
    });

    const getUser = localStorage.getItem('user');
    user.value = JSON.parse(getUser)

    const handleLogin = async () => {
      if (email.value === '' || password.value === '') {
        error.value = 'Fill in Empty Inputs'
      } else {
        // Simulate an asynchronous login operation (replace this with your actual login logic)
        let response;
        try {
           response = await AuthenticationService.login({
            email: email.value,
            password: password.value,
          });
          loginloading.value = true;
          error.value = '';
          setTimeout(() => {
      
              if (response.data.user.flag == 2) {
                routes.push('/accountDeleted');
              }else if(response.data.user.flag == 0){
                routes.push('/accountTemporarilyLocked');
              }else{
                const authStore = useAuthStore()
                // Set the user and token
                authStore.setUser(response.data.user); // Assuming the user data is in response.data.user
                authStore.setTokens(response.data.accessToken, response.data.refreshToken)
                if (response.data.user.user_role == 'user') {
                  routes.push('/user/dashboard');
                } else if (response.data.user.user_role == 'enforcer') {
                  routes.push('/enforcer/enforcerDashboard');
                } else if (response.data.user.user_role == 'admin') {
                  routes.push('/admin/adminDashboard')
                } else {
                  loginloading.value = false; // Reset loading to false
                }
              }
  
        }, 1000);
        } catch (err) {
          error.value = err.response.data.msg
          loginloading.value = false; // Reset loading to false
        }
      }
    }

    const backtoDashboard = () => {
      try {
        if (user.value !== '') {
          if (user.value.user_role === 'user') {
            routes.push('/user/dashboard');
          } else if (user.value.user_role == 'enforcer') {
            routes.push('/enforcer/enforcerDashboard');
          } else if (user.value.user_role == 'admin') {
            routes.push('/admin/adminDashboard')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      backtoDashboard();
    })
    return { email, password, error, loginloading, loading, handleLogin }
  }
}
</script>
