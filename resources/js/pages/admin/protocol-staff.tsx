
import { useState, type FormEvent } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    CreditCard,
    Search,
    Bell,
    Menu,
    X,
    RefreshCw,
    Phone,
    Mail,
    UserRound,
    ChevronLeft,
    ChevronRight,
    Plus,
    Pencil,
    Trash2,
    BriefcaseBusiness,
    UserCheck,
    UserX,
} from 'lucide-react';

type Staff = {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    position: string;
    status: 'active' | 'inactive';
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type StaffPaginator = {
    data: Staff[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

type Props = {
    staff: StaffPaginator;
    filters: {
        search: string | null;
    };
    stats: {
        total: number;
        active: number;
        inactive: number;
    };
};

export default function ProtocolStaff({ staff, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        phone: '',
        email: '',
        position: '',
        status: 'active' as 'active' | 'inactive',
    });

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        router.get(
            '/admin/protocol-staff',
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
            '/admin/protocol-staff',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const refreshStaff = () => {
        router.get(
            '/admin/protocol-staff',
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const openAddModal = () => {
        setEditingStaff(null);
        reset();
        setModalOpen(true);
    };

    const openEditModal = (member: Staff) => {
        setEditingStaff(member);

        setData({
            name: member.name,
            phone: member.phone,
            email: member.email || '',
            position: member.position,
            status: member.status,
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingStaff(null);
        reset();
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editingStaff) {
            put(`/admin/protocol-staff/${editingStaff.id}`, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/protocol-staff', {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteStaff = (member: Staff) => {
        if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
            router.delete(`/admin/protocol-staff/${member.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Protocol Staff Management" />

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

                            <p className="mt-1 text-[10px] font-semibold tracking-[3px] text-[#d5ad62]">
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
                        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-[#d5ad62]">
                            Main Menu
                        </p>

                        <nav className="space-y-2">

                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <LayoutDashboard size={19} />
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/bookings"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <ClipboardList size={19} />
                                Booking Management
                            </Link>

                            <Link
                                href="/admin/customers"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <Users size={19} />
                                Customer Management
                            </Link>

                            <Link
                                href="/admin/payments"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <CreditCard size={19} />
                                Payment Management
                            </Link>

                            <Link
                                href="/admin/protocol-staff"
                                className="flex items-center gap-3 rounded-xl bg-[#d5ad62] px-4 py-3 text-sm font-semibold text-[#101d35] shadow-lg"
                            >
                                <BriefcaseBusiness size={19} />
                                Protocol Staff
                            </Link>

                        </nav>
                    </div>

                    {/* Admin Profile */}
                    <div className="mt-auto border-t border-white/10 p-6">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d5ad62] text-[#101d35]">
                                <UserRound size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    SAWBAN Admin
                                </p>

                                <p className="text-xs text-[#d5ad62]">
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
                                    Protocol Staff Management
                                </h2>

                                <p className="hidden text-xs text-slate-500 sm:block">
                                    Manage your airport protocol staff
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">

                            <button
                                onClick={refreshStaff}
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
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-[#101d35]">
                                    Protocol Staff
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Add, manage and monitor your protocol team.
                                </p>
                            </div>

                            <button
                                onClick={openAddModal}
                                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#101d35] px-5 text-sm font-semibold text-white transition hover:bg-[#1b3155]"
                            >
                                <Plus size={18} />
                                Add New Staff
                            </button>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Staff
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold text-[#101d35]">
                                            {stats.total}
                                        </h3>
                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Users size={26} />
                                    </div>
                                </div>

                                <p className="mt-3 text-xs text-slate-400">
                                    All registered protocol staff
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Active Staff
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold text-[#101d35]">
                                            {stats.active}
                                        </h3>
                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                                        <UserCheck size={26} />
                                    </div>
                                </div>

                                <p className="mt-3 text-xs text-slate-400">
                                    Currently active team members
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Inactive Staff
                                        </p>

                                        <h3 className="mt-3 text-3xl font-bold text-[#101d35]">
                                            {stats.inactive}
                                        </h3>
                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                        <UserX size={26} />
                                    </div>
                                </div>

                                <p className="mt-3 text-xs text-slate-400">
                                    Currently inactive team members
                                </p>
                            </div>

                        </div>

                        {/* Staff Table Section */}
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

                            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h3 className="text-lg font-bold text-[#101d35]">
                                        All Protocol Staff
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Staff information and employment status
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
                                            placeholder="Search staff..."
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
                                <table className="w-full min-w-[950px] text-left">

                                    <thead className="bg-[#f8f9fc]">
                                        <tr className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Staff Member</th>
                                            <th className="px-6 py-4">Contact Details</th>
                                            <th className="px-6 py-4">Position</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {staff.data.length > 0 ? (
                                            staff.data.map((member) => (
                                                <tr
                                                    key={member.id}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">

                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#101d35] text-sm font-bold text-[#d5ad62]">
                                                                {member.name.charAt(0).toUpperCase()}
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-bold text-[#101d35]">
                                                                    {member.name}
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-400">
                                                                    Staff ID: #{member.id}
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">

                                                            <p className="flex items-center gap-2 text-sm text-slate-600">
                                                                <Phone size={14} className="text-[#c49a4a]" />
                                                                {member.phone}
                                                            </p>

                                                            <p className="flex items-center gap-2 text-sm text-slate-500">
                                                                <Mail size={14} className="text-[#c49a4a]" />
                                                                {member.email || 'No email'}
                                                            </p>

                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className="text-sm font-medium text-slate-700">
                                                            {member.position}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${
                                                                member.status === 'active'
                                                                    ? 'bg-green-50 text-green-700'
                                                                    : 'bg-red-50 text-red-700'
                                                            }`}
                                                        >
                                                            {member.status === 'active' ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center justify-end gap-2">

                                                            <button
                                                                onClick={() => openEditModal(member)}
                                                                title="Edit Staff"
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#d5ad62] hover:bg-amber-50 hover:text-[#a77b30]"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>

                                                            <button
                                                                onClick={() => deleteStaff(member)}
                                                                title="Delete Staff"
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-500 transition hover:border-red-200 hover:bg-red-50"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>

                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-16 text-center"
                                                >
                                                    <BriefcaseBusiness
                                                        size={38}
                                                        className="mx-auto mb-3 text-slate-300"
                                                    />

                                                    <p className="font-semibold text-slate-600">
                                                        No staff found
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-400">
                                                        Add your first protocol staff member to get started.
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
                                    Showing {staff.from ?? 0} to {staff.to ?? 0} of {staff.total} staff members
                                </p>

                                <div className="flex flex-wrap items-center gap-1">
                                    {staff.links.map((link, index) => {
                                        const isPrevious = index === 0;
                                        const isNext = index === staff.links.length - 1;

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

            {/* Add / Edit Staff Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 p-4">

                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <h3 className="text-lg font-bold text-[#101d35]">
                                    {editingStaff ? 'Edit Staff Member' : 'Add New Staff'}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Enter protocol staff information below.
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-6">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Full Name *
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter staff name"
                                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#d5ad62] focus:ring-2 focus:ring-[#d5ad62]/20"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Phone Number *
                                </label>

                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Enter phone number"
                                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#d5ad62] focus:ring-2 focus:ring-[#d5ad62]/20"
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter email address (optional)"
                                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#d5ad62] focus:ring-2 focus:ring-[#d5ad62]/20"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Position *
                                </label>

                                <input
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    placeholder="e.g. Airport Protocol Officer"
                                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#d5ad62] focus:ring-2 focus:ring-[#d5ad62]/20"
                                />

                                {errors.position && (
                                    <p className="mt-1 text-xs text-red-500">{errors.position}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Staff Status *
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#d5ad62] focus:ring-2 focus:ring-[#d5ad62]/20"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-500">{errors.status}</p>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 rounded-xl bg-[#101d35] px-6 text-sm font-semibold text-white transition hover:bg-[#1b3155] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : editingStaff
                                            ? 'Update Staff'
                                            : 'Save Staff'}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
