/* eslint-disable react/prop-types */
import { Select } from 'antd';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const IncomeOverVeiw = ({ income_overview, setIncomeYear }) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const chartData = monthNames.map((month, index) => ({
    month,
    value: income_overview?.data?.[index]
  }));


  return (
    <div>
      <div className="flex justify-between p-3">
        <p className="text-xl font-medium">Income Overview</p>
        <Select
          placeholder="Year"
          style={{ width: 100 }}
          defaultValue={new Date().getFullYear()}
          onChange={(value) => setIncomeYear(value)}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            );
          })}
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0022FF"
            fill="#0022FF"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IncomeOverVeiw