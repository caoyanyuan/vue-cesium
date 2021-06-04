import Entites from "../Entities"

let blueDiot = new Entites ( {
    detail: '蓝点.',
} )


//渔船类
export default class Ship{
    static entites = blueDiot;
    constructor({  position }) {
        this.position =  position

        this.createEntity()
    }

    createEntity () {
        let point = this.position

        this.entity = new Cesium.Entity( {
            znvPoint: this,
            position : Cesium.Cartesian3.fromDegrees( point.lng, point.lat, 0.5 ),
            ellipse: {
                semiMinorAxis: 10,
                semiMajorAxis: 10,
                height:1,
                outline:true,
                outlineColor: Cesium.Color.BLUE,
                material : Cesium.Color.BLUE,
            }
        } )
        // 在点击位置添加 entity 点
        this.constructor.entites.add( this.entity )
    }
}
