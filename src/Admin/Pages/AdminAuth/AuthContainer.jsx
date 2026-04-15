export default function AuthContainer({ children }) {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
      <div className="bg-[#111827] w-[380px] p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-center text-xl font-semibold mb-6 text-blue-400">
          Algorithms AI
        </h2>
        {children}
      </div>
    </div>
  );
}