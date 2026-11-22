
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    DollarSign,
    UserRound,
    Search,
    Bell,
    Menu,
    X,
    Plane,
    CalendarDays,
    Phone,
    Mail,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    User,
    MapPin,
} from 'lucide-react';

type Booking = {
    id: number;
    booking_reference: string;
    full_name: string;
    phone: string;
    email: string | null;
    service_type: string;
    trip_type: string;
    airport: string;
    travel_date: string;
    flight_number: string | null;
    passenger_count: number;
    message: string | null;
    status: string;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type BookingsPaginator = {
    data: Booking[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

type Props = {
    bookings: BookingsPaginator;
    filters: {
        search: string | null;
    };
};

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
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
        active: true,
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

export default function Bookings({ bookings, filters }: Props) {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/bookings',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const resetSearch = () => {
        setSearch('');

        router.get(
            '/admin/bookings',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const updateStatus = (bookingId: number, status: string) => {
        setUpdatingId(bookingId);

        router.patch(
            `/admin/bookings/${bookingId}/status`,
            { status },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingId(null),
            },
        );
    };

    const refreshBookings = () => {
        router.get(
            '/admin/bookings',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const formatDate = (date: string) => {
        if (!date) return '—';

        const parsedDate = new Date(`${date.substring(0, 10)}T00:00:00`);

        if (Number.isNaN(parsedDate.getTime())) return date;

        return parsedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatDateTime = (date: string) => {
        if (!date) return '—';

        const parsedDate = new Date(date.replace(' ', 'T'));

        if (Number.isNaN(parsedDate.getTime())) return date;

        return parsedDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const totalBookings = bookings.total;
    const pendingBookings = bookings.data.filter(
        (booking) => booking.status === 'pending',
    ).length;
    const confirmedBookings = bookings.data.filter(
        (booking) => booking.status === 'confirmed',
    ).length;

    return (
        <>
            <Head title="Booking Management | SAWBAN Admin" />

            {/* Main Grid Layout */}
            <div className="min-h-screen w-full bg-[#f4f6fa] lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">

                {/* Mobile Overlay */}
                {mobileMenu && (
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMobileMenu(false)}
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#17243a] text-white transition-transform duration-300 ${
                        mobileMenu ? 'translate-x-0' : '-translate-x-full'
                    } lg:sticky lg:top-0 lg:col-start-1 lg:row-start-1 lg:h-screen lg:translate-x-0`}
                >
                    {/* Brand */}
                    <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                        <div>
                            <h1 className="text-xl font-bold tracking-wide">
                                SAWBAN
                            </h1>
                            <p className="mt-1 text-xs tracking-[3px] text-amber-400">
                                AIRPORT PROTOCOL
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileMenu(false)}
                            className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
                        >
                            <X size={21} />
                        </button>
                    </div>

                    {/* Admin Label */}
                    <div className="px-6 pb-3 pt-7">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                            Admin Panel
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 px-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenu(false)}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                                    item.active
                                        ? 'bg-[#C5A15D] text-[#17243A] shadow-lg'
                                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <item.icon size={19} />
                                {item.label}
                                {item.active && (
                                    <ChevronRight size={17} className="ml-auto" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="border-t border-white/10 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C5A15D] text-[#17243A]">
                                <User size={20} />
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
                </aside>

                {/* Main Content */}
                <main className="min-w-0 w-full lg:col-start-2 lg:row-start-1">

                    {/* Header */}
                    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileMenu(true)}
                                className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
                            >
                                <Menu size={23} />
                            </button>

                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-bold text-[#17243a] sm:text-xl">
                                    Booking Management
                                </h2>
                                <p className="hidden text-xs text-slate-500 sm:block">
                                    Manage and monitor all customer bookings
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={refreshBookings}
                                title="Refresh bookings"
                                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
                            >
                                <RefreshCw size={18} />
                            </button>

                            <button
                                type="button"
                                title="Notifications"
                                className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
                            >
                                <Bell size={18} />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
                            </button>
                        </div>
                    </header>

                    {/* Page Body */}
                    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">

                        {/* Page Heading */}
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-xl font-bold text-[#17243a]">
                                    All Bookings
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    View, search and update customer reservations.
                                </p>
                            </div>

                            <span className="w-fit rounded-lg bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
                                Booking Overview
                            </span>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Bookings
                                        </p>
                                        <h3 className="mt-2 text-3xl font-bold text-[#17243a]">
                                            {totalBookings}
                                        </h3>
                                    </div>
                                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                        <ClipboardList size={23} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Pending on This Page
                                        </p>
                                        <h3 className="mt-2 text-3xl font-bold text-amber-600">
                                            {pendingBookings}
                                        </h3>
                                    </div>
                                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                                        <CalendarDays size={23} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Confirmed on This Page
                                        </p>
                                        <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                                            {confirmedBookings}
                                        </h3>
                                    </div>
                                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                        <Plane size={23} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                            <div className="mb-4">
                                <h3 className="font-bold text-[#17243a]">
                                    Search Bookings
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Search by customer name, phone, email or booking reference.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSearch}
                                className="flex flex-col gap-3 sm:flex-row"
                            >
                                <div className="relative min-w-0 flex-1">
                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search bookings..."
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#17243a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#243956]"
                                >
                                    Search
                                </button>

                                <button
                                    type="button"
                                    onClick={resetSearch}
                                    className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Reset
                                </button>
                            </form>
                        </div>

                        {/* Bookings Table */}
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center">
                                <div>
                                    <h3 className="font-bold text-[#17243a]">
                                        Booking Records
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Showing {bookings.from ?? 0}–{bookings.to ?? 0} of {bookings.total} bookings
                                    </p>
                                </div>
                                <span className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                    Page {bookings.current_page} of {bookings.last_page}
                                </span>
                            </div>

                            {bookings.data.length === 0 ? (
                                <div className="px-5 py-16 text-center">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <ClipboardList size={27} />
                                    </div>
                                    <h4 className="font-semibold text-[#17243a]">
                                        No bookings found
                                    </h4>
                                    <p className="mt-1 text-sm text-slate-500">
                                        No booking records match your search.
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full min-w-[1050px] text-left">
                                        <thead className="bg-slate-50">
                                            <tr className="text-xs uppercase tracking-wide text-slate-500">
                                                <th className="px-5 py-4 font-semibold">Booking</th>
                                                <th className="px-5 py-4 font-semibold">Customer</th>
                                                <th className="px-5 py-4 font-semibold">Service</th>
                                                <th className="px-5 py-4 font-semibold">Travel Details</th>
                                                <th className="px-5 py-4 font-semibold">Passengers</th>
                                                <th className="px-5 py-4 font-semibold">Status</th>
                                                <th className="px-5 py-4 font-semibold">Submitted</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100">
                                            {bookings.data.map((booking) => (
                                                <tr
                                                    key={booking.id}
                                                    className="transition hover:bg-slate-50/80"
                                                >
                                                    <td className="px-5 py-5">
                                                        <p className="font-bold text-[#17243a]">
                                                            {booking.booking_reference}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-400">
                                                            ID: {booking.id}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="flex items-center gap-2 font-semibold text-slate-700">
                                                            <User size={14} className="text-slate-400" />
                                                            {booking.full_name}
                                                        </p>
                                                        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                            <Phone size={13} />
                                                            {booking.phone}
                                                        </p>
                                                        {booking.email && (
                                                            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                                                <Mail size={13} />
                                                                {booking.email}
                                                            </p>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="max-w-[180px] text-sm font-medium text-slate-700">
                                                            {booking.service_type}
                                                        </p>
                                                        <span className="mt-2 inline-block rounded-md bg-slate-100 px-2 py-1 text-xs capitalize text-slate-600">
                                                            {booking.trip_type}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="flex items-center gap-2 text-sm text-slate-700">
                                                            <MapPin size={14} className="text-slate-400" />
                                                            {booking.airport}
                                                        </p>
                                                        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                            <CalendarDays size={13} />
                                                            {formatDate(booking.travel_date)}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Flight: {booking.flight_number || '—'}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5 text-sm font-medium text-slate-700">
                                                        {booking.passenger_count}
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <div className="space-y-2">
                                                            <span
                                                                className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${
                                                                    statusStyles[booking.status] ??
                                                                    'bg-slate-100 text-slate-600'
                                                                }`}
                                                            >
                                                                {booking.status}
                                                            </span>

                                                            <select
                                                                value={booking.status}
                                                                disabled={updatingId === booking.id}
                                                                onChange={(event) =>
                                                                    updateStatus(booking.id, event.target.value)
                                                                }
                                                                className="block w-32 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-amber-500 disabled:opacity-50"
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="confirmed">Confirmed</option>
                                                                <option value="completed">Completed</option>
                                                                <option value="cancelled">Cancelled</option>
                                                            </select>

                                                            {updatingId === booking.id && (
                                                                <p className="text-[11px] text-amber-600">
                                                                    Updating...
                                                                </p>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5 text-xs text-slate-500">
                                                        {formatDateTime(booking.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            {bookings.last_page > 1 && (
                                <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row">
                                    <p className="text-xs text-slate-500">
                                        Page {bookings.current_page} of {bookings.last_page}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-center gap-1">
                                        {bookings.links.map((link, index) => {
                                            const label = link.label
                                                .replace('&laquo;', '‹')
                                                .replace('&raquo;', '›');

                                            const isPrevious = index === 0;
                                            const isNext = index === bookings.links.length - 1;

                                            return link.url ? (
                                                <button
                                                    key={`${index}-${link.label}`}
                                                    type="button"
                                                    onClick={() =>
                                                        router.visit(link.url!, {
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                        })
                                                    }
                                                    className={`flex min-h-9 min-w-9 items-center justify-center rounded-lg px-3 text-xs font-semibold transition ${
                                                        link.active
                                                            ? 'bg-[#17243a] text-white'
                                                            : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    {isPrevious ? (
                                                        <ChevronLeft size={16} />
                                                    ) : isNext ? (
                                                        <ChevronRight size={16} />
                                                    ) : (
                                                        label
                                                    )}
                                                </button>
                                            ) : (
                                                <span
                                                    key={`${index}-${link.label}`}
                                                    className="flex min-h-9 min-w-9 items-center justify-center rounded-lg px-3 text-xs text-slate-300"
                                                >
                                                    {isPrevious ? (
                                                        <ChevronLeft size={16} />
                                                    ) : isNext ? (
                                                        <ChevronRight size={16} />
                                                    ) : (
                                                        label
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="pb-2 text-center text-xs text-slate-400">
                            © {new Date().getFullYear()} SAWBAN Airport Protocol Services. All rights reserved.
                        </div>
                    </div>
                </main>
            </div>
        
        </>
    );
}