import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import isoWeek from "dayjs/plugin/isoWeek.js"
import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';
import Product from '../models/Product.js';
import Reservation from '../models/Reservation.js';
import { STATUS_RESERVATIONS } from '../constants/reservation.constant.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek)
const TZ = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';

const getStatsWithTrend = async (Model, baseFilter = {}) => {
  const now = dayjs().tz(TZ);
  const startOfToday = now.endOf('day');
  const sevenDaysAgo = now.subtract(6, 'day').startOf('day');
  const fourteenDaysAgo = now.subtract(13, 'day').startOf('day');

  const totalCount = await Model.countDocuments(baseFilter);

  const recentItems = await Model.find({
    ...baseFilter,
    createdAt: { $gte: sevenDaysAgo.toDate(), $lte: startOfToday.toDate() },
  })
    .select('createdAt')
    .lean();

  const previousPeriodCount = await Model.countDocuments({
    ...baseFilter,
    createdAt: { $gte: fourteenDaysAgo.toDate(), $lt: sevenDaysAgo.toDate() },
  });

  const trend = [];
  let currentPeriodCount = recentItems.length;

  for (let i = 6; i >= 0; i--) {
    const targetDate = now.subtract(i, 'day').format('YYYY-MM-DD');
    const countForDay = recentItems.filter(
      (item) => dayjs(item.createdAt).tz(TZ).format('YYYY-MM-DD') === targetDate,
    ).length;

    trend.push(countForDay);
  }

  let percentChange = 0;
  if (previousPeriodCount > 0) {
    percentChange =
      ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
  } else if (currentPeriodCount > 0) {
    percentChange = 100;
  }

  percentChange = Math.max(-100, Math.min(100, percentChange));

  return {
    total: totalCount,
    percentChange: Number(percentChange.toFixed(1)),
    trend,
  };
};

export const getDashboardStatsService = async () => {
  const [reservations, contacts, products, blogs] = await Promise.all([
    getStatsWithTrend(Reservation, { status: 'pending' }),
    getStatsWithTrend(Contact, { status: 'pending' }),
    getStatsWithTrend(Product),
    getStatsWithTrend(Blog),
  ]);

  return {
    reservations,
    contacts,
    products,
    blogs,
  };
};

export const getDashboardChartsService = async (range) => {
  const now = dayjs().tz(TZ);
  const todayEnd = now.endOf('day').toDate();

  let startDate;
  let daysCount;

  if (range === 'month') {
    startDate = now.startOf('month');
    daysCount = now.diff(startDate, 'day') + 1; 
  } else if (range === 'year') {
    startDate = now.startOf('year');
    daysCount = now.diff(startDate, 'day') + 1;
  } else {
    startDate = now.startOf('isoWeek');
    daysCount = now.diff(startDate, 'day') + 1;
  }

  const [trendRaw, statusRaw] = await Promise.all([
    Reservation.aggregate([
      { $match: { createdAt: { $gte: startDate.toDate(), $lte: todayEnd } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
              timezone: TZ,
            },
          },
          count: { $sum: 1 },
        },
      },
    ]),

    Reservation.aggregate([
      { $match: { createdAt: { $gte: startDate.toDate(), $lte: todayEnd } } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const trend = [];
  for (let i = 0; i < daysCount; i++) {
    const targetDate = startDate.add(i, 'day');
    const dateStr = targetDate.format('YYYY-MM-DD');
    const displayDate = targetDate.format('DD/MM');

    const found = trendRaw.find((item) => item._id === dateStr);
    trend.push({
      date: displayDate,
      count: found ? found.count : 0,
    });
  }

  const status = STATUS_RESERVATIONS.map((s) => {
    const found = statusRaw.find((item) => item._id === s)
    return {
      status: s,
      count: found ? found.count : 0
    }
  })

  return {trend, status}
};
