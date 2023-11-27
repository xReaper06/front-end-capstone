<template>
  <div>
    <v-layout class="overflow-visible app-bar" style="height: 56px; width: 100%;" :style="{ opacity: appBarOpacity }">
      <v-bottom-navigation v-model="value" grow>
        <v-btn icon to="/enforcer/enforcerDashboard">
          <v-icon>mdi-home</v-icon>
          Home
        </v-btn>
        <v-btn to="/enforcer/enforcerOperationHistory">
          <v-icon>mdi-map-marker</v-icon>
          Operation History
        </v-btn>
        <v-btn icon to="/enforcer/menu">
          <v-icon>mdi-menu</v-icon>
          Menu
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: 'adminNav',
  setup() {
    const value = ref(1);
    const appBarOpacity = ref(1); // Initially fully opaque

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      appBarOpacity.value = 1 - Math.min(scrollY / 100, 1);
    }

    return { value, appBarOpacity }
  }
}
</script>

<style scoped>
.app-bar {
  background: #171717;
  transition: opacity 0.3s;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.overflow-visible {
  overflow: visible;
  transition: height 0.3s; /* Apply a smooth height transition */
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
</style>
