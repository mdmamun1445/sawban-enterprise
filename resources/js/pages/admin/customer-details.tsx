
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    LayoutDashboard,
    ClipboardList,
    Users,
    UserRound,
    Phone,
    Mail,
    CalendarDays,
    Plane,
    MapPin,
} from 'lucide-react';

type Customer = {
    full_name: string;
    phone: string;
    email: string | null;
    total_bookings: number;
};

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
    status: string;
    created_at: string;
};

type Props = {
    customer: Customer;
    bookings: Booking[];
};

export default function CustomerDetails({ customer, bookings }: Props) {
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'completed':
                return 'bg-blue-100 text-blue-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-amber-100 text-amber-700';
        }
    };

    return (
        <>
            <Head title="Customer Details" />

            <div className="min-h-screen w-full bg-[#f4f6fa] lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">

                {/* Admin Sidebar */}
                <aside
                    className="relative flex min-h-screen flex-col text-white lg:sticky lg:top-0 lg:col-start-1 lg:row-start-1 lg:h-screen"
                    style={{ backgroundColor: '#101d35' }}
                >
                    <div className="border-b border-white/10 px-7 py-7">
                        <h2 className="text-xl font-extrabold tracking-wide text-white">
                            SAWBAN
                        </h2>
                        <p className="mt-1 text-xs font-medium tracking-[0.2em] text-[#d5ad62]">
                            ADMIN PANEL
                        </p>
                    </div>

                    <div className="px-5 py-7">
                        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            Main Menu
                        </p>

                        <nav className="space-y-2">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <LayoutDashboard size={19} />
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/bookings"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <ClipboardList size={19} />
                                Booking Management
                            </Link>

                            <Link
                                href="/admin/customers"
                                className="flex items-center gap-3 rounded-xl bg-[#d5ad62] px-4 py-3 text-sm font-bold text-[#101d35] shadow-lg"
                            >
                                <Users size={19} />
                                Customers
                            </Link>
                        </nav>
                    </div>

                    <div className="mt-auto border-t border-white/10 px-7 py-6">
                        <p className="text-sm font-semibold text-white">
                            SAWBAN Admin
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Airport Protocol Services
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="min-w-0 w-full lg:col-start-2 lg:row-start-1">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="mx-auto max-w-7xl">

                            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <Link
                                        href="/admin/customers"
                                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#c49a50]"
                                    >
                                        <ArrowLeft size={17} />
                                        Back to Customers
                                    </Link>

                                    <h1 className="text-2xl font-bold text-[#101d35] sm:text-3xl">
                                        Customer Details
                                    </h1>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Complete customer information and booking history
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#101d35] px-5 py-3 text-white">
                                    <p className="text-xs text-slate-300">Total Bookings</p>
                                    <p className="text-2xl font-bold text-[#d5ad62]">
                                        {customer.total_bookings}
                                    </p>
                                </div>
                            </div>

                            {/* Customer Profile */}
                            <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#101d35] text-[#d5ad62]">
                                        <UserRound size={23} />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-[#101d35]">
                                            {customer.full_name}
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Customer Profile
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Phone Number</p>
                                            <p className="font-semibold text-slate-700">
                                                {customer.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Email Address</p>
                                            <p className="font-semibold text-slate-700">
                                                {customer.email || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking History */}
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-slate-100 p-6">
                                    <ClipboardList className="text-[#c49a50]" size={22} />
                                    <div>
                                        <h2 className="text-lg font-bold text-[#101d35]">
                                            Booking History
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            All bookings submitted by this customer
                                        </p>
                                    </div>
                                </div>

                                {bookings.length === 0 ? (
                                    <div className="p-10 text-center text-slate-500">
                                        No booking history found.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[900px] text-left">
                                            <thead className="bg-slate-50">
                                                <tr className="text-xs uppercase tracking-wider text-slate-500">
                                                    <th className="px-6 py-4">Booking Reference</th>
                                                    <th className="px-6 py-4">Service</th>
                                                    <th className="px-6 py-4">Travel Details</th>
                                                    <th className="px-6 py-4">Passengers</th>
                                                    <th className="px-6 py-4">Status</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-slate-100">
                                                {bookings.map((booking) => (
                                                    <tr key={booking.id} className="hover:bg-slate-50">
                                                        <td className="px-6 py-5">
                                                            <Link
                                                                href={`/admin/bookings/${booking.id}`}
                                                                className="font-bold text-[#101d35] transition hover:text-[#c49a50]"
                                                            >
                                                                {booking.booking_reference}
                                                            </Link>

                                                            <p className="mt-1 text-xs text-slate-400">
                                                                {booking.created_at
                                                                    ? new Date(booking.created_at).toLocaleDateString()
                                                                    : 'N/A'}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <p className="font-semibold text-slate-700">
                                                                {booking.service_type}
                                                            </p>
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-2 text-sm text-slate-700">
                                                                <Plane size={15} className="text-[#c49a50]" />
                                                                {booking.trip_type}
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                                                <MapPin size={13} />
                                                                {booking.airport}
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                                                <CalendarDays size={13} />
                                                                {booking.travel_date}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                                                            {booking.passenger_count}
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <span className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(booking.status)}`}>
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
