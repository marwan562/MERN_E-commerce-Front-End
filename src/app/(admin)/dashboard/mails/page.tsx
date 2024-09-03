"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreVertical,
  MessageCircle,
  UserCog,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationOrders } from "../../components/PaginationOrder";

type User = {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  status: "online" | "offline" | "away";
  role: "user" | "moderator" | "admin";
};

const initialUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    lastActive: "2 minutes ago",
    status: "online",
    role: "user",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    lastActive: "1 hour ago",
    status: "away",
    role: "moderator",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    lastActive: "3 days ago",
    status: "offline",
    role: "user",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    lastActive: "5 minutes ago",
    status: "online",
    role: "admin",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    lastActive: "2 hours ago",
    status: "offline",
    role: "user",
  },
];

export default function AdminChatUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
    }
  };

  const handleChatNow = (userId: string) => {
    console.log(`Initiating chat with user ${userId}`);
    // Implement chat initiation logic here
  };

  const handleEditUser = (userId: string) => {
    console.log(`Editing user ${userId}`);
    // Implement user editing logic here
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Deleting user ${userId}`);
    // Implement user deletion logic here
  };

  return (
    <Card className="container mx-auto py-10">
      <CardHeader>
        <CardTitle>
          {" "}
          <h1 className="text-3xl font-bold mb-6">Mails Users</h1>
        </CardTitle>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button>Add New User</Button>
        </div>
      </CardHeader>
      <CardContent>
        {" "}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(user.status)} text-white`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleChatNow(user.id)}
                          className="text-blue-600"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Chat Now
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleEditUser(user.id)}
                          className="text-yellow-600"
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Mail
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <PaginationOrders/>
    </Card>
  );
}
