import LoginSignupHeader from "../sub-components/loginSignupHeader"
import LoginForm from "../sub-components/loginBox"
import Marquee from "react-fast-marquee";

export default function LoginPage(){
    return(
        <div className=" flex flex-col overflow-auto w-screen h-screen  text-indigo-800 ">
             <Marquee   className="absolute top-0"autoFill={false} 
             style={{color:'#ffffff', fontFamily:'mono', fontStyle:'italic'}} pauseOnHover={true}>
                Enjoy limitless access to books without any overdue fines because you already have enough deadlines on your plate.     
                   </Marquee>
              <LoginSignupHeader
                heading="Welcome to Strawberry Library <3 "
                paragraph="Enter Your Credentials To Login "
                linkName="Don't Have An Account Yet?"
                linkUrl="/signup"
                />
                <LoginForm/>
              
        
        </div>
    )
}