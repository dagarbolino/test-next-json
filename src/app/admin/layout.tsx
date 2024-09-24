import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

import Image from 'next/image';
import logo from '../../assets/logo/logo.svg';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <Nav>
        <Image src={logo} width={40} height={40} alt="Logo" />
        <h1 className="flex justify-center items-center mx-auto">Page Admin</h1>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/milkType">Milk Type</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}