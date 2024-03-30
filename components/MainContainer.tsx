import Head from "next/head";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";

interface MainContainerItem {
  children: ReactNode;
}

const MainContainer: FC<MainContainerItem> = ({ children }) => {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <div className="flex max-w-7xl m-auto p-8 items-center ">
        <div className="">
          <Link
            href="/"
            className="font-semibold leading-6 text-gray-900 text-xl"
          >
            Workzila
          </Link>
        </div>
        <div className="lg:flex flex-1 items-center ">
          <Link
            href="/jobs"
            className="text-base font-semibold ml-11 leading-6 text-gray-900"
          >
            Рекомендовані
          </Link>
          <Link
            href="/liked"
            className="text-base font-semibold ml-11 leading-6 text-gray-900"
          >
            Збережені
          </Link>
          <div className="mx-12 border border-solid border-black rounded-lg">
            <input
              type="text"
              placeholder="Пошук"
              className="w-96 p-1 rounded-lg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Link
              href={`/jobs?value=${encodeURIComponent(value)}`}
              className="px-3 border-l "
            >
              Пошук
            </Link>
          </div>
        </div>

        <div className="font-semibold  lg:flex flex-end text-lg">
          <Link href={"/create-profile"}>Profile</Link>
        </div>
      </div>
      <div className="max-w-7xl mt-14 my-10 mx-auto">{children}</div>
    </>
  );
};

export default MainContainer;
