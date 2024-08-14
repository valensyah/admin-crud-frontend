"use client"
import { PartSidebar } from "../components/sidebar";
import { PartNavbar } from "../components/navbar";
import { ModalCategory } from "../components/modalCategory";

import { TableCategory } from "../components/tableCategory";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "@/utils/category";
import axiosInstance from "@/helpers/axios";

type Category = {
    id: number,
    category: string,
    description: string,
    created_at: string,
    updated_at: string
  }

export default function Home() {
  const user = useSelector(state => state.user.value)
  const userData = JSON.parse(user)
  const category = useSelector(state => state.category.value)
  const dispatch = useDispatch()
//   const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    const getCategory = async () => {
      const result = await axiosInstance.get('/category')
      dispatch(setCategory(result.data.data))
    }
    getCategory()
  }, [dispatch])
  
  return (
    <main className="w-full min-h-screen bg-slate-200 flex">
      <PartSidebar />
      <div className="w-10/12 min-h-screen p-10">
        <PartNavbar title="Categories" user={userData} />
        <div className="w-full h-fit p-5 bg-white rounded-md mt-5">
            <div className="mb-4">
                <ModalCategory />
            </div>
            {
                category ? 
                <TableCategory category={category} /> :
                <p className="text-center text-xl">Data tidak tersedia</p>
            }
        </div>
      </div>
    </main>
  );
}
