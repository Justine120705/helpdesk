<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = $request->user()->tickets()
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->priority, fn($q, $p) => $q->where('priority', $p))
            ->latest()->paginate(10)->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('status', 'priority'),
        ]);
    }

    public function create() { return Inertia::render('Tickets/Create'); }

    public function store(StoreTicketRequest $request)
    {
        $request->user()->tickets()->create($request->validated());
        return to_route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket)
    {
        Gate::authorize('view', $ticket);
        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket)
    {
        Gate::authorize('update', $ticket);
        return Inertia::render('Tickets/Edit', ['ticket' => $ticket]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        Gate::authorize('update', $ticket);
        $ticket->update($request->validated());
        return to_route('tickets.show', $ticket)->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket)
    {
        Gate::authorize('delete', $ticket);
        $ticket->delete();
        return to_route('tickets.index')->with('success', 'Ticket deleted.');
    }
}