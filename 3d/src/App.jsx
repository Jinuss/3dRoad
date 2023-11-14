import { useState, useEffect } from 'react'
import * as dat from 'dat.gui'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const gui = new dat.GUI({ name: "demo" })

var testObj = { number: 10, color: "#66ccff", string: "abc", value: '语文' }
var folder = gui.addFolder('Flow Field')
folder.add(testObj, 'number', 10, 100, 5)
folder.addColor(testObj, 'color').name("控制颜色")
folder.add(testObj, 'string')
folder.add(testObj, 'value', ['语文', '数学', '英语'])
folder.open()

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>
          {testObj.number}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
