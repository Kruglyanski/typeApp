import React from 'react'
import {CenteredModal} from './Modal'
import {useDispatch, useSelector} from 'react-redux'
import {setAlertShow, setIsDone, setModalShow} from '../../store/appReducer'
import {loadText, nullifyState, setIsStarted, setLanguage} from '../../store/textareaReducer'
import {RootState} from '../../store/rootReducer'

export const ModalContainer = () => {
    const language = useSelector((state: RootState) => state.textarea.language)
    const isDone = useSelector((state: RootState) => state.app.isDone)
    const speed = useSelector((state: RootState) => state.textarea.speed)
    const accuracy = useSelector((state: RootState) => state.textarea.accuracy)
    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(setAlertShow(false))
        dispatch(setIsStarted(false))
        dispatch(setModalShow())
        dispatch(setLanguage(null))
        dispatch(nullifyState())
        dispatch(loadText(language))
        dispatch(setModalShow())
        dispatch(setIsDone(false))
    }

    return (
        <>
            {
                isDone
                    ?
                    <CenteredModal
                        title={`Тест окончен! Ваша скорость: ${speed.toFixed(1)} зн/мин. Точность: ${accuracy.toFixed(1)}%`}
                        buttonText={'Начать заново'}
                        buttonDisabled={false}
                        onClickHandler={onClickHandler}
                        isDropDown={false}
                    />
                    :
                    <CenteredModal
                        title={'Выберите язык текста и нажмите "Начать".'}
                        buttonText={'Начать'}
                        buttonDisabled={!language}
                        onClickHandler={() => dispatch(setModalShow())}
                        isDropDown={true}/>
            }
        </>
    )
}