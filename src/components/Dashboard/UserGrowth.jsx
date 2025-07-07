/* eslint-disable react/prop-types */
import { Select } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserGrowth = ({ user_growth, setUserGrowthYear }) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const chartData = monthNames.map((month, index) => ({
    month,
    value: user_growth?.data?.[index]
  }));

  console.log('User Growth Overview rendered');

  return (
    <div>
      <div className=''>
        <div className="flex justify-between p-3 ">
          <p className="text-xl font-medium">User Growth</p>
          <Select
            placeholder="Year"
            style={{ width: 100 }}
            defaultValue={new Date().getFullYear()}
            onChange={(value) => setUserGrowthYear(value)}
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
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={13}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#040404" radius={[25, 25, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default UserGrowth