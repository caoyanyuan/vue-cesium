// 不要使用 npm 更新 zp-z( 重命名为 Callbacks ), Callback 就是 $.Callback
import Callbacks from "./Callbacks"

export default class Emitter {

    callbacks = {}

    /**
     * 注册事件
     * @param { String } type 事件类型
     * @param { ...Function } fn 事件回调
     */
    on ( type, ...fn ) {
        if ( this.callbacks[ type ] == null ) {
            this.callbacks[ type ] = new Callbacks()
        }
        this.callbacks[ type ].add( ...fn )
    }

    /**
     * 注销事件
     * @param { String } type 事件类型
     * @param { Function | Array<Fucntion> } fn 主要注销的事件地址
     */
    off ( type, ...fn ) {
        if ( this.callbacks[ type ] == null ) {
            return null
        }

        this.callbacks[ type ].remove( ...fn )
    }

    /**
     * 触发事件
     * @param { Event } event 事件对象
     */
    trigger (type,  event ) {
        //console.log( 'trigger:', type )
        if ( this.callbacks[ type ] == null ) {
            return null
        }

        this.callbacks[ type ].fire( event )
    }
}
