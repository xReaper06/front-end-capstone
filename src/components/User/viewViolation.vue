<template>
    <div>
        <UserNav>

            <v-card class="elevation-4 ">
                <v-container fluid>
      <v-row>
        <v-col class="mt-2 ms-3">
          <v-btn to="/user/myViolations">Go back</v-btn>
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
        </UserNav>
    </div>
</template>

<script>
import { ref } from 'vue';
import UserNav from './tools/userNav.vue'
import AuthenticationService from '@/services/AuthenticationService';
import { onMounted,computed } from 'vue';

export default {
    name:'viewViolation',
    props:['id'],
    components:{
        UserNav
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


</style>