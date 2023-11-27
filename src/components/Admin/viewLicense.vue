<template>
    <dashboardSidebarVue>
  <v-card class="elevation-6">
    <v-row>
      <v-col cols="4">
        <div>
          <v-col cols="4">
            <p>Front Pic</p>
            <img :src="`http://localhost:8081/api/images/${license.front_pic}`" alt="Front Pic" width="200" height="200">
          </v-col>
          <v-col cols="4">
            <p>Back Pic</p>
            <img :src="`http://localhost:8081/api/images/${license.back_pic} `" alt="back Pic" width="200" height="200">
          </v-col>
        </div>
      </v-col>

      <v-col class="mt-5" cols="7">
        <v-row>
          <v-col cols="12">
            <v-card class="elevation-4">
                <div class="ms-3 mt-5">
                    <p>License Number: {{ license.license_no }}</p>
                    <p>Expiration Date: {{ license.expiration_date }}</p>
                  <p>Full name: {{ license.first_name }} {{ license.middle_name }} {{ license.last_name }}</p>
                  <p>Address: {{ license.street }} {{ license.baranggay }} {{ license.city }} {{ license.province }}</p>
                  <p>Birthday: {{ license.date_of_birth }}</p>
                  <p>Blood Type: {{ license.blood_type }}</p>
                  <p>Eye Color: {{ license.eye_color }}</p>
                  <p>Nationality: {{ license.nationality }}</p>
                  <p>Sex: {{ license.sex }}</p>
                  <p>Agency Code: {{ license.agency_code }}</p>
                  <p>Conditions: {{ license.conditions }}</p>
                  <p>Weight(kg): {{ license.weight }}kg</p>
                  <p>Height(m): {{ license.height }}m</p>
                </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-5 mb-5 text-center" v-if="license.is_verified === 2 ? checkLicense : !checkLicense">
          <v-col cols="12">
            <div>
              <v-btn class="mr-3" @click="verifyingLicense(license)">Verify License</v-btn>
              <v-btn @click="denyingLicense(license)">Deny Verification</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>


    </dashboardSidebarVue>
</template>

<script>
import dashboardSidebarVue from './tools/dashboardSidebar.vue';
import {ref} from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import router from '@/router/index'

export default {
    name:'adminViewLicense',
    props:['id'],
    components: {
        dashboardSidebarVue,
    },
    setup (props) {
        const license = ref('');
        const checkLicense = ref(false);
        const routes = router;
        console.log(props.id)
        const getlicensebyID = async()=>{
            try {
                const response = await AuthenticationService.getAllLicensebyID(props.id)
                console.log(response.data)
                if(response){
                    license.value = response.data.license;
                    console.log(license.value)
                }else{
                    console.log('Error Fetching')
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        const verifyingLicense = async(license)=>{
            try{
                const response = await AuthenticationService.verifyLicense({
                    id:license.id,
                    user_id:license.user_id
                })
                if(response){
                    routes.push('/admin/adminVerifications')
                }else{
                    console.log(response.data.msg);
                }
            }catch(err){
                console.log(err)
            }
        }
        const denyingLicense = async(license)=>{
            try{
                const response = await AuthenticationService.denyVerification({
                    id:license.id,
                    user_id:license.user_id
                })
                if(response){
                    routes.push('/admin/adminVerifications')
                }else{
                    console.log(response.data.msg);
                }
            }catch(err){
                console.log(err)
            }
        }
        getlicensebyID();


        return { license,checkLicense,verifyingLicense,denyingLicense }
    }
}
</script>

<style lang="scss" scoped>

</style>