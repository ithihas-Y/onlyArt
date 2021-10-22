import React, { useEffect,useState,useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "components/layout"
import Seo from "components/seo"

import Button from "components/Button"
// import ArrowIcon from "assets/icons/arrow.svg"
// import BG_Left from "src/images/bg_left.jpg"
// import BG_Right from "src/images/bg_right.jpg"
import BG from "src/images/banner_2.webp"
// import { StaticImage } from "gatsby-plugin-image"
import Image from 'gatsby-image';
// import Slide from 'react-reveal/Slide';


import Forbes from "assets/icons/Forbes_logo.svg"
import Bloomberg from "assets/icons/Bloomberg_logo.svg"
// import Bloomberg from "src/images/Bloomberg_2.png"
import WSJ from "assets/icons/wsj_3.svg"
// import { StaticImage } from "gatsby-plugin-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import WSJ from "src/images/wsj_3.png"

const HomePage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    // const [showContent,setShowContent] = useState(false)
    // const [update,setUpdate] = useState(false)

    // const image = useRef()
    const image = getImage(data.banner)

    // useEffect(() => {
    //     console.log(data)
        // console.log(image.current.complete)
    //     if (image.current.complete){
    //         setShowContent(true)   
    //     }
    //     if(!image.current.complete){
    //         setTimeout(() => {
    //             setUpdate(!update)
    //         }, 330);
    //     }
    // },[update])

    return (
        <Layout location={location} title={siteTitle} showContent={true}>
            <Seo title="Home" />
            
            <main>
                <section className="banner">
                    {/* <StaticImage
                        src={BG}
                        alt="banner only art"
                        placeholder="blurred"
                        layout="fixed"
                        width={1024}
                        height={600}
                    /> */}
                    <GatsbyImage image={image} alt={"Banner"} />
                    {/* <Image ref={image} fluid={data.banner.childImageSharp.fluid} /> */}
                    {/* <img ref={image} src={BG} alt="banner only art" height="800" width="100%" loading="eager" /> */}
                    <div className="box-container">
                        <h2>World's First <span>token backed</span> By <span>Digital Art</span></h2>
                        <Link to="/white-paper">
                            <Button type="primary">
                                Learn About OnlyArt Token
                            </Button>
                        </Link>
                    </div>
                </section>
                <section className="media">
                    <div className="container mx-auto">
                        {/* <h1 className="text-center mb-8">MEDIA</h1> */}

                        <div className="media__wrapper flex justify-center pt-8">
                            <Bloomberg id="bloom"/>
                            <WSJ id="wsj"/>
                            {/* <img src={WSJ} id="wsj" alt="Wall Street Journal" /> */}
                            <Forbes id="forbes"/>
                        </div>
                    </div>
                    <div className="section-caret-wrap">
                        <div className="section-caret-inner">
                            <i>
                                <svg x="0px" y="0px" viewBox="0 0 2000 30">
                                    <polygon fill="#fdfdfb" points="1000,30 0,30 0,0 980,0 "></polygon>
                                    <polygon fill="#fdfdfb" points="1000,30 2000,30 2000,0 1020,0 "></polygon>
                                </svg>
                            </i>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
      }
    }
    banner: file(relativePath: { eq: "banner_2.webp" }) {
        childImageSharp {
            gatsbyImageData(
                formats: [AUTO, WEBP, AVIF]
            )
        }
    }
  }
`
// banner: file(relativePath: { eq: "banner_2.webp" }) {
//     childImageSharp {
//       fluid(maxWidth: 1000, maxHeight: 600) {
//         ...GatsbyImageSharpFluid
//       }
//     }
// }