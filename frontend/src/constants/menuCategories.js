import breakfastIcon from '../assets/breakfast.svg';
import mainDishesIcon from '../assets/main-dishes.svg';
import drinksIcon from '../assets/drinks.svg';
import dessertsIcon from '../assets/desserts.svg';
export const MENU_CATEGORIES = [
  {
    id: 1,
    name: 'Breakfast',
    slug: 'breakfast',
    icon: breakfastIcon,
    description:
      'In the new era of technology we look in the future with certainty and pride for our life.',
  },
  {
    id: 2,
    name: 'Main Dishes',
    slug: 'main-dishes',
    icon: mainDishesIcon,
    description:
      'In the new era of technology we look in the future with certainty and pride for our life.',
  },
  {
    id: 3,
    name: 'Drinks',
    slug: 'drinks',
    icon: drinksIcon,
    description:
      'In the new era of technology we look in the future with certainty and pride for our life.',
  },
  {
    id: 4,
    name: 'Desserts',
    slug: 'desserts',
    icon: dessertsIcon,
    description:
      'In the new era of technology we look in the future with certainty and pride for our life.',
  },
];

export const FILTER_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'main-dishes', name: 'Main Dishes' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];
