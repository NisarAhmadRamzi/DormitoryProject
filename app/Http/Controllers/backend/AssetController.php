<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Models\Asset;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    // public function index()
    // {
    //     return AssetResource::collection(Asset::with('supports')->get());
    // }

    // // Store a new asset
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'quantity' => 'required|integer|min:0',
    //         'description' => 'nullable|string',
    //     ]);

    //     $asset = Asset::create($validated);

    //     return new AssetResource($asset);
    // }

    // // Show a single asset
    // public function show(Asset $asset)
    // {
    //     return new AssetResource($asset->load('supports'));
    // }

    // // Update an asset
    // public function update(Request $request, Asset $asset)
    // {
    //     $validated = $request->validate([
    //         'quantity' => 'required|integer|min:0',
    //         'description' => 'nullable|string',
    //     ]);

    //     $asset->update($validated);

    //     return new AssetResource($asset);
    // }

    // // Delete an asset
    // public function destroy(Asset $asset)
    // {
    //     $asset->delete();
    //     return response()->json(['message' => 'Asset deleted successfully']);
    // }





    // Get all assets
    public function index()
    {
        // Refresh total_amount_of_donations before returning
        Asset::all()->each->save();
        return AssetResource::collection(Asset::all());
    }

    // Store a new asset
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
            'description' => 'nullable|string',
        ]);
        // Refresh total_amount_of_donations before returning
        Asset::all()->each->save();
        $asset = Asset::create($validated);
        return new AssetResource($asset);
    }

    // Show a single asset
    public function show(Asset $asset)
    {
        $asset->save(); // Ensure it recalculates the latest donation sum
        return new AssetResource($asset);
    }

    // Update an asset
    public function update(Request $request, Asset $asset)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
            'description' => 'nullable|string',
        ]);

        $asset->update($validated);
        return new AssetResource($asset);
    }

    // Delete an asset
    public function destroy(Asset $asset)
    {
        $asset->delete();
        return response()->json(['message' => 'Asset deleted successfully']);
    }
}
