import React, { useState, useRef } from "react"
import { Link } from "gatsby"
// import { useMediaQuery } from 'react-responsive'

import ArrowIcon from "assets/icons/arrow.svg"
// import Logo from "src/images/logo22_b.png"
import Logo from "assets/logo.svg"

import HeaderBg from "src/images/header_bg.png"
// import Logo from "src/images/onlyart-logo-2.png"

import Overlay from "components/Layout/Overlay"
import PopoverMenu from "components/Layout/PopoverMenu"

import { useOnClickOutside } from "components/Helpers/hooks"

import { useSpring, animated as a } from "react-spring";

const Header = (translate = false) => {
    // const ref1 = useRef()
    const ref2 = useRef()

    const [isOpen, setIsOpen] = useState(false)
    const [isPopover, setIsPopover] = useState('')

    // const isBigScreen = useMediaQuery({ minWidth: 1400 })
    // const isMobile = useMediaQuery({ maxWidth: 960 })

    const toggleMenu = () => {
        document.querySelector("body").classList.toggle("no-scroll")
        setIsOpen(!isOpen)
    }

    const showPopoverMenu = (type) => {
        setIsPopover(type)
    }
    const contentProps = useSpring({
        opacity: isOpen ? 1 : 0,
        marginTop: isOpen ? 0 : -500
    });
    useOnClickOutside(ref2, () => setIsPopover(''));

    return (
        <React.Fragment>
            <header className={`notranslate`}>
                {/* <img src={HeaderBg} alt="bg" className="header-bg" /> */}
                <div className="top-nav grid gap-4">
                    <div className="nav site-title">
                        <Link to="/" aria-current="page" aria-label="Go to home page" className="logo-wrapper" lang="">
                            {/* <img src={Logo} alt=""/> */}
                            <Logo/>
                            <p className="text-header">The <br/>OnlyArt<br/> Foundation</p>
                        </Link>
                    </div>
                    {/* {
                    !isMobile 
                    && */}
                    <div className="nav main-nav">
                        <nav className="Navigation__NavWrap">
                            <ul className="parentNav flex">
                                {/* <li ref={ref1} className="parent-link-item">
                                    <a className={`${isPopover === 'dev'?"active":""} parent-link`} href="#" aria-label="Open Developers navigation" lang="" onClick={() => showPopoverMenu('dev')}>
                                        <span className="h5">ABOUT</span>
                                        <ArrowIcon className={isPopover === 'dev'?"open":""}/>
                                    </a>
                                    {
                                        isPopover === "dev"
                                        &&
                                        <PopoverMenu type="dev"/>
                                    }
                                </li> */}
                                <li className="parent-link-item">
                                    <a className="parent-link" aria-label="Home Page" lang="en-US" href="/">
                                        <span className="h5">HOME</span>
                                    </a>
                                </li>
                                {/* <li className="parent-link-item">
                                    <a className="parent-link" aria-label="About Page" lang="en-US" href="/about/">
                                        <span className="h5">ABOUT</span>
                                    </a>
                                </li> */}
                                <li className="parent-link-item">
                                    <a className="parent-link" aria-label="Creators Page" lang="en-US" href="/creators/">
                                        <span className="h5">CREATORS</span>
                                    </a>
                                </li>
                                <li ref={ref2} className="parent-link-item">
                                    <a className={`${isPopover === 'ind' ? "active" : ""} parent-link`} aria-label="OnlyArt Token Sections" lang="en-US" onClick={() => showPopoverMenu('ind')}>
                                        <span className={`h5 ${isPopover?"active":""}`}>ONLYART TOKEN</span>
                                        <ArrowIcon className={isPopover === 'ind' ? "open" : ""} />
                                    </a>
                                    {
                                        isPopover === "ind"
                                        &&
                                        <PopoverMenu type={isPopover} />
                                    }
                                </li>
                            </ul>
                        </nav>
                        <div className="toggle-btn">
                            <button className={`hamburger hamburger--collapse ${isOpen ? "is-active" : ""}`} type="button" aria-label="menu" onClick={toggleMenu}>
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                        
                    </div>
                    <div className={`toggle-btn mob ${isOpen ? "is-active" : ""}`}>
                        <button className={`hamburger hamburger--collapse`} type="button" aria-label="menu" onClick={toggleMenu}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                    <div className={`box-menu ${isOpen ? "is-active" : ""}`}>
                        <button className={`hamburger hamburger--collapse  ${isOpen ? "is-active" : ""}`} type="button" aria-label="menu" onClick={toggleMenu}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                    {
                        isOpen
                        &&
                        <a.div className="box" style={contentProps}>
                            
                            <div className={`overlay`}>
                                <Overlay />
                            </div>
                        </a.div>
                    }
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header