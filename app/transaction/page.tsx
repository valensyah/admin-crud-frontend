"use client"
import React from "react";
import { PartSidebar } from "../components/sidebar";
import { PartNavbar } from "../components/navbar";
import TableTransaction from "../components/tableTransaction"
import { ModalTransaction } from "../components/modalTransaction";
// import { ModalProduct } from '../components/modalProduct'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../helpers/axios";
import { setTransaction } from "../../utils/transaction";

export default function Transaction() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    const userData = JSON.parse(user)
    const transaction = useSelector(state => state.transaction.value)

    useEffect(() => {
        const getData = async () => {
            const result = await axiosInstance.get('/tr')
            dispatch(setTransaction(result.data.data))
        }
        getData()
    }, [dispatch])
    return (
        <main className="w-full min-h-screen bg-slate-200 flex">
            <PartSidebar />
            <div className="w-10/12 min-h-screen p-10">
                <PartNavbar title="Transactions" user={userData} />
                <div className="w-full h-fit p-5 bg-white rounded-md mt-5">
                <div className="mb-4">
                    <ModalTransaction/>
                    {/* <ModalProduct/> */}
                </div>
                <TableTransaction transaction={transaction} />
                </div>
            </div>
        </main>
    )
}