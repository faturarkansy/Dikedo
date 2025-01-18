import { useNavigate } from 'react-router-dom';

const colors = {
    primary: "060606",
    background: "#f5f5f5",
    disabled: "#D9D9D9"
}

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full h-screen flex flex-col md:flex-row items-start'>
            <div className='w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col items-center justify-center p-20'>
                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2'>Register</h3>
                        <p className='text-base mb-2'>Hello! Please enter your details below here.</p>
                    </div>

                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />
                    </div>

                    <div className="w-full flex flex-col my-4">
                        <button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
                            Sign up
                        </button>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">
                        Have an account?{' '}
                        <span
                            className="font-semibold underline underline-offset-2 cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>

            <div className='relative hidden md:flex w-1/2 h-full flex-col'>
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

            <img src="/images/ornament.svg" alt="Ornament" className="absolute bottom-0 left-0 w-20 h-20" />
            <img src="/images/ornament.svg" alt="Ornament" className="absolute top-0 right-0 w-20 h-20 transform scale-x-[-1] scale-y-[-1]" />
        </div>
    );
};

export default Register;
