import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

export default function TicketForm({ data, setData, errors, processing, submit, submitText = 'Save' }) {
    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput id="title" className="mt-1 block w-full" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea id="description" rows="4" className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" value={data.description} onChange={(e) => setData('description', e.target.value)} required />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <InputLabel htmlFor="category" value="Category" />
                    <select id="category" value={data.category} onChange={(e) => setData('category', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                        {['Hardware', 'Software', 'Network', 'Account', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="priority" value="Priority" />
                    <select id="priority" value={data.priority} onChange={(e) => setData('priority', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                        {['Low', 'Medium', 'High', 'Urgent'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <InputError message={errors.priority} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <select id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                        {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4">
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:text-gray-900">Cancel</Link>
                <PrimaryButton disabled={processing}>{submitText}</PrimaryButton>
            </div>
        </form>
    );
}