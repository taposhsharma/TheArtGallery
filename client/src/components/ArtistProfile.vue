<template>
  <div class="artist">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 details">
          <div>
            <div class="profile">
              <h2 class="display-4">Artist Name</h2>
            </div>
            <div class="description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt urna et est eleifend hendrerit. Integer tristique
                fermentum turpis, a sagittis quam scelerisque eu. Nulla
                pulvinar, turpis sed fermentum cursus, nisl massa tincidunt
                massa, in pharetra ipsum felis vel metus. Quisque sollicitudin
                lectus eget gravida ultrices.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="image-container">
            <figure class="wave">
              <img
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1602040491414/RKBo8jy-u.jpeg"
                alt="profile"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid acheive">
    <div class="row">
      <div class="col acheivements">
        <div>
          <h1>
            <img src="../assets/acheivement.png" alt="" height="40" />
            Acheivements
          </h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="(acheivement, i) in acheivements" :key="i" class="col-4">
        <div class="content">
          <div class="row g-0">
            <div class="col-1" style="display: flex; justify-content: center">
              <i class="bi-disc-fill"></i>
            </div>
            <div class="col-11">
              <p>{{ acheivement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid workContainer">
    <div class="row">
      <div class="col work">
        <div>
          <h1>
            <img src="../assets/creative-process.png" alt="" height="40" /> Best
            Work
          </h1>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="(image, i) in images" :key="i" class="col-3">
        <div class="content">
          <div class="row g-0">
            <img class="dummy" :src="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistProfile",
  data() {
    return {
      acheivements: [
        {
          title: "Solo Exhibition",
          year: 2020,
          description:
            "Showcased a collection of artwork in a solo exhibition at XYZ Gallery.",
        },
        {
          title: "Art Award",
          year: 2019,
          description:
            "Received the Best Artist of the Year award from the Art Association.",
        },
        {
          title: "Featured in Magazine",
          year: 2018,
          description:
            "Artwork featured in the prestigious Art & Design Magazine's special edition.",
        },
        {
          title: "Public Art Commission",
          year: 2017,
          description:
            "Commissioned to create a large-scale public art installation for a city project.",
        },
        {
          title: "Artist Residency",
          year: 2016,
          description:
            "Participated in a renowned artist residency program at an international art center.",
        },
      ],
      images: [
        "https://images.pexels.com/photos/2983141/pexels-photo-2983141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://www.fitoor.com.pk/wp-content/uploads/2020/10/IMG_20200929_003608.jpg",
        "https://www.fitoor.com.pk/wp-content/uploads/2020/10/IMG_20200929_003608.jpg",
        "https://www.fitoor.com.pk/wp-content/uploads/2020/10/IMG_20200929_003608.jpg",
      ],
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,600;1,600&display=swap");

.workContainer {
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 50px;
  background-color: rgb(183, 192, 232);
}

.work {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

.content {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}
.acheive {
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 50px;
  background-color: antiquewhite;
}
.acheivements {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}
.image-container {
  display: flex;
  justify-content: center;
}

.rounded-circle {
  border-radius: 50%;
  width: 300px;
  height: 300px;
}

.profile {
  margin-bottom: 20px;
}

.description {
  line-height: 1.6;
}
.artist {
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  color: white;

  background-image: url("../assets/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-concrete_1258-72085.avif");
  background-repeat: no-repeat;
  background-size: cover;
}
.details {
  font-family: "Crimson Text", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
}
.wave {
  float: left;
  margin: 20px;
  animation: wave ease-in-out 8s infinite alternate;
  transform-origin: center -36px;
}

.wave:hover {
  animation-play-state: paused;
  cursor: pointer;
}

.wave img {
  border: 5px solid #f8f8f8;
  display: block;
  width: 300px;
  height: 375px;
}

.wave figcaption {
  text-align: center;
}

.wave:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1.5px solid #ffffff;
  top: -10px;
  left: 50%;
  border-bottom: none;
  border-right: none;
  transform: rotate(35deg);
}

.wave:before {
  content: "";
  position: absolute;
  top: -23px;
  left: 50%;
  display: block;
  height: 44px;
  width: 47px;
  background-image: url(https://cdn.hashnode.com/res/hashnode/image/upload/v1602040503586/FW6g79WBY.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  z-index: 16;
}

.dummy {
  /* border: 5px black; */

  border: 10px solid whitesmoke;
  transition: 50ms ease-in;
  width: 90%;

  /* border-radius: 50%; */
}
.dummy:hover {
  transition: 750ms ease-in;
  border-radius: 0;
  border: none;
  width:100%;

  /* z-index: 2; */
  /* box-shadow: 0px -2px 92px 24px rgba(0, 0, 0, 0.38);
  -webkit-box-shadow: 0px -2px 92px 24px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 0px -2px 92px 24px rgba(0, 0, 0, 0.38); */
  box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
  -webkit-box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
  -moz-box-shadow: 0px -2px 92px 24px rgba(227, 223, 223, 1);
}

@keyframes wave {
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
