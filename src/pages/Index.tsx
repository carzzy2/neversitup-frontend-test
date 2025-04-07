
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen d-flex flex-column justify-content-center align-items-center bg-light py-5">
      <div className="container text-center">
        <h1 className="display-4 mb-4">Welcome to TodoTask</h1>
        <p className="lead mb-5">
          A simple and effective way to manage your daily tasks.
        </p>
        
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-body p-5">
                <h2 className="mb-4">Get Started</h2>
                
                {isAuthenticated ? (
                  <div className="d-grid gap-2">
                    <Link to="/todos" className="btn btn-primary btn-lg">
                      Go to My Todos
                    </Link>
                  </div>
                ) : (
                  <div className="d-grid gap-2">
                    <Link to="/login" className="btn btn-primary btn-lg mb-3">
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-outline-secondary btn-lg">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center text-muted">
              <p>
                Manage your tasks efficiently with our easy-to-use todo application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
