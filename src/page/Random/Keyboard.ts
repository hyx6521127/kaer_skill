export default function Keyboard(callback:Function) {

//   static addKeyboard(callback: Function) {
    const KeyReg = /^Key+/
    window.addEventListener("keydown", (e) => {
      if (KeyReg.test(e.code)) {
        const key = e.code.replace("Key", "")
        callback(key)
      }
    })
//   }

//   static removeKeyboard(callback:any) {
//       window.removeEventListener('keydown', callback)
//   }

}
