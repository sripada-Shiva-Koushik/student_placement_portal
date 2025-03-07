import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut from react-chartjs-2
import axios from 'axios';


const DonutChart = () => {

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
        if (lineChartData && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: lineChartData,
                options: {
                    cutout: '80%', // Adjusts the size of the hole in the center
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
            <h2>Percentage of Students Placed Over Years</h2>
            {lineChartData && (
                <canvas ref={chartRef}></canvas>
            )}
        </div>
    )
}

export default DonutChart