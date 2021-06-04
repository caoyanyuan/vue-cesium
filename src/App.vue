<!-- home -->
<template>
  <div class="home">
    <div :id="ctl.id" class="map-box"></div>
    <div id='cesiumContainer-0'  />
  </div>
</template>
 
<script>
import MainCtl from "./Model/MainCtl"
import Ship from "./Model/entities/Ship"

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
    this.addCameras()
  },
  computed: {},
  methods: {
    addGeoJson() {
      this.ctl.addGeoJson('shen-4.json')
    },
    addCameras() {
      var cameraPosition=[
          { position: { lng: 113.922513, lat:22.487255 }, detail: { label: '北岸（正对港口）', } },
          { position: { lng: 113.923988, lat:22.486308 }, detail: { label: '利安大厦楼顶' ,} },
          { position: { lng: 113.925763, lat:22.485441 }, detail: { label: '渔港大楼楼顶' ,} },
          { position: { lng: 113.921928, lat:22.484177 }, detail: { label: '执法船码头' ,} },
          { position: { lng: 113.921654, lat:22.482268 }, detail: { label: '渔港进出口' ,} },
      ];
      cameraPosition.map(item => {
        let x = new Ship(item)
        console.log(x)
      })
    }

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