import Link from "next/link"

import { css, cx } from "emotion"

import { Pagination } from "../types/PaginatedResponse"

import { sharedStyles } from "./config"
import { FaAngleRight, FaAngleLeft, FaHome } from "react-icons/fa"
import { getUrlWithTracking } from "../utils/get-url"

export const FIRST_PAGE = 1

export function PagePagination(props: {
    activePage: number
    pagination: Pagination
}) {
    const pages = Array.from(
        Array(props.pagination.pages)
            .map(number => number + 1)
            .keys()
    )

    const isFirstPage = props.activePage === FIRST_PAGE
    const hasNextPage = props.activePage < props.pagination.pages

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
                        <li className={cx(sharedStyles.col, styles.listItem)}>
                            <Link
                                href={getUrlWithTracking(
                                    `/blog?page=${props.activePage - 1}`,
                                    {
                                        utm_source: "page-pagination-previous",
                                        utm_medium: "ferreiro.me"
                                    }
                                )}
                            >
                                <a
                                    className={cx(
                                        sharedStyles.button,
                                        sharedStyles.alignItemsCenter,
                                        sharedStyles.displayInlineFlex
                                    )}
                                    title="Previous page"
                                >
                                    <FaAngleLeft />
                                    <span>Previous</span>
                                </a>
                            </Link>
                        </li>
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
                        const isActivePage = pageIndex + 1 === props.activePage
                        return (
                            <li
                                key={pageIndex}
                                className={cx(
                                    styles.listItem,
                                    sharedStyles.marginHorizontal(3)
                                )}
                            >
                                <Link
                                    href={getUrlWithTracking(
                                        `/blog?page=${pageIndex + 1}`,
                                        {
                                            utm_source: "page-pagination",
                                            utm_medium: "ferreiro.me"
                                        }
                                    )}
                                >
                                    <a
                                        className={cx(
                                            sharedStyles.displayInlineFlex,
                                            sharedStyles.button,
                                            isActivePage &&
                                                sharedStyles.buttonActive
                                        )}
                                    >
                                        {pageIndex + 1}
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
                            <Link
                                href={getUrlWithTracking(
                                    `/blog?page=${props.activePage + 1}`,
                                    {
                                        utm_source: "page-pagination-next",
                                        utm_medium: "ferreiro.me"
                                    }
                                )}
                            >
                                <a
                                    className={cx(
                                        sharedStyles.button,
                                        sharedStyles.displayInlineFlex,
                                        sharedStyles.alignItemsCenter
                                    )}
                                >
                                    <span>Next</span>
                                    <FaAngleRight />
                                </a>
                            </Link>
                        </li>
                    )}
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
    listItem: css`
        a {
            text-decoration: none;
        }
    `
}
