
import { Head, Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    FileText,
    Settings,
    Plane,
    CalendarDays,
    Clock,
    CheckCircle2,
    XCircle,
    DollarSign,
    TrendingUp,
    Search,
    Bell,
    Menu,
    ArrowDownToLine,
    ArrowUpFromLine,
    UserRound,
    ChevronRight,
    LogOut,
} from 'lucide-react';

import { useState } from 'react';

type Booking = {
    id: number;
    booking_reference: string;
    full_name: string;
    phone: string;
    email?: string;
    service_type: string;
    trip_type: string;
    airport: string;
    travel_date: string;
    flight_number?: string;
    passenger_count: number;
    status: string;
    created_at: string;
};

type Customer = {
    full_name: string;
    phone: string;
    email?: string;
    created_at: string;
};

type MonthlyBooking = {
    year: number;
    month: number;
    total: number;
};

type Props = {
    stats: {
        totalBookings: number;
        todayBookings: number;
        pendingBookings: number;
        confirmedBookings: number;
        completedBookings: number;
        cancelledBookings: number;
        totalRevenue: number;
        pendingPayments: number;
        activeProtocolStaff: number;
        upcomingArrivals: number;
        upcomingDepartures: number;
    };
    recentBookings: Booking[];
    upcomingArrivals: Booking[];
    upcomingDepartures: Booking[];
    lastThreeMonthsCustomers: Customer[];
    monthlyBookings: MonthlyBooking[];
};

const money = (amount: number) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0,
    }).format(amount || 0);

const formatDate = (date: string) => {
    if (!date) return '—';

    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const statusStyle: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
};

