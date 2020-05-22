import React, { SFC, useEffect, useRef, useState } from "react"
import { Button } from "antd"
import SkillObj from "./SkillObj"
import Keyboard from "./Keyboard"
import { refreshTime } from "./timeControl"
import SkillList from './SkillList'

import styles from "./index.scss"

const EleTranslate = {
  E: "火",
  W: "雷",
  Q: "冰",
}

const SkillArr = ["T", "Y", "D", "F", "G", "Z", "X", "C", "V", "B"]

type Prop = {}

const Random: SFC<Prop> = (props) => {
  let canvas = useRef<HTMLCanvasElement | null>()
  let context = useRef<CanvasRenderingContext2D>()
  const doingSkill = useRef<SkillObj[]>([])
  const waitSkill = useRef<string[]>([...SkillArr])
  const [ele, setEle] = useState<string[]>([])
  const [skill, setSkill] = useState<string>('')
  const [num, setNum] = useState(0)
  const eleRef = useRef<string[]>(ele)
  const skillRef = useRef<string>('')

  useEffect(() => {
    context.current = (canvas.current &&
      canvas.current.getContext("2d")) as CanvasRenderingContext2D
    requestAnimationFrame(canvasRender)
    Keyboard(listenKeyBoard)
  }, [])

  useEffect(() => {
    eleRef.current = ele
    skillRef.current = skill
  }, [ele,skill])

  function canvasRender() {
    if (canvas.current && context.current) {
      context.current.clearRect(
        0,
        0,
        canvas.current.width,
        canvas.current.height
      )
      doingSkill.current.forEach((item) => {
        if (item.getSize() && context.current) {
          return context.current.drawImage(
            item.getImage(),
            item.getPositionX(),
            item.getPositionY(),
            item.getSize(),
            item.getSize()
          )
        }
        setNum(pre => pre - 1)
        waitSkill.current.push(item.getType())
        const index = doingSkill.current.indexOf(item)
        doingSkill.current.splice(index, 1)
      })
    }
    requestAnimationFrame(canvasRender)
  }

  function getRandomSkill() {
    const len = waitSkill.current.length
    if (len) {
      const index = Math.floor(Math.random() * len)
      const skill = waitSkill.current[index]
      const skillObj = new SkillObj(skill)
      waitSkill.current.splice(index, 1)
      return skillObj
    }
    return false
  }

  function getStart() {
    setInterval(() => {
      const randomSkill = getRandomSkill()
      if (randomSkill) doingSkill.current.push(randomSkill)
    }, refreshTime)
  }

  function translateEle() {
    return ele.map((item) => EleTranslate[item]).join("|")
  }

  function listenKeyBoard(char: string) {
    const _ele = eleRef.current
    const _skill = skillRef.current
    if (["Q", "W", "E"].indexOf(char) > -1) {
      const newEle = [..._ele, char]
      if (newEle.length > 3) newEle.splice(0, 1)
      return setEle(newEle)
    }
    if (char === "R") {
      if(_ele.length < 3) return
      const skillCompose = _ele.sort().join('')
      return setSkill(SkillList[skillCompose])
    }
    if([...SkillArr].indexOf(char) > -1) {
      if(_skill === char) {
        ReleaseSkill(_skill)
      }
    }
  }

  function ReleaseSkill (_skill:string) {
    const _doingSkill = [...doingSkill.current]
    console.log(waitSkill.current)
    if(_doingSkill.find(item => item.getType() === _skill)){
      setNum(pre => pre + 1)
      const newDoingSkill = _doingSkill.filter(item => item.getType() !== _skill)
      doingSkill.current = newDoingSkill
      waitSkill.current.push(_skill)
    }
    
  }

  return (
    <div className={styles.random}>
      <div>
        
        <span>获得分数：</span>
        <span>{num}</span>
      </div>
      <div>
      <span>当前元素:</span>
        <span>{translateEle()}</span>
      </div>
      <div className={styles.canvasContainer}>
        <canvas width="1200" height="700" className={styles.canvas} id="canvas" ref={(ref) => (canvas.current = ref)}></canvas>
      </div>
      <div className={styles.btn}>
        <Button onClick={getStart}>开始</Button>
      </div>  
      
    </div>
  )
}

export default Random
