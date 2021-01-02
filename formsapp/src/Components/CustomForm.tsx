import React, { Component } from "react";
import "./CustomForm.scss";
import Select from "react-select";
import axios from "axios";

interface ICountry {
  name: string;
}

interface IFormObj {
  name: string;
}

class CustomForm extends Component<any, any> {
  constructor(props: any) {
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
        zipCode: "",
      },
      formErrors: {
        name: null,
        email: null,
        mobile: null,
        password: null,
        confirmPassword: null,
        gender: null,
        language: null,
        country: null,
      },
      countryList: Array<string>(),
    };
  }

  validateField = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // var formAux = { ...this.state.form };
    // var formErr = {...this.state.formErrors};
    var stateAux = {...this.state};
    stateAux.form.name = evt.target.value;
    // formAux.name = evt.target.value;
 
  if(evt.currentTarget.value){
    
  }else{
    stateAux.formErrors.name= "Please enter a name";
    
  }
  this.setState({ stateAux });

  }

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
                  onChange={this.validateField}
                />
                {formErrors.name && (
                  <span className="err">{formErrors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Email:<span className="asterisk">*</span>
                </label>
                <input className="form-control" type="text" name="email" />
              </div>
              <div className="form-group">
                <label>
                  Password:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </div>
              <div className="form-group">
                <label>
                  Confirm Password:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                />
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
                  Mobile:<span className="asterisk">*</span>
                </label>
                <input className="form-control" type="text" name="mobile" />
              </div>
              <div className="form-group">
                <label className="mr-3">
                  Gender:<span className="asterisk">*</span>
                </label>
                <div className="form-control border-0 p-0 pt-1">
                  <label className="mr-2">
                    <input type="radio" name="gender" value="male" /> Male
                  </label>
                  <label>
                    <input type="radio" name="gender" value="female" /> Female
                  </label>
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
            <input type="button" className="btn btn-primary" value="Submit"  />
          </div>
        </div>
      </>
    );
  }
}

export default CustomForm;
