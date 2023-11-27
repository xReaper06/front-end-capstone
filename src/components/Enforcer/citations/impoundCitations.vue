<template>
  <!-- eslint-disable -->

  <appbarVue/>
    <div>
      <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card elevation="5">
        <v-main class="mb-5">
          <v-alert
          v-if="err"
    color="error"
    icon="$error"
    title="Error"
    :text="err"
  ></v-alert>
          <router-link class="button" to="/enforcer/enforcerDashboard">
  <div class="button-box">
    <span class="button-elem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
      </svg>
    </span>
    <span class="button-elem">
      <svg viewBox="0 0 46 40">
        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
      </svg>
    </span>
  </div>
</router-link>
          <div class="text-center">
            <h1>Impound Citation</h1>
          </div>
            <v-container class="mb-10 text-center">
              <input placeholder="Type the number of Violation" v-model="violationCount" class="input" name="text" type="number" min="0" max="10"/>
              <button type="button" @click="showCitationForm" class="custom-button">activate citation</button>
              <div v-if="citationForm">
        <v-col
          cols="10"
          md="12"
          class="text-center"
        >
          <v-text-field
            v-model="formData.ticket_no"
            label="Ticket number"
            required
            hide-details
            type="number"
            class="text-center"
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="12"
          class="text-center"
        >
          <v-text-field
            v-model="formData.unit"
            label="Unit"
            hide-details
            required
            class="text-center"
          ></v-text-field>
        </v-col>
        <div v-for="i in violationCount" :key="i">
          <v-col
          cols="10"
          md="12"
          class="text-center"
        >
        <v-select
  v-model="specific_violations.violations[i - 1]"
  label="violations"
  hide-details
  required
  :items="violationName"
  :id="'violations-' + i"
></v-select>
<v-text-field
  v-model="specific_violations.fines[i-1]"
  label="Fine"
  hide-details
  required
  type="number"
  :id="'fines-' + i"
></v-text-field>
        </v-col>
        </div>
        <v-col
          cols="10"
          md="12"
          class="text-center"
        >
        <v-select
            v-model="formData.place_of_violation"
            label="Place of Violation"
            hide-details
            :items="['Poblacion','Catarman','Ibabao','Alegria','Gabi','Gilutungan','Pilipog','Dapitan','Buagsong','Day-as','Bangbang','Cogon']"
            required
          ></v-select>
        </v-col>
        <v-col
          cols="10"
          md="12"
          class="text-center"
        >
          <v-text-field
            v-model="formData.name_of_driver"
            label="Name of Driver"
            hide-details
            required
            class="text-center"
          ></v-text-field>
        </v-col>
        <v-col
          cols="10"
          md="12"
        >
        <v-file-input
  type="file"
  v-model="resetInput"
  label="Unit Empounded"
  accept="image/jpeg, image/jpg, image/png"
  @change="handleimageChange"
></v-file-input>
</v-col>
<div v-if="showFile">
      <img :src="fileView.preview" alt="Selected Image" style="max-width: 100px; max-height: 100px;">   
</div>
        <v-col
          cols="10"
          md="12"
          mb="5"
          class="text-center"
        >
        <v-btn @click="impoundCitation" class="custom-button">Submit</v-btn>
        </v-col>
              </div>
            </v-container>
          </v-main>
          <enfoNav class="pt-5 fixed-bottom"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    </div>
</template>

<script setup>
    /* eslint-disable */

