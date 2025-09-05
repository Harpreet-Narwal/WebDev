import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './component/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <>
        <div className='flex items-cente' >
          <Button startIcon={<PlusIcon />} variant='primary' text={'add content'} size='md'/>
          <Button variant='secondary' text='Add content' size='md'/>
          <Button startIcon={<ShareIcon />} variant='secondary' text={'share'} size='md' />
        </div>

    </>
  )
}

export default App
