export default function ErrorAlert({ message }) {
  return (
    <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
      {message}
    </div>
  );
}
