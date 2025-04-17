import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

// Combine reducers first
const rootReducer = combineReducers({ 
  auth: authReducer,
})

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      },
    })
})

export const persistor = persistStore(store)
