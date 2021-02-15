import React from 'react'
import './App.css'
import {Textarea} from './components/Textarea/Textarea'
import {Statistics} from './components/Statistics/Statistics'
import {AppAlert} from './components/Alert/Alert'
import {useSelector} from 'react-redux'
import {ModalContainer} from './components/Modal/ModalContainer'
import {RootState} from './store/rootReducer'


function App() {
    const alertIsShow = useSelector((state:RootState) => state.app.alertIsShow)
    const isLightTheme = useSelector((state:RootState) => state.app.isLightTheme)
    const themeStyles = isLightTheme ? 'p-3 mb-2 bg-primary text-white' : 'p-3 mb-2 bg-dark text-light'
    return (
        <div className={'App ' + themeStyles}>
            {alertIsShow && <AppAlert/>}
            <Textarea/>
            <Statistics/>
            <ModalContainer/>
        </div>
    )
}

export default App
