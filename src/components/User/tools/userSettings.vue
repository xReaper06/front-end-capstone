<template>
  <userNav>
    <!-- eslint-disable -->
    <div class="settings-container">
    <h1 class="text-center">Settings</h1>
    <div class="button-container">
      <v-btn class="nav-button" @click="openModal">Change Profile</v-btn>
      <v-btn class="nav-button" @click="changepassModal">Change Password</v-btn>
    </div>
  </div>
  </userNav>
  
  <userSettingModal :show-modal="showModal" @close-modal="closeModal" />
  
  <!-- Change Password Modal -->
  <userChangePassModal :show-change-pass-modal="showChangePassModal" @close-change-pass-modal="closeChangePassModal" />
  <!-- Change Profile Modal -->
  
</template>


<script setup>
/* eslint-disable */
  import userNav from './userNav.vue';
  import userSettingModal from './userSettingModal.vue';
  import userChangePassModal from './userChangePassModal.vue';
  import { ref } from 'vue';
  
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
  .settings-container {
  max-width: 600px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.nav-button {
  background-color: #2196F3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #1565C0;
}
  
  /* You can add more styles for modals if needed */
  </style>
  