<template>
  <div>
    <UserNav>
      <v-container fluid>
        <v-card class="elevations-4">
      <div v-if="notVerified == true || noLicense == true">
      <div v-if="notVerified">
        <v-alert
      color="warning"
      icon="$warning"
      title="Not Verified"
      text="Your License is not verify please wait for a moment for the admin to verify your account..."
    ></v-alert>
      </div>
      <div v-if="noLicense">
        <v-alert
      color="error"
      icon="$error"
      title="No License"
      text="You Dont have Any License Inserted"
    ></v-alert>
      </div> 
        
      </div>
      <div v-else>

        <v-card class="elevation-2">
      <v-card-title class="headline">My Violations</v-card-title>
      <v-card-subtitle v-if="showViolation">
        View and manage your violations
      </v-card-subtitle>
  
      <v-divider v-if="showViolation"></v-divider>
  
      <v-card-text>
        <v-list>
          <v-list-item-group v-if="showViolation" class="text-center">
            <v-list-item v-for="violator in Violations" :key="violator.id">
              <v-list-item-content>
                <v-list-item-title class="headline">Ticket Number: {{ violator.ticket_no }}</v-list-item-title>
                <v-list-item-subtitle>Unit: {{ violator.unit }}</v-list-item-subtitle>
                <v-list-item-subtitle>Place of Violation: {{ violator.place_of_violation }}</v-list-item-subtitle>
                <v-list-item-subtitle>Date and Time: {{ violator.date_and_time }}</v-list-item-subtitle>
                <v-list-item-subtitle>Apprehending Officer: {{ violator.apprehending_officer }}</v-list-item-subtitle>
                <v-list-item-subtitle>Name of The Driver{{ violator.name_of_driver }}</v-list-item-subtitle>
              </v-list-item-content>
  
              <v-list-item-action class="mt-5">
                <v-spacer></v-spacer>
                <v-btn class="btn btn-primary" :to="{ name: 'viewViolation', props: { id: violator.id }, params: { id: violator.id } }">
                  View Violation
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
  
          <v-row v-else>
            <v-col>
              <v-card-text class="text-center">
                <h2>No Violations Yet</h2>
              </v-card-text>
            </v-col>
          </v-row>
        </v-list>
      </v-card-text>
    </v-card>
      </div>
</v-card>
</v-container>
  </UserNav>

    </div>
</template>

<script setup>
import AuthenticationService from '@/services/AuthenticationService';
import UserNav from './tools/userNav.vue'
import { ref } from 'vue';
import { onMounted } from 'vue';


    const notVerified = ref(true)
    const myLicense = ref([])
     const user = ref('')
     const license_no = ref('')
     const Violations = ref([]);
     const showViolation = ref(false);
     const noLicense = ref(false)
    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);
    const num = ref('')


    const getMyLicense = async () => {
      num.value = id.value.id
      console.log(num)
  try {
    const response = await AuthenticationService.getMyLicense({
      user_id:num.value
    });
    if(response){
      myLicense.value = response.data.myLicense;
      if (myLicense.value.length > 0) {
        license_no.value = myLicense.value[0].license_no;
        if(myLicense.value[0].is_verified !=2){
          notVerified.value = true;
          noLicense.value = false
        }
        console.log('License Number:', license_no.value);
        getMyViolation(); // Call getMyViolation after getting the license number
      } else {
        noLicense.value = true;
        notVerified.value = false
      }
    }
  } catch (error) {
    console.error('Error in getMyLicense:', error);
  }
}

const getMyViolation = async()=>{
  try {
        const response = await AuthenticationService.getMyViolation({
          license_no:license_no.value
        })
        if(response){
          Violations.value = response.data.myViolation;
          notVerified.value=false;
          if(Violations.value.length>0){
            showViolation.value = true
          }else{
            showViolation.value = false
          }
        }else{
          notVerified.value = true;
        }
    } catch (error) {
        console.log(error)
    }
}
onMounted(()=>{
  getMyLicense()
    getMyViolation();
})

</script>

<style lang="scss" scoped>

</style>