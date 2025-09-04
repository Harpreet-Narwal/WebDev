import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './component/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button startIcon={<PlusIcon size='lg'/>} variant='primary' text={'add content'} size='sm'/>
      <Button variant='secondary' text='Add content' size='md'/>
      <Button startIcon={<ShareIcon size='lg'/>} variant='secondary' text={'share'} size='lg' />
    
    </>
  )
}

export default App
