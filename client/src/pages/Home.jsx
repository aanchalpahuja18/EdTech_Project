import React from 'react'
import {FaArrowRight } from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

const Home = () => {
  return (
    <div>
      {/* section 1  */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-max-content'>
            <Link to="/signup">
                <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 group'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-1.25 transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower your Future with <HighlightText text="Coding Skills" />
            </div>

            <div className='mt-4 text-center w-[90%] text-[17px] font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkTo={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='shadow-[-20px_-20px_30px_-10px_#118AB2,20px_20px_0px_0px_#ffffff] mx-3 my-12'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks position={"lg: flex-row"} heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your {" "}
                        <HighlightText text={"Coding Potential"}/> {" "}
                        with our online courses  
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={{active: true, linkTo: "/signup", btnText: "Try it yourself"}}
                ctabtn2={{active: false, linkTo: "/login", btnText: "Learn more"}}
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}

                codeColor="text-white"
                bgGradient={"#118AB2"}
                />
            </div>

            {/* code section 2 */}
            <div>
                <CodeBlocks position={"lg: flex-row-reverse"} heading={
                    <div className='text-4xl font-semibold'>
                        Start {" "}
                        <HighlightText text={"Coding"}/> {" "}
                        <br />
                        <HighlightText text={"in seconds"}/> 
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing code from your very first lesson."}
                ctabtn1={{active: true, linkTo: "/signup", btnText: "Continue Lesson"}}
                ctabtn2={{active: false, linkTo: "/login", btnText: "Learn more"}}
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}

                codeColor="text-white"
                bgGradient={"#E7BC5B"}
                />
            </div>
        </div>
      {/* section 2  */}



      {/* section 3  */}


      {/* Footer  */}
    </div>
  )
}

export default Home
