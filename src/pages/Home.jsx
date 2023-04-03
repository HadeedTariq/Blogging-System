import { BlogPost } from '../components';
import '../css/Home.css'
const Home = () => {
  return (
    <>
    <h1 className='blog-category'>Popular Blogs</h1>
     <div className="home">
       <BlogPost home/>
     </div>
    </>
  )
}

export default Home