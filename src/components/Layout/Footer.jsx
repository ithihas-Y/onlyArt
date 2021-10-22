import React,{useState} from "react"
import Logo from "assets/logo3_b.svg"
import { Link } from "gatsby"

import Twitter from "assets/icons/icon-awesome-twitter.svg"
import Facebook from "assets/icons/icon-awesome-facebook-f.svg"
import Instagram from "assets/icons/icon-awesome-instagram.svg"
import Pinterest from "assets/icons/icon-awesome-pinterest-p.svg"
import Snapchat from "assets/icons/icon-awesome-snapchat-ghost.svg"

import addToMailchimp from 'gatsby-plugin-mailchimp'

import Button from "components/Button"

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const Footer = () => {
    const [fName,setFName] = useState('')
    const [lName,setLName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState(null)

    const [isSubscribing,setIsSubscribing] = useState(false)
    const [doneMsg,setDoneMsg] = useState(null) 
    const [reqMsg,setReqMsg] = useState(null)

    const handleSubscription = () => {
        if(email === '' || fName === '' || lName === ''){
            setReqMsg("Please Fill Required Fields")
        }else{
            setReqMsg(null)
            if(validateEmail(email)){
                setReqMsg(null)
            }else{
                setReqMsg("Invalid Email")
            }
            // if(mobile !== ''){
            //     if(/^\d+$/.test(mobile)){
                    
            //     }else{
            //         setReqMsg(null)
            //     }
            // }
        }

        if(doneMsg === null && email !== '' && fName !== '' && lName !== '' && reqMsg === null){
            setIsSubscribing(true)
            setDoneMsg("Please Wait...")
            // fetch('https://ipapi.co/8.8.8.8/json/')
            // .then(res => res.json())
            // .then(data => {
            //     console.log(data["query"])
            //     console.log(data["country"])
            const listFields = {
                FNAME:fName,
                LNAME:lName,
            }
            if(mobile !== null && mobile !== ""){
                listFields["PHONE"] = mobile
            }
            addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
            .then(data => {
              // I recommend setting data to React state
              // but you can do whatever you want (including ignoring this `then()` altogether)
              console.log(data)
              if(data.result === "success"){
                setDoneMsg("Thank you, you have been added to our newsletter")
              }else{
                setDoneMsg("You have already been subscribed")    
              }
              setIsSubscribing(false)
            })
            .catch((err) => {
                // unnecessary because Mailchimp only ever
                // returns a 200 status code
                // see below for how to handle errors
                setIsSubscribing(false)
                setDoneMsg("Failed To Subscribe")
                console.log(err)
            })
        }
    }

    return (
        <React.Fragment>
            <footer className="container mx-auto notranslate">
                <div className="links-wrapper">
                    <div className="link-column">
                        <h5>OnlyArt Token</h5>
                        <ul>
                            <li>
                                <Link to="/tokenomics">TOKENOMICS</Link>
                            </li>
                            <li>
                                <Link to="/how-to-buy">HOW TO BUY</Link>
                            </li>
                            <li>
                                <Link to="/white-paper">WHITE PAPER</Link>
                            </li>
                            <li>
                                <Link to="/roadmap">ROADMAP</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h5>SUPPORT</h5>
                        <ul>
                            <li>
                                <a href="mailto:hello@onlyart.com">CONTACT</a>
                            </li>
                            <li>
                                <Link to="/faq">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h5>COMMUNITY</h5>
                        <ul>
                            <li>
                                <Link to="/creators">CREATORS</Link>
                            </li>
                            {/* <li>
                                <Link to="/newsletter">NEWSLETTER</Link>
                            </li> */}
                        </ul>
                    </div>
                    <div id="sub-form" className="link-column bg-white shadow-md rounded px-8 pb-8 mb-4">
                        <h5>SUBSCRIBE</h5>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-400 mb-2" htmlFor="first_name">
                                    First Name <sup className="text-red-400">*</sup>
                                </label>
                                <input className="appearance-none block w-full bg-purple-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first_name" type="text" placeholder="First Name" autoComplete="off" defaultValue={fName} onChange={(e) => setFName(e.target.value)}/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-400 mb-2" htmlFor="last_name">
                                    Last Name <sup className="text-red-400">*</sup>
                                </label>
                                <input className="appearance-none block w-full bg-purple-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last_name" type="text" placeholder="Last Name" autoComplete="off" defaultValue={lName} onChange={(e) => setLName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mt-8">
                            <label className="block uppercase tracking-wide text-gray-400" htmlFor="email">
                                Email <sup className="text-red-400">*</sup>
                            </label>
                            <input className="w-full bg-purple-200 text-gray-900 mt-2 p-3 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text" autoComplete="off" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mt-8">
                            <label className="block uppercase tracking-wide text-gray-400" htmlFor="email">
                                Mobile <sup>(OPTIONAL)</sup>
                            </label>
                            <input className="w-full bg-purple-200 text-gray-900 mt-2 p-3 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text" autoComplete="off" defaultValue={mobile} onChange={(e) => setMobile(e.target.value)}/>
                        </div>
                        {reqMsg !== null && <p className="text-red-500">{reqMsg}</p> }
                        <div className="mt-8 mb-6">
                            <Button type="secondary" onClickHandler={handleSubscription}>
                                {
                                    doneMsg !== null
                                    ?
                                    doneMsg
                                    :
                                    "Subscribe Now"
                                }
                                {
                                    isSubscribing
                                    &&
                                    <div className="loader">
                                        <div className="lds-ring">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                }
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="seperator"></div>
                <div className="base flex">
                    <div className="flex copyright items-center">
                        <Logo />
                        <div className="flex legal-pages">
                            <p>
                                &copy; 2021 OnlyArt Foundation All Rights Reserved
                                <Link to="/terms">Terms</Link>
                                <Link to="/privacy">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                    <div className="social-links flex">
                        {/* <a href="">
                            <Snapchat />
                        </a> */}
                        <a href="https://www.instagram.com/OnlyArtFoundation" title="Instagram" target="_blank">
                            <Instagram />
                        </a>
                        {/* <a href="">
                            <Facebook />
                        </a>
                        <a href="">
                            <Twitter />
                        </a>
                        <a href="">
                            <Pinterest />
                        </a> */}
                    </div>
                </div>
            </footer>
        </React.Fragment >
    )
}

export default Footer