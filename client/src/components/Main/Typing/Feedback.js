import React from 'react'
import "./Feedback.css"
const Feedback = () => {

  const [send,setSend]=React.useState('Send');
  return (
    <div>
      

<div>
  <div class="contact-form-wrapper d-flex justify-content-center">
    <form action="#" class="contact-form">
      <h5 class="title">Feedback</h5>
      <p class="description">Feel free to contact us if you need any assistance, any help or another question.
      </p>
      <div>
        
      </div>
      <div>
        <input type="email" class="form-control rounded border-white mb-3 form-input" placeholder="Email" required />
      </div>
      <div>
        <textarea id="message" class="form-control rounded border-white mb-3 form-text-area" rows="5" cols="30" placeholder="Message" required ></textarea>
      </div>
      <div class="submit-button-wrapper">
        <input type="submit" value={send} onClick={()=>setSend('Sent')} style={{height:"60px"}}/>
      </div>
    </form>
  </div>
</div>
    </div>

  )
}

export default Feedback