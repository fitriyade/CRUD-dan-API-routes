export default function Navbar() {
  return (
    <nav className="w-full border-b border-rose-100 px-8 py-5 shadow-sm bg-white fixed top-0 left-0 right-0 z-50">
      <div className="relative flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-slate-800">
          <span className="text-rose-500">Recipe</span>Foods
        </div>
        <ul className="absolute left-1/2 -translate-x-1/2 flex gap-10 text-base font-medium text-slate-700">
          <li>
            <a
              href="/food"
              className="hover:text-rose-600 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-rose-50"
            >
              Food List
            </a>
          </li>
          <li>
            <a
              href="/details"
              className="hover:text-rose-600 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-rose-50"
            >
              Details
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="hover:text-rose-600 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-rose-50"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
