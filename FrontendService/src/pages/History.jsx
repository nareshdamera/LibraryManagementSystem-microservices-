import { useEffect, useState } from 'react';
import { borrowApi } from '../services/api';
import { motion } from 'framer-motion';

const History = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [studentIdSearch, setStudentIdSearch] = useState('');

    useEffect(() => {
        borrowApi.getAllBorrowings()
            .then(res => setBorrowings(res.data))
            .catch(console.error);
    }, []);

    const filteredBorrowings = borrowings.filter(record => {
        const matchesStatus = filterStatus === 'ALL' || record.status === filterStatus;
        const matchesStudentId = record.userId.toLowerCase().includes(studentIdSearch.toLowerCase());
        return matchesStatus && matchesStudentId;
    });

    return (
        <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-bold font-heading mb-4">Borrowing History</h1>
                <p className="text-slate-400">View and manage all borrowing requests and records.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-6 mb-8 bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                {/* Search */}
                <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Search Student ID</label>
                    <input
                        type="text"
                        placeholder="Enter Student ID..."
                        value={studentIdSearch}
                        onChange={(e) => setStudentIdSearch(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>

                {/* Filter */}
                <div className="w-full md:w-64">
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Filter Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="BORROWED">Borrowed</option>
                        <option value="RETURNED">Returned</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredBorrowings.length > 0 ? (
                    filteredBorrowings.map((record, index) => (
                        <motion.div
                            key={record.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between group hover:border-primary/30"
                        >
                            <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${record.status === 'BORROWED' ? 'bg-primary/20 text-primary' :
                                    record.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
                                        'bg-green-500/10 text-green-400'
                                    }`}>
                                    {record.status === 'BORROWED' ? '📖' : record.status === 'PENDING' ? '⏳' : '✨'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-white leading-none">Book ID: {record.bookId}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${record.status === 'BORROWED'
                                            ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                            : record.status === 'PENDING'
                                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                                : 'bg-green-500/10 border-green-500/20 text-green-400'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400">Student ID: <span className="text-white font-mono">{record.userId}</span></p>
                                    <div className="text-xs text-slate-500 mt-1 flex gap-4">
                                        <span>Borrowed: {record.borrowDate}</span>
                                        {record.returnDate && <span>Returned: {record.returnDate}</span>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                        <span className="text-6xl grayscale opacity-50 block mb-4">📭</span>
                        <p className="text-slate-500">No records found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
