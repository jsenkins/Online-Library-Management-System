import {Link} from 'react-router-dom';
import strawberryLogo from '../items/strawberry.png'
export default function LoginSignupHeader({
    heading,
    paragraph,
    linkName,
    linkUrl="/signup"
}){
    return(
        <div className="overflow-auto ">
            <div  className="overflow-none mt-5">
            <div style={{ height: '250px',display: 'flex'}}>
        
                    {/* <spline-viewer url="https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode"></spline-viewer> */}
                   
                  
               
               
                {/* <spline-viewer url="https://prod.spline.design/5NSOuxxC9mvM-uaQ/scene.splinecode" background="rgba(218,81,221,0)"></spline-viewer> */}
              {/* <spline-viewer url="https://prod.spline.design/BKkYT6on6YRipNlL/scene.splinecode"></spline-viewer> */}


                <spline-viewer url="https://prod.spline.design/5NSOuxxC9mvM-uaQ/scene.splinecode" background="rgba(218,81,221,0)"></spline-viewer> 





              </div>
            </div>

            
            <h2 className=" text-center text-3xl font-extrabold" style={{color:"#3c5186", hover:"#fff5de"}}>
                {heading}
            </h2>
            <p className=" py-2 text-center" style={{ color: '#3c5186' }}>
            {paragraph} {' '}
            
            </p>
            <p className=" text-center" style={{ color: '#3c5186' }}>
            <Link to={linkUrl} className="font-medium " style={{color:"#fff5de" ,':hover':"#3c5186"}}>
                {linkName}
            </Link>
            </p>
            
            
        </div>
    )
}