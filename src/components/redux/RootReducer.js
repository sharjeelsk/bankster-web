import userReducer from './user/userReducer'
import socketReducer from './socket/socketReducer'
import flagReducer from './flags/flagReducer'
import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loadingReducer from './loading/loadingReducer'

const socketPersistConfig = {
    key: 'socket',
    storage: storage,
    blacklist: ['state']
  }

export default combineReducers({
    banksterUser:userReducer,
    flag:flagReducer,
    loading:loadingReducer,
    socket:persistReducer(socketPersistConfig,socketReducer)
})