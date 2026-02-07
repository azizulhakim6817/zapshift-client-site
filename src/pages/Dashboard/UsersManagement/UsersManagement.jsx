import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import Swal from "sweetalert2";
import { useState } from "react";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { data: users, refetch } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      //console.log(res.data);
      return res.data;
    },
  });

  //! user update role (rider +  admin)-------------------
  const handleMakeUserRoleAdmin = async (user) => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} maked as an admin successfully`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Are you updated Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user-update/${user._id}`, roleInfo).then((res) => {
          //console.log(res.data);
          refetch();
        });
        Swal.fire({
          title: "Updated!",
          text: "Admin make updated successfully!",
          icon: "success",
        });
      }
    });
  };

  //! user update role (admin remove to currect user)----------
  const handleRemoveRoleUser = async (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} maked as an user successfully`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Are you updated user",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user-update/${user._id}`, roleInfo).then((res) => {
          //console.log(res.data);
          refetch();
        });
        Swal.fire({
          title: "Updated!",
          text: "User make updated successfully!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <h1 className="my-2 text-center font-bold text-xl">
          Get All Users
          <span className="text-primary">
            ( <span className="text-secondary"> {users?.length} </span> )
          </span>
          👥
        </h1>
        {/* role search------------------------ */}
        <div className="text-center my-4">
          <label className="input">
            <CiSearch size={20} />
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              className="grow"
              placeholder="Search users..."
            />
          </label>
        </div>

        {/* table----------------------------------- */}
        <table className="table">
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Photo URL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                {/* photo */}
                <td className="flex gap-2 items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.photoURL}
                    alt="usersImg"
                  />
                  {/* name */}
                </td>
                <td>{user?.displayName}</td>
                {/* email */}
                <td>{user?.email}</td>
                {/* role */}
                <td>{user?.role}</td>
                {/* admin actons */}
                <td>
                  {user?.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveRoleUser(user)}
                      className="btn btn-square bg-red-400"
                    >
                      <FiShieldOff size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUserRoleAdmin(user)}
                      className="btn btn-square bg-success"
                    >
                      <FaUserShield size={20} />
                    </button>
                  )}
                </td>
                {/* others actons */}
                <td>Actions</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
