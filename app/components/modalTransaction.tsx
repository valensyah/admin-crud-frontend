"use client";

import { Button, Checkbox, FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction, setTransaction } from "../../utils/transaction";
import { setCategory } from "../../utils/category";
import React from "react";
import { setProduct } from "../../utils/product";

type Transaction = {
    items?: {
        id: number,
        tr_id: string,
        tr_type: string,
        tr_product_id: number,
        tr_product_stock: number,
        created_at: string,
        updated_at: string
    }
  }

type Category = {
    id: number,
    category: string,
    description: string,
}

type formTransaction = {
    id: number,
    tr_id: string,
    tr_type: string,
    tr_product_id: number,
    tr_product_stock: number,
    created_at: string,
    updated_at: string
}

type Product = {
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

export function ModalTransaction({ items }: Transaction) {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }, reset
      } = useForm<formTransaction>()
    const product = useSelector(state => state.product.value)
    const [trData, setTrData] = useState<formTransaction[]>([])
    const test = []

    const onSubmit: SubmitHandler<formTransaction> = async (data) => {
        if (items && items?.id) {
            console.log(data)
            data.id = items.id
            const result = await axiosInstance.post('/tr/edit', data)
            if(result.data.success) {
                const data = await axiosInstance.get('/tr')
                dispatch(setTransaction(data.data.data))
                alert(data.data.message)
            }
        } else {
            const result = await axiosInstance.post('/tr/create', { data: trData })
            if(result.data.success) {
                const result = await axiosInstance.get('/tr')
                dispatch(setTransaction(result.data.data))
                alert(result.data.message)
            }
        }
    }

    const addTransaction = (data: formTransaction) => {
        setTrData(prevData => [...prevData, data]);
      };
    useEffect(() => {
        const getCategory = async () => {
            const result = await axiosInstance.get('/tr')
            const data = await axiosInstance.get('/product')
            dispatch(setProduct(data.data.data))
            dispatch(setCategory(result.data.data))
        }
        getCategory()
    }, [dispatch])

    useEffect(() => {
        const getProduct = async () => {
            const data = await axiosInstance.get('/product')
            dispatch(setProduct(data.data.data))
        }
        getProduct()
    }, [dispatch])

  return (
    <>
      <Button className="bg-green-500" onClick={() => setOpenModal(true)}>{!items ? 'Tambah':'Edit'}</Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Data Transaksi</h3>
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="Jenis Transaksi" value="Jenis Transaksi" />
                </div>
                <Select id="tr_type" defaultValue={items?.tr_type} { ...register('tr_type', {required: 'Jenis tr tidak boleh kosong!'}) } required>
                    <option value={'Stock In'}>Stock In</option>
                    <option value={'Stock Out'}>Stock Out</option>
                </Select>
                {errors.tr_type && <p className="text-red-500 text-sm mt-2">{errors.tr_type.message}</p>}
            </div>

            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="produk" value="Pilih Produk" />
                </div>
                <Select id="tr_product_id" defaultValue={items?.tr_product_id} { ...register('tr_product_id', {required: 'Product tidak boleh kosong!'}) } required>
                    {
                        product?.map((item: Product) => {
                            return (
                                <option key={item?.id} value={item?.id}>{ item.product_name }</option>
                            )
                        })
                    }
                </Select>
                {errors.tr_product_id && <p className="text-red-500 text-sm mt-2">{errors.tr_product_id.message}</p>}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="stock" value="Stock" />
              </div>
              <TextInput 
                id="stock" 
                defaultValue={items?.tr_product_stock} 
                { ...register('tr_product_stock', 
                    { required: true, 
                        pattern: {
                            value: /[0-9]/,
                            message: 'Hanya angka 0-9'
                        },
                        maxLength: {
                            value: 3,
                            message: 'Max stock 999'
                        }
                    })
                } type="number" required />
              {errors.tr_product_stock && <p className="text-red-500 text-sm mt-2">{errors.tr_product_stock.message}</p>}
            </div>


            <Button type="button" className={items ? 'hidden' : ''} onClick={handleSubmit(addTransaction)}>Tambah Transaksi</Button>

            {
                trData?.map(item => {
                    return (
                        <div key={item.id} className="w-full h-fit rounded-lg shadow-sm p-2 bg-green-500 text-white flex gap-6">
                            <p>Transaction with product id {item.tr_product_id} saved</p>
                        </div>
                    )
                })
            }
            <div className="w-full">
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
