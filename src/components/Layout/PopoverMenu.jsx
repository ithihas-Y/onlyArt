import React from "react"
import {Link} from "gatsby"

import TimeLineIcon from "assets/icons/google/timeline.svg"
import TokenIcon from "assets/icons/google/generating_tokens.svg"
import FingerPrintIcon from "assets/icons/google/fingerprint.svg"
import BulbIcon from "assets/icons/google/lightbulb.svg"

const PopupMenu = ({type}) => {

    const Individuals = [
        {
            "img":"token",
            "h5":"Tokenomics",
            "link":"/tokenomics",
            "sub":"10T with .5% burned per transaction and .5% redistributed quarterly",
        },
        {
            "img":"bulb",
            "h5":"How to Buy",
            "link":"/how-to-buy",
            "sub":"",
        },
        {
            "img":"fingerprint",
            "h5":"White Paper",
            "link":"/white-paper",
            "sub":"",
        },
        {
            "img":"timeline",
            "h5":"RoadMap",
            "link":"/roadmap",
            "sub":"",
        }
    ]

    const LinksMap = {
        // "dev":Developers,
        "ind":Individuals
    }

    return(
        <React.Fragment>
            <ul className={`pop-over-menu ${type}`}>
                {
                    LinksMap[type].map( (lnk,idx) => {
                        return (
                            <li key={idx} className="pop-over-menu-item">
                                <Link to={lnk["link"]} className="link-tile">
                                    <div>
                                        {lnk["img"] === "token" && <BulbIcon/>}
                                        {lnk["img"] === "bulb" && <TokenIcon/>}
                                        {lnk["img"] === "fingerprint" && <FingerPrintIcon/>}
                                        {lnk["img"] === "timeline" && <TimeLineIcon/>}
                                    </div>
                                    <div>
                                        <h5>{lnk["h5"]}</h5>
                                        <sub>{lnk["sub"]}</sub>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    )
}

export default PopupMenu