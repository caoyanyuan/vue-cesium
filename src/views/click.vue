<template>
    <div>
        
    </div>
</template>

<script>
import Ship from "@/Model/entities/Ship"
import Diot from "@/Model/entities/Diot"
import MainCtl from "@/Model/MainCtl"

export default {
    methods: {
        addCameras() {
            var shipList=[
                { position: { lng: 113.922513, lat:22.487255 } },
                { position: { lng: 113.923988, lat:22.486308 } },
                { position: { lng: 113.925763, lat:22.485441 } },
                { position: { lng: 113.921928, lat:22.484177 } },
                { position: { lng: 113.921654, lat:22.482268 } },
            ];
            shipList.map(item => {
                new Ship(item)
            })
            Ship.entites.click(() => {
                console.log('点击到渔船了')
            })
        },
        addDiots() {
            var diotList = [
                { position: { lng: 113.919943, lat:22.482646 } },
                { position: { lng: 113.915, lat:22.486308 } },
            ]
            diotList.map(item => {
                new Diot(item)
            })
            Diot.entites.click(() => {
                console.log('点击到点了')
            })
        }
    },
    mounted() {
        this.addDiots()
        this.addCameras()
    }
    
}
</script>