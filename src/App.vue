<template>
  <div id="app">
    <div class="sprite-container">
      <Sprite />
    </div>
   
    <div class="pan-container"> 
      <div class="pan-inner" v-bind:class="{ is_result: showResult }">
        <div class="pan-section">  
          <Search  
            @onsubmit="getInfo" 
            @oninput="updateQuery"  
            ref="searchForm"
            v-bind:query="query" 
          />
        </div>

        <div class="pan-section">
          <div v-if="showResult">
              <Result 
                    v-bind:city="result.city"
                    v-bind:country="result.country"
                    v-bind:today="result.today"
                    v-bind:icon="result.icon"
                    v-bind:minTemperature="result.minTemperature"
                    v-bind:currentTemperature="result.currentTemperature"
                    v-bind:maxTemperature="result.maxTemperature" 
                    v-bind:description="result.description" 
                    v-bind:humidity="result.humidity" 
                    v-bind:sunrise="result.sunrise" 
                    v-bind:sunset="result.sunset" 
                    @onbackhome="backHome"
                />
          </div>
        </div> 
      </div>
       

      <div v-if="loading">
        <div class="loading">
            <svg class='loading-icon' viewBox='0 0 96 96'><use xlink:href='#loading-icon' /></svg>
        </div>
      </div> 

      <transition name="fade"> 
         <div class="loading error-message" v-if="showError">
            <div class="wrapper"> 
                <p v-if=" errorCode == 404 "> Não encontramos informações para essa cidade! ): </p>
                <p v-else> Ocorreu um erro. Por favor, tente novamente! ): </p>
                <svg class='cloud-icon' viewBox='0 0 32 32'><use xlink:href='#cloud-icon' /></svg> 
                <button class="button" v-on:click=" backHome ">Pesquisar outra cidade</button> 
            </div>
        </div>
      </transition> 
    </div>
       
   
  </div>
</template>

<script> 
import Sprite from './components/Sprite';
import Search from './components/Search'; 
import Result from './components/Result'; 
import {unixDateToHour, unixDateToLongDate}  from './components/Utils.js';  
const axios = require('axios');
export default {
  name: 'App',
  components: {
    Sprite,
    Search, 
    Result
  },
  data () {
        return {
            info: null,
            query: '',
            loading: false,
            hasError: false,
            errorCode: null, 
            showResult: false,
            showError: false, 
            result: {
              city: '',
              country: '',
              today: unixDateToLongDate( Date.now() / 1000 ),
              date: '',
              icon: '',
              minTemperature: '',
              currentTemperature: '',
              maxTemperature: '',
              description: '',
              humidity: '',
              sunrise: '',
              sunset: ''
            }
        }
  }, 
  mounted() { 
     this.$refs.searchForm.focus(); 
  }, 
  methods: {
      updateQuery: function(query) {
        this.query = query;
      }, 
      backHome: function() {
        this.showResult = false;
        this.showError = false;
        this.query = ''; 
      },
      async getInfo() { 
          this.loading = true;
          this.$refs.searchForm.blur();
          
          axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${ this.query }&units=metric&lang=pt_br&appid=a88484ca04dd251cd459ea1cfc1732af`)
              .then( response => {  
                  console.log( response.data );
                  
                  this.result.city= response.data.name; 
                  this.result.country= response.data.sys.country; 
                  this.result.date='today';  
                  this.result.icon= `http://openweathermap.org/img/wn/${ response.data.weather[0].icon }@2x.png`;
                  this.result.minTemperature = Math.ceil(response.data.main.temp_min);
                  this.result.currentTemperature = Math.ceil(response.data.main.temp);
                  this.result.maxTemperature= Math.ceil(response.data.main.temp_max); 
                  this.result.description= response.data.weather[0].description; 
                  this.result.humidity= Math.ceil(response.data.main.humidity);
                  this.result.sunrise = unixDateToHour( response.data.sys.sunrise, response.data.timezone );
                  this.result.sunset =  unixDateToHour( response.data.sys.sunset, response.data.timezone ); 
                  
                  window.scroll(0,0);
                 
                  setTimeout( () => { 
                     this.showResult = true;  
                     this.loading = false;  
                  }, 2000 );
              })
              .catch(error => {  
                  this.showError = true; 
                  
                  if ( !error.response === undefined) {
                      this.errorCode = error.response.status;
                  } 
                  
                  this.loading = false;
              });
      }
  }
}
</script>

<style lang="scss"> 
  @import 'style/style.scss';
</style>
