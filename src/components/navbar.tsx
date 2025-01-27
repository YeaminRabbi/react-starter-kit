import type { FC } from "react";
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";

const ExampleNavbar: FC = function () {
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/dashboard">
              <img alt="" src="https://techstringit.com/setting-images/01JB7ME64HNQN9FPA9BYQYPMQ2.png" className="mr-3 h-10 sm:h-10" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Form Builder
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
