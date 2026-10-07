import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table/Table";
import TableBody from "@/components/Table/TableBody/TableBody";
import TableCell from "@/components/Table/TableCell/TableCell";
import TableHead from "@/components/Table/TableHead/TableHead";
import TableRow from "@/components/Table/TableRow/TableRow";
import { useUser } from "@/context/UserContext";
import { pageMeta } from "@/lib/constants";
import type { ColumnConfig, Todo } from "@/lib/types";
import { extractHeaders } from "@/lib/utils";
import { todosApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

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

  const todoColumns: ColumnConfig<Todo>[] = [
    { header: "No.#", key: "id" },
    { header: "Title", key: "title" },
    { header: "Status", key: "completed" },
  ];

  const headers = [...extractHeaders(todoColumns), "Actions"];
  // TODO fix TableCell to accept a true/false boolean to display status for Todos
  return (
    <div>
      <PageHeader {...pageMeta.todos} />
      <Table id="table">
        <TableHead cols={headers} />
        <TableBody id="table-body">
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              {todoColumns.map((col) => (
                <TableCell key={col.key} id={String(col.key)}>
                  {col.key === "completed" ? (
                    <Badge
                      variant={"outline"}
                      className={`${todo.completed ? "bg-green-300/20 text-green-500" : "bg-red-300/20 text-red-500"}`}
                    >
                      {todo.completed ? "Completed" : "Uncompleted"}
                    </Badge>
                  ) : (
                    String(todo[col.key])
                  )}
                </TableCell>
              ))}
              <TableCell id="actions" className="flex items-center gap-2">
                <Button size="xs" variant="outline">
                  <Link to={`/todos/${todo.id}`}>View</Link>
                </Button>
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => handleUpdate(todo.id)}
                >
                  Update
                </Button>
                <Button
                  size="xs"
                  variant="destructive"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Todos;
