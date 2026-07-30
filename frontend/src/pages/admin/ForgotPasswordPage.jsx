import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../../assets/logo.svg';
import bgLogin from '../../assets/about-content.png';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { forgotPasswordService } from '../../services/auth.service';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPasswordService(email);
      toast.success(res.data.msg || 'An OTP has been sent to your email.');
      navigate('/admin/reset-password', { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-muted/30 py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Form */}
          <div className="animate-fade-up rounded-3xl sm:p-8 lg:p-10">
            <div className="mb-5 sm:mb-10 flex items-center gap-3">
              <img
                src={Logo}
                alt="Bistro Bliss"
                className="size-10 md:size-12 lg:size-14 shrink-0"
              />
              <span className="font-serif text-2xl md:text-3xl font-semibold italic text-secondary lg:text-[42px]">
                Bistro Bliss
              </span>
            </div>

            <div className="mb-8">
              <h1 className="font-serif text-4xl font-medium text-foreground lg:text-5xl">
                Forgot Password
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Enter your email address to receive an OTP.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-bold">
                  Email Address
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className="py-3 md:py-4 px-4 sm:px-6 text-base border rounded-[72px] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !email}
                className="h-auto py-4 sm:py-5 rounded-full text-sm sm:text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    Sending...
                    <Loader2 className="size-3.5 sm:size-4 animate-spin" />
                  </div>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/admin/login"
                className="text-sm font-medium text-primary transition hover:underline"
              >
                &larr; Back to Login
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="hidden lg:block h-170 overflow-hidden rounded-3xl shadow-form animate-fade-in">
            <img
              src={bgLogin}
              alt="Restaurant"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;