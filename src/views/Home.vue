<template>
  <div>
    <div v-if="loading" class="loading">
      <div>
        <p>Loading...</p>
      </div>
    </div>
    <div v-else class="wrapper">
      <div class="components left-container">
        <weather
          v-if="show"
          v-on:toggle="toggleShow"
          :tempMode="tempMode"
        ></weather>
        <search v-else v-on:toggle="toggleShow"></search>
      </div>
      <div class="right-container">
        <div class="temp-icons">
          <button @click="changeToCelcius">&#8451;</button>
          <button @click="changeToFarenheit">&#8457;</button>
        </div>
        <div class="future-cards">
          <div
            v-for="(daily, index) in slicedDaily"
            :key="daily.id"
            class="card"
          >
            <p class="date">{{ dates.future[index] }}</p>
            <img :src="daily.img" alt />
            <div>
              <p v-temp:[changeTemp]="tempMode" class="mornTemp">
                {{ daily.temp.morn | roundTemp }} <span>&#8451;</span>
              </p>
              <p v-temp:[changeTemp]="tempMode" class="nightTemp">
                {{ daily.temp.night | roundTemp }} <span>&#8451;</span>
              </p>
            </div>

            <p></p>
          </div>
        </div>
        <h2>Today's highlights</h2>
        <div class="highlights-one">
          <div class="highlights">
            <h5>Wind Status</h5>
            <p>
              {{ city.current.wind_speed }}
            </p>
            <span class="symbol">mps</span>
          </div>
          <div class="highlights">
            <h5>Humidity</h5>
            <p>
              {{ city.current.humidity }}
            </p>
            <span class="symbol">%</span>
            <div class="white-box">
              <div
                class="humidity-level"
                :style="{ width: city.current.humidity + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div class="highlights-two">
          <div class="highlights">
            <h5>Visibility</h5>
            <p>
              {{ city.current.visibility }}
            </p>
            <span class="symbol">meters</span>
          </div>
          <div class="highlights">
            <h5>Air pressure</h5>
            <p>
              {{ city.current.pressure }}
            </p>
            <span class="symbol">hPa</span>
          </div>
        </div>
        <h4>obiwanpelosi @ DevChallenges.io</h4>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Search from "../components/search.vue";
import Weather from "../components/weather.vue";

export default {
  components: {
    search: Search,
    weather: Weather,
  },
  data() {
    return {
      show: true,
      tempMode: "celcius",
      changeTemp: false,
    };
  },
  methods: {
    toggleShow() {
      this.changeTemp = false;
      this.show = !this.show;
      if (this.tempMode == "farenheit") {
        this.tempMode = "celcius";
      }
    },
    changeToCelcius() {
      if (this.tempMode == "farenheit") {
        this.changeTemp = true;
        this.tempMode = "celcius";
      }
    },
    changeToFarenheit() {
      if (this.tempMode == "celcius") {
        this.changeTemp = true;
        this.tempMode = "farenheit";
      }
    },
  },
  computed: {
    ...mapState({
      city: "city",
      loading: "loading",
      dates: "dates",
    }),
    slicedDaily() {
      return this.city.daily.slice(0, 5);
    },
  },
  beforeCreate() {
    this.$store.dispatch("getLocation");
  },
  // (){
  //   this.tempMode = this.tempMode;
  // },
  directives: {
    temp: {
      update(el, binding) {
        if (binding.arg == true) {
          if (binding.value == "farenheit") {
            el.innerHTML = `${Math.round(
              (parseInt(el.innerText) * 9) / 5 + 32
            ).toString()}  <span>&#8457;</span>`;
          } else if (binding.value == "celcius") {
            el.innerHTML = `${Math.round(
              ((parseInt(el.innerText) - 32) * 5) / 9
            ).toString()} <span>&#8451;</span>`;
          }
        }
      },
    },
  },
  filters: {
    roundTemp(temp) {
      return Math.round(temp);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
}
.loading {
  background: #100e1d;
  height: 100vh;
  text-align: center;
}
.loading div {
  position: relative;
  top: 200px;
}
.loading div p {
  color: white;
  font-size: 2em;
  opacity: 1;
  animation-name: glow;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
}
@keyframes glow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.temp-icons {
  display: none;
  visibility: hidden;
}
.right-container {
  background: #100e1d;
  font-family: "Raleway", sans-serif;
}
.future-cards {
  width: 90%;
  margin: 0 auto;
  padding: 50px 0;
}
.card {
  width: 35%;
  margin: 5%;
  display: inline-block;
  text-align: center;
  background: #1e213a;
  padding: 15px 5px;
}

.card div {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.date {
  margin: 10px auto;
  color: #e7e7eb;
  font-size: 0.8em;
}
.mornTemp {
  color: #e7e7eb;
}
.nightTemp {
  color: #a09fb1;
}
h2 {
  color: #e7e7eb;
  padding-left: 15px;
}
.highlights-one,
.highlights-two {
  color: #e7e7eb;
  width: 95%;
  margin: 10px auto;
}
.highlights {
  text-align: center;
  background-color: #1e213a;
  padding: 20px;
  margin: 10px 0;
}
h5 {
  font-size: 1.2em;
  padding-bottom: 20px;
}
h5 + p {
  font-size: 4em;
  padding-bottom: 35px;
  display: inline-block;
}
.symbol {
  font-size: 2.1em;
}
.white-box {
  border: 1px solid;
  background-color: white;
  width: 65%;
  height: 2px;
  margin: 0 auto 10px auto;
  border-radius: 80px;
}
.humidity-level {
  background-color: #ffec65;
  text-align: left;
  height: 2px;
}
h4 {
  text-align: center;
  color: #e7e7eb;
  font-weight: 300;
  font-family: "Raleway", sans-serif;
}
@media only screen and (min-width: 1024px) {
  .wrapper {
    display: flex;
  }
  .components {
    width: 35%;
    background-color: #1e213a;
    min-height: 894px;
  }

  .right-container {
    width: 65%;
  }
  .temp-icons {
    display: flex;
    visibility: visible;
    float: right;
    margin: 20px 40px 0 0;
    border: 1px solid;
    width: 10%;
    justify-content: space-between;
  }
  .temp-icons button {
    background-color: #585676;
    color: #e7e7eb;
    outline: none;
    border: 1px solid #585676;
  }
  .future-cards {
    width: 95%;
  }
  .card {
    width: 16%;
    margin: 1.2%;
  }
  .date {
    font-size: 0.7em;
  }
  .highlights-one,
  .highlights-two {
    display: flex;
  }
  .highlights-one .highlights {
    min-height: 200px;
  }
  .highlights {
    width: 45%;
    margin: 2.5%;
  }
  h5 + p {
    padding-bottom: 0;
  }
  .white-box {
    margin-top: 35px;
  }
}
</style>