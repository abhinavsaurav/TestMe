
import {createStore} from 'redux';

/**
 * we are using reduxjs/toolkit to simplify somewhat i guess
 * When we install @reduxjs/toolkit we install redux with it so we don't need to install it seprately 
 * i guess. 
 * 
 * There also is a createReducer function which allows us to create a reducer with certain enhancement
 * but createSlice is even more powerfull than createReducer and it simplifies couple of aspects in one go
 * 
 * @IMP also if we have different slices then we have to provide the reducers to createStore but it would be
 *      a problem as it should contain one arg
 *      we could use combineReducers from redux but the toolkit provides a configureStore which
 *      is more useful and easier i guess
 * 
 *      Redux expects a main reducer
 * 
 * @param configureStore is used for configuration of redux so we can make use of it instead of 
 *          createStore and then it takes a obj with reducer as a key arg to which we can provide a 
 *          object map which will then be merged internally as one big reducer 
 */
import {
    //  createSlice,
     configureStore} from '@reduxjs/toolkit';

import authReducer from "./auth";
import counterReducer from "./counter";


const store = configureStore({
    //  reducer: { counter: counterSlice.reducer}
    // reducer: counterSlice.reducer

    reducer: { 
        /**
         *   // both these will be merged internally by toolkit. Also make a note its @reducer 
         *      not @reducers below based on the slices we are creating 
         * 
         * */
        counter: counterReducer,
        auth: authReducer
    }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;



// const countReducer = (state = initialState,action) => {

//     /**
//      * If we suppose forgot adding a value like showCounter
//      * and we are returning a state then that value which we forgot will be treated
//      * as undefined and so for example showCounter will be undefined and that means it will be false
//      * suppose that if we forgot it in increment it will not show the value after the button gets
//      * pressed
//      * 
//      * @IMP we must set the other state which we are not using so that we are 
//      *      overriding the default state and it doesn't causes bugs
//      */

//     if(action.type === 'increment'){
//         // SUPER IMP - we should never mutate the existing state like state.counter++ 
//         // and always update the state in an immutable way  
//         return {
//             counter: state.counter+1,
//             showCounter: state.showCounter
//         };
//     }

//     if(action.type === 'increase'){
//         // property used here should have the same name as to extract the data
//         // otherwise we won't be able to extract the data
//         return { 
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter
//         };
//     }

//     if(action.type === 'decrement'){
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         };
//     }

//     if(action.type === 'toggle'){
//         return {
//             showCounter: !state.showCounter,
//             counter: state.counter
//         }
//     }

//     return state;
// };

// const store = createStore(countReducer);

// export default store;
