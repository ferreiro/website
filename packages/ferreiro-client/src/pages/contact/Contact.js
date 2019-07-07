import React, {PureComponent} from 'react'

import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'

const {
    title,
    subtitle,
} = content.contact

export class Contact extends PureComponent {
    render() {
        const contentHeader = (
            <ContentHeader
                title={title}
                subtitle={subtitle}
            />
        )

        const header = <p>Header</p>
        const content = (
            <div>
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
                            <form
                                action="/contact/send"
                                autoComplete="off"
                                className="contact_form"
                                id="contactform"
                                method="post"
                            >
                                <input
                                    value="/api/v1/contact"
                                    type="hidden"
                                    id="contactFormEndpoint"
                                />
                                
                                <fieldset className="contact_form_fieldset">
                                    <p id="wrongName" className="wrong" />
                                    <span className="icon ion-alert-circled" />
                                    Error: Your name can not be blank
                                    <input
                                        className="input_not_blank contact_form_input"
                                        type="name"
                                        id="the_name"
                                        name="__name"
                                        placeholder='What is your name?'
                                    />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )

        return (
            <PageLayout
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={header}
                    isHeaderFullWidth={true}
                    panel={null}
                    contentHeader={contentHeader}
                    content={content}
                />
            </PageLayout>
        )
    }
}

        

// fieldset.contact_form_fieldset
// p.wrong#wrongEmail
// span.icon.ion-alert-circled
// | Error: The email you introduced is not valid. Try again.
// input.input_email(type="name", id="email", name="__email", placeholder= content.form.email || 'And your email?').contact_form_input

// fieldset.contact_form_fieldset(style="margin-bottom: 0;")
// p.wrong#wrongMessage
// span.icon.ion-alert-circled
// | Error: Hey! Please, fill some text here ;).
// textarea.input_not_blank(type="name", style="margin-bottom: 0;", id="message", name="__text", placeholder= content.form.message || 'Write your message').contact_form_input.contact_form_textarea

// fieldset.contact_form_fieldset(style="margin-bottom: 0;")
// .contact_form_newsletter
// span.contact_form_newsletter_check
//     .mk-trc(data-style="check")
//     input(id="checkbox1.1", class="newsletter", type="checkbox", name="__subscribed", value="Subscribed", checked)
//     label(for="checkbox1.1")
//         i
// span.contact_form_newsletter_text #{content.form.newsletter || 'Subscribe to updates from Jorge'}

// .contact_form_result.contact_form_failure
// p Sorry. Your message couldn't been sent.<br /> Try again or <u><a class="openModalBox">contact me directly</a></u>

// fieldset.contact_form_fieldset.contact_fieldset_nomargin
// input(type="submit", value= content.sendButton || 'Send message').button.send.send_margin.contact_form_submit#formSendButton