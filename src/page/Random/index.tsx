import React, { SFC, useEffect, useRef } from "react"
import { Button } from 'antd'
import SkillObj from './SkillObj'
import Keyboard from './Keyboard'
import { refreshTime } from './timeControl'

import styles from "./index.scss"

type Prop = {}

const index: SFC<Prop> = (props) => {
  let canvas = useRef<HTMLCanvasElement | null>()
  let context = useRef<CanvasRenderingContext2D>()
  const doingSkill = useRef<SkillObj[]>([])
  const waitSkill = useRef<string[]>(['bing','huo','lei','shui','jin'])

  useEffect(() => {
    context.current = (canvas.current && canvas.current.getContext("2d")) as CanvasRenderingContext2D
    requestAnimationFrame(canvasRender)
    Keyboard(listenKeyBoard)
  }, [])


  function canvasRender() {
    if(canvas.current && context.current) {
        context.current.clearRect(0, 0, canvas.current.width, canvas.current.height)
        doingSkill.current.forEach((item) => {
            if(item.getSize() && context.current){
                return context.current.drawImage(item.getImage(), item.getPositionX(), item.getPositionY(), item.getSize(), item.getSize())
            }
            waitSkill.current.push(item.getType())
            const index = doingSkill.current.indexOf(item)
            doingSkill.current.splice(index,1)
        })
    }
    requestAnimationFrame(canvasRender)
  }

  function getRandomSkill () {
      const len = waitSkill.current.length
      if(len) {
          const index = Math.floor(Math.random()*len)
          const skill = waitSkill[index]
          const skillObj = new SkillObj(skill)
          waitSkill.current.splice(index,1)
          return skillObj
      }
      return false
  }

  function getStart() {
    console.log(context.current)
    setInterval(() => {
        const randomSkill = getRandomSkill()
        if(randomSkill) doingSkill.current.push(randomSkill)
    },refreshTime)
  }

  function listenKeyBoard(char: string) {
    console.log(char)
  }

  return (
    <div className={styles.random}>
      <canvas id="canvas" ref={ref => canvas.current = ref}></canvas>
      <Button onClick={getStart}>开始</Button>
    </div>
  )
}

export default index
