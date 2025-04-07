
import React from 'react';
import { useForm } from '@/hooks/useForm';
import { TodoFormValues } from '@/types/todo';

interface TodoFormProps {
  initialValues: TodoFormValues;
  mode: 'create' | 'edit';
  onSubmit: (values: TodoFormValues) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialValues,
  mode,
  onSubmit,
  onCancel,
  isOpen,
}) => {
  // Form validation rules
  const validate = {
    title: (value: string) => {
      if (!value) return 'Title is required';
      return '';
    },
    description: (value: string) => {
      if (!value) return 'Description is required';
      return '';
    },
  };

  // Initialize form with useForm hook
  const form = useForm<TodoFormValues>(initialValues, validate);

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === 'create' ? 'Create New Todo' : 'Edit Todo'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${form.errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={form.values.title}
                  onChange={form.handleChange}
                />
                {form.errors.title && (
                  <div className="invalid-feedback">{form.errors.title}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className={`form-control ${form.errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  rows={3}
                  value={form.values.description}
                  onChange={form.handleChange}
                ></textarea>
                {form.errors.description && (
                  <div className="invalid-feedback">{form.errors.description}</div>
                )}
              </div>
              
              <div className="d-flex justify-content-end gap-2">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={form.isSubmitting}
                >
                  {form.isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {mode === 'create' ? 'Creating...' : 'Updating...'}
                    </>
                  ) : (
                    mode === 'create' ? 'Create' : 'Update'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
