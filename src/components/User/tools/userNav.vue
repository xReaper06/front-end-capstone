<template>
  <v-card>
    <v-app style="width: 100%; height: 100%;">
      <v-navigation-drawer v-model="drawer" app :mini-variant="mini" class="custom-drawer">
        <v-list dense nav>
          <v-divider></v-divider>
          <v-list-item to="/user/dashboard">
          <img :src="'http://localhost:8084/api/images/'+name.profile_pic" alt="User Avatar" style="max-width: 50px; max-height: 50px; border-radius: 50%;" />
          <span class="text-white ms-2 me-3">
            {{ name.nickname }}
          </span>
          </v-list-item>
          <v-list-item to="/user/dashboard">
            <v-icon :color="isActive('/user/dashboard')">mdi-home-city</v-icon>
            <span>Home</span>
          </v-list-item>
          <v-list-item to="/user/myLicense">
            <v-icon :color="isActive('/user/myLicense')">mdi-license</v-icon>
            <span>My License</span>
          </v-list-item>
          <v-list-item to="/user/myViolations">
            <v-icon :color="isActive('/user/myViolations')">mdi-alert</v-icon>
            <span>Violation</span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/user/notifications">
            <v-icon :color="isActive('/user/notifications')">mdi-bell</v-icon>
            <span>Notifications({{ unreadCounts }})</span>
            </v-list-item>
          <v-list-item to="/user/userSettings">
            <v-icon :color="isActive('/user/userSettings')">mdi-cog</v-icon>
            <span>Settings</span>
          </v-list-item>
          <v-list-item @click="logout" class="logout-item">
            <v-icon :color="isActive('/user/logout')">mdi-power</v-icon>
            <span>Log Out</span>
          </v-list-item>
        </v-list>
        <!-- Add a button to toggle the sidebar -->
      </v-navigation-drawer>
      <!-- App Bar -->
      <v-app-bar app class="app-bar">
        <div class="background" @click="toggleSidebar">
          <div class="menu__icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="ms-16">
          <div class="ms-16">
          </div>

        </div>
        <img src="http://localhost:8084/images/tiavvsLogo.png" alt="" style="height: 50px; width: 50px;">
        <h2 class="app-title">Traffic Information And Violation Viewing System</h2>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container class="offset-y">
          <!-- Your main content here -->
          <slot>
            
          </slot>
        </v-container>
      </v-main>
    </v-app>
  </v-card>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/index'
import { useAuthStore } from '@/store';
import AuthenticationService from '@/services/AuthenticationService';

    const drawer = ref(true);
    const mini = ref(false);
    const routes = router
    const user = ref('');
    const name = ref('');
    const username = ref('');
    const unreadCounts = ref('');

    const userName = async () => {
      user.value = localStorage.getItem('user');
      username.value = JSON.parse(user.value);
      return name.value = username.value;
    }

    const authStore = useAuthStore();
    onMounted(() => {
      userName();
      unreadCounts.value = authStore.unreadCounts
    });

    const isActive = (route) => {
      return router.currentRoute.value.path === route ? 'white' : '#90A4AE';
    };
    const notifications = ref([]); // Initialize as an empty array


    const getnotifications = async () => {
  try {
    const authStore = useAuthStore();
    id.value = JSON.parse(user.value);
    const response = await AuthenticationService.notifications({ user_id: id.value.id });
    if (response) {
      notifications.value = response.data.notifications; // Populate the notifications array
      const unreadCount = unreadNotificationCounts(notifications.value);
      authStore.setNotifications(notifications.value); // Update the store if necessary
      authStore.setUnreadNotificationCount(unreadCount); // Assuming you have a method to set the unread count in your store
    }
  } catch (error) {
    console.error('Error in getMyNotifications:', error);
  }
};

const unreadNotificationCounts = (notifications) => {
  if (notifications) {
    return notifications.filter((notification) => notification.isRead === 0).length;
  } else {
    return 0;
  }
};


   
      const id = ref('')

      const logout = async ()=>{
      try{  
          const authStore = useAuthStore();
          id.value = JSON.parse(user.value)
          const response = await AuthenticationService.logout({id:id.value.id});
          if(!response){
            console.log('Cannot Logout');
          }
          authStore.logOut()
          routes.push('/')
      }catch(err){
          console.error('Error Logout')
      }
  }
  onMounted(()=>{
    getnotifications()
  })

    const toggleSidebar = () => {
      mini.value = !mini.value; // Toggle between true and false
      drawer.value = !drawer.value
    };

</script>
<style scoped>
/* Custom styles for the app-bar class */
.app-bar {
  background: #171717;
  color: #ffffff; /* Change the text color to your preference */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */

  .background {
    background: #171717;
    border-radius: 0;
    padding: 0;
    width: 65px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .menu__icon {
    width: 32px;
    height: 32px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.4s;
  }

  .menu__icon span {
    width: 100%;
    height: 0.25rem;
    background-color: #ffffff; /* Change the menu icon color to your preference */
    transition: width 0.4s, transform 0.4s, background-color 0.4s;
  }

  .menu__icon span:nth-child(1) {
    width: 75%;
  }

  .menu__icon span:nth-child(2) {
    width: 50%;
  }

  .menu__icon:hover {
    transform: rotate(-90deg);
  }

  .menu__icon:hover span {
    width: 0.25rem;
    transform: translateX(10px);
    background-color: #ff3b30; /* Change the hover color to your preference */
  }

  .app-title {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .user-avatar {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
  }

  .user-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }
}
.custom-drawer {
  background: #171717;
  color: #ffffff; /* Change the text color to your preference */
}

/* Navigation items styles */
.v-list-item {
  color: #ffffff; /* Change the text color for navigation items */
  font-size: 16px; /* Adjust the font size as needed */
}

.v-list-item:hover {
  background-color: #00ff75;
}

.v-divider {
  background-color: #78909C; /* Change the color of dividers */
}

/* Button to toggle the sidebar styles */
.toggle-button {
  background-color: #263238; /* Change the background color to match the drawer */
  color: #ffffff; /* Change the button text color */
  border: none;
  cursor: pointer;
}

/* Icon styles */
.v-icon {
  color: #90A4AE; /* Change the icon color to your preference */
  margin-right: 16px; /* Adjust the spacing between icon and text */
}

/* User-specific styles */
.user-name {
  font-size: 18px; /* Adjust the font size for the user's name */
  margin-top: 8px; /* Adjust the spacing between the user's name and icons */
}

/* Logout and Settings item styles */
.logout-item, .settings-item {
  color: #FF3D00; /* Change the text color for the logout and settings items */
}
</style>
