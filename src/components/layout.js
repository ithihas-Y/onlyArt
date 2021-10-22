import React,{useEffect,useState} from "react"
import { Link } from "gatsby"

import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import Loader from "components/Helpers/Loader"

const Layout = ({ location, title, children, showContent=null, translate=false }) => {
  const [showTopIcon,setShowTopIcon] = useState(false)
//   const [isLoading,setIsLoading] = useState(true)
  
  const handleScroll = (evt) => {
    const position = window.pageYOffset
    if(position > 100){
        setShowTopIcon(true)
    }else{
        setShowTopIcon(false)
    }
    // if(window.location.pathname === "/white-paper"){
    //     document.querySelector("#google_translate_element").style.display = "block";
    // }else{
    //     document.querySelector("#google_translate_element").style.display = "none";
    // }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // window.requestAnimationFrame(function() {
    //     setIsLoading(false)
    // })
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <React.Fragment>
        <div id="#top"></div>
        {
            (showContent !== null && !showContent)
            &&
            <div className="text-center">
                <Loader/>
            </div>
        }
        <div className={`${showContent === null || showContent === true ? "":"hidden"}`}>
            <Header translate={translate}/>
            <div className={`global-wrapper ${translate ? "":"notranslate"}`} >
                <main>{children}</main>
                <Footer/>
            </div>

            <div className={`scrolltop-container ${showTopIcon ? "show":""}`}>
                <a href="#top" aria-label="Scroll to the top of the page" lang="">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                </a>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout
