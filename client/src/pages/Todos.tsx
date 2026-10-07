import PageHeader from "@/components/PageHeader";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { Todo } from "@/lib/types";
import { todosApi } from "@/services/api";
import { useEffect, useState } from "react";

const Todos = () => {
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const response = await todosApi.getAll(`?userId=${user.id}`);
        setTodos(response?.data || []);
      }
    };
    fetchTodos();
  }, [user]);
  console.log(todos);

  return (
    <div>
      <PageHeader {...pageMeta.todos} />
    </div>
  );
};

export default Todos;
