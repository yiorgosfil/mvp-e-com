import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function Layout() {
  return <div className='min-h-screen flex flex-col'>
    <Header />
    <main className='flex flex-grow'>
      <Outlet />
    </main>
  </div>
}
