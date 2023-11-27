<template>
    <dashboardSidebarVue>
        <v-card class="elevation-6">
            <p style="font-size: 24px; font-weight: bold; margin-top: 20px; text-align: center; color: #090a0a;">Verified Licenses</p>
            <div class="mt-5">
                <router-link class="ms-3" to="/admin/adminVerifications">
              <v-btn>
                Go to Not Yet verified Licenses
              </v-btn>
                </router-link>
            </div>
            <div class="table-responsive mt-4">
                <div>
                    <table id="myDataTable" class="table-responsive table table-light">
                        <thead>
                            <tr>
                                <th scope="col">USER ID</th>
                                <th scope="col">License Number</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Middle Name</th>
                                <th scope="col">ActionS</th>
                            </tr>
                        </thead>
                        <tbody v-for="license in licenses" :key="license.id">
                            <tr>
                                <td>
                                            {{ license.user_id }}
                                    </td>
                                    <td>{{ license.license_no }}</td>
                                    <td>{{ license.first_name }}</td>
                                    <td>{{ license.last_name }}</td>
                                    <td>{{ license.middle_name }}</td>
                                    <td><v-btn :to="{ name: 'adminViewLicense', props: { id: license.id }, params:{ id:license.id } }">
                                        VIEW
                                    </v-btn></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </v-card>
    </dashboardSidebarVue>
</template>
<script>
import dashboardSidebarVue from './tools/dashboardSidebar.vue';
import { useAuthStore } from "@/store/index";
import AuthenticationService from '@/services/AuthenticationService';
import { ref} from "vue";

export default {
    name: 'adminVerified',
    components: {
        dashboardSidebarVue,
    },
    setup() {
        const licenses = ref('')
        const msg = ref(null)
        const error = ref(null)

        const Verified = async () => {
            const authStore = useAuthStore();
            try {
                const response = await AuthenticationService.getAllLicenseVerified();
                licenses.value = response.data.licenses;
                // Assuming allLicense is an array of licenses, you can loop through them
                // and push each license individually into the licenses array
                authStore.setLicenseVerified(licenses.value);
            } catch (err) {
                console.error(err);
            }
        };
        Verified();
        return {
            licenses,
            msg,
            error,
        }
    }
}
</script>