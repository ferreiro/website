import React from 'react'
import styled from 'styled-components'

const PlayIcon = styled.span`
    font-Size: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40px 0 0 -40px;
    color: #fff;

    &:before {
        -webkit-filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.9));
        filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.9));
    }
`

export const PlayButton = () => (
    <PlayIcon
        className="icon icon-play"
    />
)