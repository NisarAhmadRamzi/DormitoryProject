import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import { SideBar } from "../../pages/dashboard/Dashboard";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BooksList() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [sortCriteria, setSortCriteria] = useState("id"); // Default sorting by ID
    const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
    const navigate = useNavigate();

    // Fetch books from the API
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/books");
            setBooks(response.data.data); // Store book data
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Handle deleting a book
    const handleDelete = (bookId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will permanently delete the book!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `http://127.0.0.1:8000/api/books/${bookId}`
                    );
                    if (response.status === 200) {
                        setBooks((prevBooks) =>
                            prevBooks.filter((book) => book.id !== bookId)
                        );
                        Swal.fire("Deleted!", "The book has been deleted.", "success");
                    } else {
                        Swal.fire("Failed", "There was an issue deleting the book.", "error");
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong!", "error");
                    console.error("Error deleting book:", error);
                }
            }
        });
    };

    // Handle sorting for each column
    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            // Toggle the sort order if the same column is clicked
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set the new criteria and default to ascending order
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
    };

    // Filter books based on search term
    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered books based on the selected criteria and order
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortCriteria === "id" || sortCriteria === "library_id") {
            return sortOrder === "asc"
                ? a[sortCriteria] - b[sortCriteria]
                : b[sortCriteria] - a[sortCriteria];
        } else if (
            sortCriteria === "title" ||
            sortCriteria === "author" ||
            sortCriteria === "publication_year" ||
            sortCriteria === "status"
        ) {
            return sortOrder === "asc"
                ? a[sortCriteria].localeCompare(b[sortCriteria])
                : b[sortCriteria].localeCompare(a[sortCriteria]);
        }
        return 0;
    });

    return (
        <>
            <SideBar />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Books List</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex align-items-center">
                            <button
                                onClick={() => navigate("/dashboard/books/addBook")}
                                className="btn btn-success ml-auto"
                            >
                                Add New Book
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header"></div>

                                <div className="card-body">
                                    {/* Search input */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Title or Author"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="table-responsive">
                                        <table
                                            id="booksTable"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("id")}
                                                        >
                                                            ID
                                                            {sortCriteria === "id" &&
                                                                (sortOrder === "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("library_id")}
                                                        >
                                                            Library ID
                                                            {sortCriteria === "library_id" &&
                                                                (sortOrder === "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("title")}
                                                        >
                                                            Title
                                                            {sortCriteria === "title" &&
                                                                (sortOrder === "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("author")}
                                                        >
                                                            Author
                                                            {sortCriteria === "author" &&
                                                                (sortOrder === "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("publication_year")}
                                                        >
                                                            Pub Year
                                                            {sortCriteria === "publication_year" &&
                                                                (sortOrder === "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button
                                                            className="btn btn-link text-decoration-none"
                                                            onClick={() => handleSort("status")}
                                                        >
                                                            Status
                                                            {sortCriteria === "status" &&
                                                                (sortOrder === "asc" ? (
                                                                    <FaArrowUp />
                                                                ) : (
                                                                    <FaArrowDown />
                                                                ))}
                                                        </button>
                                                    </th>
                                                    <th>Total Count</th>
                                                    <th>Borrowed Count</th>
                                                    <th>Available Count</th>
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedBooks.map((book) => (
                                                    <tr key={book.id}>
                                                        <td>{book.id}</td>
                                                        <td>{book.library_id}</td>
                                                        <td>{book.title}</td>
                                                        <td>{book.author}</td>
                                                        <td>{book.publication_year}</td>
                                                        <td>{book.status}</td>
                                                        <td>{book.books_total_count}</td>
                                                        <td>{book.borrowed_books_total_count}</td>
                                                        <td>{book.books_total_count_after_borrowed}</td>
                                                        <td>{new Date(book.created_at).toLocaleString()}</td>
                                                        <td>{new Date(book.updated_at).toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    navigate(`/dashboard/books/${book.id}`)
                                                                }
                                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                                            >
                                                                <FaPencilAlt />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(book.id)}
                                                                className="my-2 btn btn-danger shadow btn-xs sharp"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BooksList; 