import React from 'react'
import cls from '../Textarea/Textarea.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {decFont, incFont, loadText, nullifyState, setIsStarted, setLanguage} from '../../store/textareaReducer'
import { setLightTheme, setModalShow} from '../../store/appReducer'
import {setAlertShow} from '../../store/appReducer'
import {RootState} from '../../store/rootReducer'


export const Statistics: React.FC = () => {

    const text = useSelector((state:RootState) => state.textarea)
    const isLightTheme = useSelector((state:RootState) => state.app.isLightTheme)

    const dispatch = useDispatch()
    const btnHandler = () => {
        dispatch(setAlertShow(false))
        dispatch(setIsStarted(false))
        dispatch(setModalShow())
        dispatch(setLanguage(null))
        dispatch(nullifyState())
        dispatch(loadText(text.language))
    }

    const themeHandler = () => {
        dispatch(setLightTheme())
    }

    const fontHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) =>{
        if(e.currentTarget.id === '1'){
            dispatch(decFont())
        }
        if(e.currentTarget.id === '2'){
            dispatch(incFont())
        }
    }
    return (
        <div>
            <span>Скорость: <br/><b className={cls.bold}>{text.speed.toFixed(1)}</b> зн/мин</span><br/>
            <span>Точность: <br/><b className={cls.bold}>{text.accuracy.toFixed(1)}</b>%</span><br/>
            <br/>
            <button className={'btn btn-warning btn-sm mt-1 ' + cls.button} onClick={btnHandler}
                    onKeyUp={event => event.preventDefault()}>Начать сначала
            </button>
            <br/>
            <br/>
            <button className={'btn btn-secondary btn-sm mt-1 ' + cls.button} onClick={themeHandler}
                    onKeyUp={event => event.preventDefault()}>{isLightTheme ? 'Тёмная тема' : 'Светлая тема'}
            </button>
            <br/>
            <br/>
            Шрифт: &nbsp;
            <div className="btn-group btn-group-toggle"  data-toggle="buttons">
                <button
                    className="btn btn-secondary"
                    onClick={fontHandler}
                    disabled={text.fontSize <= 10}
                    id="1"
                >
                    <b>-</b>
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={fontHandler}
                    disabled={text.fontSize >= 26}
                    id="2" >
                    <b>+</b>
                </button>
            </div>


        </div>
    )
}