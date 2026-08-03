import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  pending: {
    label: 'Pending',
    color: '#f59e0b',
  },
  confirmed: {
    label: 'Confirmed',
    color: '#3b82f6',
  },
  completed: {
    label: 'Completed',
    color: '#10b981',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#ef4444',
  },
};

const StatusChart = ({ data }) => {
  return (
    <div className='border rounded-lg p-6 animate-fade-up'>
      <ChartContainer config={chartConfig} className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
            >
              {data?.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={chartConfig[entry.status]?.color ?? '#cbd5e1'}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Legend verticalAlign="bottom" height={36} className="capitalize" />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default StatusChart;
