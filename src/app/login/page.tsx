"use client"

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'

const LoginScreen = () => {
    return (
        <div className='flex flex-col items-center min-h-screen max-h-screen '>
            <div className='border-4 mt-6 rounded-xl overflow-hidden w-[200px] md:w-[300px]'>
                <img
                    src="/login_image.jpg"
                    width={200}
                    height={400}
                    alt='login image'
                    className='md:w-[300px] md:h-[500px]' />
            </div>
            <div className='bg-primary w-full h-screen mt-[-20px] rounded-t-3xl px-6 text-center max-w-5xl flex flex-col justify-center items-center'>
                <h2 className='text-[#FFFFFF] text-center my-4 text-3xl font-bold sm:mb-16 sm:text-5xl '>
                    Personal Budget Planner
                </h2>
                <h2 className='text-white sm:text-2xl'>
                    Stay on Track, Event by Event: Your Personal Budget Planner App!
                </h2>
                <LoginLink
                    className="inline-block rounded-3xl bg-[#FFFFFF] w-full py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none max-w-lg focus:ring active:bg-indigo-500 mt-8 sm:text-2xl"
                >
                    Login/Signup
                </LoginLink>
            </div>
        </div>
    )
}

export default LoginScreen
