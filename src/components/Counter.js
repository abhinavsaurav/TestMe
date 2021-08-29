/**
 * 
 * useSelector Hook is a custom hook made by the react-redux team
 * 
 * useStore hook which is used to give direct access to the store
 * 
 * 
 * But useSelector is a bit more convinent to use because that allows to select part of the state managed by the store
 *  
 * if we are using a class based component then we are going to use a connect function
 * 
 * to dispatch the action we can make use of useDispatch
 */
// import { Component } from 'react';
import { 
   useSelector,
   useDispatch,
  //  connect 
  } from 'react-redux';
import { counterActions  } from '../store/counter';

  import classes from './Counter.module.css';

const Counter = () => {

  // it takes a function which will then be executed by react-redux a function which will determine which piece of data
  // we want to extract from our store
  // we will receive the state managed by redux and then we will basically ask what we want which then gets returned 
  // Also using this react-redux will auto enable the subscription for it . Also on unmounting react-redux will automatically remove the subsription for us
  
  const counter = useSelector(state => state.counter.counter);
  const dispatch = useDispatch(); // don't need to pass a arg but we can now make use of the intialization to dispatch our actions


  // showCounter is in our redux state and we are accessing the counter slice and accessing it
  const show = useSelector(state => state.counter.showCounter);

  // no changes made to counterActions as it contains the same method
  const incrementHandler = () => {
    
    dispatch(counterActions.increment()); 

    // dispatch({type: 'increment'});
  };

  const increaseHandler = () => {
    // we can pass the payload directly in the method like a number or an object
    //for toolkit all we have to do is below the comment part is what redux will do and the 
    // value which we will pass will be assigned to the payload (its something which is done and we arent giving this name by ourself)
    dispatch(counterActions.increase(10));  // {type: SOME_UNIQUE_IDENTIFIER, payload: 10}

    // // HARD CODED HERE <-> REMOVE (-)_(-)
    // // Hard coded just to check it out we can make use of the input fields to remove this value
    // dispatch({type:'increase', amount: 5})
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());

    // dispatch({type : 'decrement'});
  };


  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());

    // dispatch({type: 'toggle'});
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     {show && <div className={classes.value}>{counter}</div>}
      <div>
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={increaseHandler}>Increase by 10</button>
      <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;


// class Counter extends Component{

//   incrementHandler(){
//     this.props.increment();
//   }

//   decrementHandler(){
//     this.props.decrement();
//   }

//   toggleCounterHandler(){

//   }

//   render(){
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           {/* we are binding to make sure the this keyword inside of the method refers to the class */}
//         <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//         <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // this is the function which receives the redux state and will 
// const mapStateToProps = state => {
//   /**
//    * we pick the counter value from state and we are binding it here to the other
//    */
//   return {
//     counter: state.counter
//   };
// }

// // equivalent to useDispatch and will be executed for us by redux
// const mapDispatchToProps = dispatch => {
//   /**
//    * the keys are prop names which we can then use in the component and the value is another function 
//    * in which we call dispatch and we set-up dispatch
//    */
//   return {
//     increment: () => dispatch({type: 'increment'}),
//     decrement: () => dispatch({type: 'decrement'})
//   }
// };

// // connect when executed will pass a function to which we then pass a argument which is our class, Also,
// // when using connect also react-redux will still setup a subscription and manage the subscription for us
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
