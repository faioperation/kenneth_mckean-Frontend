import React from 'react'
import PageHeading from '../../Componants/PageHeading'
import Stats from './componants/Stats'
import TaskCompletion from './componants/TaskCompletion'
import Success from './componants/Success'
import APIusage from './componants/APIusage'
import CostAnalytics from './componants/CostAnalytics'
import Activity from './componants/Activity'
import Sales from './componants/Sales'
import SubscriptionSummary from './componants/SubscriptionSummary'

export default function Overview() {
  return (
    <div>
      <PageHeading heading={"System Overview Center"} subheading={"Monitor your multi-agent platform's health and performance"}></PageHeading>
      <div>
        <Stats></Stats>
        <div className='mb-4 lg:px-8 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-5 gap-4'>
          {/* <TaskCompletion></TaskCompletion> */}
          {/* <Success></Success> */}
          <div className='xl:col-span-2 lg:col-span-3'>
              <Sales/>
          </div>
        <div  className='xl:col-span-1 lg:col-span-2'>
          <SubscriptionSummary  /> 
        </div>
          
        </div>
        {/* <div className='grid grid-col-1 gap-6 lg:grid-cols-2 lg:px-8 md:grid-col-2 lg:my-8 my-6'>
          <APIusage></APIusage>
          <CostAnalytics></CostAnalytics>
        </div> */}
        <div  className=' lg:px-8'>
          <Activity></Activity>
        </div>
      </div>
    </div>
  )
}
