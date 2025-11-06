import React, { useState } from 'react';
import './App.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    imageUrl: ''
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle edit input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Add new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city) {
      alert('Please fill in at least name and city fields');
      return;
    }

    const newTodo = {
      id: Date.now(),
      name: formData.name,
      city: formData.city,
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/50'
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    
    // Reset form
    setFormData({
      name: '',
      city: '',
      imageUrl: ''
    });
  };

  // Delete todo
  const handleDelete = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Open edit modal
  const handleEdit = (todo) => {
    setEditingTodo({ ...todo });
    setIsModalOpen(true);
  };

  // Close edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  // Save edited todo
  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    if (!editingTodo.name || !editingTodo.city) {
      alert('Please fill in at least name and city fields');
      return;
    }

    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === editingTodo.id ? editingTodo : todo
      )
    );
    
    handleCloseModal();
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Enter image URL (optional)"
          />
        </div>

        <button type="submit" className="add-btn">
          Add Todo
        </button>
      </form>

      {/* Todo List Table */}
      {todos.length > 0 ? (
        <div className="todo-table-container">
          <h2>Todo List</h2>
          <table className="todo-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td>
                    <img 
                      src={todo.imageUrl} 
                      alt={todo.name}
                      className="user-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                  </td>
                  <td>{todo.name}</td>
                  <td>{todo.city}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEdit(todo)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(todo.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-todos">No todos added yet. Start by adding one above!</p>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingTodo && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Todo</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="modal-form">
              <div className="form-group">
                <label htmlFor="edit-name">Name:</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingTodo.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-city">City:</label>
                <input
                  type="text"
                  id="edit-city"
                  name="city"
                  value={editingTodo.city}
                  onChange={handleEditInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-imageUrl">Image URL:</label>
                <input
                  type="url"
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={editingTodo.imageUrl}
                  onChange={handleEditInputChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="form-group">
                <label>Current Image Preview:</label>
                <img 
                  src={editingTodo.imageUrl} 
                  alt={editingTodo.name}
                  className="image-preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50';
                  }}
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;