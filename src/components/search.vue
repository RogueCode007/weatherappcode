<template>
  <div class="content">
    <i class="material-icons close" @click="close">close</i>
    <div class="wrapper">
      <div class="input">
      <i class="material-icons search" @click="close">search</i>
      <input type="text" v-model.lazy="searchItem" placeholder="search location">
      </div>
      <button @click="search">Search</button>
    </div>
  </div>
</template>

<script>
//import { bus } from '../main';
//import { mapState } from "vuex"; 

export default {

 data(){
   return {
     searchItem : "",
   }
 },
 methods:{
   close(){
     this.$emit('toggle')
   },
    search(){
      this.$store.commit('changeLoading')
      this.$store.dispatch('fetchLocation', this.searchItem) 
      this.close();
    },
  },
 
   
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.content{
  background-color: #1E213A;
  padding: 20px;
  min-height: 665px;
  font-family: 'Raleway', sans-serif;
}
.material-icons{
  color: white;
  font-size: 30px
}
.close{
  float: right;
  cursor: pointer;
}
.wrapper{
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.input{
  border: 1px solid #616475;
  display: flex;
  padding: 0 10px;
  align-items: center;
  width: 80%;
  box-sizing: border-box;
  height: 35px 
}
.search{
  font-size: 18px;
  color: #616475
}
input{
  box-sizing: border-box;
  height: 90%;
  width: 90%;
  background-color: #1E213A;
  color: #616475;
  border-color: #1E213A;
  border: none;
  outline: none;
  font-size: 1.2em
}
button{
  background-color: #3C47E9;
  color: white;
  outline: none;
  cursor: pointer;
  border: 1px solid  #3C47E9;
  border-radius: 3px;
  padding: 1px 10px
}
</style>
