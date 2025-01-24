import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const InsightsDashboard = () => {
  const salesData = [
    { month: "Jan", sales: 4000, target: 3000 },
    { month: "Feb", sales: 3500, target: 3000 },
    { month: "Mar", sales: 5000, target: 3000 },
    { month: "Apr", sales: 4500, target: 3000 },
    { month: "May", sales: 6000, target: 3000 },
  ];

  const marketShare = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 300 },
    { name: "Product D", value: 200 },
  ];

  const regionData = [
    { name: "North", value: 30 },
    { name: "South", value: 25 },
    { name: "East", value: 25 },
    { name: "West", value: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4">
      <div className="mb-6 bg-white rounded-lg shadow">
        <h1 className="p-4 text-2xl font-bold">ZeroBin Insights</h1>
        <div className="p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Total Orders Completed</h3>
              <p className="text-3xl font-bold">2034</p>
              <span className="text-green-500">↑ 12% vs last month</span>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Active Users</h3>
              <p className="text-3xl font-bold">1,234</p>
              <span className="text-green-500">↑ 8% vs last month</span>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Carbon Footprint Reduced</h3>
              <p className="text-3xl font-bold">2.4%</p>
              <span className="text-green-500">↑ 1% vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Stats</h2>
          <LineChart width={500} height={300} data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Market Share</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={marketShare}
              cx={250}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {marketShare.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Regional Distribution</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={regionData}
              cx={250}
              cy={150}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {regionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
          <BarChart width={500} height={300} data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
            <Bar dataKey="target" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default InsightsDashboard;
