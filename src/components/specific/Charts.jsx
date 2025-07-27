import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import React from 'react';
import { Doughnut, Line } from "react-chartjs-2";
import { purple, orangeLight, purpleLight, orange } from '../../constants/color';
import { getLast7Days } from '../../lib/features';


ChartJS.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);
// variables
const labels = getLast7Days();


const LineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
};

// LineChart Component
const LineChart = ({ value = [] }) => {
    const data = {
        labels,
        datasets: [{
            data: value,
            label: "Chats",
            fill: true,
            backgroundColor: purpleLight,
            borderColor: purple
        }]
    }
    return (
        <Line data={data} options={LineChartOptions} />
    )
}

const DoughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false
        },
    },
    cutout: 90,
};
// DoughnutChart Component
const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [{
            data: value,
            backgroundColor: [purpleLight, orangeLight],
            hoverBackgroundColor: [purple, orange],
            hoverBorderColor: [purple, orange],
            borderColor: [purple, orange],
            offset: 20
        },
        ]
    };

    return <Doughnut style={{ zIndex: "10" }} data={data} options={DoughnutChartOptions} />
}

export { DoughnutChart, LineChart };

