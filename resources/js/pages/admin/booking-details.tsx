
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
    Hash,
    UsersRound,
    MessageSquare,
    Clock,
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

type Props = {
    booking: Booking;
};

export default function BookingDetails({ booking }: Props) {
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
            <Head title="Booking Details" />

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
                                className="flex items-center gap-3 rounded-xl bg-[#d5ad62] px-4 py-3 text-sm font-bold text-[#101d35] shadow-lg"
                            >
                                <ClipboardList size={19} />
                                Booking Management
                            </Link>

                            <Link
                                href="/admin/customers"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
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

                            {/* Page Header */}
                            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <Link
                                        href="/admin/bookings"
                                        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#c49a50]"
                                    >
                                        <ArrowLeft size={17} />
                                        Back to Bookings
                                    </Link>

                                    <h1 className="text-2xl font-bold text-[#101d35] sm:text-3xl">
                                        Booking Details
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Complete booking and customer information
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white px-5 py-3 shadow-sm">
                                    <p className="text-xs text-slate-400">
                                        Booking Status
                                    </p>
                                    <span className={`mt-2 inline-block rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            {/* Booking Reference */}
                            <div className="mb-6 rounded-2xl bg-[#101d35] p-6 text-white shadow-sm">
                                <p className="text-sm text-slate-300">
                                    Booking Reference
                                </p>
                                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                                    <h2 className="text-2xl font-extrabold tracking-wide text-[#d5ad62] sm:text-3xl">
                                        {booking.booking_reference}
                                    </h2>
                                    <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200">
                                        Booking ID: #{booking.id}
                                    </span>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-slate-100 p-6">
                                    <UserRound className="text-[#c49a50]" size={22} />
                                    <div>
                                        <h2 className="text-lg font-bold text-[#101d35]">
                                            Customer Information
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Personal contact details
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-6 p-6 sm:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <UserRound className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Full Name</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.full_name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Phone Number</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:col-span-2">
                                        <Mail className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Email Address</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.email || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Travel Information */}
                            <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-slate-100 p-6">
                                    <Plane className="text-[#c49a50]" size={22} />
                                    <div>
                                        <h2 className="text-lg font-bold text-[#101d35]">
                                            Travel Information
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Flight and service details
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-6 p-6 sm:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <ClipboardList className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Service Type</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.service_type}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Plane className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Trip Type</p>
                                            <p className="font-semibold capitalize text-slate-700">
                                                {booking.trip_type}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Airport</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.airport}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Travel Date</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.travel_date || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Hash className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Flight Number</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.flight_number || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <UsersRound className="text-[#c49a50]" size={19} />
                                        <div>
                                            <p className="text-xs text-slate-400">Passenger Count</p>
                                            <p className="font-semibold text-slate-700">
                                                {booking.passenger_count}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Message */}
                            <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-slate-100 p-6">
                                    <MessageSquare className="text-[#c49a50]" size={22} />
                                    <div>
                                        <h2 className="text-lg font-bold text-[#101d35]">
                                            Customer Message
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Additional instructions or requests
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                                        {booking.message || 'No additional message provided.'}
                                    </p>
                                </div>
                            </div>

                            {/* Submission Information */}
                            <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm">
                                <Clock className="text-[#c49a50]" size={21} />
                                <div>
                                    <p className="text-xs text-slate-400">
                                        Booking Submitted
                                    </p>
                                    <p className="font-semibold text-slate-700">
                                        {booking.created_at
                                            ? new Date(booking.created_at).toLocaleString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
