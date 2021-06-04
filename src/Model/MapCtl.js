import Emitter from "./tool/Emitter"

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NWI5MGUzNi1mYWI3LTQzY2QtOGI0Ni0xZWYyNTAxNGM4N2MiLCJpZCI6MTI1OTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjE0NDkyNTV9.hBH0PGSnKErc_yNhIePASUkr3QPDoo0KDX9uLpNBUns';

const _resolve = Symbol( 'resolve' )

let count = 0
export default class MapCtl {
    constructor({ detail = "" } = {}) {
        Object.assign( this, {
            detail,
            id: `cesiumContainer-${count++}`
        } )

        this.promise = new Promise((resolve, reject) => {
            this[ _resolve ] = resolve
        })

        this.$emitter = new Emitter()
        //this.init()
    }

    init () {
        this.viewer = new Cesium.Viewer( this.id, {
            infoBox: false,
            timeline: false,
            selectionIndicator: false,
            contextOptions: {
                webgl:{
                    failIfMajorPerformanceCaveat:false
                }
            },
        } )

        this.viewer.scene.screenSpaceCameraController.enableCollisionDetection = false
       

        let e = {
			destination:  Cesium.Cartesian3.fromDegrees(
				'113.922513',
				'22.487255',
				1000
				// 1299.022495696321
			),
			orientation: {
				heading : 0.0,
				pitch : -Cesium.Math.PI_OVER_TWO,
				roll : 0.0
			},
			duration: 0.5
      	} 
      
      	//定位到这个地址
      	this.viewer.camera.flyTo( e);

        this.initClick()

        this[ _resolve ]()
    }

    //多个click事件。 最后一个会覆盖
    click(fn) {
        this.$emitter.on('mapClick', fn)
    }

    //entity的点击事件
    initClick() {
		this.handler = new Cesium.ScreenSpaceEventHandler( this.viewer.scene.canvas )

		this.handler.setInputAction( ( e ) => {
            this.$emitter.trigger('mapClick', e)
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK );
    }
}