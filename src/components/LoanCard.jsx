import { useState } from "react"

export function LoanCard(props) {
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    return (
        <>
            <text>
                Title
            </text>
            <input 
                title="principalSlider"
                type="range"
                value={principal}
                onChange={(newValue) => setPrincipal(newValue.target.value)}
            />
            <p>{principal}</p>
            <input 
                title="rateSlider"
                type="range"
                min="0"
                max="100"
                value={rate}
                onChange={(newValue) => setRate(newValue.target.value)}
            />
        </>
    )
}