import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'
import {FaArrowRight } from "react-icons/fa"
import {TypeAnimation} from "react-type-animation"

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, bgGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        {/* section 1  */}
      <div className='flex flex-col w-[50%] gap-8'>
            {heading}
        <div className='text-richblack-300 font-bold '>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight />
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                {ctabtn2.btnText}
            </CTAButton>
        </div>

      </div>

      {/* section 2 */}
      <div className={`flex h-fit py-4 w-full lg:w-117.5 bg-radial-[circle_150px_at_center] from-${bgGradient}`}>
        {/* BG gradient  */}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
        </div>

        <div className={`w-[90%] font-mono font-bold flex flex-col gap-2 ${codeColor} pr-2`}>
            <TypeAnimation
                sequence={[codeblock, 5000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={{
                    whiteSpace: "pre-line",
                    display: "block"
                }}
            />
        </div>

      </div>
    </div>
  )
}

export default CodeBlocks
