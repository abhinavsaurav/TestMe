/**
 * 
 * Only dependency is redux if you want to install also we can run it using node filename
 * 
 */
const redux = require("redux");

// adding default value to counter
const counterReducer = (state = { counter: 0 }, action) => {
        if (action.type === "increment") {
                return {
                        counter: state.counter + 1,
                };
        }

        if (action.type === "decrement") {
                return {
                        counter: state.counter - 1,
                };
        }
};

// store wants to know who will the reducer function will be
// who will be manipulating the data (so we pointed to it below)
// Then we need a action that can be dispatched
const store = redux.createStore(counterReducer);

// we can see default state by doing below
// console.log(store.getState());

// someone who subscribes to the store and this subscription function will be triggered
// whenever the state changes
const counterSubscriber = () => {
        const latestState = store.getState(); // this will get the latest stage
        console.log(latestState);
};

// Now we have to tell redux aware of the subscriber function
// we can do that by reaching out to the store
// we donot execute counterSubscriber we just point towards it
store.subscribe(counterSubscriber);

// action is a JS object with a type property
store.dispatch({ type: "increment" });

store.dispatch({ type: "decrement" });

/**
 * @Side_note Both the subscriber and reducer function will be executed by redux
 *
 */