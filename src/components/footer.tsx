
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6">
        {/* BOTTOM BAR */}
        <div className="mt-2 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()}  E-commerce Management Web. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
    </footer>
  );
}