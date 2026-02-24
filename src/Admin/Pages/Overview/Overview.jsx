import React from 'react'
import PageHeading from '../../Componants/PageHeading'
import Stats from '../../Componants/Stats'

export default function Overview() {
  return (
    <div>
      <PageHeading heading={"System Overview Center"} subheading={"Monitor your multi-agent platform's health and performance"}></PageHeading>
      <div>
        <Stats></Stats>
      </div>
    </div>
  )
}
