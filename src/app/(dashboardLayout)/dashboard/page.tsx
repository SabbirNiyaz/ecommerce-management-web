export default function DashboardPage() {
    const stats = [
        { label: "Revenue", value: "৳48,200", change: "+12% this week", icon: "", changeType: "positive" },
        { label: "Orders", value: "34", change: "+5 today", icon: "", changeType: "positive" },
        { label: "Products", value: "128", change: "3 low stock", icon: "", changeType: "warning" },
        { label: "Rating", value: "4.8", change: "from 210 reviews", icon: "", changeType: "neutral" },
    ];

    return (
        <div className="p-2 w-full mx-auto dark:bg-gray-950 dark:min-h-screen">

            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Sunday, May 10, 2025</p>
                <span className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full dark:text-green-400 dark:bg-green-950">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block dark:bg-green-500" />
                    Store active
                </span>
            </div>

            {/* Welcome hero */}
            <div className="mb-6">
                <h1 className="text-3xl font-serif font-normal text-gray-900 leading-snug mb-2 dark:text-gray-100">
                    Welcome to Dashboard, <span className="text-indigo-600 dark:text-indigo-400">Seller!</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your store today.</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-4 dark:bg-gray-900">
                        <p className="text-xs text-gray-500 mb-1 dark:text-gray-400">{stat.icon} {stat.label}</p>
                        <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">{stat.value}</p>
                        <p className={`text-xs mt-1 ${stat.changeType === "positive" ? "text-green-600 dark:text-green-400" :
                            stat.changeType === "warning" ? "text-amber-500 dark:text-amber-400" :
                                "text-gray-400 dark:text-gray-500"
                            }`}>
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>

            <hr className="border-gray-200 mb-5 dark:border-gray-800" />

            {/* Tip banner */}
            <div className="border-l-2 border-green-600 bg-gray-50 px-4 py-3 dark:border-green-500 dark:bg-gray-900">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Tip:</span> 3 products are running low on stock. Restock soon to avoid missing orders.
                </p>
            </div>

            {/* Notifications */}
            <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-300">Notifications</h2>
                <div className="flex flex-col gap-2">

                    <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 dark:bg-blue-950 dark:border-blue-900">
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">New order received</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Order #1042 was placed by a customer — 10 min ago</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 dark:bg-amber-950 dark:border-amber-900">
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Payment pending</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Order #1038 payment is still awaiting confirmation — 1 hr ago</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3 dark:bg-green-950 dark:border-green-900">
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Withdrawal successful</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">৳12,500 has been transferred to your bank account — 3 hr ago</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}