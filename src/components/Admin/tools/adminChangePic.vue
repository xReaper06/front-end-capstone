<template>
   <div class="modal" v-if="props.showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>

      <div class="content-container">
        <div v-if="showFile" class="image-container">
          <img :src="fileView.preview" alt="Selected Image" class="preview-image">
        </div>

        <div class="file-upload">
          <v-file-input v-model="profile" type="file" id="file" @change="handleImgChange" accept="image/png, image/jpeg, image/jpg" />
        </div>

        <div v-if="showButton" class="button-container">
          <button class="change-profile-button" @click="ChangeProfilePic">Change Profile Picture</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import AuthenticationService from "@/services/AuthenticationService";

const props = defineProps({
  showModal: Boolean,
});

const emits = defineEmits(["closeModal"]);

const closeModal = () => {
  emits("closeModal");
};

const file = ref(null);
const fileView = ref({ preview: "" });
const showFile = ref(false);
const showButton = ref(false);
const profile = ref("");
const user = ref("");
const username = ref("");

user.value = localStorage.getItem("user");
username.value = JSON.parse(user.value);

const handleImgChange = (event) => {
  const img = event.target.files;
  if (img.length > 0) {
    file.value = img[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      fileView.value = {
        name: img[0].name,
        preview: e.target.result,
      };
      showFile.value = true;
    };
    reader.readAsDataURL(img[0]);
    showButton.value = true;
  }
};

const ChangeProfilePic = async () => {
  try {
    const data = new FormData();
    data.append("user_id", username.value.id);
    data.append("profile_pic", file.value);
    const response = await AuthenticationService.changeProfilePic(data);
    if (response) {
      profile.value = "";
      showButton.value = false;
      showFile.value = false;
    } else {
      console.log(response.data.msg);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 80%;
  max-width: 400px;
}

/* Close button */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

/* Content Styles */
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Image Styles */
.image-container {
  margin-bottom: 20px;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
}

/* File Upload Styles */
.file-upload {
  margin-bottom: 20px;
}

/* Button Styles */
.button-container {
  text-align: center;
}

.change-profile-button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.change-profile-button:hover {
  background-color: #0056b3;
}
</style>
