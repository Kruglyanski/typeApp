import {configureStore, combineReducers} from '@reduxjs/toolkit'
import textareaReducer from './textareaReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    textarea: textareaReducer,
    app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer

})

