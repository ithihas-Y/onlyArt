import React, { useEffect,useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "components/layout"
import Seo from "components/seo"

import Button from "components/Button"
import Banner from "components/Banner"
import SearchIcon from "assets/icons/search.svg"
import Loader from "components/Helpers/Loader"

const CreatorsPage = ({ pageContext, data, location }) => {
    const [creators,setCreators] = useState(null)
    const [noData,setNoData] = useState(false)
    const [filteredList,setFilteredList] = useState(null)
    const [alphabets,setAlphabets] = useState([])

    const siteTitle = data.site.siteMetadata?.title || `Title`

    const handleCreatorsSearch = (e) => {
        let value = e.target.value
        if(value !== ""){
            const filteredCreators = creators.filter(v => v["frontmatter"]["title"].toLowerCase().includes(value) )
            setFilteredList(filteredCreators)
            if(filteredCreators.length === 0){
                setNoData(true)
            }else{
                setNoData(false)
            }
        }else{
            setNoData(false)
            setFilteredList(null)
        }
    }

    useEffect(() => {
        console.log({data})
        const dataArr = data.allMarkdownRemark.nodes.map(v => v["frontmatter"]["title"].toLowerCase()[0])

        setCreators(data.allMarkdownRemark.nodes)

        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => {
            const letter = String.fromCharCode(x)
            return(
                <Link key={x} to={`/creators/start-with?letter=${letter}`}>
                    <span className={dataArr.includes(letter.toLocaleLowerCase()) ? "data":"no-data"}>{letter}</span>
                </Link>
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
                <div className="search-wrapper">
                    <input type="text" placeholder="Search Creators" onChange={handleCreatorsSearch} />
                    <button>
                        <SearchIcon/>
                    </button>
                </div>
                <div className="alpha-wrapper hidden md:flex">
                    {alphabets.map(a => a)}
                </div>
                <div className="creators-list py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {
                        (filteredList ===  null && creators) && creators.map(creator => {
                            const artworks = creator["frontmatter"]["gallery"].length
                            const { title, artist } = creator["frontmatter"]
                            const { slug } = creator["frontmatter"]
                            return(
                                <div key={title} className="card rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src={artist} alt={title} />
                                    <div className="px-6 pb-6 flex justify-between items-center">
                                        <p id="creator_name" className="font-bold mb-2">{title} </p>
                                        <Link id="creator_link" className="text-gray-700" to={slug}>Discover</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        filteredList && filteredList.map(creator => {
                            const artworks = creator["frontmatter"]["gallery"].length
                            const { title, artist } = creator["frontmatter"]
                            const { slug } = creator["frontmatter"]
                            return(
                                <div key={title} className="card rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src={artist} alt={title} />
                                    <div className="px-6 pb-6 flex justify-between items-center">
                                        <p id="creator_name" className="font-bold mb-2">{title} </p>
                                        <Link id="creator_link" className="text-gray-700" to={slug}>Discover</Link>
                                    </div>
                                </div>
                            )
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
                <div className="pagination">
                    {
                        pageContext.currentPage !== 1
                        &&
                        <Link to={"/creators/"+ (pageContext.currentPage === 2 ? "":pageContext.currentPage - 1)} className="page-link"><Button type="secondary">Previous</Button></Link>
                    }
                    {
                        pageContext.currentPage < pageContext.numPages
                        &&
                        <Link to={"/creators/"+ (pageContext.currentPage + 1)} className="page-link"><Button type="secondary">Next</Button></Link>
                    }
                    
                </div>
            </div>
        </Layout>
    )
}

export default CreatorsPage

export const pageQuery = graphql`
    query($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {fileAbsolutePath: {regex: "/(artists)/"}}
            limit: $limit
            skip: $skip
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
                    slug
                    facebook
                    twitter
                    instagram
                }
                html
            }
        }
    }
`