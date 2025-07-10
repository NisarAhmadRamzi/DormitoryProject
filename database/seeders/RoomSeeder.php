<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = [
            [
                'room_number' => '301',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '302',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '303',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '304',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '305',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '306',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],

            [
                'room_number' => '307',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '308',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '309',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '310',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '311',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '312',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '313',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],
            [
                'room_number' => '314',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Third Floor'
            ],


            [
                'room_number' => '401',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '402',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '403',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '404',
                'type' => '4 people',
                'capacity' => 4,
                'current_occupancy' => 0,
                'price' => 3500,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '405',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '406',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '407',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '408',
                'type' => '6 people',
                'capacity' => 6,
                'current_occupancy' => 0,
                'price' => 3400,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '409',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '410',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '411',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '412',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '413',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ],
            [
                'room_number' => '414',
                'type' => '8 people',
                'capacity' => 8,
                'current_occupancy' => 0,
                'price' => 3200,
                'status' => 'Available',
                'floor' => 'Fourth Floor'
            ]
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
