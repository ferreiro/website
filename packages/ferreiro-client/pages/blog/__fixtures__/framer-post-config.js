import { PostLayoutType, PostModuleTypes } from "../../../types/Post"

const config = {
    order: [
        "123123123",
        "423423733",
        "7774543534",
        "234234122",
        "5435345345",
        "984230344",
        "3545234234",
        "223423432",
        "123123123",
        "845345345",
        "234234234",
        "333423432",
        "993423432",
        "554230344"
    ],
    modules: {
        "123123123": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "I gave my first webinar for Codemotion couple of weeks ago, and I really enjoyed the experience! ⚡️ In this post I'm sharing you what topics I covered as well as the video in case you wanna learn more about PWAs.\r\n\r\n## What are Progressive Web Apps?\r\n\r\nIn the first part of the video I introduced the main features and funcionalities of a PWA. I also shared examples of top companies in the industry using PWAs (like Twitter, Tinder, Startbucks...). These are the topics I covered:\r\n\r\n- Progressive Enhancement.\r\n- The 10 features of PWAs.\r\n- Trusted Web Applications.\r\n- Progressive Web Apps in the industry.\r\n- Why Progressive Web Apps?\r\n\r\n"
            }
        },
        "234234122": {
            type: PostModuleTypes.text,
            props: {
                value:
                    '## Building your first PWAs\r\n\r\nIn the second half of the presentation we did together our first Progressive Web Application. If you are curious, you can download the source code directly in my Github: ["Progressive Web Apps 101"](https://github.com/ferreiro/pwa-101?utm_source=ferreiro-blog)\r\n\r\nI covered the following topics:\r\n\r\n- Progressive metatags\r\n- Manifest.json\r\n- Intro to service workers\r\n- Offline mode with Cache API\r\n- Caching critical assets.\r\n- Fetch image or placeholder\r\n- Other cool APIs (Local notification, Payments API, Web Push Notifications, The App Shell Model, Background Sync, IndexedDB)\r\n\r\n'
            }
        },
        "984230344": {
            type: PostModuleTypes.link,
            props: {
                title:
                    "Codemotion Webinar: Progressive Web Applications (PWAs)",
                subtitle: "Slides for the webinar",
                url:
                    "https://speakerdeck.com/ferreiro/codemotion-webinar-progressive-web-applications-pwas-jorge-ferreiro-at-jgferreiro",
                type: "slides",
                layout: PostLayoutType.highlight,
                image:
                    "https://speakerd.s3.amazonaws.com/presentations/34a85b762e62420984a92e0f5d2715cf/slide_0.jpg?13970515"
            }
        },
        "554230344": {
            type: PostModuleTypes.link,
            props: {
                title:
                    "Next post: The first hour, MVCH and the social hackathon",
                subtitle:
                    "Coming up in the post, the importance of finding the MVCH, and the social hackathon",
                url:
                    "/blog/part-3-tips-make-a-successful-hackathon-project?utm-source=ferreiro-post-1",
                type: "slides",
                layout: PostLayoutType.inline,
                image: undefined
            }
        },
        "234234234": {
            type: PostModuleTypes.image,
            props: {
                url:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/one_year2.jpg",
                alt: "One year at Eventbrite",
                href: null,
                target: null,
                caption: "One year at Eventbrite",
                layout: PostLayoutType.inline
            }
        },
        "3545234234": {
            type: PostModuleTypes.image,
            props: {
                url:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/one_year2.jpg",
                alt: "One year at Eventbrite",
                href: "https://twitter.com/JGFerreiro",
                target: "_blank",
                caption: "One year at Eventbrite",
                layout: PostLayoutType.highlight
            }
        },
        "333423432": {
            type: "ad",
            props: {
                adType: "videoconference"
            }
        },
        "223423432": {
            type: "ad",
            props: {
                adType: "newsletter"
            }
        },
        "8833423432": {
            type: "code",
            props: {
                language: "javascript",
                value: "const hola = () => { console.log('Hola'); }"
            }
        },
        "993423432": {
            type: PostModuleTypes.separator,
            props: {}
        },
        "423423733": {
            type: PostModuleTypes.video,
            props: {
                id: "yYjvLUj-Mt8",
                isAutoPlay: false,
                layout: "center",
                provider: "youtube"
            }
        },
        "5435345345": {
            type: PostModuleTypes.quote,
            props: {
                value:
                    "Many teams spend two or three minutes to do a startup pitch, rather than showcasing the hack. [...] Focus first on demoing your project.",
                author: "- Jake Hart from McKinsey"
            }
        },
        "845345345": {
            type: PostModuleTypes.embed,
            props: {
                type: "tweet",
                url: "https://twitter.com/Interior/status/463440424141459456"
            }
        },
        "7774543534": {
            type: "series",
            props: {
                id: "the-definitive-guide-for-college-hackathon",
                currentPostId:
                    "codemotion-webinar-jorge-ferreiro-progressive-web-apps"
            }
        }
    }
}

export default config
