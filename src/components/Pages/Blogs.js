import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import "./Pages.scss"
import axios from 'axios'

function Blogs() {
    const [blogs,setBlogsData] = React.useState(null)
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/job/getAllBlogs`)
        .then(res=>{
            console.log(res)
            setBlogsData(res.data.result)
        })
    },[])

  return (
    <div>
    <Header />
        <div className="page-section bg-pink p-3">
        <h1>Blogs</h1>

        <section className="blog-container">
        {
          blogs&&blogs.map((item,index)=><div className="blog-head row m-auto shadow-sm" key={index}>
            <div className="col-2 img-div">
              <img src={`${process.env.REACT_APP_DEVELOPMENT}/api/image/${item.img}`} alt="img" />
            </div>
            <div className="col-10 content-div">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            </div>
            </div>)
        }
        </section>

        </div>

    <Footer />
    </div>
  )
}

export default Blogs