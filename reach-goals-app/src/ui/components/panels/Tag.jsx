import React from 'react'
import ReactDOM from 'react-dom'
import { Outlet } from 'react-router-dom'

import Button from '../items/elements/Button'
import ButtonDropdown from '../items/elements/ButtonDropdown'

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const Tag = () => {
    return ReactDOM.createPortal(
        <div className='container-tag aside-content' onClick={(e) => e.stopPropagation()}>
            <div className='header'>
                <h2>Tags</h2>
                <Button target={targetMap(null)} classBtn='btn-action-r close-modal circ' iconFa='fa-solid fa-xmark'/>
                <div className='options'>
                    <Button target={targetMap(null)} classBtn='btn-option-r create' iconFa="fa-solid fa-plus" title='create'/>
                    <label className="btn-option-r checkbox"></label>
                    <ButtonDropdown target={targetMap('btn-filter-content')} classBtn="btn-option-r filter-content" iconFa="fa-solid fa-filter"/>
                    <Button target={targetMap(['panel-center', 'config'])} classBtn='btn-option-r config-content' iconFa='fa-solid fa-sliders'/>
                </div>
            </div>
            <div className='body'>
                <Outlet/>
            </div>
        </div>, document.querySelector('.content-aside-r')
    )
}

export default Tag
