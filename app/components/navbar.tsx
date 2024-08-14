
"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { singOut } from "@/utils/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Profile from './profile'
import Cookies from 'js-cookie'

type props = {
    title?: string,
    user?: {
        first_name: string,
        last_name: string,
        email: string
    }
}
export function PartNavbar(props: props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const logout = () => {
    dispatch(singOut())
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{props.title}</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{props.user?.last_name}</span>
            <span className="block truncate text-sm font-medium">{props.user?.email}</span>
          </Dropdown.Header>
          <Dropdown.Item> <a href="/profile">Edit profile</a> </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
