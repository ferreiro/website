import Link from "next/link"

import { css, cx } from "emotion"

import { Pagination } from "../types/PaginatedResponse"

import { sharedStyles } from "./config"

export const FIRST_PAGE = 1

export function PagePagination(props: {
    activePage: number
    pagination: Pagination
}) {
    const pages = Array.from(
        Array(props.pagination.pages).keys()
        // .map(key => key + 1)
    )

    console.log("pagination")
    console.log(props.pagination)

    const isFirstPage = props.activePage === FIRST_PAGE
    const hasNextPage = props.activePage < props.pagination.pages

    console.log("isFirstPage", isFirstPage)
    console.log("props.activePage", props.activePage)
    console.log(props.activePage)
    console.log(typeof props.activePage)
    console.log(typeof props.pagination.pages)
    console.log("hasNextPage", hasNextPage)

    return (
        <div className={sharedStyles.row}>
            <div className={sharedStyles.col_3}>
                <ul
                    className={cx(
                        styles.list,
                        sharedStyles.flex,
                        sharedStyles.flexWrap,
                        sharedStyles.justifyContentCenter
                    )}
                >
                    {!isFirstPage && (
                        <>
                            <li
                                className={cx(
                                    sharedStyles.col_auto,
                                    sharedStyles.marginRight(3),
                                    styles.listItem
                                )}
                            >
                                <Link href={`/blog`}>
                                    <a className={sharedStyles.inputField}>
                                        First
                                    </a>
                                </Link>
                            </li>

                            <li
                                className={cx(
                                    sharedStyles.col,
                                    styles.listItem
                                )}
                            >
                                <Link
                                    href={`/blog?page=${props.activePage - 1}`}
                                >
                                    <a
                                        className={sharedStyles.inputField}
                                        title="Previous page"
                                    >
                                        Previous
                                    </a>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className={sharedStyles.col_6}>
                <ul
                    className={cx(
                        styles.list,
                        sharedStyles.flex,
                        sharedStyles.flexWrap,
                        sharedStyles.justifyContentCenter
                    )}
                >
                    {pages.map((pageIndex: number) => {
                        return (
                            <li
                                key={pageIndex}
                                className={cx(
                                    styles.listItem,
                                    sharedStyles.marginHorizontal(3)
                                )}
                            >
                                <Link href={`/blog?page=${pageIndex + 1}`}>
                                    <a className={sharedStyles.inputField}>
                                        {pageIndex}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className={sharedStyles.col_3}>
                <ul
                    className={cx(
                        styles.list,
                        sharedStyles.flex,
                        sharedStyles.justifyContentEnd
                    )}
                >
                    {hasNextPage && (
                        <li className={styles.listItem}>
                            <Link href={`/blog?page=${props.activePage + 1}`}>
                                <a className={sharedStyles.inputField}>Next</a>
                            </Link>
                        </li>
                    )}

                    <li
                        className={cx(
                            styles.listItem,
                            sharedStyles.marginLeft(3)
                        )}
                    >
                        <Link href={`/blog?page=${props.pagination.pages}`}>
                            <a className={sharedStyles.inputField}>Last</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const styles = {
    list: css`
        list-style: none;
        margin: 0;
        padding: 0;
    `,
    listItem: css``
}
