
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm } from '@/hooks/useForm';
import { createApiService } from '@/services/api';
const apiService = createApiService(() => null);

const Register = () => {
  const navigate = useNavigate();
  const validate = {
    username: (value: string) => {
      if (!value) return 'Username is required';
      if (value.length < 5) return 'Username must be at least 5 characters';
      return '';
    },
    password: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    },
    confirmPassword: (value: string) => {
      if (!value) return 'Please confirm your password';
      if (value !== form.values.password) return 'Passwords do not match';
      return '';
    },
  };

  // Initialize form
  const form = useForm(
    { username: '', password: '', confirmPassword: '' },
    validate
  );

  // Handle form submission
  const handleRegister = async (values: { username: string; password: string; confirmPassword: string }) => {
    try {
      const response = await apiService.auth.register(values.username, values.password);
      
      if (response.isSuccess) {
        toast.success('Registration successful! Please log in.');
        navigate('/login');
      } else {
        toast.error('Registration failed');
      }
    } catch (error) {
      toast.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card auth-form">
            <div className="card-body">
              <h2 className="text-center mb-4">Create Account</h2>
              
              <form onSubmit={form.handleSubmit(handleRegister)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${form.errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    name="username"
                    value={form.values.username}
                    onChange={form.handleChange}
                    autoComplete="username"
                  />
                  {form.errors.username && (
                    <div className="invalid-feedback">{form.errors.username}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${form.errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    autoComplete="new-password"
                  />
                  {form.errors.password && (
                    <div className="invalid-feedback">{form.errors.password}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${form.errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.values.confirmPassword}
                    onChange={form.handleChange}
                    autoComplete="new-password"
                  />
                  {form.errors.confirmPassword && (
                    <div className="invalid-feedback">{form.errors.confirmPassword}</div>
                  )}
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={form.isSubmitting}
                  >
                    {form.isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
