<template>
  <div class="container-fluid mybody">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row g-0 rounded login">
          <div class="col-6">
            <div
              id="carouselExampleControls"
              class="carousel slide rounded"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src="https://www.fitoor.com.pk/wp-content/uploads/2020/10/IMG_20200929_003608.jpg"
                    class="d-block w-100 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aXN0aWN8ZW58MHx8MHx8&w=1000&q=80"
                    class="d-block w-100 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://images.pexels.com/photos/2983141/pexels-photo-2983141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    class="d-block w-100 image"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="col-6">
            <div class="card_style">
              <div class="card border-0">
                <div class="card-body">
                  <div class="text-center">
                    <h1 class="card-title">Login</h1>
                  </div>
                  <br />
                  <form @submit.prevent="submitForm" id="myForm">
                    <div class="row">
                      <div class="col">
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
                              class="myfonts"
                              style="
                                color: red;
                                font-size: 14px;
                                margin-left: 10px;
                              "
                            >
                              {{ this.mess1 }}
                            </p>
                          </div>
                        </div>

                        <label for="password" class="form-label"
                          >Password:</label
                        >
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
                        <div>
                          <p
                            class="myfonts"
                            style="
                              color: red;
                              font-size: 14px;
                              margin-left: 10px;
                            "
                          >
                            {{ this.mess2 }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="d-grid gap-2">
                      <button type="submit" class="btn btn-secondary">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setToken } from "@/services/tokenServices";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",

      password: "",
      passwordFieldType: "password",
      mess1: "",
      mess2: "",
    };
  },

  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      this.$router.push({ name: "login" });
    } else {
      this.token = user.token;
      // console.log(this.token)
      axios.defaults.headers.common["Authorization"] = this.token;

      axios
        .get("http://localhost:5000/check")
        .then((response) => {
          // console.log(response.data)

          if (response.data !== "authorized") {
            // console.log("hii")
          } else {
            this.$router.push({ name: "home" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    submitForm() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.mess1 = "";
      this.mess2 = "";

      axios
        .post("http://localhost:5000/login", data)
        .then((response) => {
          console.log(response);
          if (response.data.user === 0) {
            console.log("user not exists");
            this.mess1 = "User Doesn't Exist";
          } else if (response.data.user === 1) {
            console.log("password wrong");
            this.mess2 = "Password Incorrect";
          } else {
            console.log("hello");
            setToken(JSON.stringify(response.data.user));
            this.$router.push({ name: "home" });
            this.$store.commit("changeLog");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Audiowide");
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,600;1,600&family=Roboto:wght@100&display=swap");
.login {
  margin-top: 100px;
  border: 3px solid #ded5d5;
  box-shadow: 4px 4px 12px rgba(56, 53, 53, 0.2);
}
.image {
  height: 600px;
}
.card_style {
  margin: 50px;
  padding-top: 60px;
  font-family: "Audiowide", sans-serif;
}
.myfonts {
  font-family: "Crimson Text", serif;
}
.mybody {
}
</style>
