<?php

namespace App\Http\Controllers;

use App\Models\Support;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalUsers = User::count();
        $totalAdmins = User::where('role', 'admin')->count();
        $totalSubscriptions = Transaction::where('status', 'completed')->count();
        $totalSupportRequests = Support::count();

        $context = [
            'totalUsers' => $totalUsers,
            'totalAdmins' => $totalAdmins,
            'totalSubscriptions' => $totalSubscriptions,
            'totalSupportRequests' => $totalSupportRequests,
        ];

        return Inertia::render('admin/dashboard', $context);
    }

    public function users()
    {
        $users = User::paginate(10);

        return Inertia::render('admin/users', [
            'users' => $users,
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }

    public function createAdmin() {
        return Inertia::render('admin/admin');
    }

    public function storeAdmin(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return redirect()->route('admin.users')->with('success', 'Admin created successfully.');
    }

    public function support()
    {
        $supports = Support::paginate(10);

        return Inertia::render('admin/support', [
            'supports' => $supports,
        ]);
    }

    public function deleteSupport($id)
    {
        $support = Support::findOrFail($id);
        $support->delete();

        return redirect()->route('admin.support')->with('success', 'Support request deleted successfully.');
    }

    public function storeSupport(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'message' => 'required|string',
        ]);

        Support::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        return "<h1>Support request submitted successfully.</h1>";
    }

    public function subscription()
    {
        $subscriptions = Transaction::with('user')->where('status', 'completed')
            ->paginate(10);

        return Inertia::render('admin/subscription', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function deleteSubscription($id)
    {
        $subscription = Transaction::findOrFail($id);
        $subscription->delete();

        return redirect()->route('admin.subscription')->with('success', 'Subscription deleted successfully.');
    }
}
