<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\Student;
use App\Models\Room;
use App\Models\Support;
use App\Models\Expense;
use App\Models\Complaint;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //     public function stats()
    //     {
    //         $totalUsers = DB::table('users')->count();
    //         $totalStudents = Student::count();
    //         $totalLibraryStudents = DB::table('LibraryStudent')->count();
    //         // $totalStaff = DB::table('staff')->count();


    //         $totalRooms = Room::count();
    //         $availableRooms = Room::where('status', 'Available')->count();
    //         $occupiedRooms = Room::where('status', 'Occupied')->count();

    //         $pendingComplaints = Complaint::where('status', 'Pending')->count();
    //         $inProgressComplaints = Complaint::where('status', 'In Progress')->count();
    //         $resolvedComplaints = Complaint::where('status', 'Resolved')->count();

    //         // for all assets
    //         $totalAssets = DB::table('assets')->sum('quantity');
    //         $totalDonations = Support::sum('total_cash_donated');
    //         $totalCashDonated = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
    //         $totalGoodsQuantity = Support::sum('goods_quantity');
    //         $totalExpenses = Expense::sum('expense_cash');


    //         $totalBooks = Book::sum('books_total_count');
    //         $borrowedBooks = Book::sum('borrowed_books_total_count');
    //         // $avialabeBooks = Book::sum('books_total_count_available');
    //         $availableBooks = $totalBooks - $borrowedBooks;

    //         return response()->json([
    //             'total_users' => $totalUsers,
    //             'total_students' => $totalStudents,
    //             'total_library_students' => $totalLibraryStudents,
    //             // 'total_staff' => $totalStaff,
    //             'total_rooms' => $totalRooms,
    //             'room_status' => [
    //                 'available' => $availableRooms,
    //                 'occupied' => $occupiedRooms,
    //             ],
    //             'complaints' => [
    //                 'pending' => $pendingComplaints,
    //                 'in_progress' => $inProgressComplaints,
    //                 'resolved' => $resolvedComplaints,
    //             ],
    //             'donations' => [
    //                 'total_donations' => $totalDonations,
    //                 'total_cash_donated' => $totalCashDonated,
    //                 'total_goods_quantity' => $totalGoodsQuantity,
    //             ],
    //             'expenses' => $totalExpenses,
    //             'assets_total_quantity' => $totalAssets,
    //             'books' => [
    //                 'total_books' => $totalBooks,
    //                 'borrowed_books' => $borrowedBooks,
    //                 'available_books' => $availableBooks,
    //             ],
    //         ]);
    //     }

    public function stats()
    {
        $totalUsers = DB::table('users')->count();
        $totalStudents = Student::count();
        $totalLibraryStudents = DB::table('library_students')->count(); // ✅ fixed table name to match your model

        $totalRooms = Room::count();
        $availableRooms = Room::where('status', 'Available')->count();
        $occupiedRooms = Room::where('status', 'Occupied')->count();

        // Complaints status
        $pendingComplaints = Complaint::where('status', 'Pending')->count();
        $inProgressComplaints = Complaint::where('status', 'In Progress')->count();
        $resolvedComplaints = Complaint::where('status', 'Resolved')->count();

        // Donations & Assets
        $totalAssets = DB::table('assets')->sum('quantity');
        $totalDonations = Support::sum('total_cash_donated');
        $totalCashDonated = Support::orderBy('id', 'desc')->value('total_cash_donated') ?? 0;
        $totalGoodsQuantity = Support::sum('goods_quantity');
        $latestSupportDate = Support::orderBy('help_date', 'desc')->value('help_date'); // 🆕

        // Expenses
        $totalExpenses = Expense::sum('expense_cash');
        $latestExpenseDate = Expense::orderBy('expense_date', 'desc')->value('expense_date'); // 🆕

        // Books
        $totalBooks = Book::sum('books_total_count');
        $borrowedBooks = Book::sum('borrowed_books_total_count');
        $availableBooks = $totalBooks - $borrowedBooks;

        // BorrowedBooks - total overdue books 🆕
        $overdueBooks = DB::table('borrowed_books')->where('status', 'Overdue')->count();

        // Room utilization rate 🆕
        $roomUtilizationRate = $totalRooms > 0 ? round(($occupiedRooms / $totalRooms) * 100, 2) : 0;

        return response()->json([
            'total_users' => $totalUsers,
            'total_students' => $totalStudents,
            'total_library_students' => $totalLibraryStudents,

            'rooms' => [
                'total' => $totalRooms,
                'available' => $availableRooms,
                'occupied' => $occupiedRooms,
                'utilization_rate_percent' => $roomUtilizationRate,
            ],

            'complaints' => [
                'pending' => $pendingComplaints,
                'in_progress' => $inProgressComplaints,
                'resolved' => $resolvedComplaints,
            ],

            'donations' => [
                'total_cash_donated' => $totalCashDonated,
                'total_goods_quantity' => $totalGoodsQuantity,
                'total_cash_donated_cumulative' => $totalDonations,
                'latest_donation_date' => $latestSupportDate,
            ],

            'expenses' => [
                'total' => $totalExpenses,
                'latest_expense_date' => $latestExpenseDate,
            ],

            'assets' => [
                'total_quantity' => $totalAssets,
            ],

            'books' => [
                'total' => $totalBooks,
                'borrowed' => $borrowedBooks,
                'available' => $availableBooks,
                'overdue' => $overdueBooks,
            ],
        ]);
    }
}






 // return response()->json([
        //     'total_students' => $totalStudents,
        //     'room_status' => [
        //         'available' => $availableRooms,
        //         'occupied' => $occupiedRooms,
        //     ],
        //     'donations' => [
        //         'total_cash' => $totalCashDonated,
        //         'total_goods' => $totalGoodsQuantity,
        //     ],
        //     'expenses' => $totalExpenses,
        //     'complaints' => [
        //         'open' => $openComplaints,
        //         'resolved' => $resolvedComplaints,
        //     ],
        //     'books' => [
        //         'total' => $totalBooks,
        //         'borrowed' => $borrowedBooks,
        //         'available' => $availableBooks,
        //     ],
        // ]);