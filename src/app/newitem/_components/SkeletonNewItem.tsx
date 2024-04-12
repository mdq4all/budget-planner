
const SkeletonNewItem = () => {
    return (
        <div className="py-8 px-4">
            <div className="h-20 w-28 bg-slate-400  animate-pulse rounded-md"></div>
            {[1, 2, 3, 4, 5].map(item => (
                <div key={item} className="w-full h-8 bg-slate-400 rounded-md animate-pulse my-4"></div>
            ))}
        </div>
    )
}

export default SkeletonNewItem
