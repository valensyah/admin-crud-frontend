"use client";

import { Button, Checkbox, FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import axiosInstance from "@/helpers/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, setProduct } from "@/utils/product";
import { setCategory } from "@/utils/category";

type Product = {
    items?: {
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
  }

type Category = {
    id: number,
    category: string,
    description: string,
}

type formProduct = {
    id: number,
    product_name: string,
    image: string,
    stock: number,
    description: string,
    category_id: number
}

export function ModalProduct({ items }: Product) {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<formProduct>()
    const category = useSelector((state: any) => state.category.value)

    const onSubmit: SubmitHandler<formProduct> = async (data) => {
        if (data) {
          const formData = new FormData()
          formData.append('product_name', data.product_name);
          formData.append('stock', data.stock.toString());
          formData.append('description', data.description);
          formData.append('category_id', data.category_id.toString());
          if (data.image[0]) {
            formData.append('image', data.image[0]);
          }
            if (items && items?.id) {
                formData.append('id', items.id.toString());
                const result = await axiosInstance.post('/product/edit', formData)
                if(result.data.success) {
                    refreshData()
                    alert('Berhasil update!')
                }
            } else {
                const result = await axiosInstance.post('/product/create', formData)
                if(result.data.success) {
                    refreshData()
                    alert('Berhasil tambah data!')
                }
            }
        }
    }

    const refreshData = async () => {
      const result = await axiosInstance.get('/product')
      dispatch(setProduct(result.data.data))
    }

    const validateFileSize = (file: any) => {
        const maxSize = 1 * 1024 * 1024; // 2MB in bytes
        if (file[0] && file[0].size > maxSize) {
          return 'File size should not exceed 2MB';
        }
        return true;
      };

    useEffect(() => {
        const getCategory = async () => {
            const result = await axiosInstance.get('/category')
            dispatch(setCategory(result.data.data))
        }
        getCategory()
    }, [dispatch])

  return (
    <>
      <Button className="bg-green-500" onClick={() => setOpenModal(true)}>{!items ? 'Tambah':'Edit'}</Button>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Data Product</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="product_name" value="Nama Produk" />
              </div>
              <TextInput 
                id="category" 
                defaultValue={items?.product_name} 
                { ...register('product_name', 
                    { required: true, 
                        pattern: {
                            value: /[A-Za-z0-9-,()]+$/,
                            message: 'Tidak boleh mengandung special character'
                        }
                    })
                } type="text" required />
              {errors.product_name && <p className="text-red-500 text-sm mt-2">{errors.product_name.message}</p>}
            </div>

            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="category" value="kategori" />
                </div>
                <Select id="category" { ...register('category_id', {required: 'Kategori tidak boleh kosong!'}) } required>
                    {
                        category?.map((item: Category) => {
                            return (
                                <option key={item.id} value={item.id}>{ item.category } - { item.description }</option>
                            )
                        })
                    }
                </Select>
                {errors.category_id && <p className="text-red-500 text-sm mt-2">{errors.category_id.message}</p>}
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

            <div>
              <div className="mb-2 block">
                <Label htmlFor="stock" value="Stock" />
              </div>
              <TextInput 
                id="stock" 
                defaultValue={items?.stock} 
                { ...register('stock', 
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
              {errors.stock && <p className="text-red-500 text-sm mt-2">{errors.stock.message}</p>}
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="file-upload" value="Upload gambar" />
                </div>
                <FileInput 
                    id="file-upload"
                    { ...register('image', 
                        { required: true, 
                            validate: validateFileSize,
                        })
                    }
                />
            </div>
            <div className="w-full">
              <Button type="submit">Update Product</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
