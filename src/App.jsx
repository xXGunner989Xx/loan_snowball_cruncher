import './App.css';
import { Form } from './components/Form'
import { useReducer } from 'react';
import { LoanContext } from './LoanContext';
import { SimpleLoan } from './loans/Loan'
import { Graph } from './components/Graph';
import { generateSeries } from './loans/payoff';
import { useState } from 'react';

function App() {
  function reducer(state, action) {
    const loans = state.loans;
    switch (action.type) {
      case 'add-loan':
        return {
          loans: loans.concat(action.loan)
        }
      case 'edit-loan':
        loans[action.index].principal = Math.round(action.principal * 100) / 100;
        loans[action.index].rate = Math.round(action.rate * 100) / 100;
        loans[action.index].minPayment = Math.round(action.minPayment * 100) / 100
        return {
          loans: loans
        }
      case 'delete-loan':
        if (loans && loans.length === 0) {
          return;
        }
        return {
          loans: loans.slice(0, loans.length - 1)
        };
      default:
        break;
    }
  }

  const [graphSeries, setGraphSeries] = useState([]);
  const [extraPayment, setExtraPayment] = useState(0);

  function handleAddNewLoan() {
    dispatch({
      type: 'add-loan',
      loan: new SimpleLoan(0, 0, 0, 0)
    });
  }

  function handleEditLoan(index, principal, rate, minPayment) {
    dispatch({
      type: 'edit-loan',
      index: index,
      principal: principal,
      rate: rate,
      minPayment: minPayment
    })
  }

  function handleDeleteLoan() {
    dispatch({
      type: 'delete-loan'
    });
  }

  const [state, dispatch] = useReducer(reducer, { loans: [] });

  return (
      <LoanContext value={state.loans}>
        <div style={{
          display: 'flex',
          height: '400px', // adjust as needed
          width: '100%',   // adjust as needed
          gap: '16px'      // optional: space between graph and form
        }}>
          <Graph series={graphSeries}/>
          <Form setExtraPayment={setExtraPayment} addLoan={handleAddNewLoan} editLoan={handleEditLoan} deleteLoan={handleDeleteLoan} />
        </div>
        <div>
          <button onClick={() => generateSeries(state.loans, extraPayment, setGraphSeries)}>
            Calculate Snowball
          </button>
        </div>
      </LoanContext>
  );
}

export default App;
