import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <>
    <div>
     <Navbar />
    <Admin />

      </div>
    </>
  )
}

export default App
