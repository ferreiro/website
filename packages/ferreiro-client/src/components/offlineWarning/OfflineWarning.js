import React from 'react'
import {Offline} from 'react-detect-offline'

import './OfflineWarning.scss'

export const OfflineWarning = ({

}) => (
    <Offline>
        <div className="offline-warning">
            <div className="offline-warning__wrapper">
                You're offline right now. Check your connection.
            </div>
        </div>
    </Offline>
)