<template>
    <div>
        <UserNav>
            <v-container>
                <v-card>
                    <v-card-title>
                        Update License Form
                    </v-card-title>
                    <v-row>
                  <div v-if="showFront">
          <img :src="frontView.preview" alt="Selected Image" style="max-width: 150px; max-height: 150px;">   
    </div>
                  <!-- Front Picture Input -->
                  <v-col cols="12" md="6" lg="4">
                    <v-file-input label="Front Picture" variant="solo-filled" accept="image/jpeg, image/jpg, image/png" @change="handleFrontPicChange"></v-file-input>
                  </v-col>
                  <div v-if="showBack">
          <img :src="backView.preview" alt="Selected Image" style="max-width: 150px; max-height: 150px;">   
    </div>
                  <!-- Back Picture Input -->
                  <v-col cols="12" md="6" lg="4">
                    <v-file-input label="Back Picture" variant="solo-filled" accept="image/jpeg, image/jpg, image/png" @change="handleBackPicChange"></v-file-input>
                  </v-col>
                  <!-- License Number Input -->
                  <v-col cols="12" md="12" lg="4">
                    <v-text-field
                    v-model="expiration_date"
                    label="Expiration Date"
                    required
                    hide-details
                    type="date"
                  ></v-text-field>             
                 </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="dark" @click="updateLicense">
                        Update My License
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-container>
        </UserNav>
    </div>
</template>

<script setup>
import UserNav from './tools/userNav.vue'
import { ref } from 'vue';
import AuthenticationService from '@/services/AuthenticationService'
import { useRouter } from "vue-router";
const front_pic = ref(null)
     const back_pic = ref(null)
     const expiration_date = ref('')
     const showFront = ref(false);
     const showBack = ref(false);
const frontView = ref({ preview: "" });
const backView = ref({ preview: "" });

const user = ref('')
    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);


const handleFrontPicChange = (event)=>{
      const img = event.target.files;

    // Store it in your component's data
    if (img.length > 0) {
      front_pic.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        frontView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFront.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
     }

     const handleBackPicChange = (event)=>{
      const img = event.target.files;

// Store it in your component's data
if (img.length > 0) {
  back_pic.value = img[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    backView.value = {
      name: img[0].name,
      preview: e.target.result,
    };
    showBack.value = true;
  };
  reader.readAsDataURL(img[0]);
}
     }

     let router = useRouter()
     const updateLicense = async()=>{
        try {
            let formdata = new FormData();
            formdata.append('user_id',id.value.id)
           formdata.append('front_pic',front_pic.value)
           formdata.append('back_pic',back_pic.value)
           formdata.append('expiration_date',expiration_date.value)
           const response = await AuthenticationService.updateLicense(formdata)
           if(response){
            router.push('/user/myLicense');
           }else{
            console.log(response.data.msg)
           }
        } catch (error) {
            console.log(error)
        }
     }

</script>

<style lang="scss" scoped>

</style>