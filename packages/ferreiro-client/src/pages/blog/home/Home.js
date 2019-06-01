import React, {PureComponent} from 'react'
import get from 'lodash/get'

import {LayoutWithSidebar} from '../../../components/layout/LayoutWithSidebar';
import {Card} from '../../../components/card/Card';
import {CardHighlight} from '../../../components/cardHighlight/CardHighlight';
import {Pagination} from '../../../components/pagination/Pagination';
import {SidebarMenu} from '../../../components/sidebarMenu/SidebarMenu';
import {getBlogCategoryPermalink} from '../get-blog-category-permalink'
import {getPostPermalink} from '../get-post-permalink'
import {LoadingPlaceholderCard} from '../../../components/loadingPlaceholder/LoadingPlaceholderCard'
import {LoadingPlaceholderHightlight} from '../../../components/loadingPlaceholder/LoadingPlaceholderHightlight'

const posts = [
    {"_id":"5cb34adc2c5267006349cf66","updatedAt":"2019-05-31T22:06:40.399Z","createdAt":"2019-04-14T14:59:40.020Z","pic":"https://ferreirov3.s3.eu-west-2.amazonaws.com/%5BSPANISH%5D%20Entrevista%20Cesar%20%281%29.jpg","title":"(Spanish) Interview with César Puerta, Senior Staff Software Engineer at Twitter San Francisco and Leader of the Android Application ","permalink":"interview-with-cesar-puerta-staff-software","author_name":"Jorge Ferreiro","author_pic":"","series":null,"views":171,"likes":0,"published":true,"tags":[],"category":["software"],"summary":"Interview to César Puerta working at Twitter on career advice and tips for Junior engineers ","secretKey":"","__v":0,"id":"5cb34adc2c5267006349cf66"},
    {"_id":"5b8e9fdbdaa92b00211aa588","updatedAt":"2019-05-31T03:55:38.708Z","createdAt":"2018-09-04T15:08:11.716Z","pic":"https://ferreirov3.s3.eu-west-2.amazonaws.com/briteland_shorter_low_quality.jpg","title":"I’m joining Eventbrite full-time! ~ What, Where and Why","permalink":"jorge-ferreiro-joins-eventbrite-as-software-engineer","author_name":"Jorge Ferreiro","author_pic":"","series":null,"views":929,"likes":0,"published":true,"tags":[],"category":["software"],"summary":"A new professional chapter has started for me, and I'm thrilled to share more details about it :) ","secretKey":"super-secret-password","__v":0,"id":"5b8e9fdbdaa92b00211aa588"},
    {"_id":"5ac28f6072b4b900213b784d","updatedAt":"2019-05-31T22:31:00.394Z","createdAt":"2018-04-02T20:15:28.613Z","pic":"https://ferreirov3.s3.eu-west-2.amazonaws.com/on-sites-interviews-5_b_low_quality.jpg","title":"5 tips to crush on-site interviews from my own experience","permalink":"crushing-on-site-interviews","author_name":"Jorge Ferreiro","author_pic":"","views":1572,"likes":0,"published":true,"tags":[],"category":["software"],"summary":"I did my first on-site at Amazon a few months ago. Here’s what I learned.","secretKey":"2343542564356","__v":0,"series":null,"id":"5ac28f6072b4b900213b784d"},
    {"_id":"5a0307ec2a9500001f98cd18","updatedAt":"2019-05-31T18:46:31.782Z","createdAt":"2017-11-08T13:34:36.899Z","pic":"https://ferreirov3.s3.eu-west-2.amazonaws.com/cover_speed_up_your_website_6_practical_tipcs%20%281%29.jpg","title":"Speed up your website! – 8 practical tips for the frontend","permalink":"speed-up-your-website-frontend-8-practical-tips","author_name":"Jorge Ferreiro","author_pic":"","views":6702,"likes":0,"published":true,"tags":[],"category":["software"],"summary":"Some useful tips, ready to apply to your projects, personal website or blog, that will boost your loading time and improve the overall user experience","secretKey":"3534625645","__v":0,"series":null,"id":"5a0307ec2a9500001f98cd18"},
    {"_id":"59e512c3e6c74600353fa7e9","updatedAt":"2019-05-30T14:21:17.367Z","createdAt":"2017-10-16T20:12:51.529Z","pic":"https://ferreirov3.s3.eu-west-2.amazonaws.com/jorge_ferreiro_blog_welcome_post_biography.jpg","title":"Welcome to my new digital space. Welcome to the #ferreiroV3 blog.","permalink":"welcome-to-my-new-digital-space-welcome-to-jorge-ferreiro-blog","author_name":"Jorge Ferreiro","author_pic":"","views":1118,"likes":0,"published":true,"tags":[],"category":["product","entrepreneurship"],"summary":"In 15 days and with more than 300 commits, ferreiroV3 has launched. In this post, I will present my new website, my motivations, and my future plans. ","secretKey":"1234523452345","__v":0,"series":null,"id":"59e512c3e6c74600353fa7e9"
}]

const DEFAULT_CATEGORY = 'blog'


const renderHighlight = ({
    permalink,
    pic,
    summary,
    title,
}) => (
    <CardHighlight
        key={permalink}
        permalink={getPostPermalink(permalink)}
        title={title}
        summary={summary}
        image={pic}      
    />
)

