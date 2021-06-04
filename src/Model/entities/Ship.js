import Entites from "../Entities"

let cameraEntity = new Entites ( {
    detail: '渔船.',
} )

const billboardOpt = {
    image: 'static/ship.png',
    width: 40,
    height: 42,
}

//渔船类
export default class Ship{
    static entites = cameraEntity;
    constructor({  position }) {
        this.position =  position

        this.createEntity()
    }

    createEntity () {
        let point = this.position

        this.entity = new Cesium.Entity( {
            billboard: billboardOpt,
            znvPoint: this,
            position : Cesium.Cartesian3.fromDegrees( point.lng, point.lat, 0.5 )
        } )
        // 在点击位置添加 entity 点
        this.constructor.entites.add( this.entity )
    }
}


