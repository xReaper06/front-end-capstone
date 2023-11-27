<template>
    <!-- eslint-disable -->
  <adminNav></adminNav>
  <v-card class="dashboard-card">
    <v-app style="width: 100%; height: 100%;">
      <v-navigation-drawer v-model="drawer" app permanent class="drawer">
        <v-list dense nav>
          <v-divider></v-divider>
          <img :src="'http://localhost:8084/api/images/'+name.profile_pic" alt="User Avatar" style="max-width: 50px; max-height: 50px; border-radius: 50%;" />
          <span class="text-white ms-2 me-3">
            {{ name.nickname }}
          </span>
          <v-list-item prepend-icon="mdi-cogs" to="/admin/adminSettings" class="nav-item">
            Settings
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
          prepend-icon="mdi-account" to="/admin/adminEnforcersInfo" title="enforcers" value="ENFORCERS"
            class="nav-item"
          ></v-list-item>
          <v-list-item
          prepend-icon="mdi-account" to="/admin/adminUsersInfo" title="users" value="USERS"
            class="nav-item"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <slot></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-card>
</template>

<script>
import adminNav from './adminNav'
import { ref, onMounted } from 'vue';

export default {
  name: 'dashboardSidebar',
  components: {
    adminNav,
  },
  setup() {
    const drawer = ref(true);
    const user = ref('');
    const name = ref('');
    const username = ref('');

    const userName = async () => {
      user.value = localStorage.getItem('user');
      username.value = JSON.parse(user.value);
      return name.value = username.value;
    }

    onMounted(() => {
      userName();
    });

    return {
      drawer,
      name
    }
  }    
}
</script>

<style scoped>
/* Add custom styles to match your login page */
.dashboard-card {
  border-radius: 20px;
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
}

.drawer {
  background: #171717;
}

.nav-item {
  color: white !important;
  transition: background-color 0.4s ease-in-out;
}

.nav-item:hover {
  background-color: #00ff75;
  color: #000;
}
.name-text{
  color: white;
}

/* You can add more custom styles here to match your login page */
</style>