<template>
  <dashboardSidebarVue>
    <h2 class="ms-16 mt-5"><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span>Home</h2>
    <v-row>
      <v-col cols="5">
        <v-card>
          <v-card-title>Verified Users {{ countVerifiedusers }}</v-card-title>
          <!-- Add content for Verified Users here -->
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title>Verified License {{ License.length }}</v-card-title>
          <!-- Add content for Verified License here -->
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title>License Need To Verify {{ NotVerified.length }}  <v-btn to="/admin/adminVerifications">View</v-btn></v-card-title>
          <!-- Add content for Verified License here -->
        </v-card>
      </v-col>
      <v-col cols="3" v-if="!showViolations">
        <v-card>
          <v-card-title>Violators <v-btn @click="ViewViolators">View</v-btn></v-card-title>
          <!-- Add content for Impound Units here -->
        </v-card>
      </v-col>
      <v-col cols="3" v-else>
        <v-card>
          <v-card-title>Users <v-btn @click="ViewUsers">View</v-btn></v-card-title>
          <!-- Add content for Normal Violations here -->
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card v-if="showViolations">
          <h6 class="text-center">Violations</h6>
          <canvas id="lineChart" height="450" width="500"></canvas>
        </v-card>
      </v-col>
      <v-col cols="10" >
        <v-card v-if="showUsers">
          <h6 class="text-center">Users</h6>
          <canvas id="pieChart" height="350" width="350"></canvas>
        </v-card>
      </v-col>
    </v-row>
  </dashboardSidebarVue>
</template>

<script setup>
/* eslint-disable */
import dashboardSidebarVue from './tools/dashboardSidebar.vue';
import AuthenticationService from '@/services/AuthenticationService';
import { onMounted,ref,computed } from 'vue';
import Chart from 'chart.js/auto';

const users = ref([]);
const violators = ref([])
const License = ref([])
const showUsers = ref(false);
const showViolations = ref(true);
const NotVerified = ref([]);
let countImpoundValue = ref('');
let countNormalValue = ref('')
let countOnlineValue = ref('')
let countOfflineValue = ref('')


const getAllViolations = async ()=>{
  try {
    const response = await AuthenticationService.getAllViolators();
    if(response){
      violators.value = response.data.violators
      countImpoundValue.value = countImpound.value
      countNormalValue.value = countNormal.value
    }
  } catch (error) {
    console.log(error)
  }
}

const getAllUsers = async()=>{
  try {
    const response = await AuthenticationService.getAllUsers();
    if(response){
      users.value =response.data.allUsers
      console.log('Online Users:', countOnlineUsers.value);
      countOnlineValue.value = countOnlineUsers.value
      console.log('Offline Users:', countOfflineUsers.value);
      countOfflineValue.value = countOfflineUsers.value

console.log('Verified Users:', countVerifiedusers.value);
    }
  } catch (error) {
    console.log(error)
  }
}
const getAllNotVerified = async()=>{
  try{
    const response = await AuthenticationService.getAllLicenseNotYetVerified();
    if(response){
      NotVerified.value = response.data.licenses
    }
  }catch(error){
    console.log(error)
  }
}
const getAllLicense = async()=>{
  try {
    const response = await AuthenticationService.getAllLicenseVerified()
    if(response){
      License.value = response.data.licenses

    }
  } catch (error) {
    console.log(error)
  }
}
const countOnlineUsers = computed(()=>{
  return users.value.filter((user)=>user.status === 'online' && user.user_role === 'user').length
})
const countOfflineUsers = computed(()=>{
  return users.value.filter((user)=>user.status === 'offline' && user.user_role === 'user').length
})
const countVerifiedusers = computed(()=>{
  return users.value.filter((user)=>user.email_verified != null).length
})
const countImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound').length;
})
const countNormal =computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal').length;
})
const PoblacionImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Poblacion').length;
})
const PoblacionNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Poblacion').length;
})
const CatarmanImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Catarman').length;
})
const CatarmanNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Catarman').length;
})
const IbabaoImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Ibabao').length;
})
const IbabaoNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Ibabao').length;
})
const AlegriaImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Alegria').length;
})
const AlegriaNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Alegria').length;
})
const GabiImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Gabi').length;
})
const GabiNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Gabi').length;
})
const GilutunganImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Gilutungan').length;
})
const GilutunganNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Gilutungan').length;
})
const PilipogImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Pilipog').length;
})
const PilipogNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Pilipog').length;
})
const DapitanImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Dapitan').length;
})
const DapitanNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Dapitan').length;
})
const BuagsongImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Buagsong').length;
})
const BuagsongNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Buagsong').length;
})
const DayasImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Day-as').length;
})
const DayasNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Day-as').length;
})
const BangbangImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Bangbang').length;
})
const BangbangNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Bangbang').length;
})
const CogonImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Cogon').length;
})
const CogonNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Cogon').length;
})


// Define the data for the chart



onMounted(async() => {
 await getAllLicense();
 await getAllNotVerified();
});

const ViewViolators = onMounted(async()=>{
  showViolations.value = true;
  showUsers.value = false;
  await getAllViolations();
  const linebardata = {
  labels: ['Poblacion', 'Catarman', 'Ibabao', 'Alegria', 'Gabi', 'Gilutungan', 'Pilipog', 'Dapitan', 'Buagsong', 'Day-as', 'Bangbang', 'Cogon'],
  datasets: [
    {
      label: 'Impound (' + countImpound.value + ')',
      data: [PoblacionImpound.value, CatarmanImpound.value, IbabaoImpound.value, AlegriaImpound.value, GabiImpound.value, GilutunganImpound.value, PilipogImpound.value, DapitanImpound.value, BuagsongImpound.value, DayasImpound.value, BangbangImpound.value, CogonImpound.value],
      borderColor: 'blue',
      fill: false,
    },
    {
      label: 'Normal (' + countNormal.value + ')',
      data: [PoblacionNormal.value, CatarmanNormal.value, IbabaoNormal.value, AlegriaNormal.value, GabiNormal.value, GilutunganNormal.value, PilipogNormal.value, DapitanNormal.value, BuagsongNormal.value, DayasNormal.value, BangbangNormal.value, CogonNormal.value],
      borderColor: 'red',
      fill: false,
    },
  ],
};



const linebarconfig = {
  type: 'line',
  data: linebardata,
  options: {},
};

  const linebar = document.getElementById('lineChart');
  const lineChart = new Chart(linebar, linebarconfig); // Create a new chart instance
})


const ViewUsers = onMounted(async()=>{
  showViolations.value = false;
  showUsers.value = true;
  await getAllUsers();
  const violatorData = [{
  label: 'Users',
  data: [
    countOfflineValue.value,
    countOnlineValue.value
  ],
  backgroundColor: [
    'rgba(7, 0, 7, 0.69)',
    'rgba(7, 222, 7, 0.8)'
  ],
  hoverOffset: 4
}];

const piedata = {
  labels: ['Offline ( '+countOfflineValue.value+' )', 'Online ( '+countOnlineValue.value+' )'],
  datasets: violatorData
};
const pieconfig = {
  type: 'pie',
  data: piedata,
};
  const pie = document.getElementById('pieChart');
  const pieChart = new Chart(pie, pieconfig); 
})

</script>
