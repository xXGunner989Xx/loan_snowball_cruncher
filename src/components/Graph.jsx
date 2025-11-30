import { Chart as ChartJS, Tooltip, Legend, CategoryScale, PointElement, LinearScale, LineElement, Title } from "chart.js";
import { Line } from "react-chartjs-2";
import { LoanContext } from "../LoanContext";
import { useMemo, useContext } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
)

export function Graph(props) {
    const style = {
        flex: 2,
        background: '#e0e7ff', // just for illustration
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    // useMemo(() => snowball(loans, extraPayment), [loans, extraPayment])
    const loans = useContext(LoanContext);

    const options = {
    responsive: true,
    plugins: {
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
    };

    const labels = ["January", "February", "March"];
    const data = {
        labels,
        datasets: [
            {
                label: "test",
                data: [0, 1, 2]
            }
        ]
    }

    return (
        <div style={style}>
            <Line options={options} data={data} />
        </div>
    )
}