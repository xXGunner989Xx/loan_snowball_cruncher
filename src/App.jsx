import './App.css';
import { Form } from './components/Form'
import { useReducer } from 'react';
import { LoanContext } from './LoanContext';
import { SimpleLoan } from './loans/Loan'
import { Graph } from './components/Graph';

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case 'add-loan':
        return {
          loans: state.loans.concat(action.loan)
        }
      case 'edit-loan':
        const loans = state.loans;
        loans[action.index].principal = action.principal;
        loans[action.index].rate = action.rate;
        return {
          loans: loans
        }
    }
  }

  function handleAddNewLoan() {
    dispatch({
      type: 'add-loan',
      loan: new SimpleLoan(0, 0, 0, 0)
    });
  }

  function handleEditLoan(index, principal, rate) {
    dispatch({
      type: 'edit-loan',
      index: index,
      principal: principal,
      rate: rate
    })
  }

  const [state, dispatch] = useReducer(reducer, { loans: [] });

  return (
    <div style={{
      display: 'flex',
      height: '400px', // adjust as needed
      width: '100%',   // adjust as needed
      gap: '16px'      // optional: space between graph and form
    }}>
      <LoanContext value={state.loans}>
        <Graph />
        <Form addLoan={handleAddNewLoan} editLoan={handleEditLoan} />
      </LoanContext>
    </div>
  );
}

export default App;
