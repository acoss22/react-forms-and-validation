import React, { Component } from "react";
import "./CustomForm.scss";



class CustomForm extends Component<any, any> {

  constructor(props: any){
    super(props);
   
    this.state = {
    form: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      gender: null,
      language: [],
      country: null,
      zipCode: ""
    },
    formErrors: {
      name: null,
      email: null,
      mobile: null,
      password: null,
      confirmPassword: null,
      gender: null,
      language: null,
      country: null
    }
  };
  }
  
  render() {
    return (
      <>
        <div className="signup-box"></div>
      </>
    );
  }
}

export default CustomForm;
