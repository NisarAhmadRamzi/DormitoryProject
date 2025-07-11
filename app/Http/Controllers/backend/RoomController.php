<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class RoomController extends Controller
{
    public function __construct()
    {
        Artisan::call('permission:cache-reset');
        $this->middleware('permission:all rooms')->only(['index']);
        $this->middleware('permission:view room')->only(['show']);
        $this->middleware('permission:create room')->only(['store']);
        $this->middleware('permission:edit room')->only(['update']);
        $this->middleware('permission:delete room')->only(['destroy']);
    }
    /**
     * Display a listing of the rooms.
     */
    public function index()
    {
        $rooms = Room::all();
        return RoomResource::collection($rooms);
    }

    /**
     * Store a newly created room in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number|in:301,302,303,304,305,306,307,308,309,310,311,312,313,314,401,402,403,404,405,406,407,408,409,410,411,412,413,414',
            'type' => 'required|in:4 people,6 people,8 people',
            'capacity' => 'required|in:4,6,8',
            'current_occupancy' => 'nullable|integer|between:0,8',
            'price' => 'required|integer|min:0',
            'status' => 'required|in:Available,Occupied',
            'floor' => 'required|in:Third Floor,Fourth Floor',
        ]);

        // ✅ Extra custom checks:
        if (
            ($validated['type'] === '4 people' && $validated['capacity'] != 4) ||
            ($validated['type'] === '6 people' && $validated['capacity'] != 6) ||
            ($validated['type'] === '8 people' && $validated['capacity'] != 8)
        ) {
            return back()->withErrors(['capacity' => 'Capacity must match the selected room type.'])->withInput();
        }

        if (in_array($validated['room_number'], range(301, 314)) && $validated['floor'] !== 'Third Floor') {
            return back()->withErrors(['floor' => 'Rooms 301 to 314 must be on Third Floor.'])->withInput();
        }

        if (in_array($validated['room_number'], range(401, 414)) && $validated['floor'] !== 'Fourth Floor') {
            return back()->withErrors(['floor' => 'Rooms 401 to 414 must be on Fourth Floor.'])->withInput();
        }


        $room = Room::create($validated);
        return new RoomResource($room);
    }

    /**
     * Display the specified room.
     */
    public function show(Room $room)
    {
        return new RoomResource($room);
    }

    /**
     * Update the specified room in storage.
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'required|integer|unique:rooms,room_number|in:301,302,303,304,305,306,307,308,309,310,311,312,313,314,401,402,403,404,405,406,407,408,409,410,411,412,413,414',
            'type' => 'required|in:4 people,6 people,8 people',
            'capacity' => 'required|integer|in:4,6,8',
            'current_occupancy' => 'nullable|integer',
            'price' => 'required|integer|min:0', // Optional
            'status' => 'required|in:Available,Occupied',
            'floor' => 'required|in:Third Floor,Fourth Floor',
        ]);

        $room->update($validated);
        return new RoomResource($room);
    }

    /**
     * Remove the specified room from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(['message' => 'deleted successfully!!!']);
    }
}
