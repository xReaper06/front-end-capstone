<template>
    <div>
      <appbarVue/>
        <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card elevation="5" >
        <h1 class="text-center">Settings</h1>
      <div class="button-container">
        <button class="nav-button" @click="openModal">Change Profile</button>
        <button class="nav-button" @click="changepassModal">Change Password</button>
      </div>


      <enforcerChangePicVue :show-modal="showModal" @close-modal="closeModal"/>
    <enforcerChangePass :show-change-pass-modal="showChangePassModal" @close-change-pass-modal="closeChangePassModal"/>

    <navigationEnforcer class="fixed-bottom"/>
</v-card>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>

<script setup>
import appbarVue from './appbar.vue';
import navigationEnforcer from './navigationEnforcer.vue';
import enforcerChangePass from './enforcerChangePass.vue';
import enforcerChangePicVue from './enforcerChangePic.vue';
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
  
 .custom-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #171717;
  color: #F0EEEF;

}

/* Custom styles for the buttons */
.custom-button {
  background-color: #007AFF;
  color: #ffffff;
  font-weight: 600;
  border: none;
  margin: 5px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(2px);
  }
}

</style>