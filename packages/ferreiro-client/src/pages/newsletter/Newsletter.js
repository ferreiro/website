import React from 'react';
import {css} from 'emotion';

import {PageLayout} from '../../components/layout/PageLayout';

export const Newsletter = () => {
    const title = "Newsletter"

    return (
        <PageLayout
            currentPath="newsletter"
            showHeader={true}
            isHeaderFix={false}
            title={title}
        >
            <div className={styles.wrapper}>
                <div className={styles.image} />
                <div className={styles.content}>
                    Form with the newsletter
                </div>
            </div>
        </PageLayout>
    )
}

const styles = {
    wrapper: css`
        align-items: center;
        display: flex;
        height: 100vh;
    `,
    image: css`
        background: #cecece url('/images/newsletter/newsletter_jorge_ferreiro.jpg');
        background-position: 50% 50%;
        background-size: cover;
        flex: 0 0 auto;
        width: 50%;
        height: 100%;
    `,
    content: css`
        flex: 1 1 auto;
        height: 100%;
    `
}