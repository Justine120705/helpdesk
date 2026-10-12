import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, tickets, filters }) {
    const handleFilterChange = (key, value) => {
        router.get(route('tickets.index'), { ...filters, [key]: value }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this ticket?')) router.delete(route('tickets.destroy', id));
    };

    const formatLinkLabel = (label) => {
        if (label.includes('&laquo;')) return '« Previous';
        if (label.includes('&raquo;')) return 'Next »';
        return label;
    };

    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tickets</h2>
                <Link href={route('tickets.create')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm">+ Create Ticket</Link>
            </div>
        }>
            <Head title="Tickets" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow flex gap-4">
                    <select value={filters.status || ''} onChange={e => handleFilterChange('status', e.target.value)} className="border-gray-300 rounded-md text-sm">
                        <option value="">All Statuses</option>
                        {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={filters.priority || ''} onChange={e => handleFilterChange('priority', e.target.value)} className="border-gray-300 rounded-md text-sm">
                        <option value="">All Priorities</option>
                        {['Low', 'Medium', 'High', 'Urgent'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                {/* Desktop Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden hidden md:block">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.data.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-8">No tickets found. <Link href={route('tickets.create')} className="text-indigo-600 underline">Create one</Link></td></tr>
                            ) : (
                                tickets.data.map(ticket => (
                                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900"><Link href={route('tickets.show', ticket.id)} className="hover:underline">{ticket.title}</Link></td>
                                        <td className="px-6 py-4">{ticket.category}</td>
                                        <td className="px-6 py-4"><Badge value={ticket.priority} type="priority" /></td>
                                        <td className="px-6 py-4"><Badge value={ticket.status} type="status" /></td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={route('tickets.show', ticket.id)} className="text-blue-600">View</Link>
                                            <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600">Edit</Link>
                                            <button onClick={() => handleDelete(ticket.id)} className="text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Stacked List */}
                <div className="md:hidden space-y-4">
                    {tickets.data.map(ticket => (
                        <div key={ticket.id} className="bg-white p-4 rounded-lg shadow space-y-2 border">
                            <div className="flex justify-between items-start font-semibold">
                                <Link href={route('tickets.show', ticket.id)}>{ticket.title}</Link>
                                <Badge value={ticket.status} type="status" />
                            </div>
                            <div className="text-xs text-gray-500 space-x-2">
                                <span>{ticket.category}</span>
                                <Badge value={ticket.priority} type="priority" />
                            </div>
                            <div className="pt-2 flex justify-end gap-3 text-sm">
                                <Link href={route('tickets.show', ticket.id)} className="text-blue-600">View</Link>
                                <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600">Edit</Link>
                                <button onClick={() => handleDelete(ticket.id)} className="text-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Clean Pagination */}
                {tickets.links.length > 3 && (
                    <div className="flex justify-center gap-1 mt-6">
                        {tickets.links.map((link, i) => (
                            link.url ? (
                                <Link key={i} href={link.url} className={`px-3 py-1 text-sm border rounded ${link.active ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {formatLinkLabel(link.label)}
                                </Link>
                            ) : <span key={i} className="px-3 py-1 text-sm text-gray-400 border rounded">{formatLinkLabel(link.label)}</span>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}