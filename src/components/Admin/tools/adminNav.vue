<template>
  <v-card elevation="2">
    <v-toolbar class="app-bar bg-dark" dark>
      <v-container>
        <v-row align="center">
          <v-col cols="1">
            <router-link to="/admin/adminDashboard" class="text-decoration-none white--text">
              <img src="http://localhost:8081/images/tiavvslogo.png" alt="" style="height: 50px; width: 50px;">
            </router-link>
          </v-col>
          <v-col cols="1">
            <p style="font-size: 20px; font-weight: bold; text-align: center; color: #f0f2f3;">TIAVVS</p>
          </v-col>
          <v-col cols="2">
            <v-btn to="/admin/adminDashboard" class="button" exact>Home</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn to="/admin/adminUsersInfo" class="button" exact>USERS</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn to="/admin/adminViolationList" class="button" exact>VIOLATION</v-btn>
          </v-col>
          <v-col cols="2" class="text-end">
            <v-btn class="Btn-logout" @click="logout">
              <div class="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c-17.7 0-32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c-17.7 0-32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div class="text">Logout</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </v-card>
</template>

<script>
import { useAuthStore } from '@/store';
import router from '@/router/index';
import { ref } from 'vue';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'adminNav',
  setup() {
    const routes = router;
    const user = ref('');
    const id = ref('');

    const logout = async () => {
      try {
        const authStore = useAuthStore();
        user.value = localStorage.getItem('user');
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
    }

    return { logout };
  }
}
</script>

<style scoped>
/* Custom styles to match your login page */
.Btn-logout {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 125px; /* Adjust the width to your preference */
  height: 45px;
  border: none;
  border-radius: 45px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
  margin-left: 50px;
  margin-right: 0; /* Adjust the margin to remove spacing between buttons */
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
.Btn-logout:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn-logout:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
.Btn-logout:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn-logout:active {
  transform: translate(2px ,2px);
}

.app-bar{
  background: #171717;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.text-decoration-none {
  text-decoration: none;
}

.white--text {
  color: white !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.text-dark {
  color: #343a40 !important;
}
.button {
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 15px 30px;
  display: block;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button span {
  background: linear-gradient(-45deg, #63A4FF 0%, #83EAF1 100% );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.button:hover span {
  -webkit-text-fill-color: white;
}

.button::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(2);
  border: 3px solid;
  border-image: linear-gradient(-45deg, #63A4FF 0%, #83EAF1 100% );
  border-image-slice: 1;
  border-width: 2px 0 2px 0;
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  z-index: -1;
}

.button:hover::before {
  transform: scaleY(0);
  opacity: 1;
}

.button::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #63A4FF 0%, #83EAF1 100% );
  transform: scale(0);
  pointer-events: none;
  transition: all 0.9s cubic-bezier(0.23, 1, 0.320, 1);
  z-index: -1;
}

.button:hover::after {
  transform: scaleY(1);
}

.button:active {
  scale: 0.90;
}
.active {
  background: linear-gradient(-45deg, #63A4FF 0%, #83EAF1 100% );
}

/* Styles for exact active links */
.exact-active {
  background: linear-gradient(-45deg, #63A4FF 0%, #83EAF1 100% );
  color: white; /* Change text color for exact active links */
}



/* You can add more custom styles here to match your login page */
</style>
