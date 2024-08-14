"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import axiosInstance from "@/helpers/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/user";
import Cookies from 'js-cookie';

type Inputs = {
  email: string
  password: string
}

export default function Login() {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const router = useRouter()

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data) {
            const result = await axiosInstance.post('/users/', data)
            localStorage.setItem('user', JSON.stringify(result.data.data[0]))
            dispatch(setUser(result.data.data[0]))
            Cookies.set('token', result.data.token)
            router.push('/')
        }
      }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="card bg-white shadow-md rounded-2xl w-4/12 h-2/4 p-5">
                <p className="text-xl font-semibold text-center mb-5">Login</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" {...register("email", { required: 'Email tidak boleh kosong!'})} type="email" placeholder="name@flowbite.com" required/>
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" {...register("password", { required: 'Password tidak boleh kosong!', pattern: {
                            value: /[!#$%]/,
                            message: 'Password harus include special character'
                        } })} type="password" required />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                    </div>
                    <div>
                        <p>Tidak punya akun ? <a href="/register">Daftar disini</a></p>
                    </div>
                    <Button className="bg-blue-500" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}