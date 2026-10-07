import { routes } from "@/lib/constants"
import { NavLink } from "react-router"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-3 border-b border-b-slate-200 shadow-sm">
                <p className="font-medium text-sm">MD</p>
                <ul className="flex items-center gap-2">
                  {routes.map((route) => (
                    <li key={route.id}>
                      <NavLink
                        to={route.href}
                        className={({ isActive }) =>
                          [
                            isActive
                              ? "font-medium text-sm"
                              : "font-normal text-xs hover:font-medium hover:text-sm duration-150",
                          ].join(" ")
                        }
                      >
                        {route.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </header>
  )
}

export default Header