import React, { useState } from "react"
import "./Main.css"
import { Circles } from "react-loader-spinner"
import prompt from "../prompt.jpg"

export default function Main({}) {
  const [promt, setPromt] = useState("")
  const [image, setimage] = useState(prompt)
  const [loading, setLoading] = useState(false)
  const deepai = require("deepai")
  deepai.setApiKey("a41e6161-c429-480d-9aa8-f41187057936")
  const generate = () => {
    setLoading(true)
    console.log(promt, deepai)
    apiCall(promt)
      .then((res) => {
        console.log(res)
        setimage(res.output_url)
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  async function apiCall(prompt) {
    const resp = await deepai.callStandardApi("stable-diffusion", {
      text: prompt,
    })
    return resp
  }

  return (
    <div className="main">
      <img src={image} height={500} width={500} />
      <textarea value={promt} onChange={(e) => setPromt(e.target.value)} />
      <button onClick={generate}>Generate</button>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={loading}
      />
    </div>
  )
}
