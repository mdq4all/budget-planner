import { Category } from "@/types"
import Link from "next/link"
import { useState } from "react"
import { motion } from 'framer-motion';
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const CategoryListItem = ({ category, setItemDeleted }: {
    category: Category | null,
    setItemDeleted: (value: boolean) => void
}) => {

    const [showMenu, setShowMenu] = useState(0);

    const onDeleteItem = async ({ id }: { id: number }) => {
        const { error } = await supabase
            .from('CategoryItem')
            .delete()
            .eq('id', id)
        if (!error) {
            toast.success('Item has been deleted')
            setItemDeleted(true)
        }
    }

    return (
        <div className="mt-8">
            <h2 className="font-bold">Item List</h2>
            <div className="mt-4 pb-12 h-[400px] overflow-y-auto">
                {category?.CategoryItem && category?.CategoryItem.length > 0 ? (category?.CategoryItem.map((item, index) => (
                    <div key={item.id}
                        onClick={() => setShowMenu(index)}
                        className={`relative ${index !== category.CategoryItem.length - 1 && 'border-b-2 border-[#cbd5e1]'}`}>
                        <div className='flex gap-2 py-2'>
                            <img src={item.image} width={70} alt="image item" className="rounded-md bg-[#fff] object-cover h-20 w-20" />
                            <div className="flex flex-col w-full justify-between py-1">
                                <div className="flex justify-between mb-2">
                                    <h2 className="capitalize font-bold">{item.name}
                                    </h2>
                                    <h2>
                                        $ {item.cost}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        {showMenu === index &&
                            <motion.div
                                initial={{ y: -70, opacity: 0 }}
                                animate={{ y: -50, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-full rounded-t-md mb-[-35px]"
                            >
                                <div className="flex justify-end gap-10 items-center ">
                                    <Link href={item.url}>
                                        <img src='/url-icon.png' width={20} height={20} alt="url icon" />
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline">
                                                <img src='/trash.svg' width={20} height={20} alt="url icon" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete item and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => item.id && onDeleteItem({ id: item.id })}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </motion.div>
                        }
                    </div>
                ))) : (
                    <h2 className="font-bold text-xl">No item to show</h2>
                )}
            </div>
        </div>
    )
}

export default CategoryListItem
