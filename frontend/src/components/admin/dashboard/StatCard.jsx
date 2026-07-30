import { Line, LineChart, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, icon: Icon, data, borderColor, hover }) => {
  const { total, percentChange, trend } = data;
  const chartData = trend.map((val) => ({ value: val }));
  const isPositive = percentChange >= 0;
  return (
    <div className={`bg-white border p-2 rounded-lg transition-all duration-150 hover:-translate-y-0.5 ${hover} cursor-pointer`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 border ${borderColor} rounded-sm`}>
            <Icon className="size-4" />
          </div>
          <span className="text-sm font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-semibold text-foreground">{total}</h3>
            <div className="flex items-center gap-0.5">
              <span
                className={`text-sm ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}
              >
                {isPositive ? '+' : ''}
                {percentChange}%
              </span>

              <span className="text-muted-foreground text-xs font-normal ml-1">
                vs last week
              </span>
            </div>
          </div>

          <div className="flex-1 w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "var(--color-emerald-600)" : "var(--color-red-600)"}
                  dot={false}
                  strokeWidth={1.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
