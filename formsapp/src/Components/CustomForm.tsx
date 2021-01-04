import React, { Component } from "react";
import "./CustomForm.scss";
import Select from "react-select";
import axios from "axios";
import { stat } from "fs";

interface ICountry {
  name: string;
}

class CustomForm extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        name: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
        gender: null,
        language: [],
        country: null,
        zipCode: "",
      },
      formErrors: {
        name: null,
        email: null,
        phonenumber: null,
        password: null,
        confirmPassword: null,
        gender: null,
        language: null,
        country: null,
      },
      countryList: Array<string>(),
    };
  }

  validateName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    var stateAux = { ...this.state };
    stateAux.form.name = evt.target.value;

    if (evt.currentTarget.value) {
      stateAux.formErrors.name = "";
    } else {
      stateAux.formErrors.name = "Please enter a name";
    }
    this.setState({ stateAux });
  };

  validateEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    var stateAux = { ...this.state };
    stateAux.form.email = evt.target.value;

    console.log(regexp.test(evt.currentTarget.value));
    if (regexp.test(evt.currentTarget.value)) {
      stateAux.formErrors.email = "";
    } else {
      stateAux.formErrors.email = "Please enter a valid email";
    }
    this.setState({ stateAux });
  };

  hasLowerCase(str: string) {
    return /[a-z]/.test(str);
  }

  hasUpperCase(str: string) {
    return /[A-Z]/.test(str);
  }

  hasAtLeastOneDigit(str: string) {
    return /\d/.test(str);
  }

  hasAtLeastOneLetter(str: string) {
    return /[a-zA-Z]/.test(str);
  }

  hasAtLeastOneSpecialCharacter(str: string) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(str);
  }

  validatePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    var stateAux = { ...this.state };
    const currentPass = evt.target.value;
    stateAux.form.password = currentPass;

    stateAux.formErrors.password = "";

    if (currentPass.length > 7 && currentPass.length < 31) {
    } else {
      stateAux.formErrors.password +=
        " Your password must be between 8 and 30 characters ";
    }
    if (
      this.hasAtLeastOneLetter(currentPass) &&
      this.hasLowerCase(currentPass)
    ) {
    } else {
      stateAux.formErrors.password +=
        " must contain at least one lowercase letter ";
    }
    if (
      this.hasAtLeastOneLetter(currentPass) &&
      this.hasUpperCase(currentPass)
    ) {
    } else {
      stateAux.formErrors.password +=
        " must contain at least one uppercase, or capital letter ";
    }

    if (this.hasAtLeastOneDigit(currentPass)) {
    } else {
      stateAux.formErrors.password += " must contain one digit ";
    }

    if (this.hasAtLeastOneSpecialCharacter(currentPass)) {
    } else {
      stateAux.formErrors.password += "  must contain a special character ";
    }
    this.setState({ stateAux });
  };

  confirmPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    var stateAux = { ...this.state };
    const currentConfirmPassword = evt.target.value;
    stateAux.form.confirmPassword = currentConfirmPassword;
    stateAux.formErrors.confirmPassword = "";
    if (stateAux.form.confirmPassword == stateAux.form.password) {
    } else {
      stateAux.formErrors.confirmPassword =
        "Please make sure your passwords match.";
    }
    this.setState({ stateAux });
  };

  componentDidMount() {
    this.getCountries();
  }

  getCountries() {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      const countries: ICountry[] = res.data;

      const countryNames: any = [];

      countries.forEach((countryItem) => {
        countryNames.push(countryItem["name"]);
      });

      this.setState({ countryList: countryNames });
    });
  }

  handleCountryChange(e: React.ChangeEvent<HTMLInputElement>) {
    var formAux = { ...this.state.form };
    formAux.country = e.target.value;
    this.setState({ formAux });
    this.setState({ form: { country: e.target.value } });
  }

  isValidPhoneNumber(inputtxt: string) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
    if (phoneno.test(inputtxt)) {
      return true;
    } else {
      return false;
    }
  }

  validatePhoneNumber = (evt: React.ChangeEvent<HTMLInputElement>) => {
    var stateAux = { ...this.state };
    stateAux.form.phonenumber = evt.target.value;
    stateAux.formErrors.phonenumber = "";

    if (this.isValidPhoneNumber(stateAux.form.phonenumber)) {
    } else {
      stateAux.formErrors.phonenumber = "Please enter a valid phone number.";
    }
    this.setState({ stateAux });
  };

  setGender = (evt: React.ChangeEvent<HTMLInputElement>) => {
    var stateAux = { ...this.state };
    stateAux.form.gender= evt.target.value;

    this.validateGender();
  }

  validateGender = () => {
    var stateAux = { ...this.state };
  
    if (stateAux.form.gender) {
      stateAux.formErrors.gender = "";
    } else {
      stateAux.formErrors.gender = "Please select a gender";
    }

    this.setState({ stateAux });
  };

  submit= () => {
    this.validateGender();
  }


  render() {
    const { form, formErrors, countryList } = this.state;
    let countryOptions = this.state.countryList.map(function (
      countryName: string
    ) {
      return { value: countryName, label: countryName };
    });

    return (
      <>
        <div className="signup-box">
          <h4>Example Form</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Name:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={this.validateName}
                />
                {formErrors.name && (
                  <span className="err">{formErrors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Email:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={this.validateEmail}
                />
                {formErrors.email && (
                  <span className="err">{formErrors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Password:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={this.validatePassword}
                />
                {formErrors.password && (
                  <span className="err">{formErrors.password}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Confirm Password:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={this.confirmPassword}
                />
                {formErrors.confirmPassword && (
                  <span className="err">{formErrors.confirmPassword}</span>
                )}
              </div>
              <div className="form-group">
                <label className="mr-3">
                  Language:<span className="asterisk">*</span>
                </label>
                <div className="form-control border-0 p-0 pt-1"></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Phone number:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="phonenumber"
                  value={form.phonenumber}
                  onChange={this.validatePhoneNumber}
                />
                {formErrors.phonenumber && (
                  <span className="err">{formErrors.phonenumber}</span>
                )}
              </div>
              <div className="form-group">
                <label className="mr-3">
                  Gender:<span className="asterisk">*</span>
                </label>
                <div className="form-control border-0 p-0 pt-1">
                  <label className="mr-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                 
                      onChange={this.setGender}
                    />{" "}
                    Male
                  </label>
                  <label className="mr-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                    
                      onChange={this.setGender}
                    />{" "}
                    Female
                  </label>
                  <label className="mr-2">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      
                      onChange={this.setGender}
                    />{" "}
                    Other
                  </label>
               
                  {formErrors.gender && (
                  <span style={{clear: "both", display: "block"}} className="err">{formErrors.gender}</span>
                )}
                </div>
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input className="form-control" type="text" name="zipCode" />
              </div>
              <div className="form-group">
                <label>
                  Country:<span className="asterisk">*</span>
                </label>
                <Select name="country" options={countryOptions} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              type="button"
              className="btn btn-primary"
              value="Submit"
              onClick={this.submit}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CustomForm;
