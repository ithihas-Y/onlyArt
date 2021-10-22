import React, { useEffect,useState } from "react"
// import ReactMarkdown from 'react-markdown'
// import PageMD from 'src/content/posts/ambassadors.md'

import { Link, graphql } from "gatsby"
// import ImageGallery from 'react-image-gallery';
import Layout from "components/layout"
import Seo from "components/seo"

// import "react-image-gallery/styles/scss/image-gallery.scss";
// import Banner from "components/Banner"
import LightGallery from 'lightgallery/react';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import Twitter from "assets/icons/icon-awesome-twitter.svg"
import Facebook from "assets/icons/icon-awesome-facebook-f.svg"
import Instagram from "assets/icons/icon-awesome-instagram.svg"

const Artists = (props) => {
    const [md,setMd] = useState(null)
    const [images,setImages] = useState([])
    const [socialLinks,setSocialLinks] = useState(null)
    
    const [showContent,setShowContent] = useState(false)
    const [update,setUpdate] = useState(0)

    // const siteTitle = data.site.siteMetadata?.title || `Title`
    useEffect(() => {
        console.log({props})
        setMd(props.pageContext.post)
        const imageList = props.pageContext.post.frontmatter.gallery
        const socialLinksList = props.pageContext.post.frontmatter.social_media
        if(imageList !== null){
            setImages(imageList)
        }
        if(socialLinksList !== null){
            setSocialLinks(socialLinksList)
        }

    }, [])

    function checkAge(age) {
        return age === true;
      }
    useEffect(() => {
        setTimeout(() => {
            const imgArr = []
            document.querySelectorAll("img").forEach(item => {
                imgArr.push(item.complete)
            })
            // console.log(imgArr,update)
            const bool = imgArr.every(checkAge)
            if(bool){
                console.log("loaded all")
                setShowContent(true)
            }else{
                setUpdate(update => update + 1)
            }
        }, 800);
    }, [update])

    return (
        <Layout title={"siteTitle"} showContent={showContent}>
            {
                md !== null
                &&
                <Seo title={md["frontmatter"]["title"]} />
            }
            {/* <Banner 
                title={"Ambassadors"} 
                description={md?.["frontmatter"]?.["description"]} 
                links={["Program","Status","Roles"]} 
            /> */}
            <div className="container mx-auto max-w-screen-lg">
                <Link to="/creators" id="back_btn">
                    <button>BACK</button>
                </Link>
                <div className="flex flex-col gap-4 md:flex-row justify-between">
                    {
                        (md === null || images.length === 0)
                        ?
                        <div className="loader">
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        :
                        <>
                            <div className="artist-about border-solid border-2 border-light-blue-500 p-4">
                                <img className="artist" src={md["frontmatter"]["artist"]} alt={md["frontmatter"]["title"]} />
                                    <div className="social-links-wrapper">
                                       {md["frontmatter"]["twitter"] !== "" && <a href={md["frontmatter"]["twitter"]} target="_blank"><Twitter/></a> }
                                       {md["frontmatter"]["facebook"] && <a href={md["frontmatter"]["facebook"]} target="_blank"><Facebook/></a> }
                                       {md["frontmatter"]["instagram"] && <a href={md["frontmatter"]["instagram"]} target="_blank"><Instagram/></a> }
                                    </div>
                                <div className="description" dangerouslySetInnerHTML={{__html:md["html"]}} />
                            </div>
                            <div className="gallery">
                                <div className="border-solid border-2 border-light-blue-500 p-4">
                                    <>
                                        {/* <ImageGallery items={images} lazyLoad={true} /> */}
                                        <LightGallery
                                            // onInit={onInit}
                                            elementClassNames="gallery-wrapper"
                                            speed={500}
                                            plugins={[lgThumbnail, lgZoom]}
                                        >
                                            {/* <div className="main-img"> */}
                                                <div
                                                    // key={item.id}
                                                    // data-lg-size={'1400-800'}
                                                    className="main gallery-item"
                                                    data-src={images[0]}
                                                >
                                                    <img src={images[0]} />
                                                </div>
                                            {/* </div> */}
                                            {/* <div  flex"> */}
                                                {
                                                    images.map( (img,idx) => {
                                                        if(idx > 0){
                                                            return (
                                                                    <div
                                                                        key={idx}
                                                                        // data-lg-size={'1400-800'}
                                                                        className="secondary gallery-item"
                                                                        data-src={img}
                                                                    >
                                                                        <img className="secondary-images" src={img} />
                                                                    </div>
                                                                
                                                            )
                                                        }
                                                    })
                                                }
                                            {/* </div> */}
                                        </LightGallery>
                                        <h3>Artworks ({images.length})</h3>
                                    </>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Artists