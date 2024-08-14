/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { Button, Table } from "flowbite-react"
import React, { useEffect } from "react"
import { ModalTransaction } from "./modalTransaction"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "../../helpers/axios"
import { deleteTransaction } from "../../utils/transaction"
import { setProduct } from '../../utils/product'

type Transaction = {
    id: number,
    tr_id: string,
    tr_type: string,
    tr_product_id: number,
    product_name: string,
    tr_product_stock: number,
    created_at: string,
    updated_at: string
}

interface TableProps {
    transaction: Transaction[]
}

export default function TableTransaction({ transaction }: TableProps) {
    const dispatch = useDispatch()
    const product = useSelector((state: any) => state.product.value)

    const deleteItem = (id: number) => {
        axiosInstance.post('/tr/delete', { id }).then(() => {
            dispatch(deleteTransaction(id))
            alert('Berhasil menghapus item!')
        })
    }

    // useEffect(() => {
    //     const getproduct = async () => {
    //         axiosInstance.get('/product').then(res => {
    //             dispatch(setProduct(res.data.data))
    //         })
    //     }
    //     getproduct()
    // }, [dispatch])
    return (
        <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Jenis Transaksi</Table.HeadCell>
          <Table.HeadCell>Nama Produk</Table.HeadCell>
          <Table.HeadCell>Stock Masuk/Keluar</Table.HeadCell>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            transaction?.map((item: Transaction) => {
              return (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.tr_type}
                  </Table.Cell>
                  <Table.Cell>{item.product_name}</Table.Cell>
                  <Table.Cell>{item.tr_product_stock}</Table.Cell>
                  <Table.Cell>{item.created_at}</Table.Cell>
                  <Table.Cell className="flex gap-4">
                    <ModalTransaction items={item} />
                    <Button onClick={() => deleteItem(item.id)} className="bg-red-500">Delete</Button>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </div>
    )
}