<template>
    <div>
        <dashboardSidebarVue>
            <v-card class="elevation-4">
                <div class="mt-2 ms-3">
                    <v-btn to="/admin/adminViolators">Go back</v-btn>
                </div>
    <div>
        <p style="font-size: 24px; font-weight: bold; margin-top: 20px; text-align: center; color: #090a0a;">Violations</p>
        <v-card class="elevation-2">
            <table class="table table-responsive table-light table-striped">
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
            </table>
        </v-card>
        <p style="font-size: 24px; font-weight: bold; margin-top: 20px; text-align: center; color: #090a0a;">UNIT</p>
        <v-card class="elevation-2 mt-5 mb-5">
            <div class="evidence-list mb-3 mt-2">
                <div v-for="evidence in evidences" :key="evidence.id" class="evidence-item">
                    <img :src="'http://localhost:8081/api/images/' + evidence.images" alt="User Avatar" style="max-width: 300px; max-height: 300px;" />
                </div>
            </div>
        </v-card>
    </div>
</v-card>
        </dashboardSidebarVue>
    </div>
</template>

<script>
import { ref } from 'vue';
import dashboardSidebarVue from '../tools/dashboardSidebar.vue';
import AuthenticationService from '@/services/AuthenticationService';
import { onMounted } from 'vue';

export default {
    name:'viewImpounded',
    props:['id'],
    components:{
        dashboardSidebarVue
    },
    setup (props) {
        const violations = ref([])
        const evidences = ref([])

        const getUsersViolations = async()=>{
            try {
                const response = await AuthenticationService.getUserViolations({
                    violations_id:props.id
                });
                if(response){
                    violations.value = response.data.userViolations
                    evidences.value = response.data.evidences
                }
            } catch (error) {
                console.log(error)
            }
        }
        onMounted(()=>{
            getUsersViolations();
        })

        return {violations,evidences}
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
    margin-left: 350px;
  }


</style>