
/**
 * @file 二次封装 entity 类
 */

 import MainCtl from './MainCtl'
 import Emitter from './tool/Emitter'
import { Point } from './tool/Coordinate'
 
 const _onClick = Symbol( 'click' )
 const entites = Symbol( 'entites' )
 const entity_click = Symbol('click: entity')
 
export default class Entites {
    
     constructor () {
        this.ctl =  MainCtl
         // entity 集合
        this[ entites ] = []
         
         // 事情触发器
        this.$emitter = new Emitter()

        this[ _onClick ] = this[ _onClick ].bind( this )
 
        // 注册点击事件
        this.init()
     }
     init() {
        this.ctl.promise.then( () => {
            
            this.ctl.click( this[ _onClick ] )
        } )
    }

     /**
      * 添加 entity 点
      * @param { Cesium.Entity } ens Entity 对象
      */
     add ( en ) {
        this[ entites ].push( en )
 
        this.ctl.promise.then( () => {
            this.ctl.viewer.entities.add( en )
        })
         return this
     }
 
     // entity 点的点击事件
     click ( fn ) {
         this.$emitter.on( entity_click, fn )
     }
 
     //判断是否拥有 entity 点
     has ( entity ) {
         return this[ entites ].includes( entity )
     }
 
     /**
      * 注册地图的 Entites 点击事件
      * @param { Cesium.Event } event
      */
     [ _onClick ] ( event ) {
         var _entity = this.ctl.viewer.selectedEntity;

         
 
         if( this.has( _entity ) ) {
 
            let c3 = Point.toC3( event.position, this.ctl )
            let point = {};
                point = Point.c3ToFd( c3 )
             
            
            this.$emitter.trigger( entity_click, {
                entity: _entity,
                nativeEvent: event,
                lng: point.lng,
                lat: point.lat,
                height: point.height,
            } )
         }
     }
}
 