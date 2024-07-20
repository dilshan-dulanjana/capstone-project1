
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import './feedbackform.css'

export default function FeedbackForm() {
    const[model, setModel] = useState(false)

  return (
    <div className='FeedbackForm'>
        <p className="h3">Your Feedback</p>
        <button className='btn0'
         onClick={() => setModel((value) => !value)}>Toogle Feedback</button>
        <div className='feedback'>
            {model &&
            <form>
            <div>
                <input placeholder="Name" name="name" />
            </div>
            <div>
                <input placeholder="Mail"name="emil" />
            </div>
            <div>
            <textarea placeholder="Feedback" name="feedback" rows="5" cols="23"></textarea>
            </div>
            <button className='btn1'>Submit Feedback</button>
        </form>
            }
        </div>
      
    </div>
  )
}
