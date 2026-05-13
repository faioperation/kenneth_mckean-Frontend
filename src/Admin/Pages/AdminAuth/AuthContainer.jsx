export default function AuthContainer({ children }) {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
      <div className="bg-[#111827] w-full max-w-[500px]  py-6 sm:py-8   rounded-2xl shadow-2xl text-white flex flex-col items-center justify-center">
        <img src="/authLogo.png"  alt="Logo" className="mb-6" />
        <h2 className=" text-4xl font-semibold mb-6 text-[#4D81F5]">
          Algorithms AI
        </h2>
        <div className="px-8 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}