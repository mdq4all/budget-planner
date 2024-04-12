
const SkeletonNewCategory = () => {
    return (
        <div className="flex justify-center flex-col items-center py-8 px-4">
            <div className="h-16 w-16 bg-slate-400 rounded-full animate-pulse"></div>
            <div className="flex gap-2 my-4">
                {[1, 2, 3, 4, 5, 6].map(item => (
                    <div key={item} className="h-6 w-6 bg-slate-400 rounded-full animate-pulse"></div>
                ))}
            </div>
            {[1, 2, 3].map(item => (
                <div key={item} className="w-full h-8 bg-slate-400 rounded-md animate-pulse my-4"></div>
            ))}
        </div>
    )
}

export default SkeletonNewCategory
