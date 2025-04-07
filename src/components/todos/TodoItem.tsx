
import React from 'react';

interface Todo {
  id: string;
  title: string;
  description: string;
  updated_at: string;
}

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="card todo-item h-100" style={{cursor: 'pointer'}}>
      <div className="card-body">
        <h5 className="card-title">{todo.title}</h5>
        <p className="card-text">{todo.description}</p>
        <p className="card-text text-muted small">
          Last updated: {formatDate(todo.updated_at)}
        </p>
      </div>
      <div className="card-footer bg-transparent border-top-0">
        <div className="d-flex justify-content-between">
          <button 
            className="btn btn-sm btn-outline-primary" 
            onClick={() => onEdit(todo)}
          >
            Edit
          </button>
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
