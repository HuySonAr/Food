import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/useAuth';

import Logo from '../../assets/logo.svg';
import bgLogin from '../../assets/about-content.png';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-muted/30 py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Login */}
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
                Welcome Back
              </h1>

              <p className="mt-3 text-base text-muted-foreground">
                Sign in to access your restaurant dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-bold">
                  Email Address
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="py-3 md:py-4 px-4 sm:px-6 text-base border rounded-[72px] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-bold">
                  Password
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="py-3 md:py-4 px-4 sm:px-6 text-base border rounded-[72px] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="../forgot-password"
                  relative="path"
                  className="text-sm font-medium text-primary transition hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-auto py-4 sm:py-5 rounded-full text-sm sm:text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    Loading...
                    <Loader2 className="size-3.5 sm:size-4 animate-spin" />
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </div>

          {/* Image */}
          <div className="hidden lg:block h-170 overflow-hidden rounded-3xl shadow-form animate-fade-in">
            <img
              src={bgLogin}
              alt="Restaurant"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
