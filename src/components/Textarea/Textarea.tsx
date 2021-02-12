import React, {useCallback, useEffect, useState} from 'react'
import cls from './Textarea.module.css'
import {textApi} from '../../api/api'

export const Textarea: React.FC = () => {
    const [text, setText] = useState([
        {id: 0, value: null, isActive: false, isWrong: false}
    ])


    useEffect(() => {
        async function loadText() {
            const data = await textApi()
            const text = data.split('').map((symbol: string, index: number) => {
                if (index === 0) {
                    return (
                        {id: index, value: symbol, isActive: true, isWrong: false}
                    )

                }
                return (
                    {id: index, value: symbol, isActive: false, isWrong: false}
                )
            })
            setText(text)

        }

        loadText()

    }, [])

    const keydownHandler = useCallback((event) => {

        const currentSymbol = text.find(i => i.isActive)

        if (currentSymbol && (event.key === currentSymbol.value)) {

            setText(prevState => {

                return (
                    prevState.map(i => {

                        if (currentSymbol && i.id === currentSymbol.id + 1) {
                            return {...i, isActive: true}
                        }
                        return {...i, isActive: false, isWrong: false}
                    })
                )


            })
            console.log('1', text)

        } else {

            setText(prevState => {

                return (

                    prevState.map(i => {

                        if (currentSymbol && i.id === currentSymbol.id) {
                            return {...i, isActive: true, isWrong: true}
                        }
                        return {...i, isActive: false, isWrong: false}
                    })
                )


            })
        }
    }, [text])


    useEffect(() => {
        document.addEventListener('keydown', keydownHandler, false)

        return () => {
            document.removeEventListener('keydown', keydownHandler, false)
        }
    }, [keydownHandler])


    return (
        <div>
            {console.log('2', text)}
            <div className={cls.wrapper}>
                {text.map((i) => {
                    if (i.isActive && !i.isWrong) {
                        return <span key={i.id} className={cls.symbGreen}>{i.value}</span>
                    }
                    if (i.isActive && i.isWrong) {
                        return <span key={i.id} className={cls.symbRed}>{i.value}</span>
                    }
                    return (
                        <span key={i.id} className={cls.symbBlue}>{i.value}</span>
                    )
                })
                }
            </div>
        </div>
    )
}