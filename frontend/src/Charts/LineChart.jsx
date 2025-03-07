import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, LineController, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(LineController, LinearScale, PointElement, LineElement);

// Chart.register(LineElement, LinearScale, PointElement);

const LineChart = () => {

    const [lineChartData, setLineChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:8080/auth/getPlacedPercentage')
            .then(res => {
                setLineChartData(res.data.Result);
            })
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    useEffect(() => {
        // Create or update the chart when lineChartData changes
        if (lineChartData && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: lineChartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Percentage of Students',
                                font: {
                                    size: 16,
                                },
                            },
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                },
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Year',
                                font: {
                                    size: 16,
                                },
                            },
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Percentage of Students Placed Over Years',
                            font: {
                                size: 20,
                            },
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            });
        }
    }, [lineChartData]);

    return (
        <div>

            <div className='d-flex justify-content-center bg-white p-3 border border-primary rounded-3'>
                <h2>Percentage of Students Placed Over Years</h2>
            </div>
            {lineChartData && (
                <Line data={lineChartData} />
            )}
        </div>
    )
}

export default LineChart