
"use client";

import { Table, Button } from "flowbite-react";

import { ModalCategory } from "../components/modalCategory";

import { useDispatch } from "react-redux";
import { deleteCategory } from "@/utils/category";
import axiosInstance from "@/helpers/axios";

interface Category {
  id: number,
  category: string,
  description: string,
  created_at: string,
  updated_at: string
}

interface TablesProps {
  category: Category[];
}


export function TableCategory({ category }: TablesProps) {
    const dispatch = useDispatch()

    const deleteItem = (id: number) => {
        axiosInstance.post('/category/delete', { id }).then(() => {
            dispatch(deleteCategory(id))
            alert('Berhasil menghapus item!')
        })
    }

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            category?.map((item: Category) => {
              return (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell className="flex gap-4">
                    <ModalCategory items={item} />
                    <Button onClick={() => deleteItem(item.id)} className="bg-red-500">Delete</Button>
                    {/* <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a> */}
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
