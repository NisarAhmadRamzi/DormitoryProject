<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
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
            'room_number' => 'required|string|max:10',
            'type' => 'required|in:4 people,6 people,8 people',
            'capacity' => 'required|integer',
            'current_occupancy' => 'nullable|integer',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:Available,Occupied',
            'floor' => 'required|in:Third Floor,Fourth Floor',
        ]);

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
            'room_number' => 'required|string|max:10',
            'type' => 'required|in:4 people,6 people,8 people',
            'capacity' => 'required|integer',
            'current_occupancy' => 'nullable|integer',
            'price' => 'sometimes|numeric|min:0', // Optional
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
