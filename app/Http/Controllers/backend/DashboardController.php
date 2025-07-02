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
use App\Models\BorrowedBook;
use App\Models\Fee;
use App\Models\LibraryStudent;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:AdminDashboard')->only(['stats']);
        $this->middleware('permission:StudentDashboard')->only(['studentDashboard']);
        $this->middleware('permission:LibraryAdminDashboard')->only(['libraryAdminDashboard']);
        $this->middleware('permission:LibraryStudentDashboard')->only(['libraryStudentDashboard']);
        // $this->middleware('auth');
    }

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

        // Office Paid & Warranty Paid totals
        $totalOfficePaid = Fee::sum('office_paid');
        $totalWarrantyPaid = Fee::sum('warranty_paid');
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

            'fees' => [
                'total_office_paid' => $totalOfficePaid,
                'total_warranty_paid' => $totalWarrantyPaid,
            ],
        ]);
    }

    public function studentDashboard()
    {
        $user = auth()->user();

        $student = Student::where('email', $user->email)->first();
        $totalStudents = Student::count();


        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $room = $student->room;
        $fees = $student->fees;
        $complaints = $student->complaints;

        return response()->json([
            'student_info' => $student,
            'total_students' => $totalStudents,
            'room' => $room,
            'fees' => [
                'office_paid' => $fees->office_paid ?? 0,
                'warranty_paid' => $fees->warranty_paid ?? 0,
                'total_fee' => $fees->total_fee ?? 0,
                'due_date' => $fees->due_date ?? null,
            ],
            'complaints_summary' => [
                'total' => $complaints->count(),
                'pending' => $complaints->where('status', 'Pending')->count(),
                'resolved' => $complaints->where('status', 'Resolved')->count(),
            ],
        ]);
    }
    public function libraryAdminDashboard()
    {
        $totalBooks = Book::sum('books_total_count');
        $borrowedBooks = Book::sum('borrowed_books_total_count');
        $availableBooks = $totalBooks - $borrowedBooks;

        $totalLibraryStudents = LibraryStudent::count();
        $borrowedBookStatus = DB::table('borrowed_books')
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        return response()->json([
            'books' => [
                'total' => $totalBooks,
                'borrowed' => $borrowedBooks,
                'available' => $availableBooks,
            ],
            'library_students' => [
                'total' => $totalLibraryStudents,
            ],
            'borrowed_book_status' => $borrowedBookStatus,
        ]);
    }
    public function libraryStudentDashboard()
    {
        $user = auth()->user();
        $libraryStudent = LibraryStudent::where('email', $user->email)->first();

        if (!$libraryStudent) {
            return response()->json(['message' => 'Library Student not found'], 404);
        }

        $borrowedBooks = BorrowedBook::where('library_student_id', $libraryStudent->id)->get();

        return response()->json([
            'library_student_info' => $libraryStudent,
            'borrowed_books' => $borrowedBooks,
            'borrowed_summary' => [
                'total' => $borrowedBooks->count(),
                'active' => $borrowedBooks->where('status', 'Borrowed')->count(),
                'overdue' => $borrowedBooks->where('status', 'Overdue')->count(),
                'returned' => $borrowedBooks->where('status', 'Returned')->count(),
            ],
        ]);
    }





















    // public function studentDashboard(Request $request)
    // {
    //     $studentId = auth()->user()->student->id; // Assuming user is linked to student
    //     // $studentId = 5; // Assuming user is linked to student

    //     $student = Student::with('room')->find($studentId);

    //     // $fees = Fee::where('student_id', $studentId)->selectRaw('SUM(total_fee) as total_fee, SUM(paid_fee) as paid_fee')->first();
    //     // $outstanding = $fees->total_fee - $fees->paid_fee;

    //     $complaints = Complaint::where('student_id', $studentId)
    //         ->selectRaw('status, COUNT(*) as count')
    //         ->groupBy('status')->pluck('count', 'status');

    //     // $borrowedBooks = DB::table('borrowed_books')
    //     //     ->where('student_id', $studentId)
    //     //     ->select('book_id', 'due_date', 'status')
    //     //     ->get();

    //     return response()->json([
    //         'student' => $student,
    //         // 'fees' => [
    //         //     'total' => $fees->total_fee,
    //         //     'paid' => $fees->paid_fee,
    //         //     'outstanding' => $outstanding,
    //         // ],
    //         'complaints' => $complaints,
    //         // 'borrowed_books' => $borrowedBooks,
    //     ]);
    // }

    // public function libraryAdminDashboard()
    // {
    //     // $totalBooks = Book::sum('books_total_count');
    //     // $borrowedBooks = Book::sum('borrowed_books_total_count');
    //     // $overdueBooks = DB::table('borrowed_books')->where('status', 'Overdue')->count();
    //     // $libraryStudentsCount = DB::table('library_students')->count();

    //     // $recentDonations = Support::orderBy('help_date', 'desc')->limit(5)->get();

    //     // $pendingLibraryComplaints = Complaint::where('status', 'Pending')
    //     //     ->where('category', 'library') // assuming category field
    //     //     ->count();

    //     return response()->json([
    //         // 'total_books' => $totalBooks,
    //         // 'borrowed_books' => $borrowedBooks,
    //         // 'overdue_books' => $overdueBooks,
    //         // 'library_students' => $libraryStudentsCount,
    //         // 'recent_donations' => $recentDonations,
    //         // 'pending_complaints' => $pendingLibraryComplaints,
    //         'library Admin'
    //     ]);
    // }

    // public function libraryStudentDashboard(Request $request)
    // {
    //     // $libraryStudentId = auth()->user()->libraryStudent->id;

    //     // $libraryStudent = DB::table('library_students')->where('id', $libraryStudentId)->first();

    //     // $borrowedBooks = DB::table('borrowed_books')
    //     //     ->where('library_student_id', $libraryStudentId)
    //     //     ->select('book_id', 'due_date', 'status')
    //     //     ->get();

    //     // // If you track fines:
    //     // $totalFines = DB::table('fines')
    //     //     ->where('library_student_id', $libraryStudentId)
    //     //     ->sum('amount');

    //     return response()->json([
    //         // 'library_student' => $libraryStudent,
    //         // 'borrowed_books' => $borrowedBooks,
    //         // 'total_fines' => $totalFines ?? 0,

    //         'library Student'
    //     ]);
    // }
}
