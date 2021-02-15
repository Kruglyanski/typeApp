import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {textApiEng, textApiRus} from '../api/api'


export type SymbolsArrayType = {
    id: number
    value: string | null
    isActive: boolean
    isWrong: boolean
}
export type TextareaReducerType = {
    symbols: Array<SymbolsArrayType>
    counter: number
    totalCount: number
    time: number
    fontSize: number
    speed: number
    accuracy: number
    language: string | null
    isStarted: boolean
}

const initialState = {
    symbols: [{
        id: 0,
        value: null,
        isActive: false,
        isWrong: false
    }],
    fontSize: 14,
    counter: 0,
    totalCount: 0,
    time: 0,
    speed: 0,
    accuracy: 100,
    language: null,
    isStarted: false

} as TextareaReducerType

export const loadText = createAsyncThunk(
    'authReducer/setAuth',
    async (lang: string | null) => {
        let data = ''
         switch (lang) {
            case 'English':
                data = await textApiEng()
                break
             case 'Русский':
                data = await textApiRus()
                break
            default:
                break
        }

        return data.split('').map((symbol: string, index: number) => {
            if (index === 0) {
                return (
                    {id: index, value: symbol, isActive: true, isWrong: false}
                )

            }
            return (
                {id: index, value: symbol, isActive: false, isWrong: false}
            )
        })

    }
)

const textareaReducer = createSlice({
    name: 'textareaReducer',
    initialState,
    reducers: {
        setIsStarted: (state, action) => {
            return {
                ...state,
                isStarted: action.payload
            }
        },
        setState: (state, action) => {
            return {
                ...state,
                symbols: action.payload,
                isFetched: true
            }
        },
        nullifyState: (state) => {
            return {
                ...state,
                isFetched: false,
                counter: 0,
                totalCount: 0,
                time: 0,
                speed: 0,
                accuracy: 100
            }
        },
        setLanguage: (state, action) => {
            return {
                ...state,
                language: action.payload,
            }
        },
        setTime: (state) => {
            return {
                ...state,
                time: state.time + 1,
            }
        },

        setCounter: (state => {
            return {
                ...state,
                counter: state.counter + 1
            }
        }),
        setTotalCount: (state => {
            return {
                ...state,
                totalCount: state.totalCount + 1
            }
        }),
        setSpeed: ((state) => {
            return {
                ...state,
                speed: (state.counter / state.time * 60)
            }
        }),
        setAccuracy: ((state) => {
            return {
                ...state,
                accuracy:  (state.counter  / state.totalCount) * 100
            }
        }),

        incFont: (state) => {
            return {
                ...state,
                fontSize: state.fontSize + 1
            }
        },

        decFont: (state) => {
            return {
                ...state,
                fontSize: state.fontSize - 1
            }
        }
    },

    extraReducers: builder => {
        builder.addCase(loadText.fulfilled, (state, action) => {
            return {
                ...state,
                symbols: action.payload
            }

        })
    }
})

export const {setIsStarted, setState, setTime, nullifyState, setLanguage, incFont, decFont, setCounter, setTotalCount, setSpeed, setAccuracy} = textareaReducer.actions

export default textareaReducer.reducer