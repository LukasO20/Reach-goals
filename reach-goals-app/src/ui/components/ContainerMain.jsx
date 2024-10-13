import React, { useContext } from 'react'
import Routes from '../../app/Routes'
import { VisibilityContext } from '../../provider/components/VisibilityProvider'

import ButtonDropdown from './items/elements/ButtonDropdown'

const ContainerM = () => {
    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <div className="container-main" onClick={(e) => toggleVisibility(null, null, e)}>
            <div className="head">
                <div className="line-p">
                    <div className="title-m">
                        <h2>Your control panel</h2>
                    </div>
                    <div className="options-m">
                        <div className="visibility-m">
                            <ButtonDropdown id="btn-visibility" classBtn="button-m visibility" title="visibility"/>
                        </div>
                        <div className="more-m">
                            <ButtonDropdown id="btn-more" classBtn="button-m more" iconFa="fa-solid fa-ellipsis-vertical"/>
                        </div>
                    </div>
                </div>
                <div className="line-s">
                    <div className="filter">
                        <label className="button-filter-m checkbox"></label>
                        <ButtonDropdown id="btn-filter-content" classBtn="button-filter-m filter-content" iconFa="fa-solid fa-filter"/>
                        <label className="button-show-m line-chart"><i className="icon-st fa-solid fa-chart-line"></i></label>
                        <label className="button-filter-m search"><i className="icon-st fa-solid fa-magnifying-glass"></i><input type="text" placeholder="search" id="search-content-m" className="search-content" /></label>
                        <label className="button-show-m button-st goal">goals</label>
                        <label className="button-show-m button-st assignment">unfocused assignments</label>
                    </div>
                    <div className="action">
                        <ButtonDropdown id="btn-action1" target="form-goal" classBtn="button-action-m" iconFa="fa-solid fa-sort" title="order" />
                        <ButtonDropdown id="btn-action2" target="form-assignment" classBtn="button-action-m" iconFa="fa-solid fa-plus" title="create" />
                    </div>
                </div>
            </div>
            <div className="body">
                <Routes />
            </div>
        </div>
    )
}

export default ContainerM
