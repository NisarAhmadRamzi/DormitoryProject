<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\LibraryResource;
use App\Models\Library;
use Illuminate\Http\Request;

class LibraryController extends Controller
{ // Get all libraries
    public function index()
    {
        $libraries = Library::all();
        return LibraryResource::collection($libraries);
    }

    // Show a single library
    public function show(Library $library)
    {
        return new LibraryResource($library);
    }

    // Store a new library
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'contact_info' => 'nullable|string',
        ]);

        $library = Library::create($request->all());
        return new LibraryResource($library);
    }

    // Update an existing library
    public function update(Request $request, Library $library)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'contact_info' => 'nullable|string',
        ]);

        $library->update($request->all());
        return new LibraryResource($library);
    }

    // Delete a library
    public function destroy(Library $library)
    {
        $library->delete();
        return response()->json(['message' => 'Library deleted successfully'], 204);
    }
}
