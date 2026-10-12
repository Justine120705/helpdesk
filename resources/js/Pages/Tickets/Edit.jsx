import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, ticket }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title || '', description: ticket.description || '',
        category: ticket.category || 'Hardware', priority: ticket.priority || 'Low', status: ticket.status || 'Open',
    });

    const submit = (e) => { e.preventDefault(); put(route('tickets.update', ticket.id)); };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Edit Ticket #{ticket.id}</h2>}>
            <Head title={`Edit Ticket #${ticket.id}`} />
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <TicketForm data={data} setData={setData} errors={errors} processing={processing} submit={submit} submitText="Update Ticket" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}