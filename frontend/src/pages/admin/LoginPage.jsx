import { useState } from 'react';
import { useAuth } from '../../context/useAuth';

const LoginPage = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      setError(error.response?.data?.msg || 'login test faild');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl">Login Form</h1>
      <div className="flex flex-col gap-3 border border-green-500 rounded-sm p-5">
        <div className="flex items-center gap-1">
          <label>Username</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-1 border border-amber-500 rounded-xs"
            placeholder="Enter email..."
          />
        </div>

        <div className="flex items-center gap-1">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="p-1 border border-amber-500 rounded-xs"
            placeholder="Enter password..."
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          onClick={handleLogin}
          className="bg-black p-1.5 rounded-2xl text-white mt-2"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
