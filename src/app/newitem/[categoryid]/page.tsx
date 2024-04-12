"use client"

import { useEffect, useState } from "react"
import TagIcon from "../../../../public/tagIcon"
import MoneyBagIcon from "../../../../public/moneyBagIcon"
import { supabase } from "@/utils/supabase"
import { CategoryItem } from "@/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import SkeletonNewItem from "../_components/SkeletonNewItem"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const placeholder = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'



const AddNewItem = ({ params }: {
  params: { categoryid: string }
}) => {

  const [image, setImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState<CategoryItem>({
    category_id: 0,
    color: '',
    cost: 0,
    icon: '',
    image: '',
    name: '',
    note: '',
    url: '',
  });

  const router = useRouter();

  // Authenticate
  const { isAuthenticated, isLoading, user }: {
    isAuthenticated: boolean | null,
    isLoading: boolean | null,
    user: KindeUser | null
  } = useKindeBrowserClient()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDataForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleClick = async () => {

    setLoading(true)
    if (image) {
      const fileName = Date.now()
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName + '.png', image)

      if (uploadData) {

        const fullPath: string = `https://ansxknxtjbwxqeiggtpe.supabase.co/storage/v1/object/public/images/${uploadData.path}`

        const { data: insertData, error: insertError } = await supabase
          .from('CategoryItem')
          .insert([
            {
              category_id: parseInt(params.categoryid),
              color: dataForm.color,
              cost: dataForm.cost,
              icon: dataForm.icon,
              image: fullPath,
              name: dataForm.name,
              note: dataForm.note,
              url: dataForm.url,
            },
          ])
          .select()

        if (insertData) {
          toast.success('Item has been created')
          router.replace(`/category_details/${params.categoryid}`)
        } else {
          if (insertError) toast.error('Item has not been created')
        }
        setLoading(false)
      }
    }
  }

  // Loading...
  if (isLoading) return (
    <SkeletonNewItem />
  )
  return isAuthenticated && (
    <div className="p-4 bg-[#f1f5f9] h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl sm:mt-16">
        <h2 className="font-bold">Add New Item</h2>
        <div>
          <label htmlFor="image">
            {image ? (
              <img src={URL.createObjectURL(image)} width={80} height={80} alt="image" className="my-2 rounded-md" />
            ) : (
              <img src={placeholder} width={80} height={80} alt="image" className="my-2 rounded-md" />
            )}
          </label>
          <input
            type="file"
            name="imageInput"
            id="image"
            value={dataForm.image}
            onChange={handleImageChange}
            className="hidden" />
        </div>

        <div className="flex mb-4 focus-within:border focus-within:border-primary rounded-md">
          <label htmlFor="itemName" className="bg-[#FFF] p-1 rounded-l-lg"><TagIcon /></label>
          <input
            type="text"
            name="name"
            id="itemName"
            placeholder="Item Name"
            onChange={handleChange}
            className="focus:outline-none rounded-r-lg w-full px-2" />
        </div>

        <div className="flex mb-4 focus-within:border focus-within:border-primary rounded-md">
          <label htmlFor="cost" className="bg-[#FFF] p-1 rounded-l-lg"><MoneyBagIcon /></label>
          <input
            type="number"
            name="cost"
            id="cost"
            placeholder="Cost"
            onChange={handleChange}
            className="focus:outline-none rounded-r-lg w-full px-2" />
        </div>

        <div className="flex mb-4 focus-within:border focus-within:border-primary rounded-md">
          <label htmlFor="url" className="bg-[#FFF] p-1 rounded-l-lg"><img src="/url-icon.png" width={24} height={24} alt="url icon" /></label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Poduct URL"
            onChange={handleChange} className="focus:outline-none rounded-r-lg w-full px-2" />
        </div>

        <div className="flex mb-4 focus-within:border focus-within:border-primary rounded-md">
          <label htmlFor="note" className="bg-[#FFF] p-1 rounded-l-lg"><img src="/notes.png" width={24} height={24} alt="url icon" /></label>
          <textarea
            name="note"
            id="note"
            placeholder="Note..."
            onChange={handleChange}
            rows={3}
            className="focus:outline-none rounded-r-lg w-full px-2" />
        </div>

        <div className={`w-full ${loading && 'pointer-events-none'}`}>
          <button className=" mt-4 bg-primary w-full py-2 rounded-lg text-[#FFF] font-bold text-lg active:animate-jello-vertical disabled:opacity-70 disabled:animate-none disabled:cursor-not-allowed"
            onClick={handleClick}
            disabled={!dataForm.name || !dataForm.cost}>
            <span className="flex justify-center gap-2">
              {loading ? (
                <img src='/loader.svg' width={20} height={20} alt="loader" className=" animate-spin pointer-events-none" />
              ) : (
                <span>Add</span>
              )}
            </span>
          </button>
        </div>
        <Button asChild variant="destructive" className="mt-10 w-full text-lg font-bold">
          <Link href={`/category_details/${params.categoryid}`}>Cancel</Link>
        </Button>
      </div>
    </div>
  )
}

export default AddNewItem
