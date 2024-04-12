"use client"

import { Category } from "@/types"
import { supabase } from "@/utils/supabase"
import { useEffect, useState } from "react"
import CategoryInfo from "../_components/CategoryInfo"
import CategoryInfoProgressBar from "../_components/CategoryInfoProgressBar"
import CategoryListItem from "../_components/CategoryListItem"
import Link from "next/link"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation"
import SkeletonCategoryDetails from "../_components/SkeletonCategoryDetails"

const CategoryDetails = ({ params }: {
  params: {
    id: string
  }
}) => {

  const [category, setCategory] = useState<Category | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalPercentage, setTotalPercentage] = useState<number>(0);
  const [itemDeleted, setItemDeleted] = useState<boolean>(false);
  const router = useRouter();

  // Authentication
  const { isAuthenticated, isLoading }: {
    isAuthenticated: boolean | null,
    isLoading: boolean | null,
  } = useKindeBrowserClient()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else {
      getCategoryList();
    }
  }, [isLoading]);


  const calculateTotalPerc = () => {
    let total = 0
    let assignedBudget = category?.assigned_budget || 0

    category?.CategoryItem.forEach(item => {
      total = total + item.cost
    })
    setTotalCost(total)
    let percentage = (total / assignedBudget) * 100
    if (percentage > 100) {
      percentage = 100
    }
    setTotalPercentage(percentage)
  }

  useEffect(() => {
    getCategoryList()
  }, []);

  useEffect(() => {
    category && calculateTotalPerc()
  }, [category]);

  useEffect(() => {
    getCategoryList()
    setItemDeleted(false)
  }, [itemDeleted]);


  const getCategoryList = async () => {

    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItem(*)')
      .eq('id', params.id)

    data && setCategory(data[0])
  }

  // Loading...
  if (isLoading) return (
    <SkeletonCategoryDetails />
  )

  return isAuthenticated && (
    <div className="p-4 bg-[#f1f5f9] fixed w-full h-screen flex flex-col items-center">
      <div className="max-w-3xl w-full sm:mt-16">
        <CategoryInfo category={category} />
        <CategoryInfoProgressBar
          category={category}
          totalCost={totalCost}
          totalPercentage={totalPercentage} />
        <CategoryListItem category={category} setItemDeleted={setItemDeleted} />
        <Link href={`/newitem/${category?.id}`} className="bg-primary px-[14px] py-[3px] text-5xl rounded-full text-[#FFF] fixed bottom-[1%] right-[3%] active:animate-jello-vertical ">
          +
        </Link>
      </div>
    </div>
  )
}

export default CategoryDetails
