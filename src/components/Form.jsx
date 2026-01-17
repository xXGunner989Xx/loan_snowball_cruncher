
import { useContext } from 'react';
import { LoanCard } from './LoanCard';
import { LoanContext } from '../LoanContext';

export function Form(props) {
    const formStyle = {
        flex: 1,
        overflow: "auto",
        height: "100%"
    }
    const loans = useContext(LoanContext);

    const addLoanButtonEnabled = loans.length < 20
        ? true
        : false;
    
        const deleteLoanButtonEnabled = loans.length === 0;
        
    return (
        <div style={formStyle}>
            {loans.map((_, index) => 
                <LoanCard key={index} index={index} editLoan={props.editLoan}/>
            )}
            <div />
            <text>Simulate extra payment: </text>
            <input type="number" min="0" onChange={(value) => props.setExtraPayment(value.target.value)} />
            <div />
            <button id="1" disabled={!addLoanButtonEnabled} onClick={props.addLoan}>+</button>
            <button id="2" disabled={deleteLoanButtonEnabled} onClick={props.deleteLoan}>-</button>
        </div>
    );
}