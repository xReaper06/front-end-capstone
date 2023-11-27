<template>
  <UserNav>
    <div v-if="showUpdateForm">
      <v-container>
        <v-card class="mx-auto" max-width="900">
          <v-card-title class="text-h6 text-center">
            Your License is Expired Please Renew it and update License Data
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" to="/user/updateLicense">Update Your License</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
    <div v-else>
      <v-container v-if="showLicense">
      <h1 class="text-center mt-5 mb-5">MY LICENSE</h1>
      <v-card class="mx-auto" max-width="600">
        <v-img :src="'http://localhost:8081/api/images/'+ myLicense[0].front_pic" max-height="600px" max-width="600px" cover></v-img>
  
        <v-card-title class="text-h6 text-center">
          {{ formattedName }}
        </v-card-title>
  
        <v-card-subtitle class="text-caption text-center">
          <div>My License Number: {{ myLicense[0].license_no }}</div>
          <v-chip small color="green" class="ml-2">Verified</v-chip>
        </v-card-subtitle>
  
        <v-divider></v-divider>
  
        <v-card-actions>
          <v-btn color="orange-lighten-2" text @click="exploreLicense">
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="toggleDescription">
            <v-icon>{{ showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
  
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              <h4>Address: {{ myLicense[0].street }} {{ myLicense[0].baranggay }} {{ myLicense[0].city }} {{ myLicense[0].province }}</h4>
              <h4>Personal Info: <br> <br><h6 class="ms-5">
                Birthday: {{ myLicense[0].date_of_birth }} <br>
                Blood Type: {{ myLicense[0].blood_type }} <br>
                Eye Color: {{ myLicense[0].eye_color }} <br>
                Sex: {{ myLicense[0].sex }} <br>
                Nationality: {{ myLicense[0].nationality }} <br>
                Weight: {{ myLicense[0].weight }} <br>
                Height: {{ myLicense[0].height }}
              </h6>
              </h4>
              <h4>License Info: <br> <br> <h6 class="ms-5">
                Agency Code: {{ myLicense[0].agency_code }} <br>
                Conditions: {{ myLicense[0].conditions }} <br>
                Restrictions: {{ myLicense[0].restrictions }} <br>
                Expiration Date: {{ myLicense[0].expiration_date }}
              </h6></h4>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
      <v-container v-else>
        <v-card class="mx-auto" max-width="900">
          <v-card-title class="text-h6 text-center">
            You dont have a License Yet Please Add Your License
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn to="/user/addLicense">Add License</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </UserNav>
</template>
 
 <script setup>
 import { useAuthStore } from '@/store';
import AuthenticationService from '@/services/AuthenticationService';
import UserNav from './tools/userNav.vue'
import { ref } from 'vue';
import { computed,onMounted } from 'vue';


    const myLicense = ref(null)
     const show = ref(true)
     const user = ref('')
     const first_name = ref('')
     const last_name = ref('')
     const middle_name = ref('');
     const showLicense = ref(false)
     const authStore = useAuthStore();
     const showUpdateForm = ref(false);
     const toggleDescription = () => {
  show.value = !show.value;
};

    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);
    
    const getMyLicense = async () => {
      const num = parseInt(id.value.id)
      console.log(num)
  try {
    const response = await AuthenticationService.getMyLicense({
      user_id:num
    });
    if(response){
      authStore.setMyLicense(response.data.myLicense)
      myLicense.value = response.data.myLicense;
      if (myLicense.value.length > 0 && myLicense.value[0].is_verified == 2) {
        first_name.value = myLicense.value[0].first_name
        last_name.value = myLicense.value[0].last_name
        middle_name.value = myLicense.value[0].middle_name
        formattedName;
        showLicense.value = true;
      }else{
        showLicense.value = false
      }
      console.log(myLicense.value)
    }
  } catch (error) {
    console.error('Error in getMyLicense:', error);
  }
}



const formattedName = computed(() => {
  return `${first_name.value} ${last_name.value} ${middle_name.value.toUpperCase()}`;
});


onMounted(async()=>{
  await getMyLicense();
   const currentTimestamp = Date.now();
   
   // Create a new Date object using the timestamp
   const currentDate = new Date(currentTimestamp);
   
   // Use Date methods to get individual components (year, month, day, hours, minutes, seconds)
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
   const day = currentDate.getDate().toString().padStart(2, '0');
   
   
   // Create a formatted date string
   const formattedDate = `${year}-${month}-${day}`;
   if(formattedDate>=myLicense.value[0].expiration_date){
    showUpdateForm.value = true;
   }
 })

 
</script>
<style scope>

</style>