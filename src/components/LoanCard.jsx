import { useContext, useState } from "react"
import { LoanContext } from "../LoanContext";
import { EditableTitle } from "./EditableTitle";

export function LoanCard(props) {
    const loanCardStyle = {
        "border-radius": "25px",
        border: "2px solid blue",
        padding: "20px",
    }

    const loans = useContext(LoanContext);
    const loan = loans[props.index];

    function handleChangePrincipal(newValue) {
        props.editLoan(props.index, newValue, loan.rate, loan.minPayment);
    }

    function handleChangeRate(newValue) {
        props.editLoan(props.index, loan.principal, newValue, loan.minPayment);
    }

    function handleChangeMinPayment(newValue) {
        props.editLoan(props.index, loan.principal, loan.rate, newValue);
    }

    return (
        <div style={loanCardStyle}>
            <EditableTitle index={props.index + 1}/>
            <input 
                title="principalSlider"
                type="range"
                value={loan.principal}
                step="1"
                min="0"
                max="200000"
                onChange={(newValue) => handleChangePrincipal(newValue.target.value)}
            />
            <input
                title="principalNumeric"
                type="number"
                min="0"
                max="200000"
                value={loan.principal}
                onChange={(newValue) => handleChangePrincipal(newValue.target.value)}
            />
            <div />
            <input 
                title="rateSlider"
                type="range"
                min="0"
                max="30"
                step="0.01"
                value={loan.rate}
                onChange={(newValue) => handleChangeRate(newValue.target.value)}
            />
            <input
                title="rateNumeric"
                type="number"
                min="0"
                max="30"
                value={loan.rate}
                onChange={(newValue) => handleChangeRate(newValue.target.value)}
            />
            <div />
            <input 
                title="minPaymentSlider"
                type="range"
                min="0"
                max="5000"
                step="1"
                value={loan.minPayment}
                onChange={(newValue) => handleChangeMinPayment(newValue.target.value)}
            />
            <input
                title="minPaymentNumeric"
                type="number"
                min="0"
                max="5000"
                value={loan.minPayment}
                onChange={(newValue) => handleChangeMinPayment(newValue.target.value)}
            />
        </div>
    )
}