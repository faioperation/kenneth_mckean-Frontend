import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router'

const CommonLayout = () => {
  return (
 <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="grow pt-25">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default CommonLayout
