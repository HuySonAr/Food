import { Button } from '@/components/ui/button';
import { useContact } from '@/hooks/useContact';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const FormContact = () => {
  const { loading, errorField, submitContact, clearFieldError } = useContact();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    clearFieldError(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const form = e.currentTarget;
      const focusableElements = Array.from(
        form.querySelectorAll('input, textarea, button[type="submit"]'),
      );

      const index = focusableElements.indexOf(e.target);
      if (index > -1 && index < focusableElements.length - 1) {
        focusableElements[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitContact(formData);
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
      onKeyDown={handleKeyDown}
      className="p-6 md:p-10 flex flex-col gap-6 shadow-form w-full rounded-2xl bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-bold">Name</label>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="py-3 md:py-4 px-4 sm:px-6 text-sm sm:text-base border rounded-[72px] w-full"
            />
            {errorField.name && (
              <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
                {errorField.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-bold">Email</label>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="py-3 md:py-4 px-4 md:px-6 text-sm md:text-base border rounded-[72px] w-full"
            />

            {errorField.email && (
              <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
                {errorField.email}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base font-bold">Subject</label>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Write a subject"
            className="py-3 md:py-4 px-4 md:px-6 text-sm md:text-base border rounded-[72px] w-full"
          />
          {errorField.subject && (
            <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
              {errorField.subject}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base font-bold">Message</label>
        <div className="flex flex-col gap-1">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            required
            className="py-4 md:py-6 px-4 md:px-6 text-sm md:text-base border rounded-2xl min-h-30 md:min-h-40 w-full resize-y"
          />
          {errorField.message && (
            <p className="text-xs sm:text-sm text-destructive pl-4 sm:pl-6">
              {errorField.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="flex-1 h-auto py-4 sm:py-5 font-bold text-sm sm:text-base rounded-[118px]"
      >
        {loading ? (
          <div className="flex items-center gap-1">
            Sending...
            <Loader2 className="size-3.5 sm:size-4 animate-spin" />
          </div>
        ) : (
          'Send'
        )}
      </Button>
    </form>
  );
};

export default FormContact;
