import React, { useEffect, useState } from "react"
// import ReactMarkdown from 'react-markdown'
// import PageMD from 'src/content/posts/ambassadors.md'

import { Link, graphql } from "gatsby"
import "../styles/pages/how-to-buy.css"

import Layout from "components/layout"
import Seo from "components/seo"

import Banner from "components/Banner"

const BuyPage = ({ data, location }) => {
  const [md, setMd] = useState(null)
  const [selectedAddr,setAddr] = useState('')
  const siteTitle = data.site.siteMetadata?.title || `Title`

  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html } = markdownRemark

  useEffect(() => {
    setMd(data.allMarkdownRemark.nodes[0])
    //     fetch(PageMD).then((response) => response.text()).then((text) => {
    //         setMd(text)
    //     })
  }, [])

  async function connectWallet(){
    try {
      if(window.ethereum && window.ethereum != 'undefined'){
        await window.ethereum.enable()
        setAddr(window.ethereum.selectedAddress)
        console.log(selectedAddr)
      }else{
        window.alert("No Wallet Connected")
      }
    } catch (error) {
      console.error()
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={"How to Buy"} />
      <Banner
        title={"How to Buy"}
        description={md?.["frontmatter"]?.["description"]}
        links={[
          {
            name: "Tokenomics",
            url: "/tokenomics",
          },
          {
            name: "White Paper",
            url: "/white-paper",
          },
          {
            name: "Roadmap",
            url: "/roadmap",
          },
        ]}
      />
      <div className="container mx-auto">
        {md !== null && (
          <div dangerouslySetInnerHTML={{ __html: md["html"] }} />
        )}
        <div className="card">
          <div className="card-bg">
            <div className="card-container">
              <div className="card-row1">
                <h4 className="exchange-head">Exchange</h4>
                <h4 className="tag">Trade tokens in an instant</h4>
              </div>
              <div className="card-row2">
                <div className="row2-col1">
                  <h5>From</h5>
                  <input
                    className="inpt-field"
                    type="number"
                    placeholder="0.0"
                  />
                </div>
                <h4 className="label-name">ETH</h4>
              </div>
              <div className="card-row3">
                <div className="row3-col1">
                  <h5>To</h5>
                  <input
                    className="inpt-field"
                    type="number"
                    placeholder="0.0"
                  />
                </div>
                <h4 className="label-name">OAT</h4>
              </div>
              <div className="card-row4">
                <button className="cnct-wallet-btn" onClick={connectWallet}>Connect Wallet</button>
              </div>
            </div>
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
      filter: { fileAbsolutePath: { regex: "/how-to-buy.md/" } }
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
