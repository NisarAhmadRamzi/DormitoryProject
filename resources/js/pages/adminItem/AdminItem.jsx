import React from "react";
function AdminItem({ user }) {
    console.log(user);

    return (
        <div>
            <h1>User Information</h1>
            <table className="table table-bordered">
                <thead></thead>
                <tbody>
                    <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.user_role}</td>
                        <td>
                            <img
                                src={user.image || "/default-image.jpg"}
                                alt={user.name}
                                width={50}
                                height={50}
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => handleEdit(user.user_id)}
                                className="btn btn-warning btn-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.user_id)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* You can pass data to AdminItem for more detailed info */}
        </div>
    );

    // Example handler functions for the buttons
    function handleEdit(userId) {
        console.log("Edit user with ID:", userId);
        // Add your edit logic here (e.g., navigate to edit form)
    }

    function handleDelete(userId) {
        console.log("Delete user with ID:", userId);
        // Add your delete logic here (e.g., API call to delete user)
    }
}

export default AdminItem;
