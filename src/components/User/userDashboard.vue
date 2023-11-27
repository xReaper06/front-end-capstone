<template>
    <UserNav>
      <v-container>
        <h1 class="text-center mt-5 mb-5">Home</h1>
<v-card class="elevation-6">
  <div class="ms-5">
    <p class="text-h4 text-center mt-3">Reminders!!!</p>
    <ul class="text-decoration-none">
      <li><p class="text-h6">Wear Your Helmet:</p> 
        <p class="text-muted">Always wear a helmet when riding a motorcycle.
          <br> Ensure that your helmet is properly fastened for maximum protection.</p>
        </li>
      <li><p class="text-h6">Stay Alert on the Road:</p><p class="text-muted">
        Be attentive to your surroundings.
    <br>
      Avoid distractions such as mobile phones while driving.
    </p></li>
      <li><p class="text-h6">No Racing on the Road:</p><p class="text-muted">
        Roads are not race tracks; prioritize safety over speed. <br>
        Follow speed limits and traffic regulations.
      </p></li>
      <li><p class="text-h6">Avoid Driving Under the Influence:</p><p class="text-muted">
        Never drive under the influence of alcohol or drugs. <br>
        Plan for alternative transportation if you are impaired.
      </p></li>
      <li><p class="text-h6">Carry Your Documents:</p><p class="text-muted">
        Always have your driver's license, vehicle registration, and insurance. <br>
        Keep these documents readily accessible in your vehicle.
      </p></li>
      <li><p class="text-h6">Prevent Road Rage:</p><p class="text-muted">Stay calm and composed while driving. <br>
        Avoid aggressive behavior and respect other road users.</p></li>
        <li><p class="text-h6">Remember, adhering to traffic safety rules not only protects you but also contributes to the overall safety of everyone on the road. Stay responsible and prioritize the well-being of yourself and others.
  </p></li>
    </ul>
    <p class="text-h6">If you have an issue you can call our 
      Hotlines: </p>
      <ul>
        <li>LTFRB: Mobile No. 0917-704-6862</li>
        <li>Cordova Police: #(032) 496 8164</li>
        <li>Cordova Rural Health Unit: #(032)496‐8031/520‐6132</li>
      </ul>
  </div>
</v-card>
      </v-container>
      <div class="container bg-white">
<div class="container">
  <h4 class="text-center">Implemented Municipal Traffic Ordinance</h4>
  <table class="table table-striped table-bordered table-responsive">
    <thead class="table-dark">
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Fine</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody v-for="violations in violationsList" :key="violations.id">
      <tr>
        <td>{{ violations.code }}</td>
        <td>{{ violations.name }}</td>
        <td>{{ violations.fine }}</td>
        <td>{{ violations.status }}</td>
      </tr>
    </tbody>
  </table>
</div>
</div>
    </UserNav>
</template>
  
  <script setup>
import AuthenticationService from '@/services/AuthenticationService'
import UserNav from './tools/userNav.vue'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref('')
const email_verified = ref('')
user.value = localStorage.getItem('user');
email_verified.value = JSON.parse(user.value)
const router = useRouter();
const getEmailVerify = ()=>{
  try {
    if (email_verified.value.email_verified === null) {
      router.push('/accountVerify')
    }else{
      return true
    }
  } catch (error) {
    console.log(error)
  }
}

const violationsList = ref([]);
  const getAllViolationsList = async()=>{
    try {
      const response = await AuthenticationService.getAllViolationList();
if (response) {
  const violationList = response.data.violationList; // Check the structure of the response
  violationsList.value = violationList
}

    } catch (error) {
      console.log(error)
    }
  }
    onMounted(()=>{
      getEmailVerify();
      getAllViolationsList();
    })
    

</script>
<style scoped>

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
}

.notification-icon {
  margin-right: 10px;
}

.notification-icon i {
  font-size: 24px;
  color: #007bff;
}

.notification-title {
  font-weight: bold;
  margin: 0;
}

.notification-message {
  margin: 0;
}

.notification-actions {
  display: flex;
  gap: 10px;
}

.notification-actions button {
  cursor: pointer;
}
.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.user-picture {
  border: 4px solid #7cdacc;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-picture svg {
  width: 2.5rem;
  fill: currentColor;
}

.name-client {
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
}

.name-client span {
  display: block;
  font-weight: 200;
  font-size: 16px;
}

.social-media {
  margin: 20px 0;
}

.social-media button {
  margin-right: 15px;
}

.tooltip-social {
  background: #262626;
}

.tooltip-social:after {
  border-top-color: #262626;
}
</style>