import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    alertIsShow: false,
    modalIsShow: true,
    isLightTheme: true,
    isDone: false
}

const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setIsDone: (state, action) => {
            return {
                ...state,
                isDone: action.payload
            }
        },

        setModalShow: (state) => {
            return {
                ...state,
                modalIsShow: !state.modalIsShow
            }
        },

        setAlertShow: (state, action) => {
            return {
                ...state,
                alertIsShow: action.payload
            }
        },

        setLightTheme: (state) => {
            return {
                ...state,
                isLightTheme: !state.isLightTheme
            }
        }
    },
    extraReducers: {}
})

export const {setAlertShow, setModalShow, setLightTheme, setIsDone} = appReducer.actions

export default appReducer.reducer