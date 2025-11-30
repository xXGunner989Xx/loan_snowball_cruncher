
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
        
    return (
        <div style={formStyle}>
        {loans.map((_, index) => 
            <LoanCard key={index} index={index} editLoan={props.editLoan}/>
        )}
        <button disabled={!addLoanButtonEnabled} onClick={props.addLoan}>+</button>
        </div>
    );
}