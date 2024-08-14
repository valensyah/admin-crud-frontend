"use client"
import { PartSidebar } from "./components/sidebar";
import { PartNavbar } from "./components/navbar";
import { TableProduct } from "./components/tableProduct";
import { ModalProduct } from './components/modalProduct'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "@/helpers/axios";
import { setProduct } from "@/utils/product";

type User = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  birth_date: string,
  gender: string,
  created_at: string,
  updated_at: string
}

interface Product {
  id: number,
  product_name: string,
  image: string,
  stock: number,
  description: string,
  created_at: string,
  updated_at: string,
  category: string,
  category_id: number
}

export default function Home() {
  const dispatch = useDispatch()
  const product = useSelector(state => state.product.value)
  const user = useSelector(state => state.user.value)
  const userData = JSON.parse(user)

  useEffect(() => {
    const getProduct = async () => {
      const result = await axiosInstance.get('/product')
      dispatch(setProduct(result.data.data))
    }
    getProduct()
  }, [])
  
  console.log(product)
  return (
    <main className="w-full min-h-screen bg-slate-200 flex">
      <PartSidebar />
      <div className="w-10/12 min-h-screen p-10">
        <PartNavbar title="Products" user={userData} />
        <div className="w-full h-fit p-5 bg-white rounded-md mt-5">
          <div className="mb-4">
            <ModalProduct/>
          </div>
          <TableProduct product={product} />
        </div>
      </div>
    </main>
  );
}
