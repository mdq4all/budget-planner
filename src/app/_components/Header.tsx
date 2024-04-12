"use client"

import { headerMenu } from '@/constants'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {

    const { isAuthenticated }: {
        isAuthenticated: boolean | null
    } = useKindeBrowserClient()
    const router = usePathname();

    return (
        <header>
            <div className="py-4 lg:px-8 shadow-md">
                <div className="sm:flex sm:items-center justify-between">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold sm:text-3xl text-primary">Budget Planner</h1>
                        {isAuthenticated && <Image 
                        src='/notification-bell.gif' 
                        width={30} 
                        height={30} 
                        alt='bell notification' className='absolute top-4 right-[5%] sm:hidden'
                        unoptimized />}
                    </div>
                    {isAuthenticated && <div className="mt-4 p-2 flex gap-4 sm:mt-0 justify-between items-center ">
                        <ul className='flex gap-4'>
                            {headerMenu.map((item) => (
                                <li key={item.id}>
                                    <Link href={item.url} className={`capitalize ${item.url === router && 'bg-primary text-[#FFF] p-2 rounded-md'} text-[#334155]`}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <LogoutLink postLogoutRedirectURL="/"
                                className="inline-block rounded border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:text-white active:outline-none"
                            >
                                Logout
                            </LogoutLink>
                        </div>
                    </div>}
                </div>
            </div>
        </header>
    )
}

export default Header
