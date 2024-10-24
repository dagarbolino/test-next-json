import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

import Image from 'next/image';
import logo from '../../assets/logo/logo.svg';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <Nav>
      <div className="h-36 flex flex-col justify-center items-center gap-2 md:w-full md:flex-row md:justify-between md:items-center ">
        <div className="flex flex-row justify-center items-center gap-2">
          <Image src={logo} width={40} height={40} alt="Logo" />
          <h1 className="flex justify-center items-center mx-auto">Page Client</h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/products">Products</NavLink>
        </div>
      </div>
    </Nav>
    <div className="container my-6 ">{children}</div>
  </>
}