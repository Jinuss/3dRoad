import Stats from 'three/examples/jsm/libs/stats.module'
const stats = new Stats()
stats.setMode(0)
stats.domElement.style.position = "absolute"
stats.domElement.style.left = "0px"
stats.domElement.style.top = "0px"
document.body.appendChild(stats.domElement)

export default stats