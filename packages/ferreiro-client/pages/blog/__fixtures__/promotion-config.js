import { PostLayoutType, PostModuleTypes } from "../../../types/Post"

const config = {
    order: [
        "1",
        "2",
        "3",
        "564645",
        "456456",
        "545344",
        "5",
        "6",
        "8",
        "9",
        "10"
    ],
    modules: {
        "1": {
            type: PostModuleTypes.image,
            props: {
                alt:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                layout: PostLayoutType.inline,
                src:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/one_year2.jpg"
            }
        },
        "2": {
            type: PostModuleTypes.summary,
            props: {
                value:
                    "Reflecting back on the most important year of my career so far."
            }
        },
        "3": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "This year at Eventbrite was intense, rewarding, and a rollercoaster of emotions. When I joined in September 2018, we started working in Eventbrite Studio, and I’d never experienced such as the fast-paced environment for building a new product from scratch. Operating as a startup inside a company like Eventbrite has been a really interesting learning process for me. I’ve grown as an engineer, and also as a team player and a human being."
            }
        },
        "564645": {
            type: PostModuleTypes.quote,
            props: {
                value:
                    "Operating as a startup inside a company like Eventbrite has been a really interesting learning process for me.",
                layout: PostLayoutType.inline
            }
        },
        "456456": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "🚀 We successfully launched the first version of the product in ~4.5 months. It was challenging because the team was fully distributed (San Francisco, Sacramento, Mendoza (Argentina), Madrid (Spain), but **we were hungry and committed as a team to making the product a reality**. Thanks go to every teammate who was part of the process: [Katie Harris](https://www.linkedin.com/in/katie-harris-93253a21/), [Brian Singer](https://www.linkedin.com/in/briancsinger/), [Mario Montes](https://www.linkedin.com/in/mariomnts/), [Sebastian Romano](https://www.linkedin.com/in/sebasromano/), [Hanah Yendler](https://www.linkedin.com/in/hyendler/), [Matthew downs](https://www.linkedin.com/in/matthewadowns/), [Pablo Martin](https://www.linkedin.com/in/pablo-martin-3a88748a/), [Vincent Franco](https://www.linkedin.com/in/vincentfranco/), [Jeff McKenzie](https://www.linkedin.com/in/jeffmckenzie/), [Yunji Kim](https://www.linkedin.com/in/yunji-kim/), [Greg Patterson](https://www.linkedin.com/in/gpatterson/), [Evan Dudla](https://www.linkedin.com/in/evandudla/)..."
            }
        },
        "545344": {
            type: PostModuleTypes.image,
            props: {
                alt:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                caption:
                    "Jorge Ferreiro React and Framer workshop at Eventbrite Spain",
                layout: PostLayoutType.inline,
                src:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/2019-10-22%2009.30.56%202.jpg"
            }
        },
        "5": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "🙏 Reflecting back, I want to acknowledge Matthew Downs for his work. Matthew was leading the team during those months in the frontend area as well as scrum. Thanks to Matt for giving me autonomy and encouraging and empowering me through those intense months building Studio. **Because you believed in my skills, I was able to grow a lot and even led some features in the project which helped my personal development**.\r\n\r\nI also want to thank my manager Brian Singer for believing in me from day one, as well as [Scott Stenback](https://www.linkedin.com/in/scottstenback/) and Katie Harris for the initial conversations before joining Eventbrite. Brian, **your continuous feedback and help have been key to my growth and to seeing my blind spots**. I think we (the team) are so lucky to have you as a manager. I appreciate your amazing startup background, as well as the autonomy and encouragement you give me. "
            }
        },
        "6": {
            type: PostModuleTypes.text,
            props: {
                value:
                    "## Mentors and Insights\r\n\r\nOut of my team, there have been a number of really important people who contributed to pushing me to make me better, either more regularly or more from time to time. First, thanks to [Kyle Welch](https://www.linkedin.com/in/kylewelch1/), you have been an awesome mentor and I’ve never seen such an approachable person. Also, thanks to the following people for providing me feedback, coaching, or technical help along the way: [Jessica Katz](https://www.linkedin.com/in/jeskatz/), [Nick Popoff](https://www.linkedin.com/in/nick-popoff/), [Marcos Iglesias](https://www.linkedin.com/in/marcosiglesias/), [Jonathan Creamer](https://www.linkedin.com/in/jcreamer898/), [Jamie Kyle](https://www.linkedin.com/in/jamiebuilds/), [Emilio Garcia](https://www.linkedin.com/in/emilio-garcia-9622048/), [Macarena Padilla](https://www.linkedin.com/in/macarena-padilla-ruiz-82a83b25/), [Renaud Visage](https://www.linkedin.com/in/renaudvisage/), [Ben Ilegbodu](https://www.linkedin.com/in/benmvp/) and many more people...\r\n\r\n## What is Next and Carlos, Helen, and Alex\r\n\r\nRecently, we have incorporated several new team members that are helping me a lot to become an even better engineer. I’m really excited to keep working with these folks! Thanks, [Helen Stead](https://www.linkedin.com/in/helenastead/), [Alejandro Pérez Ramos](https://www.linkedin.com/in/alejandroperezramos/), and the super [Carlos Azaustre](https://www.linkedin.com/in/carlosazaustre/).\r\n\r\n🌟 After this year, there are many new challenges and areas where I want to keep growing and explore. So I’m really excited to keep doing that and to keep learning and getting inspiration from all my current coworkers and from my future ones. 🙌 \n## We are Hiring!\r\n\r\nThat’s all! I’m in a very exhilarating time in my career. Feel free to reach out to me if you want to know more about Eventbrite and our [openings](https://jobs.lever.co/eventbrite?lever-via=LxHg4Lg84K) or check my [Twitter](https://twitter.com/JGFerreiro) and [Instagram](https://www.instagram.com/jgferreiro) to keep connected. :). \r\n\r\nOpen positions: [https://jobs.lever.co/eventbrite](https://jobs.lever.co/eventbrite?lever-via=LxHg4Lg84K)"
            }
        },
        "8": {
            type: PostModuleTypes.image,
            props: {
                href: "https://jobs.lever.co/eventbrite?lever-via=LxHg4Lg84K",
                target: "_blank",
                src:
                    "https://ferreirov3.s3.eu-west-2.amazonaws.com/wearehiring.png"
            }
        },
        "9": {
            type: PostModuleTypes.socialNetworks,
            props: {
                title: "Let's connect!"
            }
        },
        "10": {
            type: PostModuleTypes.series,
            props: {
                currentPermalink:
                    "one-year-at-eventbrite-and-promoted-to-sde2-frontend"
            }
        }
    }
}

export default config
