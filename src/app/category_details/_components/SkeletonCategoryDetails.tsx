
const SkeletonCategoryDetails = () => {
    return (
        <div className="p-4">
            <div className="flex gap-4">
                <div className="h-20 w-48 bg-slate-300 rounded-md animate-pulse"></div>
                <div className="py-2">
                    <div className="w-60 h-4 bg-slate-400 rounded-md mb-2 animate-pulse"></div>
                    <div className="w-44 h-4 bg-slate-400 rounded-md animate-pulse"></div>
                </div>
            </div>
            <div className="w-full h-4 bg-slate-400 rounded-md my-8 animate-pulse"></div>
            {[1, 2, 3].map(item => (
                <div key={item} className="flex gap-2 mb-2">
                    <div className="h-16 w-24 bg-slate-300 rounded-md animate-pulse"></div>
                    <div className="flex justify-between w-full">
                        <div className="w-32 h-4 bg-slate-400 rounded-md animate-pulse"></div>
                        <div className="w-10 h-4 bg-slate-400 rounded-md animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonCategoryDetails
