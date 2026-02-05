import { useEffect, useState } from 'react';
import { borrowApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [borrowings, setBorrowings] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            borrowApi.getMyBorrowings(user.username)
                .then(res => setBorrowings(res.data))
                .catch(console.error);
        }
    }, [user]);

    const handleReturn = async (borrowId) => {
        try {
            await borrowApi.returnBook(borrowId);
            const res = await borrowApi.getMyBorrowings(user.username);
            setBorrowings(res.data);
            alert("Book returned successfully");
        } catch (error) {
            console.error("Return failed", error);
        }
    };

    return (
        <div className="pt-32 pb-12 px-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold font-heading mb-2">My Library</h1>
                    <p className="text-slate-400">Manage your borrowed books and history.</p>
                </div>
                {user && user.role === 'ADMIN' && (
                    <button
                        onClick={() => navigate('/add-book')}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-xl transition-all shadow-lg shadow-primary/25"
                    >
                        + Add Book
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {borrowings.map((record, index) => (
                    <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between group hover:border-primary/30"
                    >
                        <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${record.status === 'BORROWED' ? 'bg-primary/20 text-primary' : 'bg-green-500/10 text-green-400'
                                }`}>
                                {record.status === 'BORROWED' ? '📖' : '✨'}
                            </div>
                            <div>
                                <h3 className="text-sm text-slate-400 font-medium">Txn #{record.id}</h3>
                                <p className="text-lg font-bold text-white">Book ID: {record.bookId}</p>
                                <p className="text-xs text-slate-500">Borrowed: {record.borrowDate}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${record.status === 'BORROWED'
                                ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                : 'bg-white/5 border-white/5 text-slate-400'
                                }`}>
                                {record.status}
                            </span>

                            {record.status === 'BORROWED' && (
                                <button
                                    onClick={() => handleReturn(record.id)}
                                    className="px-4 py-2 rounded-lg bg-surface-hover hover:bg-white hover:text-black border border-white/10 transition-all text-sm font-medium"
                                >
                                    Return Book
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}

                {borrowings.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                        <span className="text-6xl grayscale opacity-50 block mb-4">📚</span>
                        <p className="text-slate-500">You haven't borrowed any books yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
