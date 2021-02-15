import React from 'react'
import {Dropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../store/rootReducer'
import {loadText, setLanguage} from '../../store/textareaReducer'

export const MyDropdown = () => {
    const dispatch = useDispatch()
    const language = useSelector((state: RootState )=> state.textarea.language)
    const dropdownHandler = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {

        if (e.currentTarget.id === '1') {
            dispatch(setLanguage('Русский'))
            dispatch(loadText('Русский'))
        }
        if (e.currentTarget.id  === '2') {
            dispatch(setLanguage('English'))
            dispatch(loadText('English'))
        }
        else return
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {language ? language : 'Язык'}
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item onClick={dropdownHandler} id='1'>Русский</Dropdown.Item>
                <Dropdown.Item onClick={dropdownHandler} id='2'>English</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}