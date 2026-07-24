import { Button } from '@/components/ui/button';
import { GUEST_OPTIONS, TIME_SLOTS } from '@/constants/reservation';
import { useState } from 'react';
import CustomSelect from './CustomSelect';
import { useReservation } from '@/hooks/useReservation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const initialForm = {
  date: '',
  time: '',
  customerName: '',
  phone: '',
  guests: '',
};

const BookForm = () => {
  const [openSelect, setOpenSelect] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const { loading, errorField, submitReservation, clearFieldError } =
    useReservation();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    clearFieldError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitReservation(formData);

    if (result.success) {
      toast.success(result.msg);
      setFormData(initialForm);
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-10 flex flex-col gap-6 shadow-form w-full rounded-2xl bg-white"
    >
      {/* first */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-bold">Date</label>
          <div className="flex flex-col gap-1">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              required
              className="py-3 md:py-4 px-4 sm:px-6 text-sm sm:text-base border rounded-[72px] w-full"
            />
            {errorField.date && (
              <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
                {errorField.date}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-bold">Time</label>
          <div className="flex flex-col gap-1">
            <CustomSelect
              name="time"
              value={formData.time}
              placeholder="Choose time"
              options={TIME_SLOTS}
              openSelect={openSelect}
              setOpenSelect={setOpenSelect}
              onChange={handleChange}
            />
            {errorField.time && (
              <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
                {errorField.time}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Second */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-bold">Name</label>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              placeholder="Enter your full name"
              required
              className="py-3 md:py-4 px-4 sm:px-6 text-sm sm:text-base border rounded-[72px] w-full"
            />
            {errorField.customerName && (
              <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
                {errorField.customerName}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-bold">Phone</label>
          <div className="flex flex-col gap-1">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="x-xxx-xxx-xxxx"
              required
              className="py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base border rounded-[72px] w-full"
            />
            {errorField.phone && (
              <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
                {errorField.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Last */}
      <div className="flex flex-col gap-2">
        <label className="text-sm sm:text-base font-bold">Total Person</label>
        <div className="flex flex-col gap-1">
          <CustomSelect
            name="guests"
            value={formData.guests}
            placeholder="Select person"
            options={GUEST_OPTIONS}
            openSelect={openSelect}
            setOpenSelect={setOpenSelect}
            onChange={handleChange}
          />
          {errorField.guests && (
            <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
              {errorField.guests}
            </p>
          )}
        </div>
      </div>

      {/* Button */}
      <Button
        type="submit"
        disabled={loading}
        className="flex-1 h-auto py-4 sm:py-5 font-bold text-sm sm:text-base rounded-[118px] cursor-pointer"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span>Booking...</span>
            <Loader2 className="size-4 sm:size-5 animate-spin" />
          </div>
        ) : (
          'Book A Table'
        )}
      </Button>
    </form>
  );
};

export default BookForm;
