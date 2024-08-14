"use client";
import React from "react";
import { Button, Checkbox, Label, Select, TextInput, Modal } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import axiosInstance from "../../helpers/axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../utils/user'

type Inputs = {
  email: string
  password: string
  first_name: string
  last_name: string
  birth_date: string
  gender: string
}

export default function Profile() {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const user = useSelector(state => state.user.value)
      const userData = JSON.parse(user)
    //   const router = useRouter()

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data) {
            axiosInstance.post('/users/update', data).then(res => {
                if (res.data.success) {
                    localStorage.setItem('user', JSON.stringify(data))
                    dispatch(setUser(data))
                    alert("Berhasil update data!")
                } else {
                    alert(`Gagal membuat akun : ${res.data.message}`)
                }
            })
        }
      }

    return (
        <>
        <div className="w-full h-screen flex justify-center items-center">
            <div className="card bg-white shadow-md rounded-2xl w-4/12 h-fit p-5">
                <p className="text-xl font-semibold text-center mb-5">Edit Profile</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" defaultValue={userData?.email} {...register("email", { required: 'Email tidak boleh kosong!'})} type="email" placeholder="name@flowbite.com" required/>
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="Nama Depan" />
                        </div>
                        <TextInput id="first_name" defaultValue={userData?.first_name} {...register("first_name", { required: 'Nama depan tidak boleh kosong!'})} type="text" placeholder="" required/>
                        {errors.first_name && <p className="text-red-500 text-sm mt-2">{errors.first_name.message}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Nama Belakang" />
                        </div>
                        <TextInput id="last_name" defaultValue={userData?.last_name} {...register("last_name")} type="text" placeholder=""/>
                        {errors.last_name && <p className="text-red-500 text-sm mt-2">{errors.last_name.message}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="birth_date" value="Tanggal Lahir" />
                        </div>
                        <TextInput id="birth_date" defaultValue={userData?.birth_date} {...register("birth_date", { required: "Tanggal Lahir tidak boleh kosong!" })} type="date" placeholder=""/>
                        {errors.birth_date && <p className="text-red-500 text-sm mt-2">{errors.birth_date.message}</p>}
                    </div>

                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="Jenis Transaksi" value="Jenis Transaksi" />
                        </div>
                        <Select id="gender" defaultValue={userData.gender} { ...register('gender', {required: 'Jenis kelamin tidak boleh kosong!'}) } required>
                            <option value={'Pria'}>Pria</option>
                            <option value={'Wanita'}>Wanita</option>
                        </Select>
                        {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender.message}</p>}
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" defaultValue={userData?.password} {...register("password", { required: 'Password tidak boleh kosong!', pattern: {
                            value: /[!#$%]/,
                            message: 'Password harus include special character'
                        } })} type="password" required />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                    </div>
                    <Button className="bg-blue-500" type="submit">Submit</Button>
                </form>
            </div>
        </div>
        </>
    )
}