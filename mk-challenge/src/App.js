import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      
      nameHelperText: "",
      emailHelperText: "",
      messageHelperText: ""
    }

  };


  handleChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    const emailPattern =  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;

    const nameValid = this.state.name.length > 0;
    const emailValid = emailPattern.test(this.state.email);
    const messageValid = this.state.message.length > 0 
    const valid = nameValid && emailValid && messageValid;

    this.setState({ 
      nameHelperText: nameValid ? '' : 'Enter a name', 
      emailHelperText: emailValid ? '' : "Enter a valid email address", 
      messageHelperText: messageValid ? '' : 'Enter a message'
    });
    
    if (valid) {
      fetch('https://umjucz9qa5.execute-api.us-west-2.amazonaws.com/dev/sendEmail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          message: this.state.message
        })
      });

      console.log('Name: ' + this.state.name);
      console.log('Email: ' + this.state.email);
      console.log('Message: ' + this.state.message);
}

    event.preventDefault();
  }


  render() {

    const { classes } = this.props;

    return (
      <div className="App">

        <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit} onChange={this.handleChange} variant="outlined">
          
          <TextField
            id="name"
            name="name" label="Name"
            type="name"
            autoComplete="name" 
            error={this.state.nameHelperText !== ""}
            helperText={this.state.nameHelperText}
          />
          <TextField 
          id="email" 
          name="email" 
          label="Email" 
          autoComplete="email"
          error={this.state.emailHelperText !== ""}
          helperText={this.state.emailHelperText} 
          /> <br/>

          <TextField 
          id="message" 
          name="message" 
          label="Message" 
          type="text" 
          variant="outlined" 
          placeholder="Enter your message" 
          multiline style={{ width: "470px" }}
          error={this.state.messageHelperText !== ""}
          helperText={this.state.messageHelperText} 
          /> <br/>
          
          <Button variant="contained" color="primary" type="submit"> Submit </Button>
        </form>
      </div>
    );
  }

}

export default withStyles(useStyles)(App);
