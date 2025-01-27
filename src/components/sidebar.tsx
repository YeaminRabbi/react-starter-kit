import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiChartPie,
  HiLogout,
  HiSearch,
} from "react-icons/hi";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/dashboard"
                icon={HiChartPie}
                className={
                  "/dashboard" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiLogout}
                onClick={handleLogout} // Call the logout function
                className="cursor-pointer"
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
