import React from 'react'
import { RxCheckbox } from 'react-icons/rx'

const Success = (props) => {
  return (
    <>
    <div className="success-msg">
     <RxCheckbox color='green' size={20} />
      <p>{props.msg}</p>
    </div>
    </>
  )
}

export default Success