"use client"
import { useState } from "react"

const Counter = ({ users }) => {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(curr => curr + 1)}>Counter: {count}</button>
  )
}

export default Counter