export default function (callback: Function) {
    const KeyReg = /^Key+/
    window.addEventListener('keydown', (e) => {
        if(KeyReg.test(e.code)) {
            const key = e.code.replace('Key', '')
            callback(key) 
        }
    })
}