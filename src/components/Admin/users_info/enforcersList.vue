<template>
    <usersSidebar>
      <div class="mt-5 mb-3">
        <v-alert v-if="success"
  color="success"
  icon="$success"
  title="Success"
  :text="success"
  ></v-alert>
  <v-alert v-if="err"
  color="error"
  icon="$error"
  title="Error"
  :text="err"
  ></v-alert>
      </div>
        <div class="mb-5 align-center w-50">
            <v-text-field
        v-model="searchQuery"
        color="primary"
        label="Search.."
        placeholder="Search Username...."
        type="text"
      ></v-text-field>
      <br>
      <v-btn class="mb-2" @click="showRegistration"><span v-if="!registrationForm">Open Enforcer Send Email Form</span><span v-else>Close Enforcer Send Email Form</span></v-btn>
      <div v-if="registrationForm">
        <div>
<div class="subscribe mb-5">
<p>Sending Registration Form</p>
<input placeholder="Your e-mail" class="subscribe-input" name="email" type="email" required v-model="email">
<br>
<div class="submit-btn" @click="send_registration">SEND</div>
</div>
</div>
      </div>
    </div>
        <div>
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
                <tbody v-for="enforcer in filteredEnforcers" :key="enforcer.id" >
                    <tr>
                        <td>{{ enforcer.id }}</td>
                        <td>{{ enforcer.nickname }}</td>
                        <td>{{ enforcer.email }}</td>
                        <td>{{ enforcer.lastloggedin }}</td>
                        <td>
                            <v-btn @click="removeEnforcer(enforcer)">Remove Enforcer</v-btn>
                            <div v-if="enforcer.flag==1">
                                <div v-show="showBtn">
                                    <v-btn @click="disableUser(enforcer)">
                                        Disable Enforcer
                                    </v-btn>
                                </div>
                            </div>
                            <div v-else>
                                <v-btn @click="enableUser(enforcer)">
                                    Enable Enforcer
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
    import axios from 'axios';
    
    const showBtn = ref(true)
   
            const enforcers = ref([]);
            const searchQuery = ref('');
            const registrationForm = ref(false);
            const email = ref('');
            const err = ref('');
            const success = ref('');

            const send_registration = async()=>{
    try {
        const response = await axios.post('http://localhost:8084/api/send-registration-form',{
            email:email.value
        })
        if(response){
          registrationForm.value = false
            email.value = null;
            success.value = response.data.msg;
        }
    } catch (error) {
        console.log(error)
        err.value = error.response.data.msg
    }
}

            const getAllEnforcers = async ()=>{
                try{
                    const response = await AuthenticationService.getAllEnforcer();
                    if(response){
                        enforcers.value = response.data.allEnforcers
                    }else{
                        throw Error('Empty Users')
                    }

                }catch(err){
                    console.log(err)
                }
            }
            getAllEnforcers();


        
    const removeEnforcer = async (enforcer) =>{
        try{
            const response = await AuthenticationService.removeEnforcer({
                id:enforcer.id
            });
            if(response){
                success.value =response.data.msg;
            getAllEnforcers();

            }
        }catch(error){
            console.log(error)
            err.value = error.response.data.msg;

        }
    }
    const showRegistration = async ()=>{
        registrationForm.value = !registrationForm.value;
    }
  
    const filteredEnforcers = computed(() => {
    // Ensure users.value is defined before filtering
    if (enforcers.value) {
      return enforcers.value.filter(enforcer => {
        return enforcer.nickname.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    } else {
      return []; // Return an empty array if users.value is undefined
    }
  });
  const enableUser = async(enforcer)=>{
        try {
          const response = await AuthenticationService.enableUser({
            id:enforcer.id
          })
          if(response){
            success.value = response.data.msg
        getAllEnforcers()
          }
      } catch (error) {
          console.log(error)
          err.value = error.response.data.msg;
      }
    }
    const disableUser = async (enforcer)=>{
      try {
          const response = AuthenticationService.disableUser({
            id:enforcer.id
          })
          if(response){
            success.value = response.data.msg
        getAllEnforcers()
          }
      } catch (error) {
          console.log(error)
          err.value = error.response.data.msg;
      }
    }

    </script>
    <style scoped>
  .subscribe {
  position: relative;
  width: 400px; /* Increase the width to make it bigger */
  height: 200px; /* Increase the height to make it bigger */
  margin: 0 auto; /* Center the component horizontally */
  margin-top: 100px; /* Adjust this value to center it vertically */
  padding: 20px;
  background-color: #FFF;
  border-radius: 4px;
  color: #333;
  box-shadow: 0px 0px 60px 5px rgba(0, 0, 0, 0.4);
}

.subscribe:after {
  position: absolute;
  content: "";
  right: -10px;
  bottom: 18px;
  width: 0;
  height: 0;
  border-left: 0px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #1a044e;
}

.subscribe p {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 28px;
}

.subscribe input {
  position: absolute;
  bottom: 30px;
  border: none;
  border-bottom: 1px solid #d4d4d4;
  padding: 10px;
  width: 82%;
  background: transparent;
  transition: all .25s ease;
}

.subscribe input:focus {
  outline: none;
  border-bottom: 1px solid #0d095e;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', 'sans-serif';
}

.subscribe .submit-btn {
  position: absolute;
  border-radius: 30px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  background-color: #0f0092;
  color: #FFF;
  padding: 12px 25px;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 5px;
  right: -10px;
  bottom: -20px;
  cursor: pointer;
  transition: all .25s ease;
  box-shadow: -5px 6px 20px 0px rgba(26, 26, 26, 0.4);
}

.subscribe .submit-btn:hover {
  background-color: #07013d;
  box-shadow: -5px 6px 20px 0px rgba(88, 88, 88, 0.569);
}

  </style>