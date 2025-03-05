<?php

use App\Http\Controllers\backend\AssetController;
use App\Http\Controllers\backend\AuthController;
use App\Http\Controllers\backend\ComplaintController;
use App\Http\Controllers\backend\ExpenseController;
use App\Http\Controllers\backend\FeeController;
use App\Http\Controllers\backend\RoomController;
use App\Http\Controllers\backend\StudentController;
use App\Http\Controllers\backend\UserController;
use App\Http\Controllers\backend\PermissionController;
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


Route::apiResource('users', UserController::class);
Route::post('/users/updateUsers/{user}', [UserController::class, 'updateUser']);
Route::put('/users/{user}/assign', [UserController::class, 'assign'])->name('role.assign');
Route::get('test', [UserController::class, 'test']);


// Route::post('login',[AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->group(function(){
//     Route::post('logout',[AuthController::class, 'logout']);
// });

Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/member/login', [AuthController::class, 'memberLogin']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::apiResource('rooms', RoomController::class);
Route::apiResource('students', StudentController::class);
Route::apiResource('complaints', ComplaintController::class);
Route::apiResource('fees', FeeController::class);

Route::apiResource('roles', RoleController::class);
Route::put('/roles/{role}/assign', [RoleController::class, 'assign'])->name('permissions.assign');
Route::apiResource('permissions', PermissionController::class);


Route::apiResource('supports', SupportController::class);
Route::apiResource('assets', AssetController::class);
Route::apiResource('expenses', ExpenseController::class);
