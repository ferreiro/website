import React, {PureComponent} from 'react'
import isEmpty from 'lodash/isEmpty'
import validator from 'email-validator'


const VALIDATORS = {
    name: (text) => !isEmpty(text),
    email: (text) => !isEmpty(text) && validator.validate(text),
    message: (text) => !isEmpty(text),
}


const API = '/api/v1/contact'

const initialState = {
    name: '',
    email: '',
    message: '',
    subscribed: true,
    isValidName: true,
    isValidEmail: true,
    isValidMessage: true,
}

export class ContactForm extends PureComponent {
    state = initialState

    onSubmit = (event) => {
        event.preventDefault()
        
        const isValidForm = this.validateForm()

        if (isValidForm) {
            this.submitForm()
            this.resetForm()
        }
    }

    submitForm = () => {
        const body = {
            __name: this.state.name,
            __email: this.state.email,
            __msg: this.state.message,
            __subscribed: this.state.subscribed,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // TODO: Set loader
        fetch(API, options)
            .then((response) => {
                const {error, message} = response

                if (error == true) {
                    alert('Error sending the form')
                }
                
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    resetForm = () => {
        this.setState({initialState})
    }

    handleInputBlur = (event) => {
        this.validateForm()
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    capitalize = (string) => (
        string.charAt(0).toUpperCase() + string.slice(1)
    )

    handleOnBlur = (event) => {
        const {
            name,
            value,
        } = event.target;

        this.setState({
            [`isValid${this.capitalize(name)}`]: this.isValidField(name, value)
        })
    }

    isValidField = (name, value) => (
        VALIDATORS[name](value)
    )

    validateForm = () => {
        const isValidName = this.isValidField('name', this.state.name)
        const isValidEmail = this.isValidField('email', this.state.email)
        const isValidMessage = this.isValidField('message', this.state.message)

        this.setState({
            isValidName,
            isValidEmail,
            isValidMessage,
        })

        return isValidEmail ||
            isValidEmail ||
            isValidMessage
    }

    renderError = (error) => (
        <p className="wrong" style={{display: 'block'}}>
            <span className="icon ion-alert-circled" />
            Error: {error}
        </p>
    )

    renderInputField = ({
        error,
        name,
        value,
        placeholder,
        isValid,
    }) => {
        return (
            <label className="contact_form_fieldset">
                {!isValid && this.renderError(error)}

                <input
                    name={name}
                    value={value}
                    className={`contact_form_input ${!isValid && 'wrongInput'}`}
                    type="text"
                    placeholder={placeholder}
                    onChange={this.handleInputChange}
                    onBlur={this.handleOnBlur}
                />
            </label>
        )
    }

    renderForm = ({
        name,
        email,
        message,
        isValidName,
        isValidEmail,
        isValidMessage,
    }) => (
        <form
            onSubmit={this.onSubmit}
            action="/contact/send"
            autoComplete="off"
            className="contact_form"
            method="post"
        >
            {this.renderInputField({
                error: 'Your name can not be blank',
                name: 'name',
                value: name,
                placeholder: 'What is your name?',
                isValid: isValidName, 
            })}

            {this.renderInputField({
                error: 'The email you introduced is not valid. Try again.',
                name: 'email',
                value: email,
                placeholder: 'And your email?',
                isValid: isValidEmail, 
            })}

            <fieldset className="contact_form_fieldset">
                {!isValidMessage && this.renderError('Error: Hey! Please, fill some text here ;).')}

                <input
                    name="message"
                    value={message}
                    onChange={this.handleInputChange}
                    className={`contact_form_input contact_form_textarea ${!isValidMessage && 'wrongInput'}`}
                    type="name"
                    placeholder='Write your message'
                    onBlur={this.handleOnBlur}
                    style={{
                        marginBottom: 0,
                    }}
                />
            </fieldset>
            
            <fieldset className="contact_form_fieldset">
                <div className="contact_form_newsletter">
                    <span className="contact_form_newsletter_check">
                        <div className="mk-trc" data-style="check">
                            <input
                                className="newsletter"
                                id="checkbox1.1"
                                type="checkbox"
                                name="__subscribed"
                                value="Subscribed"
                                defaultChecked
                            />
                            <label htmlFor="checkbox1.1">
                                <i></i>
                            </label>
                        </div>
                    </span>
                    <span className="contact_form_newsletter_text">
                        Subscribe to updates from Jorge
                    </span>
                </div>
            </fieldset>

            <fieldset className="contact_form_fieldset contact_fieldset_nomargin">
                <input
                    className="button send send_margin contact_form_submit"
                    type="submit"
                    value="Send message"
                    onClick={this.onSubmit}
                />
            </fieldset>
        </form>
    )

    render() {


        return (
            <div className="contact animate">
                <div className="contact_form_wrapper">
                    <div className="contact_form_container">
                        <div className="contact_form_result contact_form_success">
                            <h2>Thank you!</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: 'Your message has been sent.<br />I\'ll send you a reply asap.Would you like to send me another? <br /><a href="/contact">Write new message</a>'
                                }}
                            />
                        </div>
                        <center>
                            <img
                                id="contactLoader"
                                className="loaderIcon"
                                src="/images/loading.gif"
                                width="30px"
                                style={{display: 'none'}}
                            />
                        </center>

                        {this.renderForm(this.state)}
                </div>
                </div>
            </div>
        )
    }
}