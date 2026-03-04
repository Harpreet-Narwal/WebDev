
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import { SidebarItem } from '../components/SidebarItem'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL, FRONTEND_URL } from '../config'
import axios from 'axios'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const {contents, refresh} = useContent();

  useEffect(() =>{
    refresh();
  }, [])

  async function shareLink(){
    const response = await axios.post(`${BACKEND_URL}/api/v1/share`, {
      share: true
    }, {
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    })

    const sharableLink = `${FRONTEND_URL}/${response.data.hash}`;
    alert("Copied to clipboard");
    return navigator.clipboard.writeText(sharableLink);
    
  }

  return (
    <div >
      <Sidebar/>
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-slate-100 border-2'>

        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} onContentAdded={refresh}></CreateContentModal>

        <div className='flex justify-end gap-4 mb-6'>
        <Button onClick={()=> setModalOpen(true)} variant="primary" text={"Add content"} startIcon={<PlusIcon/>}></Button>
        <Button onClick={shareLink} variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
        </div>
        
        <div className='grid grid-cols-4 gap-4'>
          {contents.map(({type, title, link}) => 
          <Card 
          type={type}
          link={link}
          title={title}>
          </Card>)}

        </div>

      </div>
    </div>
  )
}

export default Dashboard;
