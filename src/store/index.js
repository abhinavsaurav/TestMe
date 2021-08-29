
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
import {createSlice, configureStore} from '@reduxjs/toolkit';

// to add a new piece of data we just need to add the data to the intial and the state we are returning
const initialState =  {counter: 0, showCounter: true }

// createSlice wants an object as a argument
// when we have different pieces of state which are not related we could create different slices
// but since counter and showCounter are related we are creating only one slice

// Also createSlice create unique action identifier for our action 
// 
const counterSlice= createSlice({
    name: 'counter', // name of the slice
    initialState,    // using es6 key: val which are same
    reducers: {         
        /**
         *  reducers is a map of all the reducers this state slice use
         *  every method will receive a piece of state and also the action
         *  */   
        increment(state){
            //we can use the below code because the toolkit will create a copy of the object and then update it
            // in a immutable way
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state, action) {
            // payload will hold any extra data which we might be dispatching
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

/**
 * These methods(toggleCounter) on the actions object here
    which we can call will create action objects for us.
    Therefore these methods are called action creators
    and they will create action objects
   -> for us where these objects already have a type property
    with a unique identifier per action.
    Automatically created behind the scenes.
    So we don't have to worry about action identifiers.

    We don't have to create those action objects on our own.

    We can tap into this actions key into this actions object on our createSlice
    and execute these action creator methods, which with their name match our reducer methods
    to dispatch actions, which will then ultimately trigger those different reducer methods.
    That's how this works now. And that means that we, as a developer,
    don't have to worry about creating action objects on our own
    and about coming up with @unique_identifiers
    and about avoiding typos. 

    Also, we are exporting thesse action and then we can go to the file where we need 
    the actions (in our case rn the counter.js file)
 */
// counterSlice.actions.toggleCounter

const store = configureStore({
    //  reducer: { counter: counterSlice.reducer}
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;
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
