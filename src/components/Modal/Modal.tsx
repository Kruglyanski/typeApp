import {Button, Modal} from 'react-bootstrap'
import React, {useEffect} from 'react'
import {MyDropdown} from '../Dropdown/Dropdown'
import {useDispatch, useSelector} from 'react-redux'
import { setModalShow } from '../../store/appReducer'
import {RootState} from '../../store/rootReducer'

export type PropTypes = {
    title: string
    buttonText: string
    buttonDisabled: boolean
    onClickHandler: () => void
    isDropDown: boolean
}

export const CenteredModal: React.FC<PropTypes> = ({title, buttonText, buttonDisabled, onClickHandler , isDropDown}) =>{

    const modalIsShow = useSelector((state: RootState)  => state.app.modalIsShow)
    const dispatch = useDispatch()

    return (
        <Modal
            onHide ={() => dispatch(setModalShow())}
            show={modalIsShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <h4>{title}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled = {buttonDisabled} onClick={onClickHandler}>{buttonText}</Button>
                {isDropDown &&<MyDropdown/>}
            </Modal.Footer>
        </Modal>

    )
}

