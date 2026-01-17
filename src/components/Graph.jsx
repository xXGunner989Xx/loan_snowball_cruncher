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

/**
 * 
 * @param {Date} date 
 * @returns {string} YYYY-mm
 */
function generateDateString(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month.toString()}` : `${month.toString()}`;
  return `${year.toString()}-${formattedMonth}`
}

/**
 * 
 * @param {number[][]} data 
 * @returns {string[]}
 */
function getDateLabelsFromData(data) {
    if (data.length >= 1) {
        const ret = [];
        let curr = new Date();
        ret.push(generateDateString(curr));
        data[0].forEach(point => {
            curr.setMonth(curr.getMonth() + 1);
            ret.push(generateDateString(curr));
        })
        return ret;
    }
    return [];
}

export function Graph(props) {
    const style = {
        flex: 2,
        background: '#e0e7ff', // just for illustration
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: 'Chart.js Line Chart',
            },
        },
    };

    const formattedSeries = props.series.map((arr, i) => {
        return {
            label: i.toString(),
            data: arr
        }
    });

    const labels = getDateLabelsFromData(props.series);
    const data = {
        labels,
        datasets: formattedSeries
    }

    return (
        <div style={style}>
            <Line options={options} data={data} />
        </div>
    )
}