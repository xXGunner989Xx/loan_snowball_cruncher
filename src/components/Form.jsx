
import { useContext } from 'react';
import { LoanCard } from './LoanCard';
import { LoanContext } from '../LoanContext';

export function Form(props) {
    const loans = useContext(LoanContext);
    console.log(loans);
    return (
        <>
        {loans.map(loan => 
            <LoanCard />
        )}
        <button onClick={props.addLoan}>+</button>
        </>
    );
}