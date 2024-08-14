
"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateCategory, setCategory } from "@/utils/category";

type Category = {
    items?: {
        id: number,
        category: string,
        description: string,
        created_at: string,
        updated_at: string
    }
  }

type formCategory = {
    id: number,
    category: string,
    description: string
}

export function ModalCategory({ items }: Category) {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<formCategory>()

    const onSubmit: SubmitHandler<formCategory> = async (data) => {
        if (data) {
            if (items && items?.id) {
                data.id = items.id
                const result = await axiosInstance.post('/category/edit', data)
                if(result.data.success) {
                    dispatch(updateCategory(data))
                    alert('Berhasil update!')
                }
            } else {
                const result = await axiosInstance.post('/category/create', data)
                if(result.data.success) {
                    const result = await axiosInstance.get('/category')
                    dispatch(setCategory(result.data.data))
                    alert('Berhasil tambah data!')
                }
            }
            // console.log(data)
            // dispatch()
        }
    }

  return (
    <>
      <Button className="bg-green-500" onClick={() => setOpenModal(true)}>{!items ? 'Tambah':'Edit'}</Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Data Category</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Category" />
              </div>
              <TextInput 
                id="category" 
                defaultValue={items?.category} 
                { ...register('category', 
                    { required: true, 
                        pattern: {
                            value: /[A-Za-z0-9-,()]+$/,
                            message: 'Tidak boleh mengandung special character'
                        }
                    })
                } type="text" required />
              {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="deskripsi" />
              </div>
              <TextInput 
                id="description" 
                defaultValue={items?.description} 
                { ...register('description', 
                    { required: true, 
                        pattern: {
                            value: /[A-Za-z0-9-,()]+$/,
                            message: 'Tidak boleh mengandung special character'
                        } 
                    })
                } type="text" required />
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
            </div>
            <div className="w-full">
              <Button type="submit">Update Category</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
