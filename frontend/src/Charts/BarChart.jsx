import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ studentCount, studentCSECount, studentITCount }) => {
    const data = {
        labels: ['CSE', 'IT', 'Total'],
        datasets: [
            {
                data: [studentCSECount, studentITCount, studentCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: function(context) {
                        return 'Number of students: ' + context.parsed.y;
                    },
                },
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
        },
    };

    return (
        <div style={{ width: '100%', margin: '20px 0' }}>
         <div style={{ width: '100%', margin: '20px 0', textAlign: 'center' }}>
    <h3 style={{ fontWeight: 'bold', fontFamily: 'Courier New' }}>
        <u>Student Distribution by Department</u>
    </h3>
</div>

            <div style={{ height: '400px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default BarChart;
