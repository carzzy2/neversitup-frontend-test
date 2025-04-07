import React from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'sonner';
import {useForm} from '@/hooks/useForm';
import {createApiService} from '@/services/api';
import {useAuth} from '@/contexts/AuthContext';

const apiService = createApiService(() => null);
const Login = () => {
    const {login} = useAuth();
    const validate = {
        username: (value: string) => {
            if (!value) return 'Username is required';
            return '';
        },
        password: (value: string) => {
            if (!value) return 'Password is required';
            return '';
        },
    };

    const form = useForm({username: '', password: ''}, validate);
    const handleLogin = async (values: { username: string; password: string }) => {
        try {
            const response = await apiService.auth.login(values.username, values.password);
            console.log('response', response);
            if (response && response.access_token) {
                login(response.username, response.access_token);
            } else {
                toast.error('Login failed: Invalid response from server');
            }
        } catch (error) {
            toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card auth-form">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>

                            <form onSubmit={form.handleSubmit(handleLogin)}>
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
                                        autoComplete="current-password"
                                    />
                                    {form.errors.password && (
                                        <div className="invalid-feedback">{form.errors.password}</div>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={form.isSubmitting}>
                                      Login
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <p>
                                    Don't have an account?{' '}
                                    <Link to="/register" style={{textDecoration: 'underline'}}>
                                        Register
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

export default Login;
