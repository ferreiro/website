import React, {PureComponent} from 'react'

import './OneColumnLayout.scss';

export class OneColumnLayout extends PureComponent {
    render() {
        const {
            items,
            renderingCallback,
        } = this.props;

        return (
            <div className="one-column-layout">
                {items.map((item) => (
                    <div className="one-column-layout__item">
                        <div className="one-column-layout__item-wrapper">
                            {renderingCallback(item)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}