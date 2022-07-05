<template>
  <div class="weather">
    <h3>Weather API</h3>
    <div class="weather__main">
      <div class="weather__search">
        <input
          type="text"
          v-on:keyup.enter="fetchData"
          v-model="textInput"
          placeholder="Enter name of city ex: Ho Chi Minh,..."
        />
        <button
          :class="[textInput ? 'active' : '']"
          :disabled="!textInput"
          @click="fetchData"
        >
          Search
        </button>
      </div>
      <div v-if="loading" class="loading">
        <div class="loading-main spinner"></div>
      </div>
      <div v-if="error && !loading" class="weather__error">
        <span class="weather__error-text">{{ error }}</span>
        <span @click="deleteError" class="weather__error-close">x</span>
      </div>
      <div v-if="data && !loading" :class="['weather__info', data.status]">
        <div class="weather__info-main">
          <div class="weather__info-time">
            {{ data.time }}
          </div>
          <div class="weather__info-icon">
            <img :src="data.icon" alt="" />
          </div>
          <h4>{{ data.cityName }} ( {{ data.country }} )</h4>
          <div class="weather__info-data">
            Temp : {{ data.tempC }}*C <br />
            Condition: {{ data.condition }} <br />
            Cloud: {{ data.cloud }} <br />
            Humidity: {{ data.humidity }} <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const API_KEY = "741a751dc08240e382a20156223006";
const API_SEARCH = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;

export default {
  name: "Weather",
  data() {
    return {
      textInput: "",
      error: "",
      data: undefined,
      loading: false,
    };
  },
  methods: {
    fetchData: async function (params) {
      params = this.textInput || params;
      if (!params) return;
      this.loading = true;
      try {
        let res = await axios.get(API_SEARCH + params);
        this.data = {
          tempC: res.data.current.temp_c,
          cloud: res.data.current.cloud,
          humidity: res.data.current.humidity,
          icon: res.data.current.condition.icon,
          condition: res.data.current.condition.text,
          status: res.data.location.localtime,
          time: res.data.location.localtime.split(" ")[1],
          cityName: res.data.location.name,
          country: res.data.location.country,
        };
        let status = res.data.location.localtime.split(" ")[1].split(":")[0];
        this.data.status = status > 6 && status < 18 ? "day" : "night";
        this.error = "";
      } catch (e) {
        this.error = e.response.data.error.message || e.message;
        this.data = undefined;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.loading = false;
    },
    deleteError: function () {
      this.error = "";
    },
    showPosition: function (position) {
      let la = position.coords.latitude + "";
      let long = position.coords.longitude + "";
      this.fetchData(la + "," + long);
    },
  },
  beforeMount() {
    navigator.geolocation.getCurrentPosition(this.showPosition, showError);
  },
};

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
</script>

<style>
@import "../assets/css/weather.scss";
</style>
