<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="mt-5">
          <div class="card shadow-lg">
            <div class="card-body">
              <div class="text-center"><h3 class="card-title" style='font-family: "Aladin", cursive;font-size: 48px;'>SignUp</h3></div>
              <br />
              <form @submit.prevent="submitForm" id="myForm">
                <div class="row">
                  <div class="col-8">
                    <div class="mb-3">
                      <label for="firstName" class="form-label"
                        >First Name:</label
                      >
                      <input
                        type="text"
                        v-model="firstName"
                        class="form-control"
                        id="firstName"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="lastName" class="form-label"
                        >Last Name:</label
                      >
                      <input
                        type="text"
                        v-model="lastName"
                        class="form-control"
                        id="lastName"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email:</label>
                      <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        id="email"
                        required
                      />
                      <div>
                        <p
                          style="color: red; font-size: 12px; margin-left: 10px"
                        >
                          {{ this.mess }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3">
                    <img
                      :src="selectedImage"
                      class="border border-secondary"
                      width="180"
                      height="200"
                      alt="Uploaded Image"
                    />

                    <div class="mb-3">
                      <label for="imageUpload" class="form-label"></label>
                      <input
                        type="file"
                        class="form-control"
                        id="imageUpload"
                        accept="image/*"
                        style="width: 180px"
                        @change="handleImageUpload"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="role" class="form-label">Profile:</label>
                      <select
                        v-model="selectedRole"
                        class="form-select"
                        id="role"
                        required
                      >
                        <option value="user">General</option>
                        <option value="artist">Artist</option>
                        <option value="merchant">Merchant</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="mobile" class="form-label"
                        >Mobile Number:</label
                      >
                      <input
                        type="tel"
                        v-model="mobileNumber"
                        class="form-control"
                        id="mobile"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="address" class="form-label">Address:</label>
                  <textarea
                    v-model="address"
                    class="form-control"
                    style="resize: none"
                    rows="2"
                    id="address"
                    required
                  ></textarea>
                </div>
                <label for="password" class="form-label">Password:</label>
                <div class="input-group">
                  <input
                    :type="passwordFieldType"
                    v-model="password"
                    class="form-control"
                    id="password"
                    minlength="6"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="togglePasswordVisibility"
                  >
                    <i
                      :class="
                        passwordFieldType === 'password'
                          ? 'bi bi-eye'
                          : 'bi bi-eye-slash'
                      "
                    ></i>
                  </button>
                </div>

                <div class="d-grid gap-2 col-6 mx-auto" style="margin-top: 20px;">
                  <button type="submit" class="btn btn-secondary">Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignupPage",
  data() {
    return {
      selectedImage: require("@/assets/pexels-mohamed-abdelghaffar-771742.jpg"),
      firstName: "",
      lastName: "",
      email: "",
      selectedRole: "",
      mobileNumber: "",
      address: "",
      password: "",
      passwordFieldType: "password",
      image: [],
      mess: "",
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      this.$router.push({ name: "signup" });
    } else {
      this.token = user.token;
      // console.log(this.token)
      axios.defaults.headers.common["Authorization"] = this.token;

      axios
        .get("http://localhost:5000/check")
        .then((response) => {
          console.log(response.data);

          if (response.data !== "authorized") {
            console.log("hii");
          } else {
            this.$router.push({ name: "home" });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  },
  methods: {
    submitForm() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.selectedRole,
        mobile_no: this.mobileNumber,
        address: this.address,
        password: this.password,
      };
      const formData = new FormData();
      for (let i = 0; i < this.image.length; i++) {
        formData.append("images[]", this.image[i]);
      }
      formData.append("info", JSON.stringify(data));
      axios
        .post("http://localhost:5000/signup", formData)
        .then((response) => {
          console.log(response.mess);
          alert("Account Created Successfully.");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.error(error.response.data.mess);
          this.mess = error.response.data.mess;
        });
      console.log(data);
    },
    handleImageUpload(event) {
      const file = event.target.files[0];

      this.image.push(file);
      this.selectedImage = URL.createObjectURL(file);
      console.log(this.selectedImage);
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped></style>
