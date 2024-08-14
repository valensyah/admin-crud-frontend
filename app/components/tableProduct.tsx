
"use client";

import { Table, Button } from "flowbite-react";
import { ModalProduct } from "./modalProduct";
import { useDispatch } from "react-redux";
import axiosInstance from "@/helpers/axios";
import { deleteProduct } from "@/utils/product";

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

interface TablesProps {
  product: Product[];
}


export function TableProduct({ product }: TablesProps) {
  const dispatch = useDispatch()

    const deleteItem = (id: number) => {
        axiosInstance.post('/product/delete', { id }).then(() => {
            dispatch(deleteProduct(id))
            alert('Berhasil menghapus item!')
        })
    }
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Gambar</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            product?.map((item: Product) => {
              return (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.product_name}
                  </Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.stock}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{
                    <img src={`http://localhost:5000/images/${item.image}`} alt="" />
                    }</Table.Cell>
                  <Table.Cell className="flex gap-4">
                    <ModalProduct items={item} />
                    <Button onClick={() => deleteItem(item.id)} className="bg-red-500">Delete</Button>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </div>
  );
}
