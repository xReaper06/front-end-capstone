<template>
    <div>
        <adminNav/>
        <h1 class="text-center">Settings</h1>
        <div v-if="showmsg">
          <v-alert
    type="success"
    color="success"
    icon="$success"
    title="Success"
    :text="msg"
  ></v-alert>
        </div>
      <div class="button-container">
        <button class="nav-button" @click="openModal">Change Profile</button>
        <button class="nav-button" @click="changepassModal">Change Password</button>
      </div>
      <adminChangePic :show-modal="showModal" @close-modal="closeModal"/>
      <adminChangePass :show-change-pass-modal="showChangePassModal" @close-change-pass-modal="closeChangePassModal"/>
    </div>
</template>

<script setup>
import adminNav from './adminNav.vue';
import adminChangePass from './adminChangePass.vue';
import adminChangePic from './adminChangePic.vue';
import { ref } from 'vue';
  
  const showmsg = ref(false);
  const msg = ref('')
  const showModal = ref(false);
  const showChangePassModal = ref(false)

  const changepassModal = ()=>{
    showChangePassModal.value = true
  }
  const closeChangePassModal =()=>{
    showChangePassModal.value = false
  }
  const openModal = () => {
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  </script>
  <style scoped>
  /* Styles for centering the buttons */
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* Stack buttons vertically */
    margin-top: 20px; /* Optional spacing from the navigation bar */
  }
  
  /* Style for the navigation buttons */
  .nav-button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px; /* Add some spacing between buttons */
  }
  
  .nav-button:hover {
    background-color: #0056b3;
  }
  </style>