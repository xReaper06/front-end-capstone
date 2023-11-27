/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/index.js'
import Login from '../components/Login.vue'
import userRegistration from '../components/userRegistration.vue'
import userDashboard from "../components/User/userDashboard.vue"
import userSettings from "../components/User/tools/userSettings.vue"
import userNotifications from "../components/User/tools/notificationModal.vue"
import accountTemporarilyLocked from '../components/loadingpages/temporarilyLock.vue'
import accountDeleted from '../components/loadingpages/accountDeleted.vue'
import myViolations from "../components/User/userViolation.vue"
import viewViolation from "../components/User/viewViolation.vue"
import userVerificationLicense from "../components/User/myLicense.vue"
import addLicense from "../components/User/addLicense.vue"
import updateLicense from "../components/User/updateLicense.vue"
import adminDashboard from "../components/Admin/adminDashboard.vue"
import adminSettings from "../components/Admin/tools/adminSettings.vue"
import adminVerified from "../components/Admin/verifiedLicense.vue"
import adminVerifications from "../components/Admin/verifications.vue"
import adminViewLicense from "../components/Admin/viewLicense.vue"
import viewImpounded from '../components/Admin/violations/viewImpounded.vue'
import viewNormal from '../components/Admin/violations/viewNormal.vue'
import adminViolators from "../components/Admin/violations/violators_list.vue"
import adminViolationList from "../components/Admin/violations/violation_list.vue"
import adminUsersInfo from "../components/Admin/users_info/usersList.vue"
import adminEnforcersInfo from "../components/Admin/users_info/enforcersList.vue"
import enforcerDashboard from "../components/Enforcer/dashboard.vue";
import viewUserViolation from "../components/Enforcer/viewUserViolation.vue";
import enforcerOperationHistory from "../components/Enforcer/operationHistory.vue";
import enforcerMenu from "../components/Enforcer/tools/menu.vue";
import enforcerSettings from "../components/Enforcer/tools/enforcerSettings.vue";
import normalCitation from '../components/Enforcer/citations/normalCitation.vue'
import impoundedCitation from '../components/Enforcer/citations/impoundCitations.vue'
import VerifyEmailComponent from '../components/Auth/verificationPage.vue'
import forgot_password from '../components/Auth/forgotPage.vue'
import accountVerify from '../components/Auth/verifyAccountPage.vue'
import changeForgotPassword from '../components/Auth/changeForgotPassword.vue'
import enforcerRegistrationForm from '../components/Auth/enforcerRegistration.vue'



const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/accountVerify',
    name: 'accountVerify',
    component: accountVerify,
  },
  {
    path: '/accountTemporarilyLocked',
    name: 'accountTemporarilyLocked',
    component: accountTemporarilyLocked,
  },
  {
    path: '/accountDeleted',
    name: 'accountDeleted',
    component: accountDeleted,
  },
  {
    path:'/userRegistration',
    name:'userRegistration',
    component: userRegistration
  },
  {
    path: '/verifyEmail/:token',
    name: 'verifyEmail',
    component: VerifyEmailComponent,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: forgot_password,
  },
  {
    path: '/change-forgot-password/:token',
    name: 'change-forgot-password',
    component: changeForgotPassword,
  },
  {
    path: '/enforcer-registration/:token',
    name: 'enforcer-registration',
    component: enforcerRegistrationForm,
  },
  {
    path:'/user/dashboard',
    name:'userDashboard',
    component: userDashboard,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 
  },
  {
    path:'/user/myLicense',
    name:'myLicense',
    component: userVerificationLicense,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/user/addLicense',
    name:'addLicense',
    component: addLicense,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/user/updateLicense',
    name:'updateLicense',
    component: updateLicense,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/user/userSettings',
    name:'userSettings',
    component: userSettings,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/user/notifications',
    name:'userNotifications',
    component: userNotifications,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/user/myViolations',
    name:'myViolations',
    component: myViolations,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/user/viewViolation/:id',
    name:'viewViolation',
    component: viewViolation,
    props:true,
    params:true,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 

  },
  {
    path:'/admin/adminVerifications',
    name:'adminVerifications',
    component: adminVerifications,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminVerification/:id',
    name:'adminViewLicense',
    component: adminViewLicense,
    props:true,
    params:true,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/viewNormal/:id',
    name:'viewNormal',
    component: viewNormal,
    props:true,
    params:true,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/viewImpounded/:id',
    name:'viewImpounded',
    component: viewImpounded,
    props:true,
    params:true,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminVerified',
    name:'adminVerified',
    component: adminVerified,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminDashboard',
    name:'adminDashboard',
    component: adminDashboard,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 
  },
  {
    path:'/admin/adminViolators',
    name:'adminViolators',
    component: adminViolators,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminViolationList',
    name:'adminViolationList',
    component: adminViolationList,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminUsersInfo',
    name:'adminUsersInfo',
    component: adminUsersInfo,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminEnforcersInfo',
    name:'adminEnforcersInfo',
    component: adminEnforcersInfo,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  {
    path:'/admin/adminSettings',
    name:'adminSettings',
    component: adminSettings,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 

  },
  //enforcer routes
  {
    path:'/enforcer/enforcerDashboard',
    name:'enforcerDashboard',
    component: enforcerDashboard,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] },
  },
  {
    path:'/enforcer/enforcerOperationHistory',
    name:'enforcerOperationHistory',
    component: enforcerOperationHistory,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] },
  },
  {
    path:'/enforcer/viewUserViolation/:id',
    name:'viewUserViolation',
    component: viewUserViolation,
    props:true,
    params:true,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] }, 

  },
  {
    path:'/enforcer/enforcerSettings',
    name:'enforcerSettings',
    component: enforcerSettings,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] },
  },
  {
    path:'/enforcer/menu',
    name:'enforcerMenu',
    component: enforcerMenu,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] },
  },
  {
    path:'/enforcer/normalCitation',
    name:'normalCitation',
    component: normalCitation,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] },
  },
  {
    path:'/enforcer/impoundedCitation',
    name:'impoundedCitation',
    component: impoundedCitation,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] },
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active', // Class applied to active links
  linkExactActiveClass: 'exact-active',
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiredRoles = to.meta.requiredRoles;
  const user = localStorage.getItem('user');
  
  // Check if the user is authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to the login page or an unauthorized page
    next('/'); // Adjust the destination route as needed
  } else if (requiredRoles && requiredRoles.length > 0) {
    // Check if the user has the required role
    const parseUser = JSON.parse(user);
    const userRoles = parseUser.user_role;

    if (!userRoles || !requiredRoles.some(role => userRoles.includes(role))) {
      // Redirect to an unauthorized page or an appropriate action
      next('/unauthorized'); // Adjust the destination route as needed
    } else {
      // User meets the authentication and role requirements, proceed
      next();
    }
  } else {
    // No specific role or authentication requirement, proceed
    next();
  }
});



export default router
