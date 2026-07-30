import dayjs from 'dayjs';
import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';
import Product from '../models/Product.js';
import Reservation from '../models/Reservation.js';

const getStatsWithTrend = async (Model, baseFilter = {}) => {
  const now = dayjs();
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
  let currentPeriodCount = 0;

  for (let i = 6; i >= 0; i--) {
    const targetDate = now.subtract(i, 'day').format('YYYY-MM-DD');
    const countForDay = recentItems.filter(
      (item) => dayjs(item.createdAt).format('YYYY-MM-DD') === targetDate,
    ).length;

    trend.push(countForDay);
    currentPeriodCount += countForDay;
  }

  let percentChange = 0;
  if (previousPeriodCount > 0) {
    percentChange =
      ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
  } else if (currentPeriodCount > 0) {
    percentChange = 100;
  }

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
