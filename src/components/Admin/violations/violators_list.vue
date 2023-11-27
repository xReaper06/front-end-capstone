<template>
    <!-- eslint-disable -->
    <ViolationSidebar>
        <v-card class="elevation-4">
    <h2 class="ms-16 mt-5"><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span>Violations</h2>
            <v-select class="mt-5"
      label="Select Violators"
      v-model="type"
      :items="['Normal','Empound']"
      @change="changeTypeViolators"
    ></v-select>
    <div v-if="type == 'Normal' ? !showNormal : showImpounds">
        <h2 class="ms-16 mt-5"><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span>Normal</h2>
        <div class="dflex justify-end w-25">
            <v-text-field
            v-model="searchNormal"
            color="primary"
            label="Search.."
            placeholder="Search licence no...."
            type="text"
          ></v-text-field>
        </div>
        <div class="mt-5">
            <table class="table table-responsive table-light table-striped">
                <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>License Number</th>
                        <th>Unit</th>
                        <th>Place of Violation</th>
                        <th>Date and Time</th>
                        <th>Apprehending Officer</th>
                        <th>Name of Driver</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="violator in filteredViolators" :key="violator.id">
                        <td>{{ violator.ticket_no }}</td>
                        <td>{{ violator.license_no }}</td>
                        <td>{{ violator.unit }}</td>
                        <td>{{ violator.place_of_violation }}</td>
                        <td>{{ violator.date_and_time }}</td>
                        <td>{{ violator.apprehending_officer }}</td>
                        <td>{{ violator.name_of_driver }}</td>
                        <td>
                            <v-btn :to="{ name: 'viewNormal', props: { id: violator.id }, params:{ id:violator.id } }" >
                                View Violation
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <h2 class="ms-16 mt-5"><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span><span class="ms-16"></span>Impound</h2>
        <div class="w-25">
            <v-text-field
            v-model="searchImpound"
            color="primary"
            label="Search.."
            placeholder="Search Driver's Name...."
            type="text"
          ></v-text-field>
        </div>
        <div class="mt-5">
            <table class="table table-responsive table-light table-striped">
                <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>Unit</th>
                        <th>Place of Violation</th>
                        <th>Date and Time</th>
                        <th>Apprehending Officer</th>
                        <th>Name of Driver</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="violator in filteredImpounds" :key="violator.id">
                        <td>{{ violator.ticket_no }}</td>
                        <td>{{ violator.unit }}</td>
                        <td>{{ violator.place_of_violation }}</td>
                        <td>{{ violator.date_and_time }}</td>
                        <td>{{ violator.apprehending_officer }}</td>
                        <td>{{ violator.name_of_driver }}</td>
                        <td>
                            <v-btn :to="{ name: 'viewImpounded', props: { id: violator.id }, params:{ id:violator.id } }">
                                View Violation
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        </v-card>
    </ViolationSidebar>
    </template>

    <script setup>
    import ViolationSidebar from '../tools/violationSidebar.vue';
    import AuthenticationService from '@/services/AuthenticationService';
import { onMounted,computed } from 'vue';
    import { ref } from 'vue';
    const type = ref('')
    const violators = ref([])
    const impounds = ref([])
    const showNormal = ref(false);
    const showImpounds = ref(false);
    const searchNormal = ref('');
    const searchImpound = ref('')

    const getAllViolators = async()=>{
        try {
            const response = await AuthenticationService.getAllViolatorsNormal();
            if(response){
                violators.value = response.data.violators
            }
        } catch (error) {
            console.log(error)
        }
    }

    const filteredViolators = computed(() => {
      return violators.value.filter(violator => {
        return violator.license_no.toLowerCase().includes(searchNormal.value.toLowerCase());
      });
    });
    const getAllImpounds = async()=>{
        try {
            const response = await AuthenticationService.getAllViolatorsImpound();
            if(response){
                impounds.value = response.data.violators
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filteredImpounds = computed(() => {
      return impounds.value.filter(impound => {
        return impound.name_of_driver.toLowerCase().includes(searchImpound.value.toLowerCase());
      });
    });
    onMounted(()=>{
        getAllViolators();
        getAllImpounds();
    })
    const changeTypeViolators = ()=>{
        if(type.value === 'Normal'){
            showImpounds.value = false
            showNormal.value = true;
        }else{
            showNormal.value = false
            showImpounds.value = true
        }

    }
    
    </script>