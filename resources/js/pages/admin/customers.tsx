import { useState, type FormEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    Search,
    Bell,
    Menu,
    X,
    RefreshCw,
    Phone,
    Mail,
    CalendarDays,
    UserRound,
    ChevronLeft,
    ChevronRight,
    DollarSign,
} from 'lucide-react';

type Customer = {
    full_name: string;
    phone: string;
    email: string | null;
    total_bookings: number;
    last_booking: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type CustomerPaginator = {
    data: Customer[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

type Props = {
    customers: CustomerPaginator;
    filters: {
        search: string | null;
    };
};

export default function Customers({ customers, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        router.get(
            '/admin/customers',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const resetSearch = () => {
        setSearch('');

        router.get(
            '/admin/customers',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const refreshCustomers = () => {
        router.get(
            '/admin/customers',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const formatDate = (date: string | null) => {
        if (!date) return 'N/A';

        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const navigation = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin/dashboard',
        },
        {
            label: 'Booking Management',
            icon: ClipboardList,
            href: '/admin/bookings',
        },
        {
            label: 'Customer Management',
            icon: Users,
            href: '/admin/customers',
            active: true,
        },
        {
            label: 'Payment Management',
            icon: DollarSign,
            href: '/admin/payments',
        },
        {
            label: 'Protocol Staff',
            icon: UserRound,
            href: '/admin/protocol-staff',
        },
    ];

    return (
        <>
            <Head title="Customer Management" />

            <div className="min-h-screen w-full bg-[#f4f6fa] lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    style={{
                        backgroundColor: '#101d35',
                        color: '#ffffff',
                    }}
                    className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:col-start-1 lg:row-start-1 lg:h-screen lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Logo */}
                    <div className="flex h-20 items-center justify-between border-b border-white/10 px-7">
                        <div>
                            <h1 className="text-xl font-bold tracking-wide text-white">
                                SAWBAN
                            </h1>

                            <p className="mt-1 text-[10px] font-semibold tracking-[3px] text-[#C5A15D]">
                                ADMIN PANEL
                            </p>
                        </div>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-white lg:hidden"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="px-5 py-7">
                        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-[#C5A15D]">
                            Main Menu
                        </p>

                        <nav className="space-y-2">
                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                            item.active
                                                ? 'bg-[#C5A15D] text-[#17243A] shadow-lg'
                                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        <Icon size={19} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Admin Profile */}
                    <div className="mt-auto border-t border-white/10 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C5A15D] text-[#17243A]">
                                <UserRound size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    SAWBAN Admin
                                </p>

                                <p className="text-xs text-[#C5A15D]">
                                    Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="min-w-0 w-full lg:col-start-2 lg:row-start-1">

                    {/* Header */}
                    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-slate-700 lg:hidden"
                            >
                                <Menu size={24} />
                            </button>

                            <div>
                                <h2 className="text-lg font-bold text-[#101d35] sm:text-xl">
                                    Customer Management
                                </h2>

                                <p className="hidden text-xs text-slate-500 sm:block">
                                    Manage and view all your customers
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">

                            <button
                                onClick={refreshCustomers}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                                title="Refresh"
                            >
                                <RefreshCw size={18} />
                            </button>

                            <button
                                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600"
                                title="Notifications"
                            >
                                <Bell size={18} />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                            </button>

                        </div>
                    </header>

                    {/* Page Body */}
                    <div className="space-y-7 p-5 sm:p-8">

                        {/* Page Title */}
                        <div>
                            <h3 className="text-2xl font-bold text-[#101d35]">
                                Customers
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                View customer information and booking history.
                            </p>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Customers
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold text-[#101d35]">
                                            {customers.total}
                                        </h3>
                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Users size={26} />
                                    </div>
                                </div>

                                <p className="mt-3 text-xs text-slate-400">
                                    Total registered booking customers
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Customers on This Page
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold text-[#101d35]">
                                            {customers.data.length}
                                        </h3>
                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                        <UserRound size={26} />
                                    </div>
                                </div>

                                <p className="mt-3 text-xs text-slate-400">
                                    Showing current page customers
                                </p>
                            </div>

                        </div>

                        {/* Customer Table Section */}
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

                            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h3 className="text-lg font-bold text-[#101d35]">
                                        All Customers
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Customer details and booking records
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSearch}
                                    className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
                                >
                                    <div className="relative">
                                        <Search
                                            size={17}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search customer..."
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#d5ad62] focus:ring-2 focus:ring-[#d5ad62]/20 sm:w-64"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-11 rounded-xl bg-[#101d35] px-5 text-sm font-semibold text-white transition hover:bg-[#1b3155]"
                                    >
                                        Search
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetSearch}
                                        className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                                    >
                                        Reset
                                    </button>
                                </form>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[850px] text-left">

                                    <thead className="bg-[#f8f9fc]">
                                        <tr className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Contact Details</th>
                                            <th className="px-6 py-4">Total Bookings</th>
                                            <th className="px-6 py-4">Last Booking</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {customers.data.length > 0 ? (
                                            customers.data.map((customer, index) => (
                                                <tr
                                                    key={`${customer.phone}-${customer.email}-${index}`}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">

                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#101d35] text-sm font-bold text-[#d5ad62]">
                                                                {customer.full_name
                                                                    ?.charAt(0)
                                                                    .toUpperCase()}
                                                            </div>

                                                            <div>
                                                                <Link
                                                                    href={`/admin/customers/details?phone=${encodeURIComponent(customer.phone)}`}
                                                                    className="text-sm font-bold text-[#101d35] transition hover:text-[#c49a50]"
                                                                >
                                                                    {customer.full_name}
                                                                </Link>

                                                                <p className="mt-1 text-xs text-slate-400">
                                                                    Customer
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">

                                                            <Link
                                                                href={`/admin/customers/details?phone=${encodeURIComponent(customer.phone)}`}
                                                                className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-[#c49a50]"
                                                            >
                                                                <Phone size={14} className="text-[#c49a4a]" />
                                                                {customer.phone}
                                                            </Link>

                                                            <p className="flex items-center gap-2 text-sm text-slate-500">
                                                                <Mail size={14} className="text-[#c49a4a]" />
                                                                {customer.email || 'No email'}
                                                            </p>

                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                                                            {customer.total_bookings}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <p className="flex items-center gap-2 text-sm text-slate-600">
                                                            <CalendarDays size={15} className="text-[#c49a4a]" />
                                                            {formatDate(customer.last_booking)}
                                                        </p>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-16 text-center"
                                                >
                                                    <Users
                                                        size={38}
                                                        className="mx-auto mb-3 text-slate-300"
                                                    />

                                                    <p className="font-semibold text-slate-600">
                                                        No customers found
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-400">
                                                        Customer records will appear here after bookings are submitted.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm text-slate-500">
                                    Showing {customers.from ?? 0} to {customers.to ?? 0} of {customers.total} customers
                                </p>

                                <div className="flex flex-wrap items-center gap-1">
                                    {customers.links.map((link, index) => {
                                        const isPrevious = index === 0;
                                        const isNext = index === customers.links.length - 1;

                                        return (
                                            <button
                                                key={index}
                                                disabled={!link.url}
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.get(
                                                            link.url,
                                                            {},
                                                            {
                                                                preserveState: true,
                                                                preserveScroll: true,
                                                            },
                                                        );
                                                    }
                                                }}
                                                className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                                                    link.active
                                                        ? 'bg-[#101d35] text-white'
                                                        : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                                                } disabled:cursor-not-allowed disabled:opacity-40`}
                                            >
                                                {isPrevious ? (
                                                    <ChevronLeft size={17} />
                                                ) : isNext ? (
                                                    <ChevronRight size={17} />
                                                ) : (
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}