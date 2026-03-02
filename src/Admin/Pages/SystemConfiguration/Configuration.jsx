import React from 'react'
import PageHeading from '../../Componants/PageHeading'
import Button from '../../Componants/Button'
import Nav from './Componants/Nav'
import Api from './Componants/Api'
import { Outlet } from 'react-router'

export default function Configuration() {
  return (
    <div>
      <div className="flex justify-between lg:pr-8">
             <PageHeading
               heading={"Usage & Billing"}
               subheading={"Track token usage and manage costs"}
             ></PageHeading>
             <Button  button={"Save Changes"}></Button>
            
           </div>
          <div className='my-8'>
              <Nav></Nav>
          </div>
          <div>
           <Outlet></Outlet>
          </div>

     
    </div>
  )
}
