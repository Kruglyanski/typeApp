import {Alert} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {setAlertShow} from '../../store/appReducer'
import React from 'react'

export const AppAlert = () => {
    const dispatch = useDispatch()
    return (
        <Alert variant="warning" onClose={() => dispatch(setAlertShow(false))} dismissible>
            <Alert.Heading>Переключите раскладку клавиатуры!</Alert.Heading>
        </Alert>
    )

}