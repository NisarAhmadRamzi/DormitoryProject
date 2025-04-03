// import React, { useState } from "react";

// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function NewBook() {
//     const [book, setBook] = useState({
//         library_id: "",
//         title: "",
//         author: "",
//         publication_year: "",
//         status: "Available", // Default status
//         books_total_count: 0,
//         borrowed_books_total_count: 0,
//     });
//     const navigate = useNavigate();

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setBook({
//             ...book,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(
//                 "http://127.0.0.1:8000/api/books",
//                 book
//             );

//             if (response.status === 201) {
//                 Swal.fire(
//                     "Book Added!",
//                     "The book has been added successfully.",
//                     "success"
//                 );
//                 navigate(-1); // Go back to the previous route
//             }
//         } catch (error) {
//             if (error.response) {
//                 console.error("Validation error:", error.response.data); // API validation errors
//             }
//             Swal.fire(
//                 "Error",
//                 "Something went wrong while adding the book.",
//                 "error"
//             );
//             console.error("Error adding book:", error);
//         }
//     };

//     // Handle cancel
//     const handleCancel = () => {
//         navigate(-1); // Go back to the previous route
//     };

//     return (
//         <>
//             <div className="content-body">
//                 <div className="container-fluid">
//                     <div className="row page-titles mx-0">
//                         <div className="col-sm-6 p-md-0">
//                             <div className="welcome-text">
//                                 <h4>Add New Book</h4>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-lg-12">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h4 className="card-title">Book Information</h4>
//                                 </div>

//                                 <div className="card-body">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="form-group">
//                                                     <label htmlFor="library_id">Library ID</label>
//                                                     <input
//                                                         type="text"
//                                                         id="library_id"
//                                                         name="library_id"
//                                                         className="form-control"
//                                                         value={book.library_id}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="title">Title</label>
//                                                     <input
//                                                         type="text"
//                                                         id="title"
//                                                         name="title"
//                                                         className="form-control"
//                                                         value={book.title}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="author">Author</label>
//                                                     <input
//                                                         type="text"
//                                                         id="author"
//                                                         name="author"
//                                                         className="form-control"
//                                                         value={book.author}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="publication_year">Publication Year</label>
//                                                     <input
//                                                         type="date"
//                                                         id="publication_year"
//                                                         name="publication_year"
//                                                         className="form-control"
//                                                         value={book.publication_year}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="status">Status</label>
//                                                     <select
//                                                         id="status"
//                                                         name="status"
//                                                         className="form-control"
//                                                         value={book.status}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     >
//                                                         <option value="Available">Available</option>
//                                                         <option value="Unavailable">Unavailable</option>
//                                                     </select>
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-6">
//                                                 <div className="form-group">
//                                                     <label htmlFor="books_total_count">Total Count</label>
//                                                     <input
//                                                         type="number"
//                                                         id="books_total_count"
//                                                         name="books_total_count"
//                                                         className="form-control"
//                                                         value={book.books_total_count}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="borrowed_books_total_count">Borrowed Count</label>
//                                                     <input
//                                                         type="number"
//                                                         id="borrowed_books_total_count"
//                                                         name="borrowed_books_total_count"
//                                                         className="form-control"
//                                                         value={book.borrowed_books_total_count}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div
//                                             className="form-buttons"
//                                             style={{
//                                                 display: "flex",
//                                                 justifyContent: "space-between",
//                                                 alignItems: "center",
//                                                 gap: "10px",
//                                             }}
//                                         >
//                                             <button type="submit" className="btn btn-success">
//                                                 Add Book
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default NewBook;

import React, { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewBook() {
    const [book, setBook] = useState({
        library_id: "",
        title: "",
        author: "",
        publication_year: "",
        status: "Available", // Default status
        books_total_count: 0,
        borrowed_books_total_count: 0,
    });
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate publication year format
        const yearPattern = /^\d{4}$/; // Regex for a four-digit year
        if (!yearPattern.test(book.publication_year)) {
            Swal.fire("Error", "Publication year must be a four-digit year.", "error");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/books",
                book
            );

            if (response.status === 201) {
                Swal.fire(
                    "Book Added!",
                    "The book has been added successfully.",
                    "success"
                );
                navigate(-1); // Go back to the previous route
            }
        } catch (error) {
            if (error.response) {
                console.error("Validation error:", error.response.data); // API validation errors
            }
            Swal.fire(
                "Error",
                "Something went wrong while adding the book.",
                "error"
            );
            console.error("Error adding book:", error);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate(-1); // Go back to the previous route
    };

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add New Book</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Book Information</h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="library_id">Library ID</label>
                                                    <input
                                                        type="text"
                                                        id="library_id"
                                                        name="library_id"
                                                        className="form-control"
                                                        value={book.library_id}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="title">Title</label>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        className="form-control"
                                                        value={book.title}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="author">Author</label>
                                                    <input
                                                        type="text"
                                                        id="author"
                                                        name="author"
                                                        className="form-control"
                                                        value={book.author}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="publication_year">Publication Year</label>
                                                    <input
                                                        type="text"
                                                        id="publication_year"
                                                        name="publication_year"
                                                        className="form-control"
                                                        value={book.publication_year}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">Status</label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        className="form-control"
                                                        value={book.status}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="Available">Available</option>
                                                        <option value="Unavailable">Unavailable</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="books_total_count">Total Count</label>
                                                    <input
                                                        type="number"
                                                        id="books_total_count"
                                                        name="books_total_count"
                                                        className="form-control"
                                                        value={book.books_total_count}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="borrowed_books_total_count">Borrowed Count</label>
                                                    <input
                                                        type="number"
                                                        id="borrowed_books_total_count"
                                                        name="borrowed_books_total_count"
                                                        className="form-control"
                                                        value={book.borrowed_books_total_count}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="form-buttons"
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <button type="submit" className="btn btn-success">
                                                Add Book
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewBook;