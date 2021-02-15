import React, {useCallback, useEffect} from 'react'
import cls from './Textarea.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {
    loadText,
    setAccuracy,
    setCounter,
    setIsStarted,
    setSpeed,
    setState,
    setTime,
    setTotalCount
} from '../../store/textareaReducer'
import {setAlertShow, setIsDone, setModalShow} from '../../store/appReducer'
import {langCheck} from '../../utils/langUtil'
import {RootState} from '../../store/rootReducer'


export const Textarea: React.FC = () => {

    const text = useSelector((state: RootState) => state.textarea)
    const dispatch = useDispatch()
    const isLightTheme = useSelector((state: RootState) => state.app.isLightTheme)
    const isDone = useSelector((state: RootState) => state.app.isDone)

    useEffect(() => {
        if (text.isStarted) {
            const interval = setInterval(() => {
                dispatch(setTime())
                dispatch(setSpeed())
            }, 1000)
            if (isDone) {
                clearInterval(interval)
            }
            return function cleanup() {
                clearInterval(interval)
            }
        }

    }, [text.isStarted, isDone, dispatch])


    useEffect(() => {

        dispatch(loadText(text.language))

    }, [dispatch])

    const keydownHandler = useCallback((event) => {
        dispatch(setIsStarted(true))
        dispatch(setTotalCount())
        const currentSymbol = text.symbols.find((i) => i.isActive)

        if (langCheck(text.language, event)) {
            dispatch(setAlertShow(true))
        } else {
            dispatch(setAlertShow(false))
        }
        if (currentSymbol && (event.key === currentSymbol.value)) {

            const payload = text.symbols.map((i) => {
                if (currentSymbol && (i.id === currentSymbol.id + 1) ) {
                    dispatch(setCounter())

                    return {...i, isActive: true}
                }
                return {...i, isActive: false, isWrong: false}
            })
            dispatch(setState(payload))

        } else {
            const payload = text.symbols.map((i) => {

                if (currentSymbol && i.id === currentSymbol.id) {
                    return {...i, isActive: true, isWrong: true}
                }
                return {...i, isActive: false, isWrong: false}
            })
            dispatch(setState(payload))
        }

        dispatch(setAccuracy())

        if (text.symbols.length  === text.counter + 1) {
            dispatch(setIsDone(true))
            dispatch(setModalShow())
        }
    }, [text, dispatch])


    useEffect(() => {
        document.addEventListener('keypress', keydownHandler, false)

        return () => {
            document.removeEventListener('keypress', keydownHandler, false)
        }
    }, [keydownHandler])

    const themeStyles = isLightTheme
        ?
        ('border w-75 p-3 rounded float-left ' + cls.lightTextarea)
        :
        ('border w-75 p-3 rounded float-left ' + cls.darkTextarea)

    return (
        <div>
            <div className={themeStyles + ' ' + cls.wrapper} style={{fontSize: text.fontSize + 'px'}}>
                {text.symbols.map((i) => {
                    if (i.isActive && !i.isWrong) {
                        return <span key={i.id} className={cls.symbolGreen}>{i.value}</span>
                    }
                    if (i.isActive && i.isWrong) {
                        return <span key={i.id} className={cls.symbolRed}>{i.value}</span>
                    }
                    return (
                        <span key={i.id}>{i.value}</span>
                    )
                })
                }
            </div>
        </div>
    )
}