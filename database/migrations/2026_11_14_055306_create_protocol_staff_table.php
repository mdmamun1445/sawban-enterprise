<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProtocolStaff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProtocolStaffController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $staff = ProtocolStaff::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/protocol-staff', [
            'staff' => $staff,
            'filters' => [
                'search' => $search,
            ],
            'stats' => [
                'total' => ProtocolStaff::count(),
                'active' => ProtocolStaff::where('status', 'active')->count(),
                'inactive' => ProtocolStaff::where('status', 'inactive')->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'position' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        ProtocolStaff::create($validated);

        return redirect()->back()->with('success', 'Staff added successfully!');
    }

    public function update(Request $request, ProtocolStaff $protocolStaff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'position' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $protocolStaff->update($validated);

        return redirect()->back()->with('success', 'Staff updated successfully!');
    }

    public function destroy(ProtocolStaff $protocolStaff)
    {
        $protocolStaff->delete();

        return redirect()->back()->with('success', 'Staff deleted successfully!');
    }
}
