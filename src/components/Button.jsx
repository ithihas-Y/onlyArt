import React,{useEffect,useRef} from "react"
import {createRipple} from "components/Helpers/functions"

const Button = ({type,tab,tabIndex,activeTabBlock,onClickHandler,children}) => {
    
    const ref = useRef()

    useEffect(() => {
        createRipple(ref.current)
    },[])

    return (
        <React.Fragment>
            {
                type === "tabs" ?
                <button ref={ref} className={`benefits-tab-item ${activeTabBlock === tab ? "selected":""}`} tabIndex={tabIndex} type="button" role="tab" onClick={() => onClickHandler(tab)} ripple="ripple">
                   {children}
                </button>
                :
                <button ref={ref} className={`btn btn-${type}`} ripple="ripple" onClick={onClickHandler}>{children}
                </button>
            }
        </React.Fragment>
    )
}

export default Button