import '../css/Contact.css'
const Contact = () => {
  return (
    <>
     <div className="contact">
      <h3>You can contact me for the development of responsive and fully functional websites and web apps</h3>
      <div className="contact-desc">
        <input type="email" placeholder='Enter your email'/>
        <textarea placeholder='Enter your query here'></textarea>
        <button>Send Query</button>
      </div>
     </div>
    </>
  )
}

export default Contact