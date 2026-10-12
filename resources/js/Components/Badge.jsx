export default function Badge({ value, type = 'status' }) {
    const statusColors = {
        'Open': 'bg-green-100 text-green-800 border-green-200',
        'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
        'Resolved': 'bg-purple-100 text-purple-800 border-purple-200',
        'Closed': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    const priorityColors = {
        'Low': 'bg-slate-100 text-slate-700 border-slate-200',
        'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'High': 'bg-orange-100 text-orange-800 border-orange-200',
        'Urgent': 'bg-red-100 text-red-800 border-red-200 font-bold',
    };
    const colors = type === 'priority' ? priorityColors[value] : statusColors[value];
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors}`}>{value}</span>;
}