const renderPost = ({
    permalink,
    pic,
    summary,
    title,
}) => (
    <Card
        key={permalink}
        permalink={getPostPermalink(permalink)}
        title={title}
        summary={summary}
        image={pic}
    />
)

const getBlogContent = ({
    posts = [],
    prevPageToken,
    nextPageToken,
    isLoading,
}) => {
    if (isLoading === true) {
        return (
            <p>
                <LoadingPlaceholderHightlight />
                <LoadingPlaceholderCard />
            </p>
        )
    }

    if (posts.length === 0) {
        return (
            <p>No more posts available</p>
        )
    }

    const [highlightPost, ...nonFeaturePosts] = posts;
    return (
        <div className="">
            <div>
                {renderHighlight(highlightPost)}
            </div>

            <div>
                {nonFeaturePosts.map(renderPost)}
            </div>

            <Pagination
                prevPageToken={prevPageToken}
                nextPageToken={nextPageToken}
            />
        </div>
    );
}

export class BlogHome extends PureComponent {
    state = {
        posts: [],
        title: 'Blog',
        category: 'blog',
        intro: null,
        isLoading: true,
    }

    componentDidUpdate() {
        const category = get(this.props, 'match.params.category', DEFAULT_CATEGORY);

        this.setState({
            title: category,
            category,
        })

        console.log('category', category)
    }

    componentDidMount() {
        // TODO: Cache results and check that first.header

        fetch('/api/v1/blog/list')
            .then(res => res.json())
            .then(res => {
                console.log('response')
                console.log(res)
                const {
                    title,
                    intro,
                    posts
                } = res;

                this.setState({
                    title,
                    intro,
                    posts,
                })
            })
            .catch((error) => {
                alert('error', error)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    render() {
        const nextPageToken = '2'
        const prevPageToken = '1'

        const blogHeader = (
            <div className="">
                Jorge Ferreiro
            </div>
        );

        const blogNav = [
            {
                text: 'Home',
                icon: 'home',
                path: '/blog',
            },
            {
                text: 'Web development',
                icon: 'web',
                path: getBlogCategoryPermalink('web'),
            },
            {
                text: 'Career',
                icon: 'career',
                path: getBlogCategoryPermalink('career'),
            }
        ]
        const blogPanel = (
            <div className="">
                <SidebarMenu
                    onClick={null}
                    selectedPath='home'
                    items={blogNav}
                />

                Jorge Ferreiro
                Software Engineer and Entrepreneur

                Frontend Engineer R&D @Eventbrite - Past @Amazon - Entrepreneur - Blog writer - Love to ship products - DJ - Passions: ✈️🎾📷🎵#react #hamilton

                <img width="60px" src="https://pbs.twimg.com/profile_images/1062169454413578243/z_WY3jdh_400x400.jpg" />

                <ul className="about-me__items margin-top-1"><li className="about-me__item margin-bottom-1"><a className="about-me__item" href="https://twitter.com/JGFerreiro" target="_blank"><span className="icon icon-twitter margin-right-1"></span><span>Twitter @jgferreiro</span></a></li><li className="about-me__item margin-bottom-1"><a className="about-me__item" href="https://www.linkedin.com/in/jgferreiro/" target="_blank"><span className="icon icon-linkedin margin-right-1"></span><span>Linkedin</span></a></li><li className="about-me__item"><a className="about-me__item" href="http://github.com/ferreiro" target="_blank"><span className="icon icon-github margin-right-1"></span><span>Github ferreiro</span></a></li></ul>

                <a
                    className="action_button openNewsletterSubscription margin-top-1"
                    href="/newsletter?source=blog"
                >
                    <span
                        className="icon ion-ios-paper-outline"
                        style={{marginRight: '10px'}}
                    />
                    <span>
                        Subscribe to the blog
                    </span>
                </a>
            </div>
        );

        const blogContentHeader = (
            <div
                className=""
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginBottom: '3em',
                    marginTop: '1.5em',
                }}
            >
                {/* if blogCategory !== 'all'
                h2.category__title.margin-bottom-1= blogCategory + ' posts' */}
                
                <div
                    style={{
                        flex: '1 1 auto'
                    }}
                >
                    <h1
                        style={{
                            color: '#525252',
                            fontFamily: 'aktiv-grotesk, sans-serif',
                            fontSize: '105px'
                        }}
                    >
                        {this.state.title}
                    </h1>
                    <h2
                        style={{
                            maxWidth: '700px',
                            fontFamily: 'aktiv-grotesk, sans-serif',
                            fontSize: '30px',
                            marginTop: '1rem'
                        }}
                    >
                        A blog by Jorge Ferreiro about Web Development, Career growth and life adventures.
                    </h2>
                </div>
                <a
                    href="#"
                    style={{
                        fontSize: '18px',
                        flex: '0 0 auto',
                        border: '4px solid #000',
                        padding: '1.2rem 1.8rem'
                    }}
                >
                    Subscribe
                </a>
            </div>
        )

        const blogContent = getBlogContent({
            isLoading: this.state.isLoading,
            posts: this.state.posts,
            nextPageToken,
            prevPageToken,
        })
    
        return (
            <LayoutWithSidebar
                header={null}
                isHeaderFullWidth={true}
                panel={blogPanel}
                contentHeader={blogContentHeader}
                content={blogContent}
            />
        )
    }
}
