import React from 'react'

export default function PageHeading({heading, subheading}) {
  return (
      <div className='items-center lg:mx-8 md:mx-6'>
              <h2 className="md:text-2xl  font-semibold">{heading}</h2>
              <p className="md:text-md text-sm text-gray-400">{subheading}</p>
             </div>
  )
}
