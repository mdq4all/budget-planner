import { Category, CategoryItem } from "@/types"
import Link from "next/link"

const CategoryList = ({ categoryList }: { categoryList: Category[] | null }) => {

    const calculateTotalCost = (itemCategory: CategoryItem[]) => {
        let totalCost = 0
        itemCategory.forEach(item => {
            totalCost += item.cost
        })
        return totalCost
    }
    
    return (
        <div className="mt-4 md:mt-8 w-full md:w-1/2">
            <h2 className="font-bold mb-2 sm:text-xl">Latest Budget</h2>
            <div className="h-[250px] md:h-[350px] overflow-y-auto shadow-md p-2 border-[1px] border-[rgb(203,205,208)] rounded-md">
                {categoryList?.map((category) => (
                    <Link
                        href={`/category_details/${category.id}`}
                        key={category.id}
                        className="flex gap-3 items-center mb-2 bg-[#FFF] p-2 rounded-md active:opacity-50">
                        <article
                            className="text-4xl p-2 rounded-md"
                            style={{ backgroundColor: category.color }}>{category.icon}
                        </article>
                        <div className="flex justify-between w-full items-center">
                            <div>
                                <h2 className="capitalize font-bold">{category.name}</h2>
                                <h2 className="text-sm">{category.CategoryItem.length} items</h2>
                            </div>
                            <h2 className="text-[#475569] font-bold text-lg">$ {calculateTotalCost(category.CategoryItem)}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
