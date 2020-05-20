import bingImg from '../../assets/bing.png'
import { disappearTime } from './timeControl'

export default class SkillObj {
    private type: string
    private imgObj: HTMLImageElement
    private create_time: number
    private size: number = 100
    private position_x: number = Math.floor(Math.random() * 200)
    private position_y: number = Math.floor(Math.random() * 50)
    constructor(type: string) {
        this.type = type
        this.create_time = performance.now()
        this.imgObj = new Image()
        this.imgObj.src = bingImg
    }

    getSize() {
        const now_time = performance.now()
        const time_difference = now_time - this.create_time
        const now_size = Math.floor((disappearTime - time_difference)/disappearTime * this.size)
        if(now_size >= 0)
        return now_size
        return 0
    }

    getImage() {
        return this.imgObj
    }

    getType() {
        return this.type
    }

    getPositionX() {
        return this.position_x
    }

    getPositionY() {
        return this.position_y
    }
}