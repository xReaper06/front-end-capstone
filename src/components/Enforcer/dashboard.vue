<template>
  <!-- eslint-disable -->
  <appbarVue />
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card elevation="5">
            <p style="font-size: 20px; font-weight: bold; text-align: center; color: #0c0d0e;" class="mt-5">Dashboard</p>
            <v-main>
              <v-container>
                <div>
                  <v-text-field
                    v-model="search"
                    label="Search License Number..."
                    @input="performSearch"
                    prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                </div>
                <div v-if="search !==''">
                  <v-row>
      <v-col v-for="violator in searchResults" :key="violator.id" cols="12" md="6" lg="4">
        <router-link :to="{ name: 'viewUserViolation',props: { id: violator.id }, params: { id: violator.id } }" class="text-decoration-none">
          <v-card class="custom-card">
            <v-card-title class="headline">{{ violator.name_of_driver }}</v-card-title>
            <v-card-subtitle>ID: {{ violator.id }}</v-card-subtitle>
            <v-card-subtitle>Ticket Number: {{ violator.ticket_no }}</v-card-subtitle>
            <v-card-subtitle>License Number: {{ violator.license_no }}</v-card-subtitle>
            <v-card-subtitle>Unit: {{ violator.unit }}</v-card-subtitle>
            <v-card-subtitle>Place of Violation: {{ violator.place_of_violation }}</v-card-subtitle>
            <v-card-subtitle>Date and Time: {{ violator.date_and_time }}</v-card-subtitle>
            <v-card-subtitle>Apprehending Officer: {{ violator.apprehending_officer }}</v-card-subtitle>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
                </div>
                <div class="align-center text-center">
                  <div>
                    <v-btn @click="showButtons" class="custom-button">add Violators</v-btn>
                  </div>
                  <div v-if="show">
                    <v-btn to="/enforcer/normalCitation" class="custom-button">Normal Citation</v-btn>
                    <v-btn to="/enforcer/impoundedCitation" class="custom-button">Impound Citation</v-btn>
                  </div>
                </div>
              </v-container>
            </v-main>
            <enfoNav class="fixed-bottom" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import appbarVue from './tools/appbar.vue';
  import enfoNav from './tools/navigationEnforcer.vue';
  import AuthenticationServices from '@/services/AuthenticationService'
  import { ref, onMounted } from 'vue'
  
  export default {
    name: 'enforcerDashboard',
    components: { appbarVue, enfoNav },
    setup() {
      const search = ref('');
      const searchResults = ref([]);
      const violators = ref([]);
      const show = ref(false);
  
      const getViolators = async () => {
        try {
          const response = await AuthenticationServices.getAllViolators();
          if (response) {
            violators.value = response.data.violators;
          }
        } catch (error) {
          console.log(error);
        }
      };
      onMounted(() => {
        getViolators();
      });
  
      const performSearch = async () => {
  searchResults.value = violators.value.filter(item =>
    item.license_no && item.license_no.toLowerCase().includes(search.value.toLowerCase())
    );
};
      const showButtons = async () => {
        show.value = !show.value;
      };
  
      return { search, searchResults, performSearch, show, showButtons };
    },
  };
  </script>
  
  <style scoped>
    /* You can add custom styles for the v-card here if needed */
    
    .custom-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f6f6;
  color: #080607;
  margin-bottom: 16px;

}
.custom-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #413f3f;
  color: #080607;
  margin-bottom: 16px;

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
  