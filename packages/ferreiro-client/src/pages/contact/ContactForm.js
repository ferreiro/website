import React, {PureComponent} from 'react'
import isEmpty from 'lodash/isEmpty'
import isBoolean from 'lodash/isBoolean'
import get from 'lodash/get'
import merge from 'lodash/merge'
import validator from 'email-validator'

// Merge initial State and validators...
const VALIDATORS = {
    name: (value) => isEmpty(value),
    email: (value) => isEmpty(value) || validator.validate(value),
    message: (value) => isEmpty(value),
    subscribed: (value) => !isBoolean(value)
}

const API = '/api/v1/contact'

const initialState = {
    fields: {
        name: {
            hasError: false,
            value: '',
        },
        email: {
            hasError: false,
            value: '',
        },
        message: {
            hasError: false,
            value: '',
        },
        subscribed: {
            hasError: false,
            value: true,
        },
    },
    isLoading: false,
    isSentSucess: false,
    isSentError: false,
}

export class ContactForm extends PureComponent {
    state = initialState

    onSubmit = (event) => {
        event.preventDefault()

        this.validateForm()

        if (this.isValidForm()) {
            this.submitForm()
                .finally(() => this.resetForm())
        }
    }

    validateForm = () => {

    }

    startLoading = () => {
        this.setState({isLoading: true})
    }

    stopLoading = () => {
        this.setState({isLoading: false})
    }

    getFieldValue = (fieldKey) => (
        get(this.state, `fields.${fieldKey}.value`)
    )

    getFieldError = (fieldKey) => (
        get(this.state, `fields.${fieldKey}.hasError`)
    )

    submitForm = () => {
        const body = {
            name: this.getFieldValue('name'),
            email: this.getFieldValue('email'),
            msg: this.getFieldValue('message'),
            subscribed: this.getFieldValue('subscribed'),
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        this.startLoading();
        return fetch(API, options)
            .then((response) => {
                const {error, message} = response

                if (error == true) {
                    alert('Error sending the form')
                }
                
                console.log(response)
                this.stopLoading()
            })
            .catch(error => {
                console.log(error)
                this.stopLoading()
            })
    }

    resetForm = () => {
        this.setState(initialState)
    }

    handleInputBlur = (event) => {
        this.isValidForm()
    }

    handleInputChange = (event) => {
        const fieldKey = event.target.name;
        const fieldValue = event.target.value;

        const updatedState = this.state
        updatedState.fields[fieldKey].value = fieldValue

        this.setState(updatedState)
    }

    handleOnBlur = (event) => {
        const fieldKey = event.target.name;
        const fieldValue = event.target.value;

        const updatedState = this.state
        updatedState.fields[fieldKey].value = fieldValue
        updatedState.fields[fieldKey].hasError = this.isInvalidField(fieldKey)

        this.setState(updatedState)
    }

    isInvalidField = (fieldKey) => {
        const fieldValue = this.getFieldValue(fieldKey)

        if (VALIDATORS[fieldKey]) {
            return VALIDATORS[fieldKey](fieldValue)
        }

        // TODO: We could also throw an error. Validator does not exist...
        return true
    }

    isValidForm = () => {
        const fieldsKeys = Object.keys(this.state.fields)
        const isValidForm = fieldsKeys.reduce((accum, nextFieldKey) => (
            accum && this.isInvalidField(nextFieldKey)
        ), true)

        return isValidForm
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
        hasError,
    }) => {
        return (
            <label className="contact_form_fieldset">
                {hasError && this.renderError(error)}

                <input
                    name={name}
                    value={value}
                    className={`contact_form_input ${hasError && 'wrongInput'}`}
                    type="text"
                    placeholder={placeholder}
                    onChange={this.handleInputChange}
                    onBlur={this.handleOnBlur}
                />
            </label>
        )
    }

    renderTextareaField = ({
        error,
        name,
        value,
        placeholder,
        hasError,
    }) => (
        <fieldset className="contact_form_fieldset">
            {this.getFieldError('message') && this.renderError('Error: Hey! Please, fill some text here ;).')}

            <input
                name="message"
                value={this.getFieldValue(name)}
                onChange={this.handleInputChange}
                className={`contact_form_input contact_form_textarea ${hasError && 'wrongInput'}`}
                type="name"
                placeholder={placeholder}
                onBlur={this.handleOnBlur}
                style={{
                    marginBottom: 0,
                }}
            />
        </fieldset>
    )

    renderForm = ({fields}) => (
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
                value: this.getFieldValue('name'),
                placeholder: 'What is your name?',
                hasError: this.getFieldError('name'), 
            })}

            {this.renderInputField({
                error: 'The email you introduced is not valid. Try again.',
                name: 'email',
                value: this.getFieldValue('email'),
                placeholder: 'And your email?',
                hasError: this.getFieldError('email'),
            })}

            {this.renderTextareaField({
                error: 'Foo',
                name: 'message',
                value: this.getFieldValue('message'),
                placeholder: 'Foo placeholder',
                hasError: this.getFieldError('message'),
            })}
            
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
        const {isLoading, fields} = this.state

        console.log('isLoading', isLoading);
        console.log('this.state', this.state);

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
                        
                        {isLoading ? (
                            <center>
                                <img
                                    className="loaderIcon"
                                    src="/images/loading.gif"
                                    width="30px"
                                />
                            </center>
                        ) : (
                            this.renderForm({fields})
                        )}
                    </div>
                </div>
            </div>
        )
    }
}