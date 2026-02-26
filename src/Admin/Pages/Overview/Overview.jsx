import React from 'react'
import PageHeading from '../../Componants/PageHeading'
import Stats from '../../Componants/Stats'
import TaskCompletion from './componants/TaskCompletion'
import Success from './componants/Success'
import APIusage from './componants/APIusage'
import CostAnalytics from './componants/CostAnalytics'
import Activity from './componants/Activity'

export default function Overview() {
  return (
    <div>
      <PageHeading heading={"System Overview Center"} subheading={"Monitor your multi-agent platform's health and performance"}></PageHeading>
      <div>
        <Stats></Stats>
        <div className='grid grid-col-1 gap-6 lg:grid-cols-2 lg:px-8 md:grid-col-2'>
          <TaskCompletion></TaskCompletion>
          <Success></Success>
        </div>
        <div className='grid grid-col-1 gap-6 lg:grid-cols-2 lg:px-8 md:grid-col-2 lg:my-8 my-6'>
          <APIusage></APIusage>
          <CostAnalytics></CostAnalytics>
        </div>
        <div  className=' lg:px-8'>
          <Activity></Activity>
        </div>
      </div>
    </div>
  )
}
