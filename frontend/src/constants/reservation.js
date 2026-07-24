export const TIME_SLOTS = [
  { value: '17:00', label: '05:00 PM' },
  { value: '17:30', label: '05:30 PM' },
  { value: '18:00', label: '06:00 PM' },
  { value: '18:30', label: '06:30 PM' },
  { value: '19:00', label: '07:00 PM' },
  { value: '19:30', label: '07:30 PM' },
  { value: '20:00', label: '08:00 PM' },
  { value: '20:30', label: '08:30 PM' },
];


export const GUEST_OPTIONS = Array.from({ length: 200 }, (_, index) => ({
  value: index + 1,
  label: `${index + 1} ${index === 0 ? 'Person' : 'People'}`,
}));