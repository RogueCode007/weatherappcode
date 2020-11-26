<template>
  <div class="container">
    <div class="current">
      <!-- <img class="background-cloud" src="../assets/Cloud-background.png" alt=""> -->
      <div class="content">
        <div class="action-btn">
          <button @click="search">Search for places</button>
          <div class="location_icon"><i class="material-icons searching">location_searching</i></div>
        </div>
        <div class="weather-data">
          <img class="weather-icon" :src="city.img" alt="weather icon" />
          <p v-temp:changeTemp="tempMode" class="current-temp">{{city.current.temp | roundTemp}}<span class="temp-symbol">&#8451;</span> </p>
          <p class="description">{{city.current.weather[0].description}}</p>
          <div class="date">
            <p>Today</p>
            <p>.</p>
            <p>{{dates.today}}</p> 
          </div>
          <p class="location"><span><i class="material-icons location_on">location_on</i></span> {{city.timezone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { bus } from "../main"
import { mapState } from "vuex";

export default {
  props:{
    tempMode:{
      type: String
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    search() {
      this.$emit("toggle");
    },
  
  },
  computed: {
    ...mapState({
      city: "city",
      dates: "dates",
    }),
    slicedDaily() {
      return this.city.daily.slice(0, 5);
    },
  },
  directives:{
    temp:{
      update(el, binding){
        if(binding.value == "farenheit"){
         el.innerHTML = `${(Math.round(parseInt(el.innerText) * 9 / 5 + 32)).toString()}  <span>&#8457;</span>`
        }else if(binding.value == "celcius"){
          el.innerHTML = `${(Math.round((parseInt(el.innerText) - 32) * 5 / 9)).toString()} <span>&#8451;</span>`
        }
      }
    }
  },
  filters:{
    roundTemp(temp){
      return Math.round(temp)
    }
  }

  // ,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
  color: #E7E7EB;
  
}
.current{
  text-align: center;
  font-family: 'Raleway', sans-serif;
  
}
.content{
  background-color: #1E213A;
  padding: 20px;
  
}
button{
  background-color: #6E707A;
  color: #E7E7EB;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #6E707A;
  font-family: 'Raleway', sans-serif;
}

.location_icon{
  background-color: #6E707A;
  padding: 6px;
  border-radius: 50%;
  line-height: 0.7em
}
.material-icons{
  color: white;
  font-size: 30px
}
.searching{
  font-size: 15px
}
.action-btn{
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  
}
.action-btn i{
  cursor: pointer;
}
.weather-data{
  margin: 20px 0
}
.weather-icon{
  width: 250px;
  height: 230px;
  
}
.current-temp{
  font-size: 4em;
  margin-top: 0;
  margin-bottom: 5px
}
.temp-symbol{
  font-size: 0.5em;
  color: #A09FB1
}
.description{
  font-size: 2em;
  color: #A09FB1
}
.date{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  
}
.date p{
  color: #A09FB1;
  
}
.location{
  color: #A09FB1;
  font-size: 1.2em
}
.location_on{
  color: #A09FB1
}
p.location{
  
}
@media only screen and (min-width: 800px){
  .content{
     min-height: 894px
  }
  .weather-icon{
    margin-top: 25px
  }
  .current-temp{
    margin: 20px 0;
    font-size: 6em;
  }
  .description{
    margin: 80px 0
  }
  div.date{
    width: 100%;
  }
  .location, .date{
    position: relative;
    top: 450px
  }
}
@media only screen and (min-width: 1024px){
    .location, .date{
    position: relative;
    top: 150px;
  }
}

</style>
