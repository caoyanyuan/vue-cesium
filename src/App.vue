<!-- home -->
<template>
  <div class="home">
    <div :id="ctl.id" class="map-box"></div>
    <div id='cesiumContainer-0'  />
    <router-view></router-view>
  </div>
</template>
 
<script>
import MainCtl from "./Model/MainCtl"

export default {
  data() {
    return {
      ctl: MainCtl,
      viewer: {}
    };
  },
  components: {
   
  },
  created() { 
  },
  mounted() {
    MainCtl.init()
  },
  computed: {},
  methods: {
   

  }
};
</script>
 
<style >
.cesium-viewer-bottom, .cesium-viewer-fullscreenContainer {
    display: none !important;
}
.cesium-viewer-toolbar, .cesium-viewer-animationContainer, .cesium-viewer-timelineContainer {
    display: none;
}


.home {
  height: 100vh; 
 
}
 .map-box {
    height: 100%;
    border: 1px solid gray; position: relative; z-index: 1;
  }
  #cesiumContainer-0 {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
</style>