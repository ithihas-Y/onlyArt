import React, { useEffect,useState } from "react"
// import ReactMarkdown from 'react-markdown'
// import PageMD from 'src/content/posts/ambassadors.md'

import { Link, graphql } from "gatsby"

import Layout from "components/layout"
import Seo from "components/seo"

import Banner from "components/Banner"

const TermsPage = ({ data, location }) => {
    const [md,setMd] = useState(null)
    const siteTitle = data.site.siteMetadata?.title || `Title`

    // const { markdownRemark } = data // data.markdownRemark holds your post data
    // const { frontmatter, html } = markdownRemark

    useEffect(() => {
        setMd(data.allMarkdownRemark.nodes[0])
        console.log({data})
        //     fetch(PageMD).then((response) => response.text()).then((text) => {
    //         setMd(text)
    //     })
    }, [])

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={"Terms and Conditions"} />
            <Banner 
                title={"Terms and Conditions"} 
                description={md?.["frontmatter"]?.["description"]}
            />
            <div className="container mx-auto">
                {
                    md !== null
                    &&
                    <div dangerouslySetInnerHTML={{__html:md["html"]}} />
                }
            </div>
        </Layout>
    )
}

export default TermsPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {fileAbsolutePath: {regex: "/terms.md/"}}
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