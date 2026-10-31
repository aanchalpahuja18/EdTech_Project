import React from 'react'
import HighlightText from './HighlightText'
import KnowYourProgress from "../../../assets/Images/Know_your_progress.svg"
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.svg"
import CompareWithOthers from "../../../assets/Images/Compare_with_others.svg"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-32.5 mb-32'>
      <div className='flex flex-col gap-5 items-center'>
        {/* heading  */}
        <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife for {" "}
            <HighlightText text={"Learning Any Language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[80%]'>
            Using spin making learning multiple languages easy, with 20+ language realistic voice-over, progress tracking, custom schedule and more. 
        </div>

        <div className='flex items-center justify-center mt-5'>
            <img src={KnowYourProgress} alt="" className='object-contain -mr-32'/>
            <img src={CompareWithOthers} alt="" className='object-contain' /> 
            <img src={PlanYourLessons} alt="" className='object-contain -ml-36' />
        </div>

        <div className='w-fit'>
            <CTAButton active={true} linkTo={"/signup"}>
                Learn More
            </CTAButton>
        </div>
      </div>

    </div>
  )
}

export default LearningLanguageSection
