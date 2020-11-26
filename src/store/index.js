import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: {
      daily: [],
    },
    loading: true,
    dates:{}
  },
  mutations: {
    assignCity(state, data) {
      state.city = data
      state.city.daily.forEach(daily => {
        daily.img = `https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`
      })
    },
    changeLoading(state) {
      state.loading = !state.loading
    },
    getDate(state){
      const dates = {future: []}
      const event = new Date(Date.now());
      const event1 = new Date(Date.now()+86400000);
      const event2 = new Date(Date.now()+ 2*86400000);
      const event3 = new Date(Date.now()+ 3*86400000);
      const event4 = new Date(Date.now() + 4*86400000);
      const event5 = new Date(Date.now() + 5*86400000);
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      dates.today = event.toLocaleDateString(undefined, options)
      dates.future.push(event1.toLocaleDateString(undefined, options))
      dates.future.push(event2.toLocaleDateString(undefined, options))
      dates.future.push(event3.toLocaleDateString(undefined, options))
      dates.future.push(event4.toLocaleDateString(undefined, options))
      dates.future.push(event5.toLocaleDateString(undefined, options))
      state.dates = dates
    }
  },
  actions: {
    //Get the keyword's coordinates and dipactch an action to get the weather data of the coordinates
    async fetchLocation({
      dispatch
    }, data) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=9fa347bf86251c28789b835c2b83c4f6`);
        const status = await response.status
        if(status == "404"){
          router.push('/error')
        }
        const body = await response.json();
        const city = {}
        city.lat = body.coord.lat;
        city.lon = body.coord.lon;
        
        dispatch('fetchCity', city)
      } catch (err) {
        console.log(err) 
      }
    },

    //Action to get the weather data of coordinates
    async fetchCity({
      commit
    }, data) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly&units=metric&appid=9fa347bf86251c28789b835c2b83c4f6`);
        const status = await response.status;
        if(status == "404"){
          console.log("not found")
        }
        const body = await response.json();
        const img = `https://openweathermap.org/img/wn/${body.current.weather[0].icon}@2x.png`
        const city = body
        city.img = img
        commit('assignCity', city)
        commit('getDate')
      } catch (err) {
        console.log(err)
        
      }finally{
        commit('changeLoading')
      }
    },

    //Action dispatched beforeCreate to get user's location
    async getLocation({dispatch}){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos)=>{
          const data = {};
          data.lat = pos.coords.latitude
          data.lon = pos.coords.longitude
          dispatch("fetchCity", data)
        }, (err)=>{
          //if user rejects location permission, dispatch an action that uses a default location
          alert(`I'm going to proceed with a default location anyway`);
          console.log(err);
          dispatch("default");
        })
      }else{
        //if browser doesn't support geolocation
        alert("this browser does not support geolocation, ditch it!")
        dispatch("default")
      }
      
    },
    //default action (uses Lagos as the location)
    async default ({
      commit
    }) {

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=6.8&lon=4.5&exclude=minutely,hourly&units=metric&appid=9fa347bf86251c28789b835c2b83c4f6`);
        const body = await response.json();
        const img = `https://openweathermap.org/img/wn/${body.current.weather[0].icon}@2x.png`
        const city = body
        city.img = img
        commit('assignCity', city)
        commit('getDate')
      } catch (err) {
        alert(err)
        router.push("/error")
      } finally {
        commit('changeLoading')
      }
    },
    //Action to be fired when page is refreshed
    reload({dispatch}){
      dispatch("getLocation")
    }
  },
  modules: {}
})