function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                statusStyle[status?.toLowerCase()] ||
                'bg-gray-100 text-gray-600'
            }`}
        >
            {status || 'Unknown'}
        </span>
    );
}

function StatCard({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
}: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-800">
                        {value}
                    </h3>
                    {subtitle && (
                        <p className="mt-1 text-xs text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className={`rounded-xl p-3 ${color}`}>
                    <Icon size={23} />
                </div>
            </div>
        </div>
    );
}

function BookingTable({ bookings }: { bookings: Booking[] }) {
    if (!bookings?.length) {
        return (
            <div className="py-10 text-center text-sm text-slate-400">
                No bookings available.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                        <th className="px-5 py-4">Reference</th>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Service</th>
                        <th className="px-5 py-4">Travel Date</th>
                        <th className="px-5 py-4">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
                        <tr
                            key={booking.id}
                            className="border-b border-slate-50 transition hover:bg-slate-50"
                        >
                            <td className="px-5 py-4 font-semibold text-[#B18A45]">
                                {booking.booking_reference}
                            </td>
                            <td className="px-5 py-4">
                                <p className="font-semibold text-slate-700">
                                    {booking.full_name}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {booking.phone}
                                </p>
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                                {booking.service_type}
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                                {formatDate(booking.travel_date)}
                            </td>
                            <td className="px-5 py-4">
                                <StatusBadge status={booking.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function UpcomingList({
    bookings,
    type,
}: {
    bookings: Booking[];
    type: 'arrival' | 'departure';
}) {
    if (!bookings?.length) {
        return (
            <p className="py-8 text-center text-sm text-slate-400">
                No upcoming {type === 'arrival' ? 'arrivals' : 'departures'}.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
                <div
                    key={booking.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-xl bg-[#17243A] p-3 text-[#D5B16D]">
                            {type === 'arrival' ? (
                                <ArrowDownToLine size={20} />
                            ) : (
                                <ArrowUpFromLine size={20} />
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                {booking.full_name}
                            </p>
                            <p className="text-xs text-slate-400">
                                {booking.flight_number || 'Flight not provided'}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className="text-xs font-semibold text-slate-700">
                            {formatDate(booking.travel_date)}
                        </p>
                        <p className="text-xs capitalize text-slate-400">
                            {booking.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AdminDashboard({
    stats,
    recentBookings,
    upcomingArrivals,
    upcomingDepartures,
    lastThreeMonthsCustomers,
    monthlyBookings,
}: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const maximumBookings = Math.max(
        ...(monthlyBookings || []).map((item) => item.total),
        1,
    );

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const navigation = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin/dashboard',
            active: true,
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
            <Head title="Admin Dashboard | SAWBAN Airport Protocol Services" />

            <div className="min-h-screen bg-[#F4F6FA] text-slate-800">

                {/* MOBILE HEADER */}
                <div className="sticky top-0 z-30 flex items-center justify-between bg-[#17243A] px-5 py-4 text-white lg:hidden">
                    <div>
                        <h1 className="text-lg font-bold tracking-wide">
                            SAWBAN
                        </h1>
                        <p className="text-[10px] tracking-[3px] text-[#D5B16D]">
                            ADMIN PANEL
                        </p>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 hover:bg-white/10"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="flex min-h-screen">

                    {/* SIDEBAR */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <aside
                        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#17243A] text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
                            sidebarOpen
                                ? 'translate-x-0'
                                : '-translate-x-full'
                        }`}
                    >
                        <div className="border-b border-white/10 px-7 py-7">
                            <h1 className="text-2xl font-bold tracking-wider">
                                SAWBAN
                            </h1>
                            <p className="mt-1 text-[10px] tracking-[4px] text-[#D5B16D]">
                                AIRPORT PROTOCOL
                            </p>
                            <p className="mt-1 text-[10px] tracking-[3px] text-slate-400">
                                ADMINISTRATION
                            </p>
                        </div>

                        <div className="px-5 py-6">
                            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-slate-500">
                                Main Menu
                            </p>

                            <nav className="space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                                            item.active
                                                ? 'bg-[#C5A15D] text-[#17243A] shadow-lg'
                                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        <item.icon size={19} />
                                        {item.label}
                                        {item.active && (
                                            <ChevronRight
                                                size={17}
                                                className="ml-auto"
                                            />
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* ADMIN PROFILE AND LOGOUT */}
                        <div className="mt-auto border-t border-white/10 p-5">
                            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                                <div className="rounded-full bg-[#C5A15D] p-2 text-[#17243A]">
                                    <UserRound size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        SAWBAN Admin
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Administrator
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => router.post('/logout')}
                                className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                            >
                                <LogOut size={19} />
                                Logout
                            </button>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="min-w-0 flex-1">

                        {/* TOP BAR */}
                        <header className="hidden items-center justify-between border-b border-slate-200 bg-white px-8 py-5 lg:flex">
                            <div>
                                <h2 className="text-xl font-bold text-[#17243A]">
                                    Dashboard Overview
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Welcome to SAWBAN Admin Management System
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-52 rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#C5A15D]"
                                    />
                                </div>

                                <button className="relative rounded-xl border border-slate-200 p-3 text-slate-500">
                                    <Bell size={19} />
                                </button>

                                <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                                    <div className="rounded-full bg-[#17243A] p-2 text-[#D5B16D]">
                                        <UserRound size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">
                                            SAWBAN Admin
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Administrator
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="p-4 sm:p-6 lg:p-8">

                            {/* PAGE TITLE */}
                            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#17243A]">
                                        Dashboard Overview
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Monitor your airport services and bookings.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
                                    <CalendarDays size={17} />
                                    {new Date().toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                            </div>

                            {/* STATISTICS */}
                            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                <StatCard
                                    title="Total Bookings"
                                    value={stats.totalBookings}
                                    icon={ClipboardList}
                                    color="bg-blue-50 text-blue-600"
                                    subtitle="All booking requests"
                                />

                                <StatCard
                                    title="Today's Bookings"
                                    value={stats.todayBookings}
                                    icon={CalendarDays}
                                    color="bg-purple-50 text-purple-600"
                                    subtitle="Bookings received today"
                                />

                                <StatCard
                                    title="Pending Bookings"
                                    value={stats.pendingBookings}
                                    icon={Clock}
                                    color="bg-amber-50 text-amber-600"
                                />

                                <StatCard
                                    title="Confirmed Bookings"
                                    value={stats.confirmedBookings}
                                    icon={CheckCircle2}
                                    color="bg-sky-50 text-sky-600"
                                />

                                <StatCard
                                    title="Completed Services"
                                    value={stats.completedBookings}
                                    icon={CheckCircle2}
                                    color="bg-emerald-50 text-emerald-600"
                                />

                                <StatCard
                                    title="Cancelled Bookings"
                                    value={stats.cancelledBookings}
                                    icon={XCircle}
                                    color="bg-red-50 text-red-600"
                                />

                                <StatCard
                                    title="Total Revenue"
                                    value={money(stats.totalRevenue)}
                                    icon={DollarSign}
                                    color="bg-green-50 text-green-600"
                                    subtitle="Payment tracking required"
                                />

                                <StatCard
                                    title="Pending Payments"
                                    value={money(stats.pendingPayments)}
                                    icon={TrendingUp}
                                    color="bg-orange-50 text-orange-600"
                                    subtitle="Payment tracking required"
                                />

                                {/* CLICKABLE ACTIVE PROTOCOL STAFF CARD */}
                                <div
                                    onClick={() => router.visit('/admin/protocol-staff')}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            router.visit('/admin/protocol-staff');
                                        }
                                    }}
                                    className="cursor-pointer rounded-2xl transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                >
                                    <StatCard
                                        title="Active Protocol Staff"
                                        value={stats.activeProtocolStaff}
                                        icon={Users}
                                        color="bg-indigo-50 text-indigo-600"
                                        subtitle="Click to manage staff"
                                    />
                                </div>

                                <StatCard
                                    title="Upcoming Arrivals"
                                    value={stats.upcomingArrivals}
                                    icon={ArrowDownToLine}
                                    color="bg-teal-50 text-teal-600"
                                />

                                <StatCard
                                    title="Upcoming Departures"
                                    value={stats.upcomingDepartures}
                                    icon={ArrowUpFromLine}
                                    color="bg-pink-50 text-pink-600"
                                />
                            </div>

                            {/* CHARTS */}
                            <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

                                {/* BOOKING CHART */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-[#17243A]">
                                                Booking Statistics
                                            </h3>
                                            <p className="mt-1 text-xs text-slate-400">
                                                Monthly booking overview
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                            <TrendingUp size={20} />
                                        </div>
                                    </div>

                                    <div className="flex h-52 items-end gap-3 border-b border-l border-slate-100 px-2 pb-2">
                                        {monthlyBookings?.length ? (
                                            monthlyBookings.map((item) => (
                                                <div
                                                    key={`${item.year}-${item.month}`}
                                                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                                                >
                                                    <span className="text-xs font-semibold text-slate-500">
                                                        {item.total}
                                                    </span>
                                                    <div
                                                        className="w-full max-w-12 rounded-t-lg bg-[#C5A15D] transition hover:bg-[#17243A]"
                                                        style={{
                                                            height: `${Math.max((item.total / maximumBookings) * 75, 3)}%`,
                                                        }}
                                                    />
                                                    <span className="text-[10px] text-slate-400">
                                                        {months[item.month - 1]}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="m-auto text-sm text-slate-400">
                                                No booking statistics available.
                                            </p>
                                        )}
                                    </div>
                                </section>

                                {/* REVENUE CHART */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-[#17243A]">
                                                Monthly Revenue
                                            </h3>
                                            <p className="mt-1 text-xs text-slate-400">
                                                Monthly payment performance
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                                            <DollarSign size={20} />
                                        </div>
                                    </div>

                                    <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
                                        <DollarSign
                                            size={35}
                                            className="mb-3 text-[#C5A15D]"
                                        />
                                        <p className="font-semibold text-slate-700">
                                            Revenue Tracking Not Set Up Yet
                                        </p>
                                        <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">
                                            Payment amount and payment status
                                            fields will be added before this
                                            chart displays actual revenue.
                                        </p>
                                    </div>
                                </section>
                            </div>

                            {/* RECENT BOOKINGS */}
                            <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5">
                                    <div>
                                        <h3 className="font-bold text-[#17243A]">
                                            Recent Bookings
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Latest customer booking requests
                                        </p>
                                    </div>

                                    <span className="rounded-lg bg-[#17243A] px-4 py-2 text-xs font-semibold text-white">
                                        Latest 10
                                    </span>
                                </div>

                                <BookingTable bookings={recentBookings} />
                            </section>

                            {/* UPCOMING SERVICES */}
                            <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
                                            <Plane size={21} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#17243A]">
                                                Upcoming Arrivals
                                            </h3>
                                            <p className="text-xs text-slate-400">
                                                Airport arrival services
                                            </p>
                                        </div>
                                    </div>

                                    <UpcomingList
                                        bookings={upcomingArrivals}
                                        type="arrival"
                                    />
                                </section>

                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                                            <Plane size={21} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#17243A]">
                                                Upcoming Departures
                                            </h3>
                                            <p className="text-xs text-slate-400">
                                                Airport departure services
                                            </p>
                                        </div>
                                    </div>

                                    <UpcomingList
                                        bookings={upcomingDepartures}
                                        type="departure"
                                    />
                                </section>
                            </div>

                            {/* LAST 3 MONTHS CUSTOMERS */}
                            <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5">
                                    <div>
                                        <h3 className="font-bold text-[#17243A]">
                                            Last 3 Months Customer Information
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Recent customer records
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-[#F8F3E9] px-3 py-2 text-xs font-semibold text-[#9A783C]">
                                        Last 3 Months
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[650px] text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                                                <th className="px-5 py-4">Customer</th>
                                                <th className="px-5 py-4">Phone</th>
                                                <th className="px-5 py-4">Email</th>
                                                <th className="px-5 py-4">Booking Date</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {lastThreeMonthsCustomers?.length ? (
                                                lastThreeMonthsCustomers.map(
                                                    (customer, index) => (
                                                        <tr
                                                            key={`${customer.phone}-${index}`}
                                                            className="border-b border-slate-50 hover:bg-slate-50"
                                                        >
                                                            <td className="px-5 py-4 font-semibold text-slate-700">
                                                                {customer.full_name}
                                                            </td>
                                                            <td className="px-5 py-4 text-slate-600">
                                                                {customer.phone}
                                                            </td>
                                                            <td className="px-5 py-4 text-slate-500">
                                                                {customer.email || '—'}
                                                            </td>
                                                            <td className="px-5 py-4 text-slate-600">
                                                                {formatDate(customer.created_at)}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className="px-5 py-10 text-center text-slate-400"
                                                    >
                                                        No customer records found in the last 3 months.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* FOOTER */}
                            <footer className="border-t border-slate-200 py-6 text-center">
                                <p className="text-xs text-slate-400">
                                    © {new Date().getFullYear()} SAWBAN AIRPORT PROTOCOL SERVICES.
                                    All Rights Reserved.
                                </p>
                                <p className="mt-1 text-[10px] tracking-widest text-[#B18A45]">
                                    PREMIUM AIRPORT ASSISTANCE & VIP PROTOCOL
                                </p>
                            </footer>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
