<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            if ($request->user()->hasRole('staff') && $request->path() === 'dashboard') {
                return redirect()->route('staff-dashboard.index');
            }
            if ($request->user()->hasRole('admin') && $request->path() === 'dashboard') {
                return redirect()->route('admin-dashboard.index');
            }
        }
        
        return $next($request);
    }
}