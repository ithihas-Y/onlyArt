import React, { useEffect,useState } from "react"
// import ReactMarkdown from 'react-markdown'
// import PageMD from 'src/content/posts/ambassadors.md'

import { Link, graphql } from "gatsby"
// import { LanguageSelector } from 'gatsby-plugin-translate'

import Layout from "components/layout"
import Seo from "components/seo"

import Banner from "components/Banner"
import Button from "components/Button"

const WhitePaperPage = ({ data, location }) => {
    const [md,setMd] = useState(null)
    // const [update,setUpdate] = useState(false)
    const siteTitle = data.site.siteMetadata?.title || `Title`

    // const { markdownRemark } = data // data.markdownRemark holds your post data
    // const { frontmatter, html } = markdownRemark
    // const addScriptToHead = () => {
    //     let head = document.getElementsByTagName('head')[0];
    //     let script = document.createElement('script');
    //     script.type = 'text/javascript';
    //     script.onload = function() {
    //         callFunctionFromScript();
    //     }
    //     script.src = 'path/to/your-script.js';
    //     head.appendChild(script);
    // }
    const printPaper = () => {
        let prtContent = document.getElementById("print-section");
        let WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(prtContent.innerHTML);
        // WinPrint.document.write(cssLinkTag)
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        // WinPrint.close();
    }

    useEffect(() => {
        setMd(data.allMarkdownRemark.nodes[0])
        console.log({data})
        //     fetch(PageMD).then((response) => response.text()).then((text) => {
    //         setMd(text)
    //     })
        // return () => {
        //     addScriptToHead
        // }
        // setTimeout(() => {
        //     var head = document.getElementsByTagName('head')[0];
        //     var script = document.createElement('script');
        //     script.type = 'text/javascript';
        //     script.onload = function() {
        //         console.log("loaded")
        //         //     callFunctionFromScript();
        //     }
        //     script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        //     head.appendChild(script);
        //     // setUpdate(true)
        // }, 1500);
        document.querySelector("body").classList.add("whitepaper")
        return () => {
            document.querySelector("body").classList.remove("whitepaper")
        }
    }, [])

    return (
        <Layout location={location} title={siteTitle} translate={true}>
            <Seo title={"White Paper"} />
            <Banner 
                title={"White Paper"} 
                description={md?.["frontmatter"]?.["description"]} 
                links={[
                    {
                        name:"Tokenomics",
                        url:'/tokenomics'
                    },
                    {
                        name:"How To Buy",
                        url:'/how-to-buy'
                    },
                    {
                        name:"Roadmap",
                        url:'/roadmap'
                    },
                ]} 
            />
            {/* <LanguageSelector sourceLanguage={true}>English</LanguageSelector>
            <LanguageSelector language="es">Español</LanguageSelector>
            <LanguageSelector language="de">Deutsch</LanguageSelector> */}
            <div id="print-section" className="container mx-auto">
                {
                    md !== null
                    &&
                    <div dangerouslySetInnerHTML={{__html:md["html"]}} />
                }
            </div>
            <div className="container mx-auto notranslate">
                <Button type="secondary" onClickHandler={printPaper}>Print Paper</Button>
            </div>
            
        </Layout>
    )
}

export default WhitePaperPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {fileAbsolutePath: {regex: "/white-paper.md/"}}
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