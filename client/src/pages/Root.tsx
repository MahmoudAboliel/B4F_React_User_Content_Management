import { Link, Outlet } from "react-router";
import { routes } from "../lib/constants";
import { useUser } from "../context/UserContext";
import { Button } from "@/components/ui/button";

const Root = () => {
  const { user, setUser } = useUser();
    setUser({
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    });
    
  return (
    <main>
      {user ? (
        <>
          <header className="flex justify-between p-4">
            <p>{user.username}</p>
            <ul className="flex items-center gap-2">
              {routes.map((route) => (
                <li key={route.id}>
                  <Link to={route.href}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </header>
          <Outlet />
        </>
      ) : (
        <div className="text-center py-8">
          select users
          <Button className={'ml-9'} variant={'destructive'}>Add</Button>
        </div>
      )}
    </main>
  );
};

export default Root;
