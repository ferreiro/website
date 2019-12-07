import { PostLayoutType, PostModuleTypes } from "../../../types/Post"

const config = {
    order: [
        "122",
        "233",
        "1231231",
        "4234237",
        "2342341",
        "9842303",
        "9345345"
    ],
    modules: {
        "122": {
            type: PostModuleTypes.image,
            props: {
                alt:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                layout: PostLayoutType.inline,
                src:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/%5Blow%5D%20Codemotion%20Promo%20youtube.jpg"
            }
        },
        "233": {
            type: PostModuleTypes.summary,
            props: {
                value:
                    "Do you wanna know what is a Progressive Web Application and how to create your first PWA with React or other frameworks?"
            }
        },
        "1231231": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "I gave my first webinar for Codemotion couple of weeks ago, and I really enjoyed the experience! ⚡️ In this post I'm sharing you what topics I covered as well as the video in case you wanna learn more about PWAs.\r\n\r\n## What are Progressive Web Apps?\r\n\r\nIn the first part of the video I introduced the main features and funcionalities of a PWA. I also shared examples of top companies in the industry using PWAs (like Twitter, Tinder, Startbucks...). These are the topics I covered:\r\n\r\n- Progressive Enhancement.\r\n- The 10 features of PWAs.\r\n- Trusted Web Applications.\r\n- Progressive Web Apps in the industry.\r\n- Why Progressive Web Apps?"
            }
        },
        "4234237": {
            type: PostModuleTypes.video,
            props: {
                id: "yYjvLUj-Mt8",
                isAutoplay: false,
                layout: "highlight",
                provider: "youtube"
            }
        },
        "2342341": {
            type: PostModuleTypes.text,
            props: {
                value:
                    '## Building your first PWAs\r\n\r\nIn the second half of the presentation we did together our first Progressive Web Application. If you are curious, you can download the source code directly in my Github: ["Progressive Web Apps 101"](https://github.com/ferreiro/pwa-101?utm_source=ferreiro-blog)\r\n\r\nI covered the following topics:\r\n\r\n- Progressive metatags\r\n- Manifest.json\r\n- Intro to service workers\r\n- Offline mode with Cache API\r\n- Caching critical assets.\r\n- Fetch image or placeholder\r\n- Other cool APIs (Local notification, Payments API, Web Push Notifications, The App Shell Model, Background Sync, IndexedDB)\r\n\r\nIf you wanna get the slides, [check this speaker deck page with the slides](https://speakerdeck.com/ferreiro/codemotion-webinar-progressive-web-applications-pwas-jorge-ferreiro-at-jgferreiro)'
            }
        },
        "9842303": {
            type: PostModuleTypes.link,
            props: {
                title:
                    "Codemotion Webinar: Progressive Web Applications (PWAs)",
                subtitle: "Slides for the webinar",
                src:
                    "https://speakerdeck.com/ferreiro/codemotion-webinar-progressive-web-applications-pwas-jorge-ferreiro-at-jgferreiro",
                type: "slides",
                layout: PostLayoutType.inline,
                image:
                    "https://speakerd.s3.amazonaws.com/presentations/34a85b762e62420984a92e0f5d2715cf/slide_0.jpg?13970515"
            }
        },
        "9345345": {
            type: PostModuleTypes.socialNetworks
        }
    }
}

export default config
