<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/{any?}', function () {
//     return view('welcome');
// });
Route::get('/{any?}/{slug?}/{id?}', function ($any = null, $slug = null, $id = null) {
    return view('welcome');
})->where([
    'any' => '.*',     // Match anything for 'any'
    'slug' => '[a-zA-Z0-9-]+',  // Example regex for 'slug'
    'id' => '[0-9]+'   // Example regex for 'id' (only digits)
]);



// Laravel Route in `routes/api.php`
Route::get('/rooms', [RoomController::class, 'index']);
