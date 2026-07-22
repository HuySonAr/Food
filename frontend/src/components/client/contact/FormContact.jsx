import { Button } from '@/components/ui/button';

const FormContact = () => {
  return (
    <form className="p-6 md:p-10 flex flex-col gap-6 shadow-form w-full rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-bold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            className="py-3 md:py-4 pl-4 sm:pl-6 text-sm sm:text-base border rounded-[72px] w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base font-bold">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            required
            className="py-3 md:py-4 pl-4 md:pl-6 text-sm md:text-base border rounded-[72px] w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base font-bold">Subject</label>
        <input
          type="text"
          placeholder="Write a subject"
          required
          className="py-3 md:py-4 pl-4 md:pl-6 text-sm md:text-base border rounded-[72px] w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base font-bold">Message</label>
        <textarea
          type="text"
          placeholder="Write your message"
          required
          className="py-4 md:py-6 pl-4 md:pl-6 text-sm md:text-base border rounded-2xl min-h-30 md:min-h-40 w-full resize-y"
        />
      </div>

      <Button className="h-auto py-4 sm:py-5 font-bold text-sm sm:text-base rounded-[118px]">
        Send
      </Button>
    </form>
  );
};

export default FormContact;
