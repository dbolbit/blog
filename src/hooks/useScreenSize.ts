import {useEffect, useState} from "react"


const useScreenSize = () => {
  const [size, setSize] = useState<number>(window.innerWidth)
  const handlerSize = () => {
    setSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handlerSize)
    return () => window.removeEventListener('resize', handlerSize)
  })
  return size
}

export default useScreenSize