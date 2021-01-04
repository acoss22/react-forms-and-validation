"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
require("./CustomForm.scss");
var react_select_1 = require("react-select");
var axios_1 = require("axios");
var CustomForm = /** @class */ (function (_super) {
    __extends(CustomForm, _super);
    function CustomForm(props) {
        var _this = _super.call(this, props) || this;
        _this.validateName = function (evt) {
            var stateAux = __assign({}, _this.state);
            stateAux.form.name = evt.target.value;
            if (evt.currentTarget.value) {
                stateAux.formErrors.name = "";
            }
            else {
                stateAux.formErrors.name = "Please enter a name";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.validateEmail = function (evt) {
            var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            var stateAux = __assign({}, _this.state);
            stateAux.form.email = evt.target.value;
            console.log(regexp.test(evt.currentTarget.value));
            if (regexp.test(evt.currentTarget.value)) {
                stateAux.formErrors.email = "";
            }
            else {
                stateAux.formErrors.email = "Please enter a valid email";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.validatePassword = function (evt) {
            var stateAux = __assign({}, _this.state);
            var currentPass = evt.target.value;
            stateAux.form.password = currentPass;
            stateAux.formErrors.password = "";
            if (currentPass.length > 7 && currentPass.length < 31) {
            }
            else {
                stateAux.formErrors.password +=
                    " Your password must be between 8 and 30 characters ";
            }
            if (_this.hasAtLeastOneLetter(currentPass) &&
                _this.hasLowerCase(currentPass)) {
            }
            else {
                stateAux.formErrors.password +=
                    " must contain at least one lowercase letter ";
            }
            if (_this.hasAtLeastOneLetter(currentPass) &&
                _this.hasUpperCase(currentPass)) {
            }
            else {
                stateAux.formErrors.password +=
                    " must contain at least one uppercase, or capital letter ";
            }
            if (_this.hasAtLeastOneDigit(currentPass)) {
            }
            else {
                stateAux.formErrors.password += " must contain one digit ";
            }
            if (_this.hasAtLeastOneSpecialCharacter(currentPass)) {
            }
            else {
                stateAux.formErrors.password += "  must contain a special character ";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.confirmPassword = function (evt) {
            var stateAux = __assign({}, _this.state);
            var currentConfirmPassword = evt.target.value;
            stateAux.form.confirmPassword = currentConfirmPassword;
            stateAux.formErrors.confirmPassword = "";
            if (stateAux.form.confirmPassword === stateAux.form.password) {
            }
            else {
                stateAux.formErrors.confirmPassword =
                    "Please make sure your passwords match.";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.validatePhoneNumber = function (evt) {
            var stateAux = __assign({}, _this.state);
            stateAux.form.phonenumber = evt.target.value;
            stateAux.formErrors.phonenumber = "";
            if (_this.isValidPhoneNumber(stateAux.form.phonenumber)) {
            }
            else {
                stateAux.formErrors.phonenumber = "Please enter a valid phone number.";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.setGender = function (evt) {
            var stateAux = __assign({}, _this.state);
            stateAux.form.gender = evt.target.value;
            _this.validateGender();
        };
        _this.validateGender = function () {
            var stateAux = __assign({}, _this.state);
            if (stateAux.form.gender) {
                stateAux.formErrors.gender = "";
            }
            else {
                stateAux.formErrors.gender = "Please select a gender";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.validateZipCode = function (evt) {
            /* For now validation is for US Zip codes
            /(^\d{5}$)|(^\d{5}-\d{4}$)/
            */
            var stateAux = __assign({}, _this.state);
            var isValidZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            stateAux.form.zipCode = evt.target.value;
            stateAux.formErrors.zipCode = "";
            if (isValidZipCode.test(evt.target.value)) {
            }
            else {
                stateAux.formErrors.zipCode = "Please enter a valid zip code! Example: 22313";
            }
            _this.setState({ stateAux: stateAux });
        };
        _this.submit = function () {
            _this.validateGender();
            _this.validateCountrySelection();
            _this.validateLanguageSelection();
            _this.requiredFields();
        };
        _this.state = {
            form: {
                name: "",
                email: "",
                phonenumber: "",
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
                phonenumber: null,
                password: null,
                confirmPassword: null,
                gender: null,
                language: null,
                country: null,
                zipCode: null
            },
            countryList: Array(),
            languageList: Array()
        };
        return _this;
    }
    CustomForm.prototype.hasLowerCase = function (str) {
        return /[a-z]/.test(str);
    };
    CustomForm.prototype.hasUpperCase = function (str) {
        return /[A-Z]/.test(str);
    };
    CustomForm.prototype.hasAtLeastOneDigit = function (str) {
        return /\d/.test(str);
    };
    CustomForm.prototype.hasAtLeastOneLetter = function (str) {
        return /[a-zA-Z]/.test(str);
    };
    CustomForm.prototype.hasAtLeastOneSpecialCharacter = function (str) {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return format.test(str);
    };
    CustomForm.prototype.componentDidMount = function () {
        this.getCountries();
        this.getSpokenLanguages();
    };
    CustomForm.prototype.getCountries = function () {
        var _this = this;
        axios_1["default"].get("https://restcountries.eu/rest/v2/all").then(function (res) {
            var countries = res.data;
            var countryNames = [];
            countries.forEach(function (countryItem) {
                countryNames.push(countryItem["name"]);
            });
            _this.setState({ countryList: countryNames });
        });
    };
    CustomForm.prototype.getSpokenLanguages = function () {
        var _this = this;
        axios_1["default"].get("https://restcountries.eu/rest/v2/all").then(function (res) {
            var languagesAux = res.data;
            var spokenLanguages = [];
            languagesAux.forEach(function (country) {
                country.languages.forEach(function (lang) {
                    if (spokenLanguages.filter(function (s) { return s == lang.name; }).length == 0) {
                        spokenLanguages.push(lang.name);
                    }
                });
            });
            spokenLanguages.sort();
            _this.setState({ languageList: spokenLanguages });
        });
    };
    CustomForm.prototype.handleCountryChange = function (e) {
        var formAux = __assign({}, this.state);
        console.log(e);
        var currentCountry = e;
        console.log(currentCountry);
    };
    CustomForm.prototype.handleLanguageChange = function (e) {
        var formAux = __assign({}, this.state);
        formAux.form.language = e.target.value;
        this.setState({ formAux: formAux });
        this.setState({ form: { language: e.target.value } });
    };
    CustomForm.prototype.isValidPhoneNumber = function (inputtxt) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
        if (phoneno.test(inputtxt)) {
            return true;
        }
        else {
            return false;
        }
    };
    CustomForm.prototype.validateCountrySelection = function () {
        var stateAux = __assign({}, this.state);
        if (stateAux.form.country) {
        }
        else {
            stateAux.formErrors.country = "Please select a country!";
        }
        this.setState({ stateAux: stateAux });
    };
    ;
    CustomForm.prototype.validateLanguageSelection = function () {
        var stateAux = __assign({}, this.state);
        if (stateAux.form.language) {
        }
        else {
            stateAux.formErrors.language = "Please select a language!";
        }
        this.setState({ stateAux: stateAux });
    };
    ;
    CustomForm.prototype.requiredFields = function () {
        var stateAux = __assign({}, this.state);
        if (!stateAux.form.name) {
            stateAux.formErrors.name = "Please enter a name";
        }
        if (!stateAux.form.password && !stateAux.form.confirmPassword) {
            stateAux.formErrors.password = "Please enter a password";
            stateAux.formErrors.confirmPassword = "Please enter a password";
        }
        if (!stateAux.form.email) {
            stateAux.formErrors.email = "Please enter an email";
        }
        if (!stateAux.form.phonenumber) {
            stateAux.formErrors.phonenumber = "Please enter a phone number";
        }
        if (!stateAux.formErrors.zipCode) {
            stateAux.formErrors.zipCode = "Please enter a zip code";
        }
    };
    CustomForm.prototype.render = function () {
        var _this = this;
        var _a = this.state, form = _a.form, formErrors = _a.formErrors;
        var countryOptions = this.state.countryList.map(function (countryName) {
            return { value: countryName, label: countryName };
        });
        var languageOptions = this.state.languageList.map(function (languageName) {
            return { value: languageName, label: languageName };
        });
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "signup-box" },
                react_1["default"].createElement("h4", null, "Example Form"),
                react_1["default"].createElement("div", { className: "row" },
                    react_1["default"].createElement("div", { className: "col-md-6" },
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null,
                                "Name:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement("input", { className: "form-control", type: "text", name: "name", value: form.name, onChange: this.validateName }),
                            formErrors.name && (react_1["default"].createElement("span", { className: "err" }, formErrors.name))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null,
                                "Email:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement("input", { className: "form-control", type: "text", name: "email", value: form.email, onChange: this.validateEmail }),
                            formErrors.email && (react_1["default"].createElement("span", { className: "err" }, formErrors.email))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null,
                                "Password:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement("input", { className: "form-control", type: "password", name: "password", value: form.password, onChange: this.validatePassword }),
                            formErrors.password && (react_1["default"].createElement("span", { className: "err" }, formErrors.password))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null,
                                "Confirm Password:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement("input", { className: "form-control", type: "password", name: "confirmPassword", value: form.confirmPassword, onChange: this.confirmPassword }),
                            formErrors.confirmPassword && (react_1["default"].createElement("span", { className: "err" }, formErrors.confirmPassword))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", { className: "mr-3" },
                                "Language:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement(react_select_1["default"], { name: "language", options: languageOptions, value: form.language, onChange: function (e) {
                                    return _this.handleLanguageChange({
                                        target: {
                                            name: "language",
                                            value: e.value
                                        }
                                    });
                                } }),
                            formErrors.language && (react_1["default"].createElement("span", { className: "err" }, formErrors.language)),
                            react_1["default"].createElement("div", { className: "form-control border-0 p-0 pt-1" }))),
                    react_1["default"].createElement("div", { className: "col-md-6" },
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null,
                                "Phone number:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement("input", { className: "form-control", type: "number", name: "phonenumber", value: form.phonenumber, onChange: this.validatePhoneNumber }),
                            formErrors.phonenumber && (react_1["default"].createElement("span", { className: "err" }, formErrors.phonenumber))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", { className: "mr-3" },
                                "Gender:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement("div", { className: "form-control border-0 p-0 pt-1" },
                                react_1["default"].createElement("label", { className: "mr-2" },
                                    react_1["default"].createElement("input", { type: "radio", name: "gender", value: "male", onChange: this.setGender }),
                                    " ",
                                    "Male"),
                                react_1["default"].createElement("label", { className: "mr-2" },
                                    react_1["default"].createElement("input", { type: "radio", name: "gender", value: "female", onChange: this.setGender }),
                                    " ",
                                    "Female"),
                                react_1["default"].createElement("label", { className: "mr-2" },
                                    react_1["default"].createElement("input", { type: "radio", name: "gender", value: "other", onChange: this.setGender }),
                                    " ",
                                    "Other"),
                                formErrors.gender && (react_1["default"].createElement("span", { style: { clear: "both", display: "block" }, className: "err" }, formErrors.gender)))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null, "Zip Code:"),
                            react_1["default"].createElement("input", { className: "form-control", type: "text", name: "zipCode", value: form.zipCode, onChange: this.validateZipCode }),
                            formErrors.zipCode && (react_1["default"].createElement("span", { className: "err" }, formErrors.zipCode))),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", null,
                                "Country:",
                                react_1["default"].createElement("span", { className: "asterisk" }, "*")),
                            react_1["default"].createElement(react_select_1["default"], { name: "country", options: countryOptions, value: form.country, onChange: this.handleCountryChange }),
                            formErrors.country && (react_1["default"].createElement("span", { className: "err" }, formErrors.country))))),
                react_1["default"].createElement("div", { className: "form-group" },
                    react_1["default"].createElement("input", { type: "button", className: "btn btn-primary", value: "Submit", onClick: this.submit })))));
    };
    return CustomForm;
}(react_1.Component));
exports["default"] = CustomForm;
