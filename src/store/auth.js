import {createSlice} from "@reduxjs/toolkit";

// to add a new piece of data we just need to add the data to the intial and the state we are returning

const intialAuthState = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: intialAuthState,
    reducers: {
        // technically we shouldn't mutate the state but its fine here
        login(state) {
            state.isAuthenticated = true;
        },

        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

/**
 * @IMP its @reducer and not @reducers. Also don't be confused because createSlice is returning 
 * and we are passing the reducers inside it as an object
 */

export const authActions = authSlice.actions;
export default authSlice.reducer;