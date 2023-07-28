<template>
  <div class="container">
    <div class="row myrow">
      <div class="col-6 mycard">
        <router-link to="/createPost" class="nav-link">
          <div
            class="card"
            style="width: 24rem; box-shadow: 4px 4px 12px rgba(56, 53, 53, 0.2)"
          >
            <img src="../assets/add-event.png" class="card-img-top" alt="..." />
            <div class="card-body mycardbody">Add Event</div>
          </div></router-link
        >
      </div>
      <div class="col-6 mycard">
        <router-link to="/allevents" class="nav-link">
          <div
            class="card"
            style="width: 24rem; box-shadow: 4px 4px 12px rgba(56, 53, 53, 0.2)"
          >
            <img src="../assets/refresh.png" class="card-img-top" alt="..." />
            <div class="card-body mycardbody">Update Events</div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventManager",
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Aladin&display=swap");
.mycard {
  display: flex;
  justify-content: center;
  align-items: center;
}
.myrow {
  margin-top: 150px;
}
img {
  padding: 40px;
}
.mycardbody {
  font-family: "Aladin", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
</style>
