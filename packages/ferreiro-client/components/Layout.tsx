import React from "react"

import { Container } from "./Container"
import { Header } from "./Header"

export function Layout(props: { children: object }) {
    return (
        <div>
            <Header />
            <Container>{props.children}</Container>
        </div>
    )
}
