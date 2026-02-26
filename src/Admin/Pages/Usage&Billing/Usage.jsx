import React from 'react'
import PageHeading from '../../Componants/PageHeading'
import Stats from './Componants/Stats'
import { Outlet } from 'react-router'
import Nav from './Componants/Nav'

export default function Usage() {
  return (
    <div>
      <PageHeading  heading={"Usage & Billing"} subheading={"Track token usage and manage costs"}></PageHeading>
      <div>
        <Stats></Stats>
       <div className='my-8'>
         <Nav></Nav>
       </div>
      </div>
      <Outlet></Outlet>
    </div>
  )
}
