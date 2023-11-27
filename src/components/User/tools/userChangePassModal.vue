<template>
    <div class="modal" v-if="props.showChangePassModal">
      <div class="modal-content">
        <span class="close" @click="closeChangePassModal">&times;</span>
        <!-- Display the modal content passed as a prop -->
        <div class="container">
    <h2>Change Password</h2>
      <div class="form-group">
        <label for="newPassword">New Password</label>
        <input type="password" id="newPassword" v-model="newPassword" required @keyup="handleStrongVerification">
      </div>
      <div v-if="showPassmsg">
    {{ passmsg }}
    </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm New Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required @keyup="checkifThesame">
      </div>
      <div v-if="showCheckPass">
    {{ checkmsg }}
    </div>
    <div v-if="showSubmitButton">
        <button type="button" class="btn" @click="submitChangePassword">Change Password</button>
    </div>
  </div>
      </div>
    </div>
  </template>
  
  <script setup>
import {  ref,defineProps, defineEmits,watchEffect } from "vue";
import authenticationService from '@/services/AuthenticationService';
  
  const props = defineProps({
    showChangePassModal: Boolean,       // Whether to show the modal
  });
  
  const emits = defineEmits(["closeChangePassModal"]);
  
  const closeChangePassModal = () => {
    emits("closeChangePassModal");
  };
  const confirmPassword = ref('')
  const newPassword = ref('')
  const showPassmsg = ref(false);
  const passmsg = ref(null)
  const checkmsg = ref(null)
  const showCheckPass = ref(false)
  const showSubmitButton = ref(false);
  const user = ref('');
    const username = ref('');

    user.value = localStorage.getItem('user');
      username.value = JSON.parse(user.value);

const handleStrongVerification = ()=>{
    const minLength = 8;
  const hasUppercase = /[A-Z]/.test(newPassword.value);
  const hasLowercase = /[a-z]/.test(newPassword.value);
  const hasNumber = /\d/.test(newPassword.value);

  // Check if the newPassword meets the criteria
  if (
    newPassword.value.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    showPassmsg.value = true;
    passmsg.value = "newPassword is Strong";
  } else if(newPassword.value == ''){
    showPassmsg.value = false;
  } else {
    showPassmsg.value = true;
    passmsg.value = "newPassword is Weak";
  }
}
const checkifThesame = ()=>{
    if(newPassword.value === confirmPassword.value){
        showCheckPass.value = true
        checkmsg.value = 'Password is valid'
    }else if(confirmPassword.value === ''){
        showCheckPass.value = false
    }else{
        showCheckPass.value = true
        checkmsg.value = 'Password is not The Same'
    }
}
watchEffect(()=>{
    if(passmsg.value === "newPassword is Strong" && checkmsg.value === 'Password is valid'){
        showSubmitButton.value = true
    }else{
        showSubmitButton.value = false
    }
})


const submitChangePassword = async ()=>{
    try {
        const response = await authenticationService.changePassword({
            user_id:username.value.id,
            password:newPassword.value
        })
        if(response){
            newPassword.value=''
            confirmPassword.value = ''
            showCheckPass.value = false
            showPassmsg.value = false
        }else{
            console.log(response.data.msg)
        }
    } catch (error) {
        console.log(error)
    }
}
  </script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Styles for the modal content */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 80%;
  max-width: 400px;
}

/* Close button */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.container {
            background-color: #fff;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            margin-top: 50px;
        }

        h2 {
            text-align: center;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            font-weight: bold;
        }

        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        .btn {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #0056b3;
        }
</style>