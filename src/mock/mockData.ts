// Mock user data
export const mockUsers = [
  {
    id: "mock-user-1",
    username: "testuser",
    password: "password123",
  }
];

export const mockAuth = {
  login: {
    username: "testuser",
    access_token: "mock-jwt-token-for-testuser",
  },
  register: {
    isSuccess: true,
    data: {
      id: "mock-new-user",
      username: "newuser",
      password: "$2b$10$zPdGv5lNMPiozRF5OES5.OeBA9fTOy30Zsu5QtnlEXP2zVCi6vySi",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
};

// Mock todos data
export const mockTodos = [
  {
    id: "mock-todo-1",
    title: "Complete project",
    description: "Finish the React project by Friday",
    created_by: {
      id: "mock-user-1",
      username: "testuser"
    },
    created_at: "2025-04-01T10:00:00.000Z",
    updated_at: "2025-04-01T10:00:00.000Z"
  },
  {
    id: "mock-todo-2",
    title: "Learn TypeScript",
    description: "Complete TypeScript tutorial",
    created_by: {
      id: "mock-user-1",
      username: "testuser"
    },
    created_at: "2025-04-02T14:30:00.000Z",
    updated_at: "2025-04-02T14:30:00.000Z"
  },
  {
    id: "mock-todo-3",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables",
    created_by: {
      id: "mock-user-1",
      username: "testuser"
    },
    created_at: "2025-04-03T09:15:00.000Z",
    updated_at: "2025-04-03T09:15:00.000Z"
  }
];

// Mock API service that mimics the real API responses
export const mockApiService = {
  auth: {
    login: async (username: string, password: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user exists
      const user = mockUsers.find(u => u.username === username && u.password === password);
      if (user) {
        return mockAuth.login;
      } else {
        throw new Error("Invalid username or password");
      }
    },
    
    register: async (username: string, password: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if username already exists
      const existingUser = mockUsers.find(u => u.username === username);
      
      if (existingUser) {
        throw new Error("Username already exists");
      }
      
      // Return success response
      return mockAuth.register;
    }
  },
  
  todos: {
    getAll: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        isSuccess: true,
        data: mockTodos
      };
    },
    
    create: async (title: string, description: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTodo = {
        id: `mock-todo-${Date.now()}`,
        title,
        description,
        created_by: {
          id: "mock-user-1",
          username: "testuser"
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Add to mock data
      mockTodos.push(newTodo);
      
      return {
        isSuccess: true,
        data: newTodo
      };
    },
    
    update: async (id: string, title: string, description: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const todoIndex = mockTodos.findIndex(t => t.id === id);
      
      if (todoIndex === -1) {
        throw new Error("Todo not found");
      }
      
      // Update the todo
      mockTodos[todoIndex] = {
        ...mockTodos[todoIndex],
        title,
        description,
        updated_at: new Date().toISOString()
      };
      
      return {
        isSuccess: true,
        data: {
          title,
          description
        }
      };
    },
    
    delete: async (id: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const todoIndex = mockTodos.findIndex(t => t.id === id);
      
      if (todoIndex === -1) {
        throw new Error("Todo not found");
      }
      
      // Remove from mock data
      mockTodos.splice(todoIndex, 1);
      
      return {
        isSuccess: true
      };
    }
  }
};
