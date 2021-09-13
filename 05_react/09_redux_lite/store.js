class Store {
  constructor(rootReducer, appliedMiddleware) {
    this.rootReducer = rootReducer;
    this.state = rootReducer({}, { type: '@@redux_lite/init' }, []);
    this.subscriptions = [];
    appliedMiddleware(this);
  }

  getState() {
    return { ...this.state };
  }

  dispatch(action) {
    this.state = this.rootReducer(this.getState(), action, this.subscriptions);
    return this.getState();
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
    return () => {
      this.subscriptions.splice(this.subscriptions.indexOf(callback), 1);
    };
  }
}

const combineReducers = (reducers) => (prevState, action, subscriptions) => {
  let stateChanged = false;
  const nextState = {};

  Object.entries(reducers).forEach(([slice, sliceReducer]) => {
    nextState[slice] = sliceReducer(prevState[slice], action);

    if (nextState[slice] !== prevState[slice]) {
      stateChanged = true;
    }
  });

  if (stateChanged) {
    subscriptions.forEach((subscription) => subscription(nextState));
  }

  return nextState;
};

function applyMiddleware(...middlewares) {
  return (store) => {
    let next = store.dispatch.bind(store);
    middlewares.reverse().forEach((middleware) => {
      next = middleware(store)(next);
    });
    store.dispatch = next;
  };
}

const reduxLogger = (store) => (next) => (action) => {
  console.log('%cPrevious state: ', 'color: red');
  console.log(JSON.stringify(store.getState()));

  console.log('%cAction: ', 'color: blue');
  console.log(JSON.stringify(action));
  const nextState = next(action);

  console.log('%cNew state: ', 'color: green');
  console.log(JSON.stringify(nextState));
  console.log('-------------------------------------------------');

  return nextState;
};

const addActionCreator = (value) => ({
  type: 'add',
  value,
});

const subtractActionCreator = (value) => ({
  type: 'subtract',
  value,
});

const noChangeActionCreator = (value) => ({
  type: 'no change',
  value,
});

const numberReducer = (num = 0, action) => {
  switch (action.type) {
    case 'add':
      return num + action.value;
    case 'subtract':
      return num - action.value;
    default:
      return num;
  }
};

const rootReducer = combineReducers({
  number: numberReducer,
});

const appliedMiddleware = applyMiddleware(reduxLogger);

const store = new Store(rootReducer, appliedMiddleware);

console.log('%cInitial state: ', 'color: green');
console.log(JSON.stringify(store.getState())); // => { number: 0 }
console.log('-------------------------------------------------');

const announceStateChange = (nextState) => {
  console.log(
    `That action changed the state! Number is now ${nextState.number}`
  );
};

store.subscribe(announceStateChange);

store.dispatch(addActionCreator(5)); // => "That action changed the state! Number is now 5"
store.dispatch(addActionCreator(5)); // => "That action changed the state! Number is now 10"
store.dispatch(subtractActionCreator(7)); // => "That action changed the state! Number is now 3"
store.dispatch(noChangeActionCreator(7)); // => Nothing should happen! The reducer doesn't do anything for type "no change"
store.dispatch(addActionCreator(0)); // => Nothing should happen here either. Even though the reducer checks for the "add" action type, adding 0 to the number won't result in a state change.

console.log('%cFinal state: ', 'color: green');
console.log(JSON.stringify(store.getState())); // => { number: 3 }
console.log('-------------------------------------------------');
