import React from 'react'
import {Link} from 'react-router-dom'

const shouldDisplayPagination = (prevPageToken, nextPageToken) => (
    prevPageToken !== 'start' || nextPageToken !== "end"
)

export const Pagination = ({
    prevPageToken,
    nextPageToken,
}) => {
    if (!shouldDisplayPagination(prevPageToken, nextPageToken)) {
        return <p>No more articles</p>
    }

    const shouldDisplayPrevPage = (
        prevPageToken !== "start" && prevPageToken > 0
    )
    const shouldDisplayNextPage = (
        nextPageToken !== "end"
    )

    return (
        <div>
            {shouldDisplayPrevPage && (
                <Link to={'/blog/?next=' + prevPageToken}>
                    Previous page
                </Link>
            )}

            {shouldDisplayNextPage && (
                <Link to={'/blog/?next=' + nextPageToken}>
                    Next page
                </Link>
            )}
        </div>
    )
}

    // //- Add the category id (only if is not the main page)
    // - blogLink = '/blog'
    // if blogCategory !== 'all'
    // - blogLink += '/category/' + (blogCategory ? blogCategory : '')
