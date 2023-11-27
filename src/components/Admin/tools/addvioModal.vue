<template>
    <v-dialog v-model="isVisible" scrollable fullscreen>
      <v-card>
        <v-card-title>
          <span class="headline">Modal title</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeInsertionModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <!-- Modal Body Content Goes Here -->
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="formData.name" label="Name"></v-text-field>
            <v-text-field v-model="formData.email" label="Email"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeInsertionModal">Close</v-btn>
          <v-btn color="blue darken-1" @click="submitForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      isInsertionModalVisible: Boolean,
    },
    setup(props, { emit }) {

    const isVisible = ref(props.isInsertionModalVisible);

      const closeInsertionModal = () => {
      isVisible.value = false;
      emit('update:isInsertionModalVisible', false); // Emit an event to update the prop in the parent
    };
  
      const formData = ref({
        
      });
  
      const submitForm = () => {
        // Simulate a form submission
        const dataToSubmit = {
          name: formData.value.name,
          email: formData.value.email,
        };
  
        // Emit a custom event to pass the submitted data to the parent component
        emit('save', dataToSubmit);
  
        // Close the modal
        closeInsertionModal();
      };
  
      return {
      isVisible,
        formData,
        closeInsertionModal,
        submitForm,
      };
    },
  };
  </script>
  