export default function DashboardPage() {
    const stats = [
        { label: "Revenue", value: "৳48,200", change: "+12% this week", icon: "", changeType: "positive" },
        { label: "Orders", value: "34", change: "+5 today", icon: "", changeType: "positive" },
        { label: "Products", value: "128", change: "3 low stock", icon: "", changeType: "warning" },
        { label: "Rating", value: "4.8", change: "from 210 reviews", icon: "", changeType: "neutral" },
    ];

    return (
        <div className="p-2 w-full mx-auto">

            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">Sunday, May 10, 2025</p>
                <span className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
                    Store active
                </span>
            </div>

            {/* Welcome hero */}
            <div className="mb-6">
                <h1 className="text-3xl font-serif font-normal text-gray-900 leading-snug mb-2">
                    Welcome to Dashboard, <span className="text-indigo-600">Seller!</span>
                </h1>
                <p className="text-sm text-gray-500">Here's what's happening with your store today.</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">{stat.icon} {stat.label}</p>
                        <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
                        <p className={`text-xs mt-1 ${stat.changeType === "positive" ? "text-green-600" :
                            stat.changeType === "warning" ? "text-amber-500" :
                                "text-gray-400"
                            }`}>
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>

            <hr className="border-gray-200 mb-5" />

            {/* Tip banner */}
            <div className="border-l-2 border-green-600 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-800">Tip:</span> 3 products are running low on stock. Restock soon to avoid missing orders.
                </p>
            </div>

            {/* Notifications */}
            <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-700 mb-3">Notifications</h2>
                <div className="flex flex-col gap-2">

                    <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">New order received</p>
                            <p className="text-xs text-gray-500">Order #1042 was placed by a customer — 10 min ago</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Payment pending</p>
                            <p className="text-xs text-gray-500">Order #1038 payment is still awaiting confirmation — 1 hr ago</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Withdrawal successful</p>
                            <p className="text-xs text-gray-500">৳12,500 has been transferred to your bank account — 3 hr ago</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}