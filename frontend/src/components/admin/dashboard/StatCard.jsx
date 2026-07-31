import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const StatCard = ({
  title,
  icon: Icon,
  data,
  themeColor,
  link,
  index
}) => {
  const { total, percentChange, trend } = data;
  const chartData = trend.map((val) => ({ value: val }));
  const isPositive = percentChange >= 0;

  let wrapperHoverClass;
  let iconBorderClass;

  switch (themeColor) {
    case 'blue':
      wrapperHoverClass = 'hover:border-blue-400';
      iconBorderClass = 'border-blue-200 bg-blue-50 text-blue-600';
      break;
    case 'amber':
      wrapperHoverClass = 'hover:border-amber-400';
      iconBorderClass = 'border-amber-200 bg-amber-50 text-amber-600';
      break;
    case 'emerald':
      wrapperHoverClass = 'hover:border-emerald-400';
      iconBorderClass = 'border-emerald-200 bg-emerald-50 text-emerald-600';
      break;
    case 'purple':
      wrapperHoverClass = 'hover:border-purple-400';
      iconBorderClass = 'border-purple-200 bg-purple-50 text-purple-600';
      break;
    default:
      wrapperHoverClass = 'hover:border-gray-400';
      iconBorderClass = 'border-gray-200 bg-gray-50 text-gray-600';
  }

  return (
    <Link
      to={link}
      className={`bg-white border p-2 rounded-lg transition-all duration-150 hover:-translate-y-0.5 ${wrapperHoverClass} cursor-pointer opacity-0 animate-fade-up`}
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 border ${iconBorderClass} rounded-sm`}>
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
                  stroke={
                    isPositive
                      ? 'var(--color-emerald-600)'
                      : 'var(--color-red-600)'
                  }
                  dot={false}
                  strokeWidth={1.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StatCard;
