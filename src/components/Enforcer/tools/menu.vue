<template>
    <!-- eslint-disable -->

  <appbarVue />
  <div class="menu-container">
    <h1 class="menu-title">Menu</h1>
    <v-list class="menu-list">
    
            <img :src="'http://localhost:8084/api/images/'+name.profile_pic" alt="User Avatar" style="max-width: 50px; max-height: 50px; border-radius: 50%;" />
          <span class="text-black ms-2 me-3">
            {{ name.nickname }}
          </span>
      <v-divider></v-divider>
      <v-list-item class="menu-item" to="/enforcer/enforcerSettings" mb-5 prepend-icon="mdi-cogs" @click="openSettings">
        Settings
      </v-list-item>
      <v-list-item class="menu-item" mt-5 prepend-icon="mdi-power" @click="logout">
        Log Out
      </v-list-item>
    </v-list>
  </div>
  <enfoNav class="fixed-bottom" />
</template>

<script>
import appbarVue from './appbar.vue'
import enfoNav from './navigationEnforcer.vue';
import { useAuthStore } from '@/store';
import { ref, onMounted } from 'vue';
import router from '@/router/index';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'enforcerMenu',
  components: { enfoNav,appbarVue },
  setup() {
    const routes = router;
    const user = ref('');
    const name = ref('');
    const username = ref('');

    user.value = localStorage.getItem('user');
    const userName = async () => {
      username.value = JSON.parse(user.value);
      name.value = username.value;
    };

    onMounted(() => {
      userName();
    });
    const openSettings = () => {
      console.log('Settings clicked');
    };
    const id = ref('');
    const logout = async () => {
      try {
        const authStore = useAuthStore();
        id.value = JSON.parse(user.value);
        const response = await AuthenticationService.logout({ id: id.value.id });
        if (!response) {
          console.log('Cannot Logout');
        }
        authStore.logOut();
        routes.push('/');
      } catch (err) {
        console.error('Error Logout');
      }
    };

    return { openSettings, name, logout };
  },
};
</script>

<style scoped>
.menu-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Responsive styles using media queries */
  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
}

.menu-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.menu-list {
  width: 300px;
  /* Responsive styles using media queries */
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.menu-user {
  padding: 10px;
}

.menu-item {
  color: #080b0eef;
  font-size: 18px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f1f1f1;
}
</style>
