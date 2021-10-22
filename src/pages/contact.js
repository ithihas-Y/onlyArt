import React, { useEffect,useState } from "react"
// import ReactMarkdown from 'react-markdown'
// import PageMD from 'src/content/posts/ambassadors.md'

import { Link, graphql } from "gatsby"

import Layout from "components/layout"
import Seo from "components/seo"

import Banner from "components/Banner"
import Button from "components/Button"

import addToMailchimp from 'gatsby-plugin-mailchimp'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const BuyPage = ({ data, location }) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')

    const [isSubscribing,setIsSubscribing] = useState(false)
    const [doneMsg,setDoneMsg] = useState(null) 
    const [reqMsg,setReqMsg] = useState(null)

    const [md,setMd] = useState(null)
    const siteTitle = data.site.siteMetadata?.title || `Title`

    // const { markdownRemark } = data // data.markdownRemark holds your post data
    // const { frontmatter, html } = markdownRemark
    const handleContact = () => {
        if(email === '' || name === '' || subject === ''){
            setReqMsg("Please Fill Required Fields")
        }else{
            setReqMsg(null)
            if(validateEmail(email)){
                setReqMsg(null)
            }else{
                setReqMsg("Invalid Email")
            }
        }

        if(doneMsg === null && email !== '' && name !== '' && subject !== '' && reqMsg === null){
            setIsSubscribing(true)
            setDoneMsg("Please Wait...")
            // fetch('https://ipapi.co/8.8.8.8/json/')
            // .then(res => res.json())
            // .then(data => {
            //     console.log(data["query"])
            //     console.log(data["country"])
            const listFields = {
                NAME:name,
                SUBJECT:subject,
            }
            addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
            .then(data => {
              // I recommend setting data to React state
              // but you can do whatever you want (including ignoring this `then()` altogether)
              console.log(data)
              if(data.result === "success"){
                setDoneMsg("Thank you, your response has been saved")
              }
              setIsSubscribing(false)
            })
            .catch((err) => {
                // unnecessary because Mailchimp only ever
                // returns a 200 status code
                // see below for how to handle errors
                setIsSubscribing(false)
                setDoneMsg("Failed To Save Resonse")
                console.log(err)
            })
        }
    }

    useEffect(() => {
        setMd(data.allMarkdownRemark.nodes[0])
        console.log({data})
        //     fetch(PageMD).then((response) => response.text()).then((text) => {
    //         setMd(text)
    //     })
    }, [])

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={"Contact"} />
            <Banner 
                title={"Contact"} 
                description={md?.["frontmatter"]?.["description"]} 
            />
            <div className="container mx-auto">
                {/* {
                    md !== null
                    &&
                    <div dangerouslySetInnerHTML={{__html:md["html"]}} />
                } */}
                <div id="sub-form" className="link-column bg-white shadow-md rounded px-8 pb-8 mx-auto mb-4 w-1/2">
                        <h5>Contact Us</h5>
                       
                        <div className="mt-8">
                            <label className="block uppercase tracking-wide text-gray-400" htmlFor="name">
                                Name <sup className="text-red-400">*</sup>
                            </label>
                            <input className="w-full bg-purple-200 text-gray-900 mt-2 p-3 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text" autoComplete="off" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="mt-8">
                            <label className="block uppercase tracking-wide text-gray-400" htmlFor="email">
                                Email <sup className="text-red-400">*</sup>
                            </label>
                            <input className="w-full bg-purple-200 text-gray-900 mt-2 p-3 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text" autoComplete="off" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mt-8">
                            <label className="block uppercase tracking-wide text-gray-400" htmlFor="subject">
                                Subject <sup className="text-red-400">*</sup>
                            </label>
                            <textarea className="w-full bg-purple-200 text-gray-900 mt-2 p-3 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                autoComplete="off" defaultValue={subject} onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                        {reqMsg !== null && <p className="text-red-500">{reqMsg}</p> }
                        <div className="mt-8 mb-6">
                            <Button type="secondary" onClickHandler={handleContact}>
                                {
                                    doneMsg !== null
                                    ?
                                    doneMsg
                                    :
                                    "Send Message"
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
        </Layout>
    )
}

export default BuyPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {fileAbsolutePath: {regex: "/contact.md/"}}
        ) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    description
                }
                html
            }
        }
    }
`