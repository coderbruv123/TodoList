import { useEffect, useState } from "react";
import type { Todos } from "@/types/Todos";
import { getTodos, updateTodo } from "@/api/todosApi";

const TodoList = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleView = (id: number) => {
    setOpenId(openId === id ? null : id);
    setEditId(null); 
  };

  const handleEdit = (todo: Todos) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

 const handleEditSave = async () => {
  if (editId === null) return;
  setLoading(true);
  setError(null);
  try {
    await updateTodo(
      String(editId),
      {
        title: editTitle,
        description: editDescription,
        isCompleted: false
      }
    );
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editId
          ? { ...todo, title: editTitle, description: editDescription }
          : todo
      )
    );
    setEditId(null);
  } catch (err) {
    setError("Failed to update todo.");
  } finally {
    setLoading(false);
  }
};

const handleToggleCompleted = async (todo: Todos) => {
  setLoading(true);
  setError(null);
  try {
    await updateTodo(String(todo.id), {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  } catch (err) {
    setError("Failed to update status.");
  } finally {
    setLoading(false);
  }
};

  const handleEditCancel = () => {
    setEditId(null);
  };
  

  return (
    <div className="mt-6">
      <h2 className="text-xl text-white mb-4">Todo List</h2>
      <div className="space-y-4">
        
        {todos.map((todo) => (
          <div key={todo.id} className="bg-gray-800 text-white p-4 rounded flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleCompleted(todo)}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 focus:outline-none transition-colors ${
                    todo.isCompleted ? "bg-green-500 border-green-500" : "bg-gray-700 border-gray-400"
                  }`}
                  title={todo.isCompleted ? "Mark as incomplete" : "Mark as completed"}
                  aria-label="Toggle completed"
                  disabled={loading}
                />
                <span className={`font-bold ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
                  {todo.title}
                </span>
              </div>
              <button
                className="bg-blue-500 py-1 px-2"
                onClick={() => handleView(todo.id)}
              >
                {openId === todo.id ? "Hide" : "View"}
              </button>
            </div>
            {openId === todo.id && (
              <div className="mt-2 text-sm text-gray-300">
                {editId === todo.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-gray-700 text-white p-1 rounded"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-gray-700 text-white p-1 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 px-2 py-1 rounded"
                        onClick={handleEditSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 px-2 py-1 rounded"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div>{todo.description}</div>
                    <button
                      className="bg-yellow-500 px-2 py-1 rounded text-black w-max"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;