import { useEffect, useState } from 'react';
import { bookApi, borrowApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookCard from '../components/BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        bookApi.getAllBooks().then(res => setBooks(res.data)).catch(console.error);
    }, []);

    const filteredBooks = books.filter(book => {
        const query = searchQuery.toLowerCase();
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
    });

    const handleBorrow = async (bookId) => {
        if (!user) return navigate('/login');
        try {
            await borrowApi.borrowBook(bookId, user.username);
            alert('Book request submitted! waiting for admin approval.');
            const res = await bookApi.getAllBooks();
            setBooks(res.data);
        } catch (error) {
            console.error("Borrow failed", error);
            alert('Failed to borrow book. It might be unavailable.');
        }
    };

    return (
        <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
            <header className="mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-xl mx-auto mb-12"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <input
                            type="text"
                            placeholder="Search by title, author, or genre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full bg-black/80 backdrop-blur-xl border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg placeholder:text-slate-500"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl opacity-50">🔍</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold mb-6 font-heading"
                >
                    <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                        Discover Reality
                    </span>
                    <br />
                    <span className="text-white/40 text-4xl md:text-5xl">Through Books.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg text-slate-400 max-w-2xl mx-auto"
                >
                    Explore our curated collection of knowledge, adventure, and wisdom.
                    Borrow instantly with a single click.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <BookCard key={book.id} book={book} onBorrow={handleBorrow} index={index} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <span className="text-6xl mb-4 block opacity-30">🕸️</span>
                        <p className="text-xl text-slate-500">No books found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
