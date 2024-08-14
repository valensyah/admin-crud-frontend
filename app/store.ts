import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/utils/user'
import categoryReducer from '@/utils/category'
import productReducer from '@/utils/product'
import transactionReducer from '@/utils/transaction'

export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    transaction: transactionReducer
  }
})