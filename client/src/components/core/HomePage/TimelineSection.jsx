import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo: Logo1, 
        heading: "Leadership",
        desc: "Fully committed to the success company."
    },
    {
        logo: Logo2, 
        heading: "Responsibility",
        desc: "Students will always be our top priority." 
    },
    {
        logo: Logo3, 
        heading: "Flexibility",
        desc: "The ability to switch is an important skill." 
    },
    {
        logo: Logo4, 
        heading: "Solve the problem",
        desc: "Code your way to a solution." 
    }
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex gap-15 items-center mt-10'>
        {/* left box */}
        <div className='flex flex-col w-[45%] gap-5'>
            {
                timeline.map((el, index) => {
                    return (
                        <div className='flex gap-6' key={index}> 
                            <div className='bg-white h-13 w-13 rounded-full flex items-center justify-center'>
                                <img src={el.logo} alt="logo" />
                            </div>
                            <div className='flex flex-col'> 
                                <div className='font-semibold text-[18px]'>{el.heading}</div>
                                <div className='text-base'>{el.desc}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
        {/* right part  */}
        <div className='relative shadow-blue-200'>
            <img src={TimelineImage} alt="timeline image" className='shadow-white object-cover h-fit '/>

            <div className='absolute left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 flex items-center text-white uppercase py-7'>
                <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>
                <div className='flex gap-5 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
