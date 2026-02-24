import { Icon } from "@iconify/react";

export default function Header({ onMenuClick }) {
    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-[#111B3C] border-b border-[#2B7FFF33] px-6 text-white shadow-sm">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="rounded-md p-1 hover:bg-[#1f2d5c] md:hidden"
                >
                    <Icon icon="material-symbols:menu" width="24" height="24" />
                </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 hover:bg-[#1f2d5c]">
                    <Icon icon="material-symbols:notifications-outline" width="20" height="20" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#111B3C]" />
                </button>

                <div className="h-8 w-8 rounded-full bg-linear-to-tr from-[#2B7FFF] to-purple-500" />
            </div>
        </header>
    );
}