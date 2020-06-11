<template>
  <div class="home">
    <div class="display-1">DashBoard</div>
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  inject: ["theme"],
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoidmljZW50ZWpyIiwiYSI6ImNrYXNxb2E5ajEwM2cycW14Mm80NWJ4Z3gifQ.XfNqHzs8CJVt_52eFKIgGg', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/light-v9' // your map style
    };
  },

  created() {
    this.mapbox = Mapbox;
  }
};
</script>
