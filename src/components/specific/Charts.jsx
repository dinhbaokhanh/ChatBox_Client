import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from 'chart.js'
import { lightBlue, lightOrange, orange } from '../../constants/color'
import { getLast7Days } from '../../lib/features'

const labels = getLast7Days()

ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
)

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
}

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: 'Messages',
        fill: true,
        backgroundColor: lightOrange,
        borderColor: orange,
      },
    ],
  }

  return <Line data={data} options={lineChartOptions} />
}

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
}

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: 'Total Chats and Group Chats',
        backgroundColor: [lightOrange, lightBlue],
        hoverBackgroundColor: [orange, 'blue'],
        borderColor: [orange, lightBlue],
        offset: 35,
      },
    ],
  }
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={doughnutChartOptions}
    />
  )
}

export { LineChart, DoughnutChart }
