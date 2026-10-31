import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"]

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    function setMyCards(value) {
        setCurrentTab(value);
        const result = HomePageExplore.filter((el) => el.tag === value);
        setCourses(result[0].courses);  
        setCurrentCard(result[0].courses[0].heading)
    }
  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the {" "} <HighlightText text={"Power of Code"} />
        </div>
        <p className='text-center text-richblack-300 text-medium mt-3'>Learn to build anything you can imagine</p>

        <div className='flex items-center justify-evenly gap-2 bg-richblack-800 p-2 mt-10 mb-5 rounded-full'> 
            {
                tabsName.map((tab, index) => {
                    return (
                        <div className={`text-[16px] ${currentTab === tab ? "bg-richblack-900 text-richblack-5 font-medium" : " text-richblack-200"} px-7 py-2 rounded-full cursor-pointer transition-all duration-200 hover:ring-richblack-900 hover:text-richblack-5`} key={index} onClick={() => setMyCards(tab)}>
                            {tab}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-37.5'></div>

        {/* course cards  */}
        <div className='absolute flex flex-row gap-10 justify-between items-center w-full'>
            {
                courses.map((element, index) => {
                    return (
                        <CourseCard courseData = {element} key={index} currentCard={currentCard} setCurrentCard= {setCurrentCard}/>
                    )
                })
            }
        </div>


    </div>
  )
}

export default ExploreMore
