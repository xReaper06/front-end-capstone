<template>
  <dashboardSidebarVue>
    <v-card class="elevation-6">
      <p style="font-size: 24px; font-weight: bold; margin-top: 20px; text-align: center; color: #090a0a;">Not Yet Verified Licenses</p>
      <div class="mt-5">
        <router-link class="pt-5 ms-3" to="/admin/adminVerified">
          <v-btn>
            Go to verified License
          </v-btn>
        </router-link>
      </div>
      <div class="table-responsive mt-4">
        <div>
          <table id="myDataTable" class=" table table-light table-responsive">
            <thead>
              <tr>
                <th>USER ID</th>
                <th>License Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Middle Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-for="license in licenses" :key="license">
              <tr>
                <td>
                                          {{ license.user_id }}
                  </td>
                  <td>{{ license.license_no }}</td>
                  <td>{{ license.first_name }}</td>
                  <td>{{ license.last_name }}</td>
                  <td>{{ license.middle_name }}</td>
                  <td><v-btn :to="{ name: 'adminViewLicense', props: { id: license.id }, params:{ id:license.id } }">
                    View
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
import { ref } from "vue";

export default {
  name: 'adminVerifications',
  components: {
    dashboardSidebarVue,
  },
  setup() {
    const licenses = ref('')
    const msg = ref(null)
    const error = ref(null)

    const NeedVerification = async () => {
      const authStore = useAuthStore();
      try {
        const response = await AuthenticationService.getAllLicenseNotYetVerified();
        licenses.value = response.data.licenses;
        
        // Assuming allLicense is an array of licenses, you can loop through them
        // and push each license individually into the licenses array
        authStore.setLicenseNotYetVerified(licenses.value);
      } catch (err) {
        console.error(err);
      }
    };
    NeedVerification();
    return {
      licenses,
      msg,
      error,
    }
  }
}
</script>