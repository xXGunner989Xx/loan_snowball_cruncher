import './App.css';
import { Form } from './components/Form'
import { useReducer } from 'react';
import { LoanContext } from './LoanContext';
import { SimpleLoan } from './loans/Loan'

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case 'add-loan':
        return {
          loans: state.loans.concat(action.loan)
        }
    }
  }

  function handleAddNewLoan() {
    dispatch({
      type: 'add-loan',
      loan: new SimpleLoan(0, 0, 0, 0)
    });
  }

  const [state, dispatch] = useReducer(reducer, { loans: [] });

  return (
    <div className="App">
      <header className="App-header">
        <LoanContext value={state.loans}>
          <Form addLoan={handleAddNewLoan} />
        </LoanContext>
      </header>
    </div>
  );
}

export default App;
