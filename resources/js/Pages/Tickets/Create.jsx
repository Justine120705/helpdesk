import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '', description: '', category: 'Hardware', priority: 'Low', status: 'Open',
    });

    const submit = (e) => { e.preventDefault(); post(route('tickets.store')); };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Create Ticket</h2>}>
            <Head title="Create Ticket" />
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <TicketForm data={data} setData={setData} errors={errors} processing={processing} submit={submit} submitText="Create Ticket" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
