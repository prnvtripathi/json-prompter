import Link from 'next/link';
import { CurlyBraces } from 'lucide-react';

export default function Logo() {
    return (
        <Link href="/" className="group">
            <div className="flex items-center transition-transform duration-200 hover:scale-105">
                <CurlyBraces className="inline-block mr-2 text-orange-500 group-hover:text-orange-400 transition-colors duration-200" size={24} />
                <span className="font-bold text-xl bg-gradient-to-r from-primary via-red-500 to-orange-500 bg-clip-text text-transparent hover:from-orange-400 hover:via-red-400 hover:to-orange-400 transition-all duration-300">
                    JXON
                </span>
            </div>
        </Link>
    );
}