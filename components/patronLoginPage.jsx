import LoginSignupHeader from "../sub-components/loginSignupHeader"
import PatronLogin from "../sub-components/patronLoginBox"

export default function PatronLoginPage(){
    return(
        <div className=" flex flex-col overflow-auto w-screen h-screen justify-center ">
              <LoginSignupHeader
                heading="Login As A Patron pw: 555-555-1234 "
                paragraph="Not a Patron? "
                linkName="Login"
                linkUrl="/"
                />
                <PatronLogin/>
        
        </div>
    )
}