import { Category } from "@/types"

const CategoryInfoProgressBar = ({ category, totalCost, totalPercentage }: {
    category: Category | null,
    totalCost: number,
    totalPercentage: number
}) => {

    return (
        <div className="mt-4">
            <div className="flex justify-between">
                <h2 className="font-bold">${totalCost}</h2>
                <h2>Total Budget: <span className="font-bold">$ {category?.assigned_budget}</span></h2>
            </div>
            <div className="bg-[#cbd5e1] w-full h-2 rounded-md mt-2 shadow-md">
                <div className="bg-primary h-2 rounded-lg"
                style={{width: Math.floor(totalPercentage)+"%"}}></div>
            </div>
        </div>
    )
}

export default CategoryInfoProgressBar
