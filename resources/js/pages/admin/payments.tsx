import { useState, type FormEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    CreditCard,
    Search,
    RefreshCw,
    Bell,
    Menu,
    DollarSign,
    CheckCircle,
    Clock,
    Plus,
    X,
    UserRound,
} from 'lucide-react';

type Booking = {
    id: number;
    booking_reference: string;
    full_name: string;
    phone: string;
    service_type: string;
};

type Payment = {
    id: number;
    booking_id: number;
    amount: string | number;
    payment_method: string;
    status: 'paid' | 'unpaid';
    transaction_reference: string | null;
    notes: string | null;
    created_at: string;
    booking: Booking | null;
};

type PaginatedPayments = {
    data: Payment[];
    current_page: number;
    last_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

type Props = {
    payments: PaginatedPayments;
    filters: {
        search: string | null;
    };
    availableBookings: Booking[];
};

export default function Payments({ payments, filters, availableBookings }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showForm, setShowForm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [form, setForm] = useState({
        booking_id: '',
        amount: '',
        payment_method: 'cash',
        transaction_reference: '',
        notes: '',
    });

    const totalPaid = payments.data
        .filter((payment) => payment.status === 'paid')
        .reduce((sum, payment) => sum + Number(payment.amount), 0);

    const totalUnpaid = payments.data
        .filter((payment) => payment.status === 'unpaid')
        .reduce((sum, payment) => sum + Number(payment.amount), 0);

    const formatAmount = (amount: number | string) =>
        `৳ ${Number(amount).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    const searchPayments = (e: FormEvent) => {
        e.preventDefault();

        router.get(
            '/admin/payments',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const refreshPayments = () => {
        router.get(
            '/admin/payments',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const createPayment = (e: FormEvent) => {
        e.preventDefault();

        setProcessing(true);

        router.post('/admin/payments', form, {
            preserveScroll: true,
            onSuccess: () => {
                setForm({
                    booking_id: '',
                    amount: '',
                    payment_method: 'cash',
                    transaction_reference: '',
                    notes: '',
                });
                setShowForm(false);
            },
            onFinish: () => setProcessing(false),
        });
    };

    const updateStatus = (payment: Payment, status: 'paid' | 'unpaid') => {
        router.patch(
            `/admin/payments/${payment.id}/status`,
            { status },
            {
                preserveScroll: true,
            },
        );
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
        },
        {
            label: 'Payment Management',
            icon: CreditCard,
            href: '/admin/payments',
            active: true,
        },
        {
            label: 'Protocol Staff',
            icon: UserRound,
            href: '/admin/protocol-staff',
        },
    ];

    return (
        <>
            <Head title="Payment Management" />

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
                    className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:col-start-1 lg:row-start-1 lg:h-screen ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
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

                    {/* Admin Profile - Bottom */}
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
                    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-5 py-5 md:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-gray-500 lg:hidden"
                            >
                                <Menu size={22} />
                            </button>

                            <div>
                                <h2 className="text-xl font-bold text-[#101d35] md:text-2xl">
                                    Payment Management
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Manage customer payments and records
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={refreshPayments}
                                className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-100"
                                title="Refresh"
                            >
                                <RefreshCw size={19} />
                            </button>

                            <button
                                className="rounded-lg border border-gray-200 p-2.5 text-gray-600"
                                title="Notifications"
                            >
                                <Bell size={19} />
                            </button>
                        </div>
                    </header>

                    <div className="space-y-6 p-5 md:p-8">

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Total Payment Records
                                        </p>
                                        <h3 className="mt-3 text-3xl font-extrabold text-[#101d35]">
                                            {payments.total}
                                        </h3>
                                    </div>
                                    <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
                                        <CreditCard size={25} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Paid on This Page
                                        </p>
                                        <h3 className="mt-3 text-2xl font-extrabold text-green-600">
                                            {formatAmount(totalPaid)}
                                        </h3>
                                    </div>
                                    <div className="rounded-xl bg-green-50 p-4 text-green-600">
                                        <CheckCircle size={25} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Unpaid on This Page
                                        </p>
                                        <h3 className="mt-3 text-2xl font-extrabold text-orange-500">
                                            {formatAmount(totalUnpaid)}
                                        </h3>
                                    </div>
                                    <div className="rounded-xl bg-orange-50 p-4 text-orange-500">
                                        <Clock size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#101d35]">
                                    All Payments
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    View and manage booking payments
                                </p>
                            </div>

                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="flex items-center gap-2 rounded-xl bg-[#101d35] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1b3155]"
                            >
                                {showForm ? <X size={18} /> : <Plus size={18} />}
                                {showForm ? 'Close Form' : 'Add Payment'}
                            </button>
                        </div>

                        {/* Add Payment Form */}
                        {showForm && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="mb-5 text-lg font-bold text-[#101d35]">
                                    Create Full Payment Record
                                </h3>

                                <form onSubmit={createPayment} className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Select Booking *
                                        </label>

                                        <select
                                            required
                                            value={form.booking_id}
                                            onChange={(e) => setForm({ ...form, booking_id: e.target.value })}
                                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#c49a50] focus:ring-2 focus:ring-[#c49a50]/20"
                                        >
                                            <option value="">Select Booking Reference & Customer</option>

                                            {availableBookings.map((booking) => (
                                                <option key={booking.id} value={booking.id}>
                                                    {booking.booking_reference} — {booking.full_name} ({booking.phone})
                                                </option>
                                            ))}
                                        </select>

                                        {availableBookings.length === 0 && (
                                            <p className="mt-2 text-xs text-orange-600">
                                                No bookings available for new payment records.
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Full Payment Amount *
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            required
                                            value={form.amount}
                                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                            placeholder="Enter full amount"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#c49a50] focus:ring-2 focus:ring-[#c49a50]/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Payment Method *
                                        </label>
                                        <select
                                            required
                                            value={form.payment_method}
                                            onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#c49a50]"
                                        >
                                            <option value="cash">Cash</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="mobile_banking">Mobile Banking</option>
                                            <option value="card">Card</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Transaction Reference
                                        </label>
                                        <input
                                            type="text"
                                            value={form.transaction_reference}
                                            onChange={(e) => setForm({ ...form, transaction_reference: e.target.value })}
                                            placeholder="Optional reference"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#c49a50]"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Notes
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.notes}
                                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                            placeholder="Additional payment information"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#c49a50]"
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-3 md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={processing || availableBookings.length === 0}
                                            className="rounded-xl bg-[#c49a50] px-6 py-3 font-bold text-[#101d35] transition hover:bg-[#d4ad69] disabled:opacity-50"
                                        >
                                            {processing ? 'Saving...' : 'Save Payment'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-4 text-xs text-gray-500">
                                    New payment records are created with Unpaid status. Mark them Paid after receiving the full amount.
                                </p>
                            </div>
                        )}

                        {/* Search */}
                        <form
                            onSubmit={searchPayments}
                            className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search customer, phone or booking reference..."
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#c49a50]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-xl bg-[#101d35] px-6 py-3 font-semibold text-white transition hover:bg-[#1b3155]"
                            >
                                Search
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    router.get('/admin/payments');
                                }}
                                className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </form>

                        {/* Payments Table */}
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1050px] text-left">
                                    <thead className="bg-[#101d35] text-xs uppercase tracking-wider text-white">
                                        <tr>
                                            <th className="px-5 py-4">Booking Reference</th>
                                            <th className="px-5 py-4">Customer</th>
                                            <th className="px-5 py-4">Amount</th>
                                            <th className="px-5 py-4">Method</th>
                                            <th className="px-5 py-4">Transaction Ref.</th>
                                            <th className="px-5 py-4">Status</th>
                                            <th className="px-5 py-4">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {payments.data.length > 0 ? (
                                            payments.data.map((payment) => (
                                                <tr key={payment.id} className="transition hover:bg-gray-50">

                                                    <td className="px-5 py-4">
                                                        <Link
                                                            href={payment.booking ? `/admin/bookings/${payment.booking.id}` : '/admin/bookings'}
                                                            className="font-bold text-[#101d35] hover:text-[#c49a50]"
                                                        >
                                                            {payment.booking?.booking_reference || `Booking #${payment.booking_id}`}
                                                        </Link>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <p className="font-semibold text-gray-800">
                                                            {payment.booking?.full_name || 'Unknown Customer'}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {payment.booking?.phone || '—'}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-4 font-bold text-[#101d35]">
                                                        {formatAmount(payment.amount)}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-gray-600">
                                                        {payment.payment_method.replaceAll('_', ' ')}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-gray-600">
                                                        {payment.transaction_reference || '—'}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                                payment.status === 'paid'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-orange-100 text-orange-700'
                                                            }`}
                                                        >
                                                            {payment.status.toUpperCase()}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <select
                                                            value={payment.status}
                                                            onChange={(e) =>
                                                                updateStatus(
                                                                    payment,
                                                                    e.target.value as 'paid' | 'unpaid',
                                                                )
                                                            }
                                                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-[#c49a50]"
                                                        >
                                                            <option value="unpaid">Unpaid</option>
                                                            <option value="paid">Paid</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="px-5 py-16 text-center">
                                                    <DollarSign className="mx-auto mb-3 text-gray-300" size={35} />
                                                    <p className="font-semibold text-gray-600">
                                                        No payment records found
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-400">
                                                        Add a payment record to get started
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">
                                <p className="text-sm text-gray-500">
                                    Showing {payments.data.length} of {payments.total} payments
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {payments.links.map((link, index) => (
                                        <button
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url, {}, {
                                                preserveScroll: true,
                                                preserveState: true,
                                            })}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`rounded-lg border px-3 py-2 text-sm ${
                                                link.active
                                                    ? 'border-[#101d35] bg-[#101d35] text-white'
                                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            } disabled:cursor-not-allowed disabled:opacity-40`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}