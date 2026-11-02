import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo4.svg"

const CourseCard = ({courseData, currentCard, setCurrentCard}) => {

    function handleCard(value) {
        setCurrentCard(value)
    }
  return (
    <div className={`flex flex-col gap-2 justify-between items-center cursor-pointer h-80 w-85 p-8 ${currentCard === courseData.heading ? "bg-white shadow-[12px_12px_0px_0px_#EAB308]" : "bg-richblack-800"}`} onClick={() => handleCard(courseData.heading)}>
      <div className='flex flex-col gap-4'>
        <div className={`text-xl font-semibold ${currentCard === courseData.heading ? "text-richblack-800": "text-richblack-50"}`}>{courseData.heading}</div>
        <div className={`text-md ${currentCard === courseData.heading ? "text-richblack-800": "text-richblack-50"} leading-7`}>{courseData.description}</div>
      </div>
      <div className='flex flex-col w-full gap-4'>
        <div className={`border-2 ${currentCard === courseData.heading ? "border-t-richblack-600" : "border-t-richblack-300 border-2"}  border-dashed w-full`}></div>
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <img src={Logo1} alt="" />
                <div className={`${currentCard === courseData.heading ? "text-caribbeangreen-600": "text-richblack-50"} font-medium`}>{courseData.level}</div>
            </div>


            <div className='flex gap-2 items-center justify-center'>
                <img src={Logo2} alt="" />
                <div className={`${currentCard === courseData.heading ? "text-caribbeangreen-600": "text-richblack-50"} font-medium`}>{courseData.lessionNumber} Lessons</div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default CourseCard
