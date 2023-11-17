import { ThemeController } from "./ThemeController";

export function Navbar() {
  return <nav className='navbar bg-base-100 text-base-content px-4 shadow-sm shadow-gray-700 dark:shadow-black'>
    <div className='flex-none'>
      <button className='btn btn-square btn-ghost'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div className='flex-1'>
      <button className='btn btn-ghost text-2xl font-extrabold'>My Website</button>
    </div>
    <div className='flex-none'>
      <ThemeController />
    </div>
  </nav>;
}
