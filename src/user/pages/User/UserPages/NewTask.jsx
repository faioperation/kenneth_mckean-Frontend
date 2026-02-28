import React from 'react'
import TextCardLayouts from '../../../components/TextCardLayouts'

export default function NewTask() {
  return (
    <div>
       <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mt-10 sm:mt-12 lg:mt-[60px] font-inter font-semibold">
          <h2 className="text-base sm:text-lg text-gray max-w-md mx-auto">
            Hello, Akash!
          </h2>

          <p
            className="text-gray mt-2 mb-10 sm:mb-12 lg:mb-[60px] 
                   max-w-md sm:max-w-lg lg:max-w-xl 
                   text-xl sm:text-2xl lg:text-[32px] mx-auto"
          >
            How can I assist you today?
          </p>
        </div>
        </div>
      <TextCardLayouts></TextCardLayouts>
    </div>
  )
}
