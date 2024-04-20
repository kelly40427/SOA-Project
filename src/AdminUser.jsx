import * as React from 'react';
import axios from 'axios';
import './AdminUser.css';
export function AdminUser() {
    const [users, setUsers] = React.useState([]);
    const [editingUser, setEditingUser] = React.useState(null);
    const [editFormData, setEditFormData] = React.useState({
        username: '',
        email: '',
        role: '',
      });

          // Simulate fetching data from an API
    React.useEffect(() => {
        // Mock data
        const mockUsers = [
            { user_id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
            { user_id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
            { user_id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' },
        ];
        setUsers(mockUsers);
    }, []);

    // React.useEffect(() =>{
    //     axios.get(`http://localhost:8080/user?`).
    //     then((response)=> {
    //         console.log(response.data);
    //         if(response.data.code==0){
    //             setUsers(response.data.data);
    //         }
    //         else{
    //           console.log('No information found')
    //         }
    //       })
    // },[]);

    const startEdit = (user) => {
        setEditingUser(user);
        setEditFormData({
          username: user.name,
          email: user.email,
          role: user.role,
        });
      };

      const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
      };
    
      const handleEditSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
          id: editingUser.id,
          ...editFormData,
        };
            // Update user on your API
    try {
        const response = await axios.put(`/api/users/${editingUser.user_id}`, updatedUser);
        setUsers(users.map((user) => (user.user_id === editingUser.user_id ? response.data : user)));
        setEditingUser(null);
      } catch (error) {
        console.error('Failed to update user', error);
      }
    };
  
    const deleteUser = async (userId) => {
      // Delete user from your API
      try {
        await axios.delete(`/api/users/${userId}`);
        setUsers(users.filter((user) => user.user_id !== userId));
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    };
  return (
    <div className="admin-user-container">
        <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => startEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={editFormData.username}
            onChange={handleEditChange}
          />
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleEditChange}
          />
          <select
            name="role"
            value={editFormData.role}
            onChange={handleEditChange}
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  )
}

export default AdminUser