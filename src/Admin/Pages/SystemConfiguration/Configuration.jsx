import React from 'react'
import PageHeading from '../../Componants/PageHeading'

import { Outlet } from 'react-router'
import Key from './Componants/Key'

export default function Configuration() {
  return (
    <div>
      <div className="flex justify-between lg:pr-8">
             <PageHeading
               heading={"System Configuration"}
               subheading={"Manage API Configuration settings"}
             ></PageHeading>
             
            
           </div>

          <div className='mt-6'>
           <Key/>
          </div>

     
    </div>
  )
}
