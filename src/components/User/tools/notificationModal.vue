<template>
  <userNav>
  <v-card class="elevation-6">
    <v-card-title class="text-h5 text-center">Notifications</v-card-title>
    <v-divider></v-divider>
    <div>
      <v-card v-for="notification in notifications" :key="notification.id" class="notification elevation-3 ms-5 me-5" :class="{ 'unread': notification.isRead === 0 }">
        <v-card-text class="notification-content text-h6 text-center">
          <p>{{ notification.message }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="markNotificationAsRead(notification)" v-if="notification.isRead === 0" class="ma-2">Mark as Read</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-card>
  </userNav>
  </template>

<script setup>
import {  ref } from "vue";
import { useRouter } from "vue-router";
import AuthenticationService from "@/services/AuthenticationService";
import { useAuthStore } from "@/store";
import userNav from './userNav.vue'
import { watchEffect } from "vue";

const router = useRouter();
const notifications = ref([]); // Initialize as an empty array
const authStore = useAuthStore()


notifications.value = authStore.notifications; // Populate the notifications array


const markNotificationAsRead = (notification)=> {
  try {
    const response = AuthenticationService.markNotificationAsRead({
      id:notification.id,
    })
    if(response){
      router.push('/user/myLicense')
    }
  } catch (error) {
    console.log(error)
  }
}
watchEffect(()=>{
  markNotificationAsRead();
})

</script>

<style scoped>
.notification {
  margin-bottom: 16px;
}

.unread {
  background-color: #f7f7f7;
  border-left: 4px solid #2196F3;
}

.notification-content {
  padding: 16px;
}

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