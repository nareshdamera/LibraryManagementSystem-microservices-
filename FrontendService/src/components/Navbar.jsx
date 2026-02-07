import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Books, User, SignOut } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 px-4 py-4"
        >
            <div className="max-w-7xl mx-auto glass-card rounded-full px-6 py-3 flex justify-between items-center bg-black/40 backdrop-blur-md border border-white/5">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    <Books className="text-primary" weight="duotone" />
                    <span>LMS</span>
                </Link>

                <div className="flex items-center gap-6">
                    <NavLink to="/" current={location.pathname}>Discover</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/dashboard" current={location.pathname}>Dashboard</NavLink>
                            {user.role === 'ADMIN' && (
                                <NavLink to="/history" current={location.pathname}>History</NavLink>
                            )}
                            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                <span className="text-sm font-medium text-white font-heading">{user.name}</span>
                                <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-accent hover:text-accent/80">
                                    <SignOut size={20} weight="bold" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="px-6 py-2 rounded-full bg-primary hover:bg-primary/80 transition-all font-medium text-sm shadow-lg shadow-primary/25">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ to, children, current }) => (
    <Link to={to} className={cn(
        "relative text-sm font-medium transition-colors hover:text-white",
        current === to ? "text-white" : "text-slate-400"
    )}>
        {children}
        {current === to && (
            <motion.div
                layoutId="nav-pill"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full"
            />
        )}
    </Link>
);

export default Navbar;
