<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark fixed-top"
    style="background-color: #0b2424; font-family: 'Aladin', cursive"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/"
        ><img
          src="../assets/theartgallery.jpg"
          class="float-start"
          width="40"
          style="border-radius: 50%"
          alt="logo"
        />
        <h3>The Art Gallery</h3></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="container1">
        <button
          class="btn btn-sm btn-outline-light float-end mybutton"
          v-if="!this.$store.state.loggedIn"
          @click="login"
        >
          Login
        </button>

        <button
          class="btn btn-sm btn-outline-light float-end mybutton"
          v-if="!this.$store.state.loggedIn"
          @click="signup"
        >
          Sign Up
        </button>
        <button
          class="btn btn-sm btn-outline-light float-end mybutton"
          v-if="this.$store.state.loggedIn"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$store.commit("changeLog");
      this.$router.push({ name: "login" });
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    login() {
      this.$router.push({ name: "login" });
    },
    profile() {
      this.$router.push({ name: "userprofile" });
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Aladin&display=swap");
.container1 {
  margin-right: 20px;
}
.mybutton {
  margin-right: 10px;
  width: 100px;
}
h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-top: 4px;
  font-size: 32px;
}
</style>
