import React, { Component } from 'react';
import './App.css';
import Input from './Input.js'
import Header from './Header.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      email: "",
      pass: "",
      message: "",
      errors: {
        username: false,
        email: false,
        pass: false,
      }
    }
  }

  messages = {
    username_incorrect: "UserName Is Required and greater than 4",
    email_incorrect: "Your Email Is Invalid",
    pass_incorrect: "Password Is Required and greater than 4",
  } 

  your = {
    name: "Your UserName:",
    email: "Your Email:",
    pass:  "Your Password:",
    Button: "Valider",
    butt:"Annuler",
  } 

  handleChange = e => {
    const {value, name, type} = e.target;
    if(type === "text" || type === "password" || type === "email") {
      this.setState({ 
        [name]: value  
      });
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const validation = this.formValidation();

    if(validation.correct) {
      this.setState({ 
        username: "",
        email: "",
        pass: "",
        message: "Formulaire Is Valid",
        errors: {
          username: false,
          email: false,
          pass: false,
        }  
      });

    } else {
      this.setState({ 
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
        }    
      });
    }
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let correct = false; //whole form
    const emailString = this.state.email.toString();

    if(this.state.username.length >4) {
      username = true;
    }
    if(this.validateEmail(emailString)) {
      email = true;
    }
    if(this.state.pass.length >4) {
      password = true;
    }
    if(username && email && password) {
      correct = true;
    }
    return ({
      correct, 
      username,
      email,
      password,
      
    });
  }

  validateEmail = email => {
    const regex = /\S+@\S+\.\S+/; //simple regex
    return regex.test(String(email).toLowerCase());
  }

  componentDidUpdate() {
    if(this.state.message !== "") {
      setTimeout(() => this.setState({
        message: ""
      }), 3000)
    }
  }
  handleReset = () => {
    document.querySelectorAll('input');
    this.setState({
      username:"",
      email:"",
      pass:"",
    });
  };

  render() {
    return ( 
      <div className="app">
        <Header/>
        <form  onSubmit={this.handleSubmit} noValidate>
        
          <Input

            yourname={this.your.name}
            type="text"
            id="user"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            error={this.state.errors.username}
            incorrect={this.messages.username_incorrect}
          />

          <Input
            yourname={this.your.email}
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={this.state.errors.email}
            incorrect={this.messages.email_incorrect}
          />

          <Input
            yourname={this.your.pass}
            type="password"
            id="password"
            name="pass"
            value={this.state.pass}
            onChange={this.handleChange}
            error={this.state.errors.pass}
            incorrect={this.messages.pass_incorrect}
          />

          <button type='submit' disabled={!(this.state.pass && this.state.email && this.state.username)}>{this.your.Button}</button>
          <button type='button' onClick={this.handleReset} >{this.your.butt}</button>
        </form>
        

        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
     );
  }
}
 
export default App;