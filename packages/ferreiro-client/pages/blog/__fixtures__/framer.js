import { PostLayoutType, PostModuleTypes } from "../../../types/Post"

const config = {
    order: ["1", "2", "3", "4", "5", "6", "7"],
    modules: {
        "1": {
            type: PostModuleTypes.image,
            props: {
                alt:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                layout: PostLayoutType.inline,
                src: "https://ferreirov3.s3.eu-west-2.amazonaws.com/framer2.jpg"
            }
        },
        "2": {
            type: PostModuleTypes.summary,
            props: {
                value:
                    "Hands-off workshop for Eventbrite Spain design team. We created our first interactive prototypes using Framer."
            }
        },
        "3": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "Interactive prototypes are one of the best ways to collaborate in a product team: it's visual, it contains animations and it lets you quickly test ideas with your clients and stakeholders.\r\n\r\nI  did recently a workshop about Framer and React for the design team of Eventbrite Spain, and here I'm sharing resources to help you start creating your first interactive prototypes.\r\n\r\n## What is an interactive prototype?\r\n\r\nIt's a design project that can include animations, effects and even simulates user flows. It's a cheap way to test functionalities without asking engineers to code the design.\r\n\r\nThis is one of the interactive prototypes we built during the workshop. If you wanna know how to build it, I recommend you to [take a look to the slides ](https://speakerdeck.com/ferreiro/interactive-prototyping-with-react-plus-framer-jorge-ferreiro-at-eventbrite-spain?utm_source=ferreiro.me-framer-blog&amp;utm_medium=ferreiro-blog) 🙌\r\n\r\n"
            }
        },
        "4": {
            type: PostModuleTypes.image,
            props: {
                alt:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                caption:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                layout: PostLayoutType.inline,
                maxWidth: "300px",
                src:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/YvwOkBEOz9.gif"
            }
        },
        "5": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "## Give me the slides!\r\n\r\nI uploaded the slides of the workshop in SpeakerDeck. You can get the slides in this  link: [https://speakerdeck.com/ferreiro/interactive-prototyping-with-react-plus-framer-jorge-ferreiro-at-eventbrite-spain](https://speakerdeck.com/ferreiro/interactive-prototyping-with-react-plus-framer-jorge-ferreiro-at-eventbrite-spain?utm_source=ferreiro.me&amp;utm-campaign=post-interactive-prototype?utm_source=ferreiro.me-framer-blog&amp;utm_medium=ferreiro-blog)"
            }
        },
        "6": {
            type: PostModuleTypes.embed,
            props: {
                src:
                    "https://speakerdeck.com/player/a9316c629f3f4e68958a02f94aa03ba7?title=false&skipResize=true"
            }
        },
        "7": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "## Workshop Video\r\n\r\n🚧It's not ready yet! I'll upload it to [my YouTube channel](https://www.youtube.com/c/jgferreiro?sub_confirmation=1), so subscribe to be notified! \r\n\r\n\r\n## What topics did I explain in the workshop?\r\n\r\n- **Quickly prototype using Framer**, and introducing Framer key concepts like Frame, Graphic, Stack, Group, Interactive scroll.\r\n\r\n- **Making reusable components:** Creating *Design components*  that lets you re-use and override your component properties.\r\n\r\n- **Intro to coding and React:** Explaining the difference between HTML5, CSS, and JavaScript, and introduced React components.\r\n\r\n## Resources and next steps\r\n- [Framer tutorial on Youtube](https://www.youtube.com/watch?v=zAV6RIHswto?utm_source=ferreiro.me-framer-blog&amp;utm_medium=ferreiro-blog)\r\n- [Framer Tutorial: 7 Simple Microinteractions to Improve Your Prototypes](https://www.toptal.com/designers/framer-js/microinteractions-in-framer-studio?utm_source=ferreiro.me-framer-blog&amp;utm_medium=ferreiro-blog)\r\n- [Using Conditions in Framer to Replicate Instagram’s Pagination Dots](https://blog.prototypr.io/using-conditions-in-framer-to-replicate-instagrams-pagination-dots-898100b976d1?utm_source=ferreiro.me-framer-blog&amp;utm_medium=ferreiro-blog)\r\n\r\n## 🤔 Questions?\r\n\r\nIf you have some doubts or want to stay in touch I'll be happy to get a message from you! You can reach me here:\r\n\r\n* **Youtube:** [https://www.youtube.com/jgferreiro](https://www.youtube.com/jgferreiro?utm_source=ferreiro-framer-blog&amp;utm_medium=ferreiro-blog)\r\n* **Contact:** [Contact form and email](https://www.ferreiro.me/contact?utm_source=ferreiro-framer-blog&amp;utm_medium=ferreiro-blog)\r\n* **Linkedin:** [https://www.linkedin.com/in/jgferreiro/](https://www.linkedin.com/in/jgferreiro/?utm_source=ferreiro-framer-blog&amp;utm_medium=ferreiro-blog)\r\n* **Twitter:** [https://www.twitter.com/jgferreiro](https://www.twitter.com/jgferreiro?utm_source=ferreiro-framer-blog&amp;utm_medium=ferreiro-blog)"
            }
        }

        // <p><iframe src="https://speakerdeck.com/player/a9316c629f3f4e68958a02f94aa03ba7?title=false&amp;skipResize=true" style="width:100%;height:450px;border:0"></iframe></p>
    }
}

export default config
