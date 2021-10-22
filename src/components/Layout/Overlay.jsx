import React from "react"
import {Link} from "gatsby"

const Overlay = ({toggleMenu}) => {

    const NavLinks = {
        "OnlyArt Token":{
            "Tokenomics":"tokenomics",
            "How to Buy":"how-to-buy",
            "White Paper":"white-paper",
            "Roadmap":"roadmap",
        },
        "Support":{
            "FAQ":"faq",
        },
        "Community":{
            "Creators":"creators",
            // "Newsletter":"newsletter",
        }
        // "Discover Cardano":"",
        // "Journey":"",
        // "News":"",
        // "Community":"",
    }

    const Template = (nav,idx) => (
        <React.Fragment key={idx}>  
            {
                typeof NavLinks[nav] === 'object' ?
                <li className="nav-item">
                    <h4 className="heading">{nav}</h4>
                    <ul className="child-items">
                    {
                        Object.keys(NavLinks[nav]).map(ch => {
                        return (
                            <li key={ch}>
                                <Link to={`/${NavLinks[nav][ch]}`} className="nav-link">
                                    <p>{ch}</p>
                                </Link>
                            </li>
                            )
                        })
                    }
                    </ul>
                </li>
                :
                <li className="nav-item">
                    <a href={NavLinks[nav]} className="nav-link navigation">
                        <span className="heading">{nav}</span>
                    </a>
                </li>
            }
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ul className="nav-links container mx-auto">
                {
                    Object.keys(NavLinks).map( (nav,idx) => {
                        if(idx < 3){
                            return(
                                Template(nav,idx)
                            )
                        }
                    })
                }
                <li className="sub-nav">
                    <ul className="flex flex-wrap">
                        {
                            Object.keys(NavLinks).map( (nav,idx) => {
                                if(idx >= 3){
                                    return(
                                        Template(nav,idx)
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default Overlay