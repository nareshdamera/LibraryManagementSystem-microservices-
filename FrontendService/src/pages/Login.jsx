// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { motion } from 'framer-motion';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const success = await login(email, password);
//             if (success) {
//                 navigate('/');
//             } else {
//                 setError('Invalid credentials');
//             }
//         } catch (err) {
//             setError('Login failed. Please check your credentials.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
//             {/* Dynamic Background */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-[20%] -left-[10%] w-[70vh] h-[70vh] bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
//                 <div className="absolute top-[40%] -right-[10%] w-[60vh] h-[60vh] bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
//                 <div className="absolute -bottom-[20%] left-[20%] w-[50vh] h-[50vh] bg-accent/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
//             </div>

//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="glass-card p-10 rounded-3xl w-full max-w-md z-10 border-white/10"
//             >
//                 <div className="text-center mb-8">
//                     <h2 className="text-4xl font-bold font-heading mb-2 text-white">Welcome Back</h2>
//                     <p className="text-slate-400">Enter your credentials to access the library</p>
//                 </div>

//                 {error && (
//                     <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
//                         <input
//                             type="email"
//                             required
//                             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
//                             placeholder="student@university.edu"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
//                         <input
//                             type="password"
//                             required
//                             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
//                             placeholder="••••••••"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
//                         Sign In
//                     </button>
//                 </form>

//                 <div className="mt-8 text-center">
//                     <p className="text-slate-400 text-sm">
//                         Don't have an account?{' '}
//                         <Link to="/register" className="text-secondary font-bold hover:text-white transition-colors">
//                             Register
//                         </Link>
//                     </p>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        console.log("--- Login Attempt Started ---");
        console.log("Payload being sent:", { email, password });

        try {
            // Note: Ensure your AuthContext.login function handles 'email' as the key
            const success = await login(email, password);
            
            if (success) {
                console.log("Login successful! Redirecting...");
                navigate('/dashboard'); // Changed to dashboard as it's more logical
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            // DEBUGGING LOGS
            console.error("--- Login Error Details ---");
            if (err.response) {
                // The server responded with a status code outside the 2xx range
                console.error("Status Code:", err.response.status);
                console.error("Response Data:", err.response.data);
                
                if (err.response.status === 403) {
                    setError("Forbidden (403): Check Spring Security matchers or CSRF.");
                } else if (err.response.status === 401) {
                    setError("Unauthorized (401): Bad credentials.");
                } else {
                    setError(`Server Error: ${err.response.status}`);
                }
            } else if (err.request) {
                // The request was made but no response was received
                console.error("No response received. Is the Backend running on port 9001?");
                setError("Network error: Backend unreachable.");
            } else {
                console.error("Error Message:", err.message);
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background blobs omitted for brevity, keep your original UI here */}
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 rounded-3xl w-full max-w-md z-10 border-white/10 bg-white/5 backdrop-blur-md"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2 text-white">Welcome Back</h2>
                    <p className="text-slate-400">Login to your Library Account</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="student@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 py-3.5 rounded-xl font-bold text-white transition-all transform active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-400 font-bold hover:text-white transition-colors">
                            Register
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;