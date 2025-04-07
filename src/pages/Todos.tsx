
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useApiService } from '@/services/api';
import { Todo, TodoFormValues } from '@/types/todo';
import TodoList from '@/components/todos/TodoList';
import TodoForm from '@/components/todos/TodoForm';

const Todos = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const api = useApiService();
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch todos on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.todos.getAll();
      
      if (response.isSuccess && response.data) {
        setTodos(response.data);
      } else {
        toast.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error(`Failed to fetch todos: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // If the error is an authentication error, log out the user
      if (error instanceof Error && error.message.includes('token')) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Open modal for creating a new todo
  const openCreateModal = () => {
    setModalMode('create');
    setShowModal(true);
  };

  // Open modal for editing a todo
  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setModalMode('edit');
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingTodo(null);
  };

  // Create a new todo
  const createTodo = async (values: TodoFormValues) => {
    try {
      const response = await api.todos.create(values.title, values.description);
      
      if (response.isSuccess && response.data) {
        setTodos(prev => [...prev, response.data]);
        toast.success('Todo created successfully');
        closeModal();
      } else {
        toast.error('Failed to create todo');
      }
    } catch (error) {
      toast.error(`Failed to create todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Update a todo
  const updateTodo = async (values: TodoFormValues) => {
    if (!editingTodo) return;
    
    try {
      const response = await api.todos.update(editingTodo.id, values.title, values.description);
      
      if (response.isSuccess) {
        setTodos(prev => 
          prev.map(todo => 
            todo.id === editingTodo.id 
              ? { ...todo, title: values.title, description: values.description } 
              : todo
          )
        );
        toast.success('Todo updated successfully');
        closeModal();
      } else {
        toast.error('Failed to update todo');
      }
    } catch (error) {
      toast.error(`Failed to update todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }
    
    try {
      const response = await api.todos.delete(id);
      
      if (response.isSuccess) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully');
      } else {
        toast.error('Failed to delete todo');
      }
    } catch (error) {
      toast.error(`Failed to delete todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Handle form submission based on modal mode
  const handleSubmit = (values: TodoFormValues) => {
    if (modalMode === 'create') {
      return createTodo(values);
    } else {
      return updateTodo(values);
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h1 className="mb-0">My Todos  {user?.username}!</h1>
        </div>
        <div className="col-auto">
          <button 
            className="btn btn-primary me-2" 
            onClick={openCreateModal}
          >
            Add New Todo
          </button>
          <button 
            className="btn btn-outline-danger" 
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <TodoList 
        todos={todos}
        loading={loading}
        onEdit={openEditModal}
        onDelete={deleteTodo}
        onCreateNew={openCreateModal}
      />

      <TodoForm 
        initialValues={{
          title: editingTodo?.title || '',
          description: editingTodo?.description || ''
        }}
        mode={modalMode}
        onSubmit={handleSubmit}
        onCancel={closeModal}
        isOpen={showModal}
      />
    </div>
  );
};

export default Todos;
