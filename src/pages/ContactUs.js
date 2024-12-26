import React from 'react'

export default function ContactUs() {
  return (
    <div data-aos="zoom-in" id="contact" className="bg-light py-5 mt-5">
      <div className="container">
        <h1 className="text-center mt-3"> <span className="text-primary">Contact</span>  Information</h1>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            {/* <!-- Sending to the email here --> */}
            <form action="https://formsubmit.co/aps6mtr@gmail.com" method="POST">
              <fieldset>


                <input type="hidden" name="_captcha" value="false"/>

                {/* <!-- Message to the sender --> */}
                <input type="hidden" name="_autoresponse" value="Thank you htmlFor your message. We will get back to you within 5 working days."/>

                <div className="form-group mt-4">
                  <label htmlFor="exampleInputEmail1" className="form-label mt-4">YOUR EMAIL ADDRESS</label>
                  <input required="" type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label htmlFor="subjectText" className="form-label mt-4">EMAIL SUBJECT</label>
                  <input required="" type="text" name="_subject" className="form-control" id="subjectText" aria-describedby="emailHelp" placeholder="Enter message title" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleTextarea" className="form-label mt-4"> YOUR MESSAGE </label>
                  <textarea name="message" required="" placeholder="Enter your message" className="form-control" id="exampleTextarea" rows="3"></textarea>
                </div>
                <div className='d-flex justify-content-center'>
                  <button type="submit" className="btn btn-primary mt-5 flex-center rounded-pill">Submit <ion-icon class="ms-1 md hydrated" name="chatbox-ellipses-outline" role="img" aria-label="chatbox ellipses outline"></ion-icon> </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}