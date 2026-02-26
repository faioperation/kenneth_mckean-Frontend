import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router'

const CommonLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default CommonLayout
