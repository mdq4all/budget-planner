import { Category } from "@/types"
import Image from "next/image"
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
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const CategoryInfo = ({ category }: { category: Category | null }) => {

  const router = useRouter()

  const deleteCategory = async () => {
    // First delete the category item list
    const { error: errorItemList } = await supabase
      .from('CategoryItem')
      .delete()
      .eq('category_id', category?.id)
      // Second elete the category
      const { error: errorCategory } = await supabase
        .from('Category')
        .delete()
        .eq('id', category?.id)

        router.replace('/')
        toast.success('Item has been deleted')
  }

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-3xl p-2 rounded-md" style={{ background: category?.color }}>{category?.icon}</h2>
      <div className="flex justify-between w-full">
        <div>
          <h2 className="text-xl font-bold">{category?.name}</h2>
          <article className="text-subtext">{category?.CategoryItem.length} Items</article>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Image src='/trash.svg' width={25} height={25} alt="trashcan" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Category and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteCategory()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default CategoryInfo
