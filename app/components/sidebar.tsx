
"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export function PartSidebar() {
  return (
    <Sidebar className="h-screen" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/">
            Product
          </Sidebar.Item>
          <Sidebar.Item href="/category">
            Category
          </Sidebar.Item>
          <Sidebar.Item href="/transaction">
            Transaction
          </Sidebar.Item>
          {/* <Sidebar.Item href="/user">
            Users
          </Sidebar.Item> */}
          {/* <Sidebar.Item href="#">
            Sign Up
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
