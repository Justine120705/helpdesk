import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, ticket }) {
    const handleDelete = () => {
        if (confirm('Delete this ticket?')) router.delete(route('tickets.destroy', ticket.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800">Ticket #{ticket.id}</h2>
                <Link href={route('tickets.index')} className="text-sm text-gray-600">&larr; Back</Link>
            </div>
        }>
            <Head title={`Ticket #${ticket.id}`} />
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow space-y-6">
                    <div className="border-b pb-4 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold">{ticket.title}</h1>
                            <p className="text-sm text-gray-500">Category: {ticket.category}</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge value={ticket.priority} type="priority" />
                            <Badge value={ticket.status} type="status" />
                        </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                    <div className="border-t pt-4 flex justify-end gap-4">
                        <Link href={route('tickets.edit', ticket.id)} className="bg-indigo-600 text-white py-2 px-4 rounded text-sm">Edit</Link>
                        <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded text-sm">Delete</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}