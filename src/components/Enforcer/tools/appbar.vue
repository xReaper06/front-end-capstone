<template>
  <v-card elevation="2">
    <v-toolbar class="bg-dark">
      <v-container>
        <v-row align="center">
          <v-col cols="1">
            <router-link to="/enforcer/enforcerDashboard" class="text-decoration-none white--text">
              <img src="http://localhost:8081/images/tiavvslogo.png" alt="" style="height: 50px; width: 50px;">
            </router-link>
          </v-col>
          <v-col cols="1"></v-col>
          <p style="font-size: 20px; font-weight: bold; text-align: center; color: #f0f2f3;">TIAVVS</p>
        </v-row>
      </v-container>
    </v-toolbar>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'adminNav',
  setup() {
   
    const appBarOpacity = ref(1); // Initially fully opaque

   
    // Add a scroll event listener to handle the app bar opacity
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Calculate opacity based on scroll position
      appBarOpacity.value = 1 - Math.min(scrollY / 100, 1);
    }

    return {  appBarOpacity };
  }
}
</script>


