<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HotelController extends Controller {

    // Fetch All Hotels (For Admin & Users)
    public function index() {
        return response()->json(Hotel::all());
    }

    // Fetch Single Hotel
    public function show($id) {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Hotel not found'], 404);
        }
        return response()->json($hotel);
    }

    // Create Hotel (Admin Only)
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'cost_per_night' => 'required|numeric',
            'available_rooms' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // ✅ Ensure file validation
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hotels', 'public');
        } else {
            $imagePath = null;
        }

        $hotel = Hotel::create([
            'name' => $request->name,
            'address' => $request->address,
            'cost_per_night' => $request->cost_per_night,
            'available_rooms' => $request->available_rooms,
            'image' => $imagePath ? asset('storage/' . $imagePath) : null,
            'average_rating' => 0
        ]);

        return response()->json($hotel, 201);
    }

    // Update Hotel (Admin Only)
    public function update(Request $request, $id) {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Hotel not found'], 404);
        }

        // Validate fields
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'cost_per_night' => 'required|numeric',
            'available_rooms' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hotels', 'public');
            $hotel->image = asset('storage/' . $imagePath);
        }

        // Update other fields
        $hotel->name = $request->name;
        $hotel->address = $request->address;
        $hotel->cost_per_night = $request->cost_per_night;
        $hotel->available_rooms = $request->available_rooms;
        $hotel->save();

        return response()->json($hotel);
    }


    // Delete Hotel (Admin Only)
    public function destroy($id) {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Hotel not found'], 404);
        }

        if ($hotel->image) {
            Storage::delete(str_replace(asset('storage/'), '', $hotel->image));
        }

        $hotel->delete();
        return response()->json(['message' => 'Hotel deleted successfully']);
    }
}
