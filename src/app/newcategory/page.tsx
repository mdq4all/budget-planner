"use client"

import { useEffect, useState } from "react";
import { colors } from "@/constants"
import ColorPicker from "./_componentes/ColorPicker"
import TagIcon from "../../../public/tagIcon"
import MoneyBagIcon from '../../../public/moneyBagIcon';
import { Item } from "@/types";
import { supabase } from "@/utils/supabase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SkeletonNewCategory from "./_componentes/SkeletonNewCategory";



const AddNewCategory = () => {

    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { isAuthenticated, isLoading, user }: {
        isAuthenticated: boolean | null,
        isLoading: boolean | null,
        user: KindeUser | null
    } = useKindeBrowserClient()

    const [dataForm, setDataForm] = useState<Item>({
        color: '',
        category: '',
        emoji: '',
        budget: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataForm(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleClick = async () => {

        setLoading(true)
        const { data, error } = await supabase
            .from('Category')
            .insert([
                {
                    name: dataForm.category,
                    icon: dataForm.emoji,
                    color: selectedColor,
                    assigned_budget: dataForm.budget,
                    created_by: user?.email
                },
            ])
            .select()

        if (data) {
            toast.success('Category has been created')
            router.replace(`/category_details/${data[0].id}`)
        } else {
            if (error) toast.error('Category has not been created')
        }
        setLoading(false)
    }

    useEffect(() => {
        (!isLoading && !isAuthenticated) && router.replace('login')
    }, [isLoading, isAuthenticated]);

    // Loading...
    if (isLoading) return (
        <SkeletonNewCategory />
    )

    return isAuthenticated && (
        <div className="px-4 h-screen flex flex-col items-center bg-[#f1f5f9]">
            <div className="w-full max-w-2xl flex flex-col items-center mt-16">
                <div className="h-[60px] w-[60px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: selectedColor }}>
                    <input className="w-8 text-xl p-1 focus:outline-none"
                        style={{ backgroundColor: selectedColor }}
                        placeholder="📺"
                        maxLength={5}
                        name="emoji"
                        value={dataForm.emoji}
                        onChange={handleChange} />
                </div>
                <ColorPicker
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    colors={colors}
                />
                <div className="flex gap-1 my-4 bg-[#FFF] p-2 rounded-lg border border-[#94a3b8] w-full">
                    <TagIcon />
                    <input
                        type="text"
                        placeholder="category name" className="outline-none"
                        name="category"
                        value={dataForm.category}
                        onChange={handleChange} />
                </div>

                <div className="flex gap-1 my-4 bg-[#FFF] p-2 rounded-lg border border-[#94a3b8] w-full">
                    <MoneyBagIcon />
                    <input
                        type="number"
                        placeholder="total budget" className="outline-none"
                        name="budget"
                        value={dataForm.budget}
                        onChange={handleChange} />
                </div>

                <div className={`w-full ${loading && 'pointer-events-none'}`}>
                    <button className=" mt-8 bg-primary w-full py-2 rounded-2xl text-[#FFF] font-bold text-lg active:animate-jello-vertical disabled:opacity-70 disabled:animate-none disabled:pointer-events-none"
                        disabled={!dataForm.emoji || !dataForm.category || !dataForm.budget}
                        onClick={handleClick}
                    >
                        <span className="flex justify-center gap-2">
                            {loading ? (
                                <img src='/loader.svg' width={20} height={20} alt="loader" className=" animate-spin pointer-events-none" />
                            ) : (
                                <span>Create</span>
                            )}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddNewCategory
