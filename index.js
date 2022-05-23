
// 1st step

export const fetchTheDataFromAPI = createAsyncThunk(
  "fetch/fetchTheDataFromAPI",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get() || axios.post() ;
      if (response && response.status === 200) {
        return response?.data.data;
      }
    } catch (error) {
      return error;
    }
  }
);

const fetchTheDataFromAPILabsSlice = createSlice({
  name: "Mastedata",
  initialState: {
    LabsHistory: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchTheDataFromAPI.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTheDataFromAPI.fulfilled]: (state, action) => {
      state.loading = false;
      state.LabsHistory = action.payload;
    },
    [fetchTheDataFromAPI.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default fetchTheDataFromAPILabsSlice.reducer;














/// 2nd step

import { combineReducers } from "redux";

import fetchTheDataFromAPILabsSlice from "./LabsRadiology/fetchTheDataFromAPILabsSlice";
const rootReducer = combineReducers({
  fetchTheDataFromAPILabsSlice : fetchTheDataFromAPILabsSlice,

})

export default rootReducer;




// 3rd step

import rootReducer from './Store/rootReducer'
import { createStore, applyMiddleware } from 'redux'
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...Middleware))

)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);




// 4th step how to use in code 

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const dispatch = useDispatch();
const LabHistoryData = useSelector(
  (state) => state.fetchTheDataFromAPILabsSlice.LabsHistory
)
  useEffect(() => {
    dispatch(fetchTheDataFromAPI(userId))
  }, [])
