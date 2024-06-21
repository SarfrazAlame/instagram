import { fetchUsers } from "@/lib/data";
import React from "react";

const page = async () => {
  const users = await fetchUsers();
  console.log(users);
  return (
    <div>
      <div>
        {users.map((user) => (
          <div className="flex my-3 gap-5">
            <p className="text-2xl font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
