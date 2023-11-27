<template>
    <usersSidebar>
        <div class="mb-5 align-center w-50">
            <v-text-field
        v-model="searchQuery"
        color="primary"
        label="Search.."
        placeholder="Search Nickname...."
        type="text"
      ></v-text-field>
    </div>
        <div class="">
            <table class="table-light table-stripe table table-responsive">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Last Logged-in</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody v-for="user in filteredUsers" :key="user.id" >
                    <tr>
                        <td>{{ user.id }}</td>
                        <td>{{ user.nickname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.lastloggedin }}</td>
                        <td>
                            <div v-if="user.flag==1">
                                <div v-show="showBtn">
                                    <v-btn @click="disableUser(user)">
                                        Disable User
                                    </v-btn>
                                </div>
                            </div>
                            <div v-else>
                                <v-btn @click="enableUser(user)">
                                    Enable User
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </usersSidebar>
    </template>
    <script setup>
    import usersSidebar from '../tools/usersSidebar.vue';
    import AuthenticationService from '@/services/AuthenticationService';
    import { ref,computed } from 'vue';

    const showBtn = ref(true)

            const users = ref([]);
            const searchQuery = ref('');

            const getAllUsers = async ()=>{
                try{
                    const response = await AuthenticationService.getAllUsers();
                    if(response){
                        users.value = response.data.allUsers
                    }else{
                        throw Error('Empty Users')
                    }

                }catch(err){
                    console.log(err)
                }
            }
            getAllUsers();


            const filteredUsers = computed(() => {
      return users.value.filter(user => {
        return user.nickname.toLowerCase().includes(searchQuery.value.toLowerCase());
      });

    });
    const enableUser = async(user)=>{
        try {
          const response = AuthenticationService.enableUser({
            id:user.id
          })
          if(response){
            getAllUsers();
          }
      } catch (error) {
          console.log(error)
      }
    }
    const disableUser = async (user)=>{
      try {
          const response = AuthenticationService.disableUser({
            id:user.id
          })
          if(response){
            getAllUsers();
          }
      } catch (error) {
          console.log(error)
      }
    }
    </script>