"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { supabase } from "@/utils/supabase";
import CircularChart from "./_components/PieChart";
import Link from "next/link";
import CategoryList from "./_components/CategoryList";
import { Category } from "@/types";


export default function Home() {

  const { isAuthenticated, isLoading, user }: {
    isAuthenticated: boolean | null,
    isLoading: boolean | null,
    user: KindeUser | null
  } = useKindeBrowserClient()

  const router = useRouter();

  const [categoryList, setCategoryList] = useState<Category[] | null>(null);

  useEffect(() => {
    (!isLoading && !isAuthenticated) ? router.replace('/login') :
    getCategoryList()
  }, [isAuthenticated, user]);

  const getCategoryList = async () => {

    const { data, error } = await supabase
      .from('Category')
      .select("*, CategoryItem(*)")
      .eq('created_by', user?.email)

    setCategoryList(data)
  }

  // Loading...
  if (isLoading) return (
    <div className="absolute w-full h-screen top-0 left-0 bg-primary flex flex-col justify-center items-center gap-4">
      <span className='loader'></span>
      <h2 className="text-white animate-pulse">Loading...</h2>
    </div>)

  // Home
  return isAuthenticated && (
    <main className="px-4 pt-4 bg-[#f1f5f9] h-screen flex flex-col items-center">
      <h2 className="text-center text-xl font-bold sm:text-3xl sm:py-4">Welcome <span className="text-primary capitalize">{user?.given_name}</span>!</h2>
      <CircularChart categoryList={categoryList} />
      <CategoryList categoryList={categoryList} />
      <Link href='/newcategory' className="bg-primary px-[14px] py-[3px] text-5xl rounded-full text-[#FFF] fixed bottom-[1%] right-[3%] active:animate-jello-vertical ">
        +
      </Link>
    </main>
  )
}
