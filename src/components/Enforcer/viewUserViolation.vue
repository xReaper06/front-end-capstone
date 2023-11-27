<template>
    <div>
<appbarVue/>
<v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
            <v-card class="elevation-4 custom-card">
                <v-container fluid>
      <v-row>
        <v-col class="mt-2 ms-3">
          <v-btn to="/enforcer/enforcerDashboard">Go back</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="elevation-2">
            <v-responsive>
              <v-table class="table table-light table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Fine</th>
                        <th>Status</th>
                    </tr>
                </thead>
                  <tbody>
                    <tr v-for="violator in violations" :key="violator.id">
                      <td>{{ violator.id }}</td>
                      <td>{{ violator.name }}</td>
                      <td>{{ violator.fine }}</td>
                      <td>{{ violator.status }}</td>
                    </tr>
                  </tbody>
              </v-table>
            </v-responsive>
            <p class="text-center">TOTAL FINE: {{ total }}</p>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="font-size: 24px; font-weight: bold; margin-top: 20px; text-align: center; color: #090a0a;">Evidences</p>
          <v-card class="elevation-2 mt-5 mb-5">
            <v-container>
              <v-row>
                <v-col v-for="evidence in evidences" :key="evidence.id" class="evidence-item">
                  <v-img :src="'http://localhost:8081/api/images/' + evidence.images" alt="User Avatar" max-width="300px" max-height="300px"></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</v-card>
<enfoNav class="fixed-bottom" />
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>

<script>
import { ref } from 'vue';
import appbarVue from './tools/appbar.vue';
import enfoNav from './tools/navigationEnforcer.vue'
import AuthenticationService from '@/services/AuthenticationService';
import { onMounted,computed } from 'vue';

export default {
    name:'viewUserViolation',
    props:['id'],
    components:{
        appbarVue,
        enfoNav
    },
    setup (props) {
        const violations = ref([])
        const evidences = ref([])
        const fine = ref(0)

        const getUsersViolations = async()=>{
            try {
                const response = await AuthenticationService.getUserViolations({
                    violations_id:props.id
                });
                if(response){
                    violations.value = response.data.userViolations
                    evidences.value = response.data.evidences
                    violations.value.forEach((violation)=>{
                        fine.value += parseInt(violation.fine)
                    })
                    console.log(fine)
                }
            } catch (error) {
                console.log(error)
            }
        }
        onMounted(()=>{
            getUsersViolations();
        })

        const total = computed(()=>{
            return fine.value
        })

        return {violations,evidences,total}
    }
}
</script>

<style  scoped>

  .evidence-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .evidence-item {
    margin-right: 100px; /* Adjust the spacing between images as needed */
    margin-left: 100px;
  }
  .custom-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f6f6;
  color: #080607;
  margin-bottom: 16px;

}


</style>