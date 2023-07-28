<template>
  <div class="container mycontainer">
    <h1 style='font-family: "Aladin", cursive;font-size: 48px;text-align: center;'>Create Your Portfolio</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Profile</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="about" class="form-label">About Yourself</label>
        <textarea
          id="about"
          v-model="formData.about"
          class="form-control"
          style="resize: none"
          rows="4"
        ></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Achievements</label>
        <div
          v-for="index in achievementCounter"
          :key="index"
          class="input-group mb-3"
        >
          <input
            type="text"
            v-model="formData.achievements[index - 1]"
            class="form-control"
          />
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="removeAchievement(index - 1)"
          >
            Remove
          </button>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="addAchievement"
          >
            Add
          </button>
        </div>
      </div>
      <div class="">
        <label class="form-label">Work</label>
        <div v-for="index in imageCounter" :key="index" class="">
          <div class="row">
            <div class="col-5">
              <input
                type="file"
                @change="handleImageUpload($event, index - 1)"
                class="form-control-file"
                required
              />
              <div class="mb-3">
                <div class="imgdiv">
                  <img
                    class="image1"
                    :src="imagePreview[index - 1]"
                    alt="event image"
                  />
                </div>
              </div>
            </div>
            <div class="col-7" style="padding-top: 50px">
              <input
                type="text"
                v-model="formData.imageNames[index - 1]"
                class="form-control mt-2"
                placeholder="Work Name"
                required
              />

              <textarea
                v-model="formData.aboutImages[index - 1]"
                class="form-control mt-2"
                style="resize: none"
                rows="5"
                placeholder="About Work"
              ></textarea>
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger mt-2"
                  @click="removeImage(index - 1)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="addImage()"
          >
            Add
          </button>
        </div>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto mybtn">
        <button type="submit" class="btn btn-secondary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateProfile",
  data() {
    return {
      formData: {
        name: "",
        about: "",
        images: [],
        achievements: [],
        imageNames: [],
        aboutImages: [],
      },
      imageCounter: 0,
      achievementCounter: 0,
      token: null,
      imagePreview: [],
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      this.$router.push({ name: "login" });
    } else {
      this.token = user.token;
      console.log(this.token);
      axios.defaults.headers.common["Authorization"] = this.token;

      axios
        .get("http://localhost:5000/artist/updateProfile")
        .then((response) => {
          if (response.data.length > 0) {
            alert("You already have a portfolio.");
            this.$router.push({ name: "updateProfile" });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ name: "home" });
        });
    }
  },

  methods: {
    addAchievement() {
      const len = this.formData.achievements.length;
      if (len == 0) {
        this.formData.achievements.push("");
        console.log(this.achievementCounter);
        this.achievementCounter++;
      } else if (this.formData.achievements[len - 1].trim() == "") {
        alert(
          "Before Adding new new first fill the detail of current acheivement"
        );
      } else {
        this.formData.achievements.push("");
        console.log(this.achievementCounter);
        this.achievementCounter++;
      }
    },
    removeAchievement(index) {
      this.formData.achievements.splice(index, 1);
      this.achievementCounter--;
    },
    addImage() {
      const len = this.formData.images.length;
      if (len == 0) {
        this.formData.images.push(null);
        this.formData.imageNames.push("");
        this.formData.aboutImages.push("");
        this.imagePreview.push(null);
        this.imageCounter++;
      } else if (
        this.formData.images[len - 1] == null ||
        this.formData.imageNames[len - 1].trim() == "" ||
        this.formData.aboutImages[len - 1].trim() == ""
      ) {
        alert("Before Adding new Work first fill the detail of current work");
      } else {
        this.formData.images.push(null);
        this.formData.imageNames.push("");
        this.formData.aboutImages.push("");
        this.imagePreview.push(null);
        this.imageCounter++;
      }
    },
    removeImage(index) {
      this.formData.images.splice(index, 1);
      this.formData.imageNames.splice(index, 1);
      this.formData.aboutImages.splice(index, 1);
      this.imagePreview.splice(index, 1);
      this.imageCounter--;
    },
    handleImageUpload(event, index) {
      const file = event.target.files[0];
      this.formData.images[index] = file;

      this.imagePreview[index] = URL.createObjectURL(file);
    },
    submitForm() {
      console.log(this.formData);
      const data = {
        name: this.formData.name,
        about: this.formData.about,
        achievements: this.formData.achievements,
        imageNames: this.formData.imageNames,
        aboutImages: this.formData.aboutImages,
      };
      const formData = new FormData();
      for (let i = 0; i < this.formData.images.length; i++) {
        formData.append("images", this.formData.images[i]);
      }
      formData.append("data", JSON.stringify(data));
      console.log(formData);
      axios.defaults.headers.common["Authorization"] = this.token;
      axios
        .post("http://localhost:5000/artist/createprofile", formData)
        .then((response) => {
          console.log(response);
          alert("Portfolio Created Successfully");
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.mybtn {
  margin-top: 20px;
  margin-bottom: 30px;
}
.mycontainer {
  margin-top: 50px;
}
.imgdiv {
  margin-top: 10px;
  border: 1px solid black;
  background-color: whitesmoke;
  /* width: 100%; */
  display: flex;
  align-items: center;
  /* margin-left: 0px;
    margin-right: 0px; */
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  /* overflow:  ; */
}
.image1 {
  max-width: 100%;
  max-height: 100%;
  /* width: auto;
  height: auto; */
}
</style>
