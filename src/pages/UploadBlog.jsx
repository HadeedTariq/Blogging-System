import React, { useRef, useState } from 'react'
import '../css/UploadBlog.css'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { RxUpload } from 'react-icons/rx'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { Success,Loading } from '../components'
const UploadBlog = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [loading,setLoading]=useState(false)
  const urlPost = []
  const imageRefrence = ref(storage, 'images/')
  const description = useRef()
  const [titleLimit, setTitleLimit] = useState(false)
  const [success, setSuccess] = useState(false)
  const [imgSucces,setImgSuccess]=useState(false)
  const date = new Date()
  const limit = (e) => {
    if (e.target.value.length >= 150) {
      setTitleLimit(true)
    }
    else {
      setTitle(e.target.value)
      setTitleLimit(false)
    }
  }
  const upload = async () => {
    if (title.length < 20 && description.current.value.length < 500 && !image) {
      alert("Title cannot be less then 20 words and description is not less then 500words")
      return
    }
    else {
      setLoading(true)
      await listAll(imageRefrence).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            urlPost.unshift({ url: url })
          })
        })
      })
      setTimeout(async() => {
        await setDoc(doc(db, "blogpost", `${date.getTime()}`), {
          title: `${title}`,
          description: `${description.current.value}`,
          imgUrl: `${urlPost[0].url}`,
          id: `${date.getTime()}`
        });
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 1500);
        setTitle("")
        description.current.value = ""
        setLoading(false)
      }, 5000);
    }
  }
  const imageUploader = (e) => {
    const img = e.target.files[0]
    if (img) {
      setLoading(true)
      const imageRef = ref(storage, `images/${img.name + date.getTime()}`)
      uploadBytes(imageRef, img).then(() => {
        setImage(img)
        setImgSuccess(true)
        setTimeout(() => {
        setLoading(false)
        setImgSuccess(false)
      }, 1500);
      })   
    }
  }
  return (
    <>
    { loading && <Loading/>}
      <div className="upload-blog">
        {success && 
          <>
            <Success msg={"Blog uploaded successfully"}/>
          </>
        }
        {imgSucces && 
          <>
            <Success msg={"Image uploaded successfully"}/>
          </>
        }
        <div className="blog-content">
          <div className="title">
            <h3>Title</h3>
            <input value={title} type="text" placeholder='Enter Title Here' onChange={limit} />
            {titleLimit && <p>The title cannot be more than 150 words</p>}
          </div>
          <div className="desc">
            <h2>Description</h2>
            <textarea ref={description} placeholder='Enter Description'></textarea>
          </div>
          <label>
            <div className="file">
              <img src={urlPost[0]?.url} alt="" />
              <RxUpload size={50} className='file-logo' />
              <input type="file" onChange={imageUploader} />
            </div>
          </label>
          <div className="upload">
            <button onClick={upload}>Upload</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadBlog