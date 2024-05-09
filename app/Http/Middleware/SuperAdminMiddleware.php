<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
         // Check if the authenticated user is a SuperAdmin
         if (!auth()->check() || !auth()->user()->isSuperAdmin()) {
            // Redirect or deny access
            return redirect()->route('client.index')->with('error', 'Unauthorized access');
        }


        return $next($request);
    }
}
