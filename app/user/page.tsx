"use client"
import { PartSidebar } from "../components/sidebar";
import { PartNavbar } from "../components/navbar";
import { TableUser } from "../components/tableUser";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "@/helpers/axios";

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

export default function Home() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const userData = JSON.parse(user)
  const [allUser, setAllUser] = useState<User[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const result = await axiosInstance.get('/users/all')
      setAllUser(result.data.data)
    }
    getUsers()
  }, [])
  
  return (
    <main className="w-full min-h-screen bg-slate-200 flex">
      <PartSidebar />
      <div className="w-10/12 min-h-screen p-10">
        <PartNavbar title="Users" user={userData} />
        <div className="w-full h-fit p-5 bg-white rounded-md mt-5">
          <TableUser user={allUser} />
        </div>
      </div>
    </main>
  );
}
