import { useContext, useState } from "react"
import { LoanContext } from "../LoanContext";

export function LoanCard(props) {
    const loanCardStyle = {
        color: "white",
        "border-radius": "25px",
        border: "2px solid blue",
        padding: "20px",
    }

    const loans = useContext(LoanContext);
    const loan = loans[props.index];

    function handleChangePrincipal(newValue) {
        props.editLoan(props.index, newValue, loan.rate);
    }

    function handleChangeRate(newValue) {
        props.editLoan(props.index, loan.principal, newValue);
    }

    return (
        <div style={loanCardStyle}>
            <text>
                Title
            </text>
            <input 
                title="principalSlider"
                type="range"
                value={loan.principal}
                step="1000"
                min="0"
                max="200000"
                onChange={(newValue) => handleChangePrincipal(newValue.target.value)}
            />
            <p style={{color: "black"}}>{loan.principal}</p>
            <input 
                title="rateSlider"
                type="range"
                min="0"
                max="100"
                value={loan.rate}
                onChange={(newValue) => handleChangeRate(newValue.target.value)}
            />
        </div>
    )
}