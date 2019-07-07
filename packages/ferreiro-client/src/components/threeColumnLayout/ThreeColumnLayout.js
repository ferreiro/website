import React, {PureComponent} from 'react'

import './ThreeColumnLayout.scss';

export class ThreeColumnLayout extends PureComponent {
    render() {
        const {
            items,
            renderingCallback,
        } = this.props;

        return (
            <div className="three-column-layout">
                {items.map((item) => (
                    <div className="three-column-layout__item">
                        <div className="three-column-layout__item-wrapper">
                            {renderingCallback(item)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}