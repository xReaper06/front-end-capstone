<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 mt-5">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="text-center">OTP Verification</h2>
            <form @submit.prevent="handleVerificationEmail">
            <div class="otp-input-container">
                <input v-model="otp[0]" class="otp-input" type="text" maxlength="1" pattern="\d" required>
                <input v-model="otp[1]" class="otp-input" type="text" maxlength="1" pattern="\d" required>
                <input v-model="otp[2]" class="otp-input" type="text" maxlength="1" pattern="\d" required>
                <input v-model="otp[3]" class="otp-input" type="text" maxlength="1" pattern="\d" required>
            </div>
            <button type="submit">Verify Account</button>
        </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
const otp = ref(['','','','']);
const token = ref('')
const route = useRoute();
const router = useRouter();
token.value = route.params.token;
const handleVerificationEmail = async () => {
    const headers = {
            'Content-Type': 'application/json', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
    
        const config = { headers }
    try {
      const endteredOTP = otp.value.join('')
      console.log(parseInt(endteredOTP))
        const response = await axios.post('http://localhost:8081/api/verifyEmail',
        {verification_code: parseInt(endteredOTP)},config)
            
        if (response) {
            router.push('/');
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<style scoped>
   form {
            text-align: center;
            padding: 20px;
        }

        .otp-input-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .otp-input {
            width: 50px;
            height: 50px;
            font-size: 20px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #45a049;
        }
</style>


