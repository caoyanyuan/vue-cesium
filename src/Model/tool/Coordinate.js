import MainCtl from '../MainCtl'

// 坐标
export class Point {

    constructor({ lng = 0, lat = 0, height = 0, ctl = MainCtl } = {}, opt = {}) {
        Object.assign(this, {
            lng, lat, height, ctl, opt
        })
    }

    // let point = Point.c3ToFd( Point.toC3( event.position ) )

    /**
     * 获取笛卡尔坐标
     * @param { Object } postion event.postion
     */
    static toC3 (position, ctl = MainCtl) {
        return ctl.viewer.scene.pickPosition(position)
    }

    /**
     * 将笛卡尔坐标装换为经纬度坐标
     * @param { Cesium.viewer.scene.pickPosition }
     */
    static c3ToFd (position, ctl = MainCtl) {
        let cartographic = Cesium.Cartographic.fromCartesian(position)
        let longitude = Cesium.Math.toDegrees(cartographic.longitude)  // 经度
        let latitude = Cesium.Math.toDegrees(cartographic.latitude)    // 纬度
        let height = cartographic.height // 高度
        // height = height > 0 ? height : 0;

        return new Point({
            lng: longitude,
            lat: latitude,
            height: height,
            ctl,
        })
    }

    /**
     * 获取中心点
     * @param { Array<Object> } positions { lng, lat }
     */
    static getCenter (positions) {
        let points = [], polygon, center
        positions.forEach((point) => {
            points.push(new SuperMap.Geometry.Point(+point.lng, +point.lat))
        })
        polygon = new SuperMap.Geometry.Polygon([
            new SuperMap.Geometry.LinearRing(points)
        ])
        center = polygon.getBounds().getCenterLonLat()
        center = {
            lng: center.lon, lat: center.lat
        }

        return new Point(center, {
            polygon, positions, points
        })
    }

    /**获取地图左上，右下边界点 */
    static getCanvasBorder (ctl = MainCtl) {
        let viewer = ctl.viewer

        let left_top = this.getPosition(0, 0, viewer)
        let bottom_right = this.getPosition(viewer.canvas.clientWidth, viewer.canvas.clientHeight, viewer)

        var bounds = {
            tl: left_top,
            br: bottom_right
        }
        return bounds

    }

    static getPosition (x, y, viewer) {
        var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(x, y));
        var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
        var lng = curPosition.longitude * 180 / Math.PI;
        var lat = curPosition.latitude * 180 / Math.PI;
        return {
            lng: lng,
            lat: lat,
        };
    }

    //获取边界点     在二维中计算返回undefined
    static getViewBorder (ctl = MainCtl) {
        var rectangle = ctl.viewer.camera.computeViewRectangle();

        var west = rectangle.west / Math.PI * 180;
        var north = rectangle.north / Math.PI * 180;
        var east = rectangle.east / Math.PI * 180;
        var south = rectangle.south / Math.PI * 180;

        var bounds = {
            southwest: {
                lng: west,
                lat: south
            },
            northeast: {
                lng: east,
                lat: north
            }
        }
        //console.log(bounds)
        return bounds;

    }
}


