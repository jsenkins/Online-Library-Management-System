import LoginSignupHeader from "../sub-components/loginSignupHeader"
import Signupbox from "../sub-components/signUpbox";
export default function SignupPage(){
    return(
        <>
                <div className=" flex flex-col overflow-auto w-screen h-screen justify-center text-indigo-800 ">

            <LoginSignupHeader
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signupbox/></div>
        </>
    )
}