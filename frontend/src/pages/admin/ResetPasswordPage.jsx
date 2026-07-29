import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../../assets/logo.svg';
import bgLogin from '../../assets/about-content.png';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { resetPasswordService } from '../../services/auth.service';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email || '';

  const [form, setForm] = useState({
    email: emailFromState,
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!emailFromState) {
      toast.warning('Please enter your email first to get an OTP.');
      navigate('/admin/forgot-password');
    }
  }, [emailFromState, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (form.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordService(
        form.email,
        form.otp,
        form.newPassword,
      );

      toast.success(
        res.data.data.msg || 'Password has been reset successfully!',
      );

      setForm({ email: '', otp: '', newPassword: '', confirmPassword: '' });

      setTimeout(() => {
        navigate('/admin/login', { replace: true, state: null });
      }, 1500);
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        error.response?.data?.msg || 'Failed to reset password. Invalid OTP.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (!emailFromState) return null;

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
                Set New Password
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Enter the OTP sent to <strong>{form.email}</strong> and your new
                password.
              </p>
            </div>

            <form
              onSubmit={handleResetPassword}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-bold">
                  OTP Code
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    required
                    className="py-3 md:py-4 px-4 sm:px-6 text-base border rounded-[72px] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-bold">
                  New Password
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    required
                    className="py-3 md:py-4 px-4 sm:px-6 text-base border rounded-[72px] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-bold">
                  Confirm New Password
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    required
                    className="py-3 md:py-4 px-4 sm:px-6 text-base border rounded-[72px] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-auto py-4 sm:py-5 mt-4 rounded-full text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    Resetting...
                    <Loader2 className="size-3.5 sm:size-4 animate-spin" />
                  </div>
                ) : (
                  'Reset Password'
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

export default ResetPasswordPage;
