<template>
    <!-- eslint-disable -->
    <appbarVue />
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8">
            <v-card elevation="5" >
              <p style="font-size: 20px; font-weight: bold; text-align: center; color: #0c0d0e;">Operation History</p>
              <v-main>
                <div>
                  <v-select
            v-model="FilterPlace"
            label="Select Locations"
            :items="['','Poblacion','Catarman','Ibabao','Alegria','Gabi','Gilutungan','Pilipog','Dapitan','Buagsong','Day-as','Bangbang','Cogon']"           
          ></v-select>
                </div>
                <v-container>
                  <table class="table table-responsive table-light table-striped me-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Place Of Operation</th>
                            <th>Officers Assigned</th>
                            <th>Date And Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="violator in searchResults" :key="violator.id">
                            <td>{{ violator.id }}</td>
                            <td>{{ violator.place_of_violation }}</td>
                            <td>{{ violator.apprehending_officer }}</td>
                            <td>{{ violator.date_and_time }}</td>
                        </tr>
                    </tbody>
                  </table>
                </v-container>
              </v-main>
              <enfoNav class="fixed-bottom" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
    
    <script setup>
    import { computed } from 'vue';
import appbarVue from './tools/appbar.vue';
    import enfoNav from './tools/navigationEnforcer.vue';
    import AuthenticationServices from '@/services/AuthenticationService'
    import { ref, onMounted } from 'vue'
    
   
        const violatorsValue = ref([]);
        const FilterPlace = ref('');
        const getViolators = async () => {
          try {
            const response = await AuthenticationServices.getAllViolators();
            if (response) {
              violatorsValue.value = response.data.violators;
              searchResults;
            }
          } catch (error) {
            console.log(error);
          }
        };
        
        onMounted(() => {
          getViolators();
        });
        const searchResults = computed(()=>{
          return violatorsValue.value.filter(
    (item) =>
      item.place_of_violation &&
      item.place_of_violation.toLowerCase().includes(FilterPlace.value.toLowerCase())
  );
        })
        
    </script>
    
    <style scoped>
      /* You can add custom styles for the v-card here if needed */
      
      .custom-card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    background-color: #f8f6f6;
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
    