import AuthenticationService from '@/services/AuthenticationService';
import appbarVue from '../tools/appbar.vue';
import enfoNav from '../tools/navigationEnforcer.vue';
import { ref,watchEffect,reactive,onMounted } from 'vue'
const fileView = ref({ preview: "" });
const showFile = ref(false);
const file = ref(null);
const err = ref('')



      let citationForm = ref(false)
      const showCitationForm = ()=>{
        citationForm.value = !citationForm.value
      }
      const formData = ref({
            ticket_no:'',
            unit:'',
            place_of_violation:'',
            name_of_driver:'',

          })
        const violationCount = ref(1);
        const specific_violations = reactive({
          violations:[],
          fines:[],
        });
        const user = ref([])
        const username = ref('')
        const handleimageChange = (event)=>{
          const img = event.target.files;
    if (img.length > 0) {
      file.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        fileView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFile.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
}

        watchEffect(() => {
  if (violationCount.value >= 10) {
    violationCount.value = 10;
  }else if(violationCount.value<=-1){
    violationCount.value = 0
  }
});
const violationName = ref([]);

const getAllViolations = async () => {
  try {
    const response = await AuthenticationService.getAllViolationList();
    if (response) {
      const all = response.data.violationList;
      violationName.value = all.map((violation) => violation.name);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(()=>{
  getAllViolations();
})

        const impoundCitation = async()=>{
          user.value = localStorage.getItem('user')
          username.value = JSON.parse(user.value)
          const apend = new FormData();
            apend.append('evidences',file.value)
            
          for (let i = 0; i < specific_violations.violations.length; i++) {
            apend.append('specific_violations',specific_violations.violations[i])
          }
          for (let i = 0; i < specific_violations.fines.length; i++) {
            apend.append('fines',specific_violations.fines[i])
          }
          apend.append('ticket_no',formData.value.ticket_no)
          apend.append('unit',formData.value.unit)
          apend.append('place_of_violation',formData.value.place_of_violation)
          apend.append('name_of_driver',formData.value.name_of_driver)
          apend.append('apprehending_officer',username.value.nickname)
          try {
            const response = await AuthenticationService.impoundCitation(apend,{
              headers:{
                "Content-Type": "application/json",
              },
            });
            if (response) {
              location.reload()
            }
            console.log(response.data.msg)
          } catch (error) {
            err.value = error.response.data.msg
            
          }
        }
</script>

<style scoped>
.input {
  max-width: 190px;
  height: 30px;
  border: 2px solid transparent;
  outline: none;
  border-bottom: 2px solid #3f3f3f;
  caret-color: #3f3f3f;
  background-color: #f8f0f0;
  padding: 5px;
  transition: .5s linear;
  font-family: monospace;
  letter-spacing: 1px;
}

.input:focus {
  border: 2px solid #fa4753;
  caret-color: #fa4753;
  color: #fa4753;
  box-shadow: 4px 4px 10px #070707;
}

.input:focus::placeholder {
  color: #fa4753;
}
.button {
  display: block;
  position: relative;
  width: 56px;
  height: 56px;
  margin: 0;
  overflow: hidden;
  outline: none;
  background-color: transparent;
  border: 0;
}

.button:before,
.button:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 7px;
}

.button:before {
  border: 4px solid #080607;
  transition: opacity .4s cubic-bezier(.77, 0, .175, 1) 80ms, transform .5s cubic-bezier(.455, .03, .515, .955) 80ms;
}

.button:after {
  border: 4px solid #96daf0;
  transform: scale(1.3);
  transition: opacity .4s cubic-bezier(.165, .84, .44, 1), transform .5s cubic-bezier(.25, .46, .45, .94);
  opacity: 0;
}

.button:hover:before,
.button:focus:before {
  opacity: 0;
  transform: scale(0.7);
  transition: opacity .4s cubic-bezier(.165, .84, .44, 1), transform .5s cubic-bezier(.25, .46, .45, .94);
}

.button:hover:after,
.button:focus:after {
  opacity: 1;
  transform: scale(1);
  transition: opacity .4s cubic-bezier(.77, 0, .175, 1) 80ms, transform .5s cubic-bezier(.455, .03, .515, .955) 80ms;
}

.button-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.button-elem {
  display: block;
  width: 20px;
  height: 20px;
  margin: 17px 18px 0 18px;
  transform: rotate(180deg);
  fill: #080406;
}

.button:hover .button-box,
.button:focus .button-box {
  transition: .4s;
  transform: translateX(-56px);
}


.custom-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #fcfbfb;
  color: #080607;
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