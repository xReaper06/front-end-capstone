<template>
    <div>
        <UserNav>
          <div v-if="error">
        <v-alert
    color="error"
    icon="$error"
    title="Error"
    :text="msg"
  ></v-alert>
      </div>
      <div v-if="success">
        <v-alert
    color="success"
    icon="$success"
    title="Success"
    :text="msg"
  ></v-alert>
      </div>
          <div v-if="showlicensemsg" >
            <div class="verification-message">
              Your License is Proceding to verification by admin
              <button class="cssbuttons-io-button" style="text-decoration: none;" @click="redirectDashboard">
  Get started
  <div class="icon">
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</button>
            </div>
            <div class="align-center text-center">
            </div>
          </div>
            <v-container v-else>
            <div class="text-center"><h1>License Verification</h1></div>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            
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
                <v-text-field v-model="license_no" label="License Number" required hide-details></v-text-field>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="expiration_date"
                label="Expiration Date"
                required
                hide-details
                type="date"
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="agency_code"
                label="Agency Code"
                hide-details
                required
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-select
                v-model="blood_type"
                label="Blood Type"
                :items="['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']"
              ></v-select>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="eye_color"
                label="Eye Color"
                required
                hide-details
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
            <v-select
      label="Restriction"
      v-model="restrictions"
      :items="[1, 2, 3, 4, 5]"
    ></v-select>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="conditions"
                label="Conditions"
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="first_name"
                label="First Name"
                required
                hide-details
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="last_name"
                label="Last Name"
                hide-details
                required
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="middle_name"
                label="Middle Name"
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="nationality"
                label="Nationality"
                required
                hide-details
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
            <v-select
      label="Sex"
      v-model="sex"
      :items="['Male','Female']"
    ></v-select>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="date_of_birth"
                label="Date of Birth"
                hide-details
                required
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
                  <v-spacer></v-spacer>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="weight"
                label="Weight in Kg"
                required
                hide-details
                type="number"
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="height"
                label="Height in Meter"
                hide-details
                required
                type="number"
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="street"
                label="Street/Sitio"
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="baranggay"
                label="Baranggay"
                required
                hide-details
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="city"
                label="City"
                hide-details
                required
              ></v-text-field>
            </v-col>
    
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="province"
                label="Province"
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
    
            <v-spacer></v-spacer>
    
            <!-- Submit Button -->
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn class="success"  @click="verifyLicense">Submit</v-btn>
              </v-col>
            </v-row>
            
          </v-container>
          <p>{{ error }}</p>
        </UserNav>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store';
import UserNav from './tools/userNav.vue'
import { ref,onMounted } from 'vue';
import AuthenticationService from '@/services/AuthenticationService'
import { useRouter } from "vue-router";
        const front_pic = ref(null)
     const back_pic = ref(null)
     const license_no = ref('')
     const expiration_date = ref('')
     const agency_code = ref('')
     const blood_type = ref('')
     const eye_color = ref('')
     const restrictions = ref('')
     const conditions = ref('')
     const first_name = ref('')
     const last_name = ref('')
     const middle_name = ref('')
     const nationality = ref('')
     const sex = ref('')
     const date_of_birth = ref('')
     const weight = ref('')
     const height = ref('')
     const street = ref('')
     const baranggay = ref('')
     const city = ref('')
     const province = ref('')
     const success = ref(null)
     const error = ref(null)
     const showBack = ref(false);
     const showFront = ref(false);
const frontView = ref({ preview: "" });
const backView = ref({ preview: "" });
const showlicensemsg = ref(false)
const authStore = useAuthStore()


     const user = ref('')
    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);


    const myLicense = ref([])
    
    const getMyLicense = onMounted(async()=>{
      myLicense.value = authStore.myLicense
      if(myLicense.value == ''){
        showlicensemsg.value = false
      }else{
        showlicensemsg.value = true
      }
    })

onMounted(()=>{
  getMyLicense();
})
     
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
     const verifyLicense = async()=>{
      try {
           
           let formdata = new FormData();
           formdata.append('user_id',id.value.id)
           formdata.append('front_pic',front_pic.value)
           formdata.append('back_pic',back_pic.value)
           formdata.append('license_no',license_no.value)
           formdata.append('expiration_date',expiration_date.value)
           formdata.append('agency_code',agency_code.value)
           formdata.append('blood_type',blood_type.value)
           formdata.append('eye_color',eye_color.value)
           formdata.append('restrictions',restrictions.value)
           formdata.append('conditions',conditions.value)
           formdata.append('first_name',first_name.value)
           formdata.append('last_name',last_name.value)
           formdata.append('middle_name',middle_name.value)
           formdata.append('nationality',nationality.value)
           formdata.append('sex',sex.value)
           formdata.append('date_of_birth',date_of_birth.value)
           formdata.append('weight',weight.value)
           formdata.append('height',height.value)
           formdata.append('street',street.value)
           formdata.append('baranggay',baranggay.value)
           formdata.append('city',city.value)
           formdata.append('province',province.value)
        const response = await AuthenticationService.insertLicense(formdata)
        success.value = response.data.msg
        router.push('/user/myLicense')
    } catch (err) {
        error.value = err.response.data.msg
    }
  }
  const redirectDashboard = async()=>{
    await router.push('/user/dashboard');
  }
</script>

<style scoped>
.cssbuttons-io-button {
  background: #a370f0;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #714da6;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
  right: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #7b52b9;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.95);
}

.verification-message {
  background-color: #ffcc00; /* Set your background color */
  color: #333; /* Set your text color */
  padding: 10px; /* Add padding for spacing */
  border: 1px solid #ffa500; /* Add a border for emphasis */
  border-radius: 5px; /* Add rounded corners */
  text-align: center; /* Center-align the text */
  font-weight: bold; /* Apply bold font weight */
  font-size: 18px; /* Set the font size */
  margin: 20px; /* Add margins for spacing */
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}
</style>