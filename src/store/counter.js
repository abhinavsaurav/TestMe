import { createSlice } from "@reduxjs/toolkit";

const initialCounterState =  {counter: 0, showCounter: true }

// createSlice wants an object as a argument
// when we have different pieces of state which are not related we could create different slices
// but since counter and showCounter are related we are creating only one slice

// Also createSlice create unique action identifier for our action 

const counterSlice= createSlice({
    name: 'counter', // name of the slice
    initialState: initialCounterState, 
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


export const counterActions = counterSlice.actions;
export default counterSlice.reducer;