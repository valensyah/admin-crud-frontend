
"use client";

import { Table } from "flowbite-react";

interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  birth_date: string,
  gender: string,
  password: string,
  created_at: string,
  updated_at: string
}

interface TablesProps {
  user: User[];
}


export function TableUser({ user }: TablesProps) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Last Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Birth Date</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            user?.map((item: User) => {
              return (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.first_name}
                  </Table.Cell>
                  <Table.Cell>{item.last_name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.birth_date}</Table.Cell>
                  <Table.Cell>{item.gender}</Table.Cell>
                  <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </div>
  );
}
