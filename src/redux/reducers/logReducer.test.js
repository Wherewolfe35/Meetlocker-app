import logReducer from "./logReducer";

const currentLog = logReducer.currentLog;

describe('Testing log reducers', () => {
  test('should take text', () => {
    let action={type:'CURRENT_LOG', payload: 'cheese'};
    let returnedState=currentLog('', action)
    expect(returnedState).toEqual({text:'cheese'});
  });
})