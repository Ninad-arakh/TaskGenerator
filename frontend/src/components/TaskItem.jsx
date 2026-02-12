export default function TaskItem({ task, index, moveUp, moveDown, update, remove }) {
  return (
    <div className="flex items-center gap-2 border p-2 rounded">
      <input
        value={task}
        onChange={(e) => update(index, e.target.value)}
        className="flex-1 outline-none"
      />
      <button onClick={() => moveUp(index)}>↑</button>
      <button onClick={() => moveDown(index)}>↓</button>
      <button onClick={() => remove(index)}>✕</button>
    </div>
  );
}
