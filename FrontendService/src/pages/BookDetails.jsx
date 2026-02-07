import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookApi, borrowApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        bookApi.getAllBooks() // Ideally there should be a getBookById endpoint, but filtering for now as per current API usage
            .then(res => {
                const foundBook = res.data.find(b => b.id.toString() === id);
                setBook(foundBook);
            })
            .catch(console.error);
    }, [id]);

    const handleBorrow = async () => {
        if (!user) return navigate('/login');
        try {
            await borrowApi.borrowBook(book.id, user.username);
            alert('Book request submitted! waiting for admin approval.');
            // Refresh book status
            bookApi.getAllBooks().then(res => {
                const foundBook = res.data.find(b => b.id.toString() === id);
                setBook(foundBook);
            });
        } catch (error) {
            console.error("Borrow failed", error);
            alert('Failed to borrow book. It might be unavailable.');
        }
    };

    if (!book) return <div className="text-center mt-32 text-white">Loading...</div>;

    return (
        <div className="pt-32 pb-12 px-6 max-w-5xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
                ← Back to Browse
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-3xl md:flex gap-12"
            >
                {/* Book Cover */}
                <div className="md:w-1/3 mb-8 md:mb-0">
                    <div className="aspect-[2/3] rounded-2xl overflow-hidden relative shadow-2xl">
                        {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-center">
                                <h3 className="text-2xl font-heading font-bold text-white/20 mb-2">{book.title}</h3>
                                <span className="text-6xl opacity-20">📚</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold font-heading uppercase tracking-wider backdrop-blur-md border ${book.status === 'AVAILABLE'
                                ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]'
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                {book.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Book Info */}
                <div className="md:w-2/3 flex flex-col">
                    <div className="mb-6">
                        <span className="text-sm font-bold text-primary uppercase tracking-widest">{book.genre}</span>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-4 leading-tight">{book.title}</h1>
                        <p className="text-xl text-slate-300">by <span className="text-white font-medium">{book.author}</span></p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-3">About this book</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">{book.description}</p>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={handleBorrow}
                            disabled={book.status !== 'AVAILABLE'}
                            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${book.status === 'AVAILABLE'
                                ? 'bg-white text-black hover:bg-slate-200 hover:scale-[1.02] shadow-xl shadow-white/10'
                                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                }`}
                        >
                            {book.status === 'AVAILABLE' ? 'Request to Borrow' : 'Currently Unavailable'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BookDetails;
