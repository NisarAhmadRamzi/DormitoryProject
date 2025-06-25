<?php

use App\Http\Controllers\backend\AssetController;
use App\Http\Controllers\backend\AuthController;
use App\Http\Controllers\backend\BookController;
use App\Http\Controllers\backend\BorrowedBookController;
use App\Http\Controllers\backend\ComplaintController;
use App\Http\Controllers\backend\DashboardController;
use App\Http\Controllers\backend\ExpenseController;
use App\Http\Controllers\backend\FeeController;
use App\Http\Controllers\backend\LibraryController;
use App\Http\Controllers\backend\LibraryStudentController;
use App\Http\Controllers\backend\RoomController;
use App\Http\Controllers\backend\StudentController;
use App\Http\Controllers\backend\UserController;
use App\Http\Controllers\backend\PermissionController;
use App\Http\Controllers\backend\ProfileController;
use App\Http\Controllers\backend\RoleController;
use App\Http\Controllers\backend\SupportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('logout', [AuthController::class, 'logout']);
// });
// authentication routes
// Route::post('/admin/login', [AuthController::class, 'adminLogin']);
// Route::post('/member/login', [AuthController::class, 'memberLogin']);
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// Single Login Route
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('rooms', RoomController::class);

    // user routes
    Route::apiResource('users', UserController::class);
    Route::post('/users/updateUsers/{user}', [UserController::class, 'updateUser']);
    Route::put('/users/{user}/assign', [UserController::class, 'assign'])->name('role.assign');
    Route::get('test', [UserController::class, 'test']);
    // student routes
    Route::apiResource('students', StudentController::class);
    Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::post('/students/{student}/restore', [StudentController::class, 'restore'])->name('students.restore');
    Route::delete('/students/{student}/forceDelete', [StudentController::class, 'forceDelete'])->name('students.forceDelete');
    Route::get('/students/trashed/{student}', [StudentController::class, 'trashedStudent'])->name('student.trashed');
    Route::get('/students/trashed', [StudentController::class, 'trashedStudents'])->name('students.trashed'); // Get only deleted students
    Route::get('/students/all', [StudentController::class, 'allStudents'])->name('students.withtrashed'); // Get all students including deleted
    Route::get('/students/test', [StudentController::class, 'test']);
    // all other routes

    Route::apiResource('complaints', ComplaintController::class);
    Route::apiResource('fees', FeeController::class);
    // role and permissions route
    Route::apiResource('roles', RoleController::class);
    Route::put('/roles/{role}/assign', [RoleController::class, 'assign'])->name('permissions.assign');
    Route::apiResource('permissions', PermissionController::class);
    // calculation routes
    Route::apiResource('supports', SupportController::class);
    Route::apiResource('assets', AssetController::class);
    Route::apiResource('expenses', ExpenseController::class);
    // library routes
    Route::apiResource('libraries', LibraryController::class);
    Route::apiResource('books', BookController::class);
    Route::resource('library-students', LibraryStudentController::class);
    Route::resource('borrowed-books', BorrowedBookController::class);


    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile/photo', [ProfileController::class, 'deletePhoto']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    Route::get('/dashboard-stats', [DashboardController::class, 'stats']);
});
