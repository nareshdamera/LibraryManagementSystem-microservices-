import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, onBorrow, index = 0 }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group glass-card rounded-3xl overflow-hidden relative cursor-pointer"
            onClick={() => navigate(`/book/${book.id}`)}
        >
            {/* Image / Cover Area */}
            <div className="h-64 bg-surface-hover relative overflow-hidden">
                {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-center">
                        <h3 className="text-2xl font-heading font-bold text-white/20 mb-2">{book.title}</h3>
                        <span className="text-4xl opacity-20">📚</span>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-heading uppercase tracking-wider backdrop-blur-md border ${book.status === 'AVAILABLE'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        {book.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
                <div className="mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{book.genre}</span>
                    <h3 className="text-2xl font-bold mt-1 mb-1 font-heading leading-tight truncate">{book.title}</h3>
                    <p className="text-sm text-slate-400">by {book.author}</p>
                </div>

                {/* Removed expandable description as per request, navigating to details page instead */}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBorrow(book.id);
                    }}
                    disabled={book.status !== 'AVAILABLE'}
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${book.status === 'AVAILABLE'
                        ? 'bg-white text-black hover:bg-slate-200 hover:scale-[1.02] shadow-lg shadow-white/10'
                        : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                        }`}
                >
                    {book.status === 'AVAILABLE' ? 'Request Book' : 'Unavailable'}
                </button>
            </div>
        </motion.div>
    );
};

export default BookCard;
