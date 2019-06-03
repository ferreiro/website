import React from 'react'

import './footer.scss'

export const Footer = () => (
    <footer className="footer" id="footer">
        <div className="footer_content">

            <div className="footer_entry footer_entry_link"><a className="footer_entry__link" href="mailto:jorge@ferreiro.me;" target="_blank"></a>
            <div className="footer_entry__social"><span className="icon ion-ios-contact-outline"></span>
                <p>jorge@ferreiro.me</p>
            </div>
            </div>
            <div className="footer_entry footer_entry_link"><a className="footer_entry__link" href="/newsletter"></a>
            <div className="footer_entry__social"><span className="icon ion-android-mail"></span>
                <p>Newsletter</p>
            </div>
            </div>
            <div className="footer_entry footer_entry_link"><a className="footer_entry__link" href="https://twitter.com/jgferreiro" target="_blank"></a>
            <div className="footer_entry__social"><span className="icon icon-twitter"></span>
                <p>Twitter</p>
            </div>
            </div>
            <div className="footer_entry footer_entry_link"><a className="footer_entry__link" href="https://www.linkedin.com/in/jgferreiro/" target="_blank"></a>
            <div className="footer_entry__social"><span className="icon icon-linkedin"></span>
                <p>Linkedin</p>
            </div>
            </div>
            <div className="footer_entry footer_entry_link"><a className="footer_entry__link" href="https://www.github.com/ferreiro" target="_blank"></a>
            <div className="footer_entry__social"><span className="icon icon-github"></span>
                <p>Github</p>
            </div>
            </div>
            <div className="footer_entry footer_entry_link"><a className="footer_entry__link" href="https://www.instagram.com/jgferreiro/" target="_blank"></a>
            <div className="footer_entry__social"><span className="icon icon-instagram"></span>
                <p>Instagram</p>
            </div>
            </div>
            <div className="footer_separator" style={{marginTop: '1.7em'}}></div>
            <div className="footer_entry footer_credits"><a className="footer__logo" href="/"><img src="/images/logo.jpg" /></a>
            <h2>Designed &amp; Programmed by:</h2>
            <h1>Jorge Ferreiro</h1>
            <h3> &copy; Jorge Ferreiro |<a href="http://github.com/ferreiro/website" target="_blank"> Source code</a></h3>
            </div>

            <p>Newsletter form here!</p>
        </div>
    </footer>
)