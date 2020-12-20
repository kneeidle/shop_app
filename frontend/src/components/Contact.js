import React, { Component } from 'react'
import axios from 'axios'
import "./Contact.css"

export default class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      disabled: false,
      emailSent: null,
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      disable: true
    })

    axios.post('http://localhost:4000/api/email', this.state)
      .then(res => {
        if(res.data.success){
          this.setState({
            disabled: false,
            emailSent: true
          })
        }else{
          this.setState({
            disabled: false,
            emailSent: false
          })
        }
        
      })
      .catch(err => {
        this.setState({
          disabled: false,
          emailSent: false
        })

      })


  }

  render() {
    return (
      <div className="contact__main">
        <h1>Let's Talk</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="div__one">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="div__two">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="div__three">
            <label for="message">Message</label>
            <textarea row="3" id="message" name="message" value={this.state.message} onChange={this.handleChange} />
          </div>
          <button type="submit" disabled={this.state.disabled}>Submit</button>


          {this.state.emailSent === true && <p>Email Sent</p>}
          {this.state.emailSent === false && <p>Email Not Sent</p>}
        </form>
      </div>
    )
  }
}

