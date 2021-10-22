import React,{useEffect,useRef,useState} from "react"
import {Link} from "gatsby"

// import ArrowIcon from "assets/icons/arrow.svg"
// import Button from "components/Button"

const Banner = ({title,description,links = null}) => {
    const navbarRef = useRef()

    const handleScroll = () => {
        // console.log(window.pageYOffset,navbarOffset)
        if (window.pageYOffset >= 530 && document.body.scrollHeight > 1650) {
            navbarRef.current.classList.add("sticky")
        } else {
            navbarRef.current.classList.remove("sticky");
        }
    }

    useEffect(() => {
        if(links !== null){
            window.addEventListener("scroll",handleScroll)
            return () => {
                window.removeEventListener("scroll",handleScroll)
            }
        }
    }, [])

    return(
        <React.Fragment>
            {
                links !== null 
                &&
                <>
                    <div className="banner banner-common notranslate">
                        <div className="container mx-auto text-wrap">
                                <h1>{title}</h1>
                                <p>{description}</p>
                        </div>
                    </div>
                    <div className="sticky-nav-container notranslate" ref={navbarRef}>
                            <ul className="sticky-nav mx-auto">
                                <li className="pagename">
                                    <span>{title}</span>
                                </li>
                                {
                                    links.map(link => <li key={link["name"]} className="feature"> <Link to={link["url"]}><span>{link["name"]}</span> </Link></li> )
                                }
                            </ul>
                    </div>
                </>
            }
        </React.Fragment>
    )
}

export default Banner