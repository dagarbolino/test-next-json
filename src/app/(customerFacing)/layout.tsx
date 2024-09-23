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
        <Image src={logo} width={40} height={40} alt="Logo" />
        <h1 className="flex justify-center items-center mx-auto">Page Client</h1>
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/products">Products</NavLink>
      </Nav>
    <div className="container my-6 ">{children}</div>
  </>
}