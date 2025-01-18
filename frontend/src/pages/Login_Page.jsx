import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const colors = {
    primary: "060606",
    background: "#f5f5f5",
    disabled: "#D9D9D9"
}

const Login = () => {
    const navigate = useNavigate();
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            localStorage.setItem('token', data.token);
            navigate('/live-map');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-screen flex items-start'>
            {!isMediumScreen && (
                <div className='relative w-1/2 h-full flex flex-col'>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#ADD8E6] to-transparent"></div>
                    <div className='absolute top-[5%] left-[10%] flex flex-col z-10'>
                        <div className='flex items-center'>
                            <img src="/images/logo.svg" alt="Logo" className='w-8.5 h-12 mr-4' />
                            <h1 className='text-4xl text-black font-bold'>
                                DIKEDO<span className="font-normal">GPS</span>
                            </h1>
                        </div>
                        <p className='text-xl text-black font-semibold mt-4'>Monitor your vehicle from anywhere</p>
                    </div>

                    <img src="/images/cover_image.png" className='w-full h-full object-cover' />
                </div>
            )}

            <div className={`${isMediumScreen ? 'w-full' : 'w-1/2'} h-full bg-[#f5f5f5] flex flex-col items-center justify-center p-20`}>
                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2'>Login</h3>
                        <p className='text-base mb-2'>Welcome Back! Please enter your details.</p>
                    </div>

                    <div className="w-full flex flex-col">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex items-center">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <p className="text-sm">Remember me</p>
                        </div>

                        <p
                            className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
                            onClick={() => navigate('/reset-password')}
                        >
                            Forget Password?
                        </p>
                    </div>

                    <div className="w-full flex flex-col my-4">
                        <button
                            className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center disabled:bg-[#D9D9D9]"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">
                        Don't have an account?{' '}
                        <span
                            className="font-semibold underline underline-offset-2 cursor-pointer"
                            onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>

            <img src="/images/ornament.svg" alt="Ornament" className="absolute bottom-0 left-0 w-20 h-20" />
            <img src="/images/ornament.svg" alt="Ornament" className="absolute top-0 right-0 w-20 h-20 transform scale-x-[-1] scale-y-[-1]" />
        </div>
    )
}

export default Login;
