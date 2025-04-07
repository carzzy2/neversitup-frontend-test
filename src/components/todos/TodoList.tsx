
import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  title: string;
  description: string;
  updated_at: string;
}

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  loading, 
  onEdit, 
  onDelete, 
  onCreateNew 
}) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="mb-3">You don't have any todos yet.</p>
        <button className="btn btn-primary" onClick={onCreateNew}>
          Create Your First Todo
        </button>
      </div>
    );
  }

  return (
    <div className="row">
      {todos.map((todo) => (
        <div key={todo.id} className="col-md-6 col-lg-4 mb-4">
          <TodoItem 
            todo={todo} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
