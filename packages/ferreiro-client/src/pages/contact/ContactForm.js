import React, {PureComponent} from 'react'
import isEmpty from 'lodash/isEmpty'
import isBoolean from 'lodash/isBoolean'
import get from 'lodash/get'
import validator from 'email-validator'

import {SOCIAL_NETWORKS, TARGET_BLANK} from '../../components/constants';
import { Link } from '../../components/link/Link';

// Merge initial State and validators...
const VALIDATORS = {
    name: (value) => isEmpty(value),
    email: (value) => isEmpty(value) || !validator.validate(value),
    message: (value) => isEmpty(value),
    subscribed: (value) => !isBoolean(value)
}

const FORM_KEY_VALUE = 'value'
const FORM_KEY_HAS_ERROR = 'hasError'
const FORM_KEY_IS_LOADING = 'isLoading'
const FORM_KEY_SENT_SUCCESS = 'isSentSucess'
const FORM_KEY_SENT_FAILURE = 'isSentError'

const API = '/api/v1/contact?react=true'

const initialFormState = {
    fields: {
        name: {
            [FORM_KEY_HAS_ERROR]: false,
            [FORM_KEY_VALUE]: '',
        },
        email: {
            [FORM_KEY_HAS_ERROR]: false,
            [FORM_KEY_VALUE]: '',
        },
        message: {
            [FORM_KEY_HAS_ERROR]: false,
            [FORM_KEY_VALUE]: '',
        },
        subscribed: {
            [FORM_KEY_HAS_ERROR]: false,
            [FORM_KEY_VALUE]: true,
        },
    },
}

export class ContactForm extends PureComponent {
    state = {
        ...initialFormState,
        [FORM_KEY_IS_LOADING]: false,
        [FORM_KEY_SENT_SUCCESS]: false,
        [FORM_KEY_SENT_FAILURE]: false,
    }

    onSubmit = (event) => {
        event.preventDefault()

        this.validateForm()

        if (this.isInvalidForm()) {
            console.log('...isInvalidadform')
            // Skip...
        } else {
            this.submitForm()
        }
    }

    validateForm = () => {
        const {fields} = this.state

        Object.keys(fields).forEach((fieldKey) => {
            this.validateField(fieldKey)
        })
    }

    validateField = (fieldKey) => {
        const isInvalidField = this.isInvalidField(
            fieldKey,
            this.getFieldValue(fieldKey)
        )

        this.setFieldValue(fieldKey, FORM_KEY_HAS_ERROR, isInvalidField)
    }

    startLoading = () => {
        this.setState({[FORM_KEY_IS_LOADING]: true})
    }

    stopLoading = () => {
        this.setState({[FORM_KEY_IS_LOADING]: false})
    }

    getFieldValue = (fieldKey) => (
        get(this.state, `fields.${fieldKey}.value`)
    )

    getFieldError = (fieldKey) => (
        get(this.state, `fields.${fieldKey}.hasError`)
    )

    setFieldValue = (fieldKey, property, fieldValue) => (
        this.setState((prevState) => ({
            fields: {
                ...prevState.fields,
                [fieldKey]: {
                    ...prevState.fields[fieldKey],
                    ...{[property]: fieldValue}
                }
            }
        }))
    )

    clearSentNotifications = () => {
        this.setState({
            [FORM_KEY_SENT_SUCCESS]: false,
            [FORM_KEY_SENT_FAILURE]: false,
        })
    }

    notifySuccessOnSent = () => {
        this.setState({[FORM_KEY_SENT_SUCCESS]: true})
    }

    notifyErrorOnSent = () => {
        this.setState({[FORM_KEY_SENT_FAILURE]: true})
    }

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

        this.startLoading()
        this.clearSentNotifications()

        return fetch(API, options)
            .then((response) => response.json())
            .then((body) => {
                if (body.error) {
                    return this.notifyErrorOnSent(body.message)
                }

                this.notifySuccessOnSent()
                this.resetForm()
            })
            .catch((_) => {
                this.notifyErrorOnSent()
            })
            .finally(() => this.stopLoading())
    }

    resetForm = () => {
        this.setState({
            ...initialFormState
        })
    }

    handleInputBlur = (event) => {
        this.isInvalidForm()
    }

    handleInputChange = (event) => {
        const fieldKey = event.target.name;
        const fieldValue = event.target.value;

        this.setFieldValue(fieldKey, FORM_KEY_VALUE, fieldValue)
    }

    handleOnBlur = (event) => {
        const fieldKey = event.target.name;
        const fieldValue = event.target.value;

        const isInvalidField = this.isInvalidField(fieldKey, fieldValue)

        this.setFieldValue(fieldKey, FORM_KEY_VALUE, fieldValue)
        this.setFieldValue(fieldKey, FORM_KEY_HAS_ERROR, isInvalidField)
    }

    isInvalidField = (fieldKey, fieldValue) => {
        if (VALIDATORS[fieldKey]) {
            return VALIDATORS[fieldKey](fieldValue)
        }

        // TODO: We could also throw an error. Validator does not exist...
        return true
    }

    isInvalidForm = () => {
        const fieldsKeys = Object.keys(this.state.fields)
        const isInvalidForm = fieldsKeys.reduce((accum, nextFieldKey) => (
            accum || this.isInvalidField(nextFieldKey, this.getFieldValue(nextFieldKey))
        ), false)

        return isInvalidForm
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
            <label
                className="contact_form_fieldset"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
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
                placeholder: 'Write your message here :)',
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
        const {
            isLoading,
            fields,
            [FORM_KEY_SENT_FAILURE]: hasSentFailure,
            [FORM_KEY_SENT_SUCCESS]: hasSentSucess,
        } = this.state

        console.group('render()')
        console.log('hasSentFailure', hasSentFailure)
        console.log('hasSentSucess', hasSentSucess)
        console.groupEnd()

        return (
            <div className="contact">
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

                        {hasSentFailure && (
                            <p>Failure on sent... Try again or reach out to me directly.</p>
                        )}
                        
                        {hasSentSucess && (
                            <div
                                className="contact_form_result contact_form_success"
                                style={{display: 'block'}}
                            >
                                <h2>Thank you!</h2>
                                <p>Your message has been sent. I'll send you a reply asap.</p>
                                <p>In the meantime, let's also connect!</p>

                                {SOCIAL_NETWORKS.map((social) => (
                                    <Link
                                        url={social.url}
                                        target={TARGET_BLANK}
                                        key={social.url}
                                    >
                                        <span className={`social ${social.icon}`} />
                                    </Link>
                                ))}
                            </div>
                        )}
                        
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