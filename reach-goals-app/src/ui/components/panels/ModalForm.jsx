import React, { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/components/VisibilityProvider'
import { ManageModelContext } from '../../../provider/components/ManageModelProvider'
import * as metaAction from '../../../provider/meta/metaAction'
import * as assignmentAction from '../../../provider/assignment/assignmentAction'
import ButtonAction from '../items/elements/ButtonAction'
import ButtonDropdown from '../../components/items/elements/ButtonDropdown'

import '../../styles/items/Elements.scss'
import '../../styles/panels/Objectives.scss'

const iconMap = {
    assignment: 'fa-solid fa-list-check',
    goal: 'fa-solid fa-bullseye'
}

const titleMap = {
    assignment: 'Create your assignment',
    goal: 'Create your goal'
}

const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

const formsInputMap = (typeForm) => {
    const form = typeForm === 'assignment' ?
        <div className='field-forms duration'>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' />
        </div>  
        : undefined

    return form
}

const formsItemMap = (typeForm) => {
    const form = typeForm === 'assignment' ?
    <div className='item-forms goal'>
        <div className='item-forms head'>
            <div className='item-head-1'>goals</div>
            <div className='item-head-2'></div>
        </div>
        <div className='item-forms body'></div>
    </div>
    : 
    <div className='item-forms assignment'>
        <div className='item-forms head'>
            <div className='item-head-1'>assignments</div>
            <div className='item-head-2'></div>
        </div>
        <div className='item-forms body'></div>
    </div>

return form
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { selectModel, setSelectModel } = useContext(ManageModelContext)

    const typeForm = props.type
    const icon = iconMap[typeForm] || 'fa-solid fa-triangle-exclamation'
    const titleForm = titleMap[typeForm] || 'Create your objective'
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)

    const metaEmpty = {
        name: '',
        description: '',
        status: null
    }
    const assingmentEmpty = {
        name: '',
        description: '',
        status: null
    }

    const [meta, setMeta] = useState(metaEmpty)
    const [assingment, setAssignment] = useState(assingmentEmpty)

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)

    const nullModal = () => {
        setSelectModel(null)
    }

    const handleChange = async (e) => {
        const { name, value } = e.target

        if (typeForm === 'goal') {
            setMeta((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        } else {
            setAssignment((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

    const handleSubmit = async () => {
        setError(null)
        setSucess(false)

        try {
            if (typeForm === 'goal') {
                meta.id ? await metaAction.updateMeta(meta) : await metaAction.addMeta(meta)  
                setMeta(metaEmpty)
            } else {
                assingment.id? await assignmentAction.updateAssignment(assingment) : await assignmentAction.addAssignment(assingment)
                setAssignment(assingmentEmpty)
            }
            setSucess(true)
        
        } catch (error) {
            setError(error.message)
        }
    }

    const handleTarget = (typeForm) => {
        if (typeForm) {
            switch (typeForm) {
                case 'goal':
                    return meta
                case 'assignment':
                    return assingment
                default:
                    return null
            }
        }
    }

    useEffect(() => {
        const loadMeta = async (id) => {
            if (id === null ) { 
                setMeta(metaEmpty)
                return
            } 
            
            try {
                const getMeta = await metaAction.getMeta(id)
                setMeta(getMeta)
            }
            catch (error) {
                setError('Ops, something wrong: ', error)
            }
        } 

        loadMeta(selectModel)
    }, [selectModel])

    const modelTarget = handleTarget(typeForm)

    return (
        <div className='container-form-modal center-content' onClick={(e) => toggleVisibility(targetMap(classRemove), e)}>
            <div className='head'> 
                <div className='objective-icon'>
                    <i className={`icon-st ${icon}`}></i>
                </div>
                <div className='objective-options'> 
                    <div className='objective-op'>
                        <ButtonAction onClick={typeForm === 'goal' ? nullModal : true} target={targetMap(['panel-center', 'assignment'], { maintain: true })} classBtn='op-form-assignment button-op-objective button-st' title='assingments'/>
                        <ButtonAction onClick={typeForm === 'assignment' ? nullModal : true} target={targetMap(['panel-center', 'goal'], { maintain: true })} classBtn='op-form-goal button-op-objective button-st' title='goals'/>
                    </div>
                    <div className='objective-color'>
                        <label className='color'></label>
                    </div>
                </div>
                <div className='objective-buttons-options'>
                    <ButtonAction target={targetMap(null)} classBtn='button-action-p close-modal button-st' iconFa='fa-solid fa-xmark'/>
                </div>
            </div>
            <div className='body'>
                <h2>{titleForm}</h2>
                <div className='objective-forms'>
                    <form>
                        <div className='field-forms name'>
                            <input id={`${typeForm}-name`} className='input-form' type='text' placeholder={`${typeForm} name...`}
                                name='name' value={modelTarget?.name} onChange={handleChange} />
                        </div>
                        <div className='field-forms start-date'>
                            <input id={`${typeForm}-start-date`} className='input-form' type='text' placeholder='set start date' />
                        </div>
                        <div className='field-forms end-date'>
                            <input id={`${typeForm}-end-date`} className='input-form' type='text' placeholder='set end date' />
                        </div>
                        <div className='field-forms status'>
                            <ButtonDropdown target={targetMap(`${typeForm}-status`, { add: true })} classBtn='dropdown-form' title='choose an option' valueSelect={true} />
                        </div>
                        <div className='field-forms reminder-date'>
                            <ButtonDropdown target={targetMap(`${typeForm}-reminder-date`, { add: true })} classBtn='dropdown-form' title='choose an option' valueSelect={true} />
                        </div>
                        {formsInputMap(typeForm)}
                        <div className='item-forms tag'>
                            <div className='item-forms head'>
                                <div className='item-head-1'>tags</div>
                                <div className='item-head-2'></div>
                            </div>
                            <div className='item-forms body'></div>
                        </div>
                        {formsItemMap(typeForm)}
                        <div className='field-forms details'>
                            <textarea id={`${typeForm}-details`} className='input-form' placeholder='details here...'
                                name='description' value={modelTarget?.description} onChange={handleChange}></textarea>
                        </div>
                        <div className='bottom-form'>
                            <label onClick={handleSubmit}>save</label>
                        </div>
                        <div className='bottom-form-messagae'>
                            {
                                success &&                             
                                <p className='message successfull'>
                                    <label>{typeForm === 'goal' ? 'Meta save with success!' : 'Assignment save with success!'}</label>
                                </p>
                            }
                            {
                                error &&
                                <p className='message error'>
                                    <label>{`Ops, something went wrong: ${error}`}</label>
                                </p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalForm