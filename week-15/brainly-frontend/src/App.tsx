import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './component/ui/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant={'primary'} size={'sm'} text={''} onClick={function (): void {
        throw new Error('Function not implemented.')
      } }/>
    </>
  )
}

export default App
