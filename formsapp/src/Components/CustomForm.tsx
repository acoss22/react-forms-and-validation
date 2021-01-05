import React, { Component } from "react";
import "./CustomForm.scss";
import Select from "react-select";
import axios from "axios";
import { stat } from "fs";

interface ICountry {
  name: string;
}
interface ILanguageCountry {
  languages: Array<ILanguage>;
 }
 
 interface ILanguage {
  name: string;
 }

 interface countrySelection{
  value: string;
  label:string;
 }

 interface languageSelection{
  value: string;
  label:string;
 }
 
 type HtmlEvent = React.ChangeEvent<HTMLSelectElement>;
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
        description: ""
      
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
        zipCode: null,
        description: ""
      },
      countryList: Array<string>(),
      languageList: Array<ILanguage>(),
    
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

  validateDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    var stateAux = { ...this.state };
    stateAux.form.description = evt.target.value;

    if (evt.currentTarget.value) {
      stateAux.formErrors.description = "";
    } else {
      stateAux.formErrors.description = "Please enter a description";
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
    if (stateAux.form.confirmPassword === stateAux.form.password) {
    } else {
      stateAux.formErrors.confirmPassword =
        "Please make sure your passwords match.";
    }
    this.setState({ stateAux });
  };

  componentDidMount() {
    this.getCountries();
    this.getSpokenLanguages();
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

  getSpokenLanguages() {
    
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
    
      const languagesAux: Array<ILanguageCountry> = res.data;
      const spokenLanguages: Array<string> = [];

      languagesAux.forEach(country => {
        country.languages.forEach(lang => {
        
       if(spokenLanguages.filter(s => s == lang.name).length == 0) {
              spokenLanguages.push(lang.name);
            }
     });
    });
      spokenLanguages.sort();
      this.setState({ languageList: spokenLanguages });
    });
  }

  handleCountryChange(e : countrySelection){
    var stateAux = { ...this.state };
    let selectedCountry = e.value;
    stateAux.form.country = selectedCountry;
    console.log(selectedCountry);
    this.setState({ stateAux });
    this.validateCountrySelection();
  }

  handleLanguageChange(e: languageSelection){
    var stateAux = { ...this.state };
    let selectedLanguage = e.value;
    console.log(selectedLanguage);
    stateAux.form.language = selectedLanguage;
    this.setState({ stateAux });
    this.validateLanguageSelection();
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
    stateAux.form.gender = evt.target.value;

    this.validateGender();
  };

  validateGender = () => {
    var stateAux = { ...this.state };

    if (stateAux.form.gender) {
      stateAux.formErrors.gender = "";
    } else {
      stateAux.formErrors.gender = "Please select a gender";
    }

    this.setState({ stateAux });
  };

  validateCountrySelection() {
    var stateAux = { ...this.state };
    stateAux.formErrors.country="";
    if (stateAux.form.country) {
    } else {
      stateAux.formErrors.country = "Please select a country!";
    }
    this.setState({ stateAux });
  };

  validateLanguageSelection() {
    var stateAux = { ...this.state };
    stateAux.formErrors.language="";
  
 
    if (stateAux.form.language.length > 0) {
      console.log("has value!");
    } else {
      
      console.log("NO value!");
    
      stateAux.formErrors.language = "Please select a language!";
    }
    this.setState({ stateAux });
  };

  validateZipCode = (evt: React.ChangeEvent<HTMLInputElement>) => {
    /* For now validation is for US Zip codes 
    /(^\d{5}$)|(^\d{5}-\d{4}$)/
    */
    var stateAux = { ...this.state };
    const isValidZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    stateAux.form.zipCode = evt.target.value;
    stateAux.formErrors.zipCode = "";

    if (isValidZipCode.test(evt.target.value)) {
    } else {
      stateAux.formErrors.zipCode = "Please enter a valid zip code! Example: 22313"; 
    }
    this.setState({ stateAux });
  };

  requiredFields(){
    var stateAux = { ...this.state };
    
    if(!stateAux.form.name){
      stateAux.formErrors.name = "Please enter a name";
    }
    if(!stateAux.form.password && !stateAux.form.confirmPassword){
      stateAux.formErrors.password = "Please enter a password";
      stateAux.formErrors.confirmPassword =  "Please enter a password";
    }
    if(!stateAux.form.email){
      stateAux.formErrors.email = "Please enter an email";
    }
    if(!stateAux.form.phonenumber){
      stateAux.formErrors.phonenumber = "Please enter a phone number";
    }
    if(!stateAux.formErrors.zipCode){
      stateAux.formErrors.zipCode = "Please enter a zip code";
    }
    if(!stateAux.formErrors.description){
      stateAux.formErrors.description = "Please enter a description";
    }
 
  }

  submit = () => {
    this.validateGender();
    this.validateCountrySelection();
    this.validateLanguageSelection();
    this.requiredFields();
    
  };

    loadOptions(){
      
    }

  render() {
    const { form, formErrors } = this.state;
    let countryOptions = this.state.countryList.map(function (
      countryName: string
    ) {
      return { value: countryName, label: countryName };
    });


    let languageOptions = this.state.languageList.map(function (
      languageName: string
    ) {
      return { value: languageName, label: languageName };
    });

    // console.log("countryOptions " + JSON.stringify(countryOptions));
    // console.log("languageOptions " + JSON.stringify(languageOptions));
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
                  value={this.state.form.name}
                  onChange={this.validateName}
                />
                {formErrors.name && (
                  <span className="err">{this.state.formErrors.name}</span>
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
                  <span className="err">{this.state.formErrors.email}</span>
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
                  value={this.state.form.password}
                  onChange={this.validatePassword}
                />
                {formErrors.password && (
                  <span className="err">{this.state.formErrors.password}</span>
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
                  value={this.state.form.confirmPassword}
                  onChange={this.confirmPassword}
                />
                {this.state.formErrors.confirmPassword && (
                  <span className="err">{this.state.formErrors.confirmPassword}</span>
                )}
              </div>
              <div className="form-group">
                <label className="mr-3">
                  Language:<span className="asterisk">*</span></label>
                  <Select name="language" 
                  options={languageOptions} 
                  value={this.state.form.selectedLanguage} 
                   onChange={(e) => {
                  this.handleLanguageChange({value : e.value, label: e.value })
                }} />
                {this.state.formErrors.language && (
                  <span className="err">{this.state.formErrors.language}</span>
                )}
             
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
                  value={this.state.form.phonenumber}
                  onChange={this.validatePhoneNumber}
                />
                {formErrors.phonenumber && (
                  <span className="err">{this.state.formErrors.phonenumber}</span>
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

                  {this.state.formErrors.gender && (
                    <span
                      style={{ clear: "both", display: "block" }}
                      className="err">
                      {this.state.formErrors.gender}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input className="form-control" type="text" name="zipCode" value={form.zipCode} onChange={this.validateZipCode}/>
                {this.state.formErrors.zipCode && (
                  <span className="err">{this.state.formErrors.zipCode}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Country:<span className="asterisk">*</span>
                </label>
                <Select name="country" 
              
                options={countryOptions} 
                value={this.state.form.selectedCountry}
                onChange={(e) => {
                  this.handleCountryChange({value : e.value, label: e.value })
                }}
                />
                {this.state.formErrors.country && (
                  <span className="err">{this.state.formErrors.country}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Description:<span className="asterisk">*</span>
                </label>
                <textarea className="form-control" 
                style={{resize: "none"}}
                id="exampleFormControlTextarea1" 
                value={this.state.form.description}
                onChange={this.validateDescription}
                rows={2} 
                />
             {this.state.formErrors.description && (
               <span className="err">{this.state.formErrors.description}</span>
             )}
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
