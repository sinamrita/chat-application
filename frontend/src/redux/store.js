import {configureStore,combineReducers} from "@reduxjs/toolkit"
import conversationReducer from "./slice/conversationSlice"

const rootReducer =  combineReducers({
    conversation : conversationReducer
})

const store = configureStore({
    reducer : rootReducer,
    devTools : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export default store