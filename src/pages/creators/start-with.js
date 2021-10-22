import React, { useEffect,useState } from "react"
import { Link, graphql } from "gatsby"
import { navigate } from "gatsby"

import Layout from "components/layout"
import Seo from "components/seo"

import Banner from "components/Banner"
import Loader from "components/Helpers/Loader"

const CreatorsPage = ({ data, location }) => {
    const [activeAlphabet,setActiveAlphabet] = useState(null)


    const [creators,setCreators] = useState(null)
    const [noData,setNoData] = useState(false)
    const [filteredList,setFilteredList] = useState(null)
    const [alphabets,setAlphabets] = useState([])

    const siteTitle = data.site.siteMetadata?.title || `Title`

    const updateFilter = (letter) => {
        navigate(`/creators/start-with?letter=${letter}`)
    }

    useEffect(() => {
        // Search Params
        const searchParams = new URLSearchParams(window.location.search);
        setActiveAlphabet(searchParams.get("letter").toLowerCase())
        const dataArr = data.allMarkdownRemark.nodes.map(v => v["frontmatter"]["title"].toLowerCase()[0])
        if(!dataArr.includes(searchParams.get("letter").toLowerCase())){
            setNoData(true)
        }
        setCreators(data.allMarkdownRemark.nodes)
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => {
            const letter = String.fromCharCode(x).toLowerCase()
            const isActive = letter === searchParams.get("letter").toLowerCase() ? true:false
            const hasData = dataArr.includes(letter)
            return(
                <a href="" onClick={() => updateFilter(letter)}>
                    <span key={x} className={`${hasData ? "data":"no-data"}${isActive ? " active":""}`}>{letter.toUpperCase()}</span>
                </a>
            )
        });
        setAlphabets(alphabet)
    }, [])

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={"Creators"} />
            <Banner 
                title={"Creators"} 
                description={"Our Creators At OnlyArt Foundation"} 
                links={["Program","Status","Roles"]} 
            />
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <h2>Artists - {activeAlphabet && activeAlphabet.toUpperCase()}</h2>
                    <div className="alpha-wrapper hidden md:flex">
                        {alphabets.map(a => a)}
                    </div>
                </div>
                <div className="creators-list py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {
                        (activeAlphabet && creators) && creators.map(creator => {
                            const { title } = creator["frontmatter"]
                            const { slug } = creator["fields"]
                            const t1 = creator["frontmatter"]["title"].toLowerCase()[0]
                            if(t1 === activeAlphabet){
                                return(
                                    <Link to={slug}>
                                        <p id="creator_name" className="font-bold text-xl mb-2">{title}</p>
                                    </Link>
                                )
                            }
                        })
                    }   
                </div>
                {
                    noData
                    &&
                    <h2 className="text-center">No Creators Found!</h2>
                }
                {
                    creators === null
                    &&
                    <Loader/>
                }
            </div>
        </Layout>
    )
}

export default CreatorsPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {fileAbsolutePath: {regex: "/(artists)/"}}
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
                    gallery
                    artist
                    social_media{
                        twitter
                        facebook
                        instagram
                    }
                }
                html
            }
        }
    }
`