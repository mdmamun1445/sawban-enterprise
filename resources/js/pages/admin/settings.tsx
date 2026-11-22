
import { Head, Link, useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    CreditCard,
    UserRound,
    Settings,
    Save,
    Car,
    DollarSign,
    Plane,
    ArrowLeft,
} from 'lucide-react';
import type { FormEvent } from 'react';

interface PricingSettings {
    private_car_rate: number;
    noah_rate: number;
    hiace_rate: number;
    hearse_rate: number;
    usd_rate: number;
    basic_plan_price: number;
    standard_plan_price: number;
    premium_plan_price: number;
}

interface Props {
    settings: PricingSettings;
}

export default function SettingsPage({ settings }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        private_car_rate: Number(settings.private_car_rate),
        noah_rate: Number(settings.noah_rate),
        hiace_rate: Number(settings.hiace_rate),
        hearse_rate: Number(settings.hearse_rate),
        usd_rate: Number(settings.usd_rate),
        basic_plan_price: Number(settings.basic_plan_price),
        standard_plan_price: Number(settings.standard_plan_price),
        premium_plan_price: Number(settings.premium_plan_price),
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put('/admin/settings', {
            preserveScroll: true,
        });
    };

    const inputClass =
        'w-full rounded-xl border border-[#d9dce3] bg-white px-4 py-3 text-sm text-[#101D31] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20';

    const labelClass =
        'mb-2 block text-sm font-semibold text-[#263A55]';

    const navItems = [
        {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            label: 'Booking Management',
            href: '/admin/bookings',
            icon: ClipboardList,
        },
        {
            label: 'Customer Management',
            href: '/admin/customers',
            icon: Users,
        },
        {
            label: 'Payment Management',
            href: '/admin/payments',
            icon: CreditCard,
        },
        {
            label: 'Protocol Staff',
            href: '/admin/protocol-staff',
            icon: UserRound,
        },
        {
            label: 'Settings',
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    return (
        <>
            <Head title="Pricing & Currency Settings" />

            <div className="flex min-h-screen bg-[#F7F4EC]">
                {/* Sidebar */}
                <aside className="hidden w-72 shrink-0 flex-col bg-[#101D31] text-white lg:flex">
                    <div className="border-b border-white/10 px-7 py-7">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A45C] text-[#101D31]">
                                <Plane size={23} />
                            </div>

                            <div>
                                <h1 className="text-lg font-bold tracking-wide">
                                    SAWBAN
                                </h1>
                                <p className="text-[10px] tracking-[2px] text-[#D8C39A]">
                                    ADMINISTRATION
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-7">
                        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-white/40">
                            Main Menu
                        </p>

                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = item.label === 'Settings';

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                            active
                                                ? 'bg-[#C9A45C] text-[#101D31]'
                                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        <Icon size={19} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto border-t border-white/10 p-6">
                        <p className="text-xs text-white/50">
                            SAWBAN AIRPORT PROTOCOL SERVICES
                        </p>
                        <p className="mt-1 text-[10px] text-[#D8C39A]">
                            Management System
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="min-w-0 flex-1">
                    {/* Header */}
                    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e7e2d7] bg-white px-5 py-5 md:px-9">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Admin</span>
                                <span>/</span>
                                <span className="text-[#C9A45C]">Settings</span>
                            </div>

                            <h2 className="mt-2 text-xl font-bold text-[#101D31] md:text-2xl">
                                Pricing & Currency Settings
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your service prices and vehicle rates.
                            </p>
                        </div>

                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 rounded-xl border border-[#e5e0d5] px-4 py-2.5 text-sm font-semibold text-[#263A55] transition hover:bg-[#F7F4EC]"
                        >
                            <ArrowLeft size={16} />
                            Dashboard
                        </Link>
                    </header>

                    <div className="mx-auto max-w-5xl space-y-6 p-5 md:p-9">
                        {/* Information */}
                        <div className="rounded-2xl border border-[#D8C39A] bg-[#fffaf0] p-5">
                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-[#C9A45C]/20 p-3 text-[#8b6a2e]">
                                    <Settings size={21} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#101D31]">
                                        Pricing Configuration
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#596579]">
                                        Update the rates below. These settings
                                        will be used for future booking
                                        calculations. Existing bookings should
                                        retain their original price snapshots.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Vehicle Rates */}
                            <section className="overflow-hidden rounded-2xl border border-[#e8e2d7] bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-[#eee9df] px-6 py-5">
                                    <div className="rounded-xl bg-[#101D31] p-3 text-[#D8C39A]">
                                        <Car size={21} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#101D31]">
                                            Vehicle Rates
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Price per kilometer in BDT
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 p-6 sm:grid-cols-2">
                                    <div>
                                        <label className={labelClass}>
                                            Private Car (BDT / KM)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.private_car_rate}
                                            onChange={(e) =>
                                                setData('private_car_rate', Number(e.target.value))
                                            }
                                        />
                                        {errors.private_car_rate && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.private_car_rate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Noah (BDT / KM)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.noah_rate}
                                            onChange={(e) =>
                                                setData('noah_rate', Number(e.target.value))
                                            }
                                        />
                                        {errors.noah_rate && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.noah_rate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            HiAce (BDT / KM)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.hiace_rate}
                                            onChange={(e) =>
                                                setData('hiace_rate', Number(e.target.value))
                                            }
                                        />
                                        {errors.hiace_rate && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.hiace_rate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Hearse / Dead Body Transport (BDT / KM)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.hearse_rate}
                                            onChange={(e) =>
                                                setData('hearse_rate', Number(e.target.value))
                                            }
                                        />
                                        {errors.hearse_rate && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.hearse_rate}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Currency */}
                            <section className="overflow-hidden rounded-2xl border border-[#e8e2d7] bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-[#eee9df] px-6 py-5">
                                    <div className="rounded-xl bg-[#101D31] p-3 text-[#D8C39A]">
                                        <DollarSign size={21} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#101D31]">
                                            Currency Exchange
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Set the BDT to USD conversion rate
                                        </p>
                                    </div>
                                </div>

                                <div className="max-w-md p-6">
                                    <label className={labelClass}>
                                        1 USD = How Many BDT?
                                    </label>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        className={inputClass}
                                        value={data.usd_rate}
                                        onChange={(e) =>
                                            setData('usd_rate', Number(e.target.value))
                                        }
                                    />
                                    {errors.usd_rate && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.usd_rate}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs text-gray-500">
                                        Current sample value: 1 USD = 120 BDT.
                                        You can change this value according to
                                        your preferred exchange rate.
                                    </p>
                                </div>
                            </section>

                            {/* Plan Prices */}
                            <section className="overflow-hidden rounded-2xl border border-[#e8e2d7] bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-[#eee9df] px-6 py-5">
                                    <div className="rounded-xl bg-[#101D31] p-3 text-[#D8C39A]">
                                        <Plane size={21} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-[#101D31]">
                                            Airport Service Plan Prices
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Price per passenger in BDT
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 p-6 sm:grid-cols-3">
                                    <div>
                                        <label className={labelClass}>
                                            Basic Plan (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.basic_plan_price}
                                            onChange={(e) =>
                                                setData('basic_plan_price', Number(e.target.value))
                                            }
                                        />
                                        {errors.basic_plan_price && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.basic_plan_price}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Standard Plan (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.standard_plan_price}
                                            onChange={(e) =>
                                                setData('standard_plan_price', Number(e.target.value))
                                            }
                                        />
                                        {errors.standard_plan_price && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.standard_plan_price}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Premium Plan (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className={inputClass}
                                            value={data.premium_plan_price}
                                            onChange={(e) =>
                                                setData('premium_plan_price', Number(e.target.value))
                                            }
                                        />
                                        {errors.premium_plan_price && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.premium_plan_price}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Save Button */}
                            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e8e2d7] bg-white p-5 shadow-sm">
                                <div>
                                    <p className="font-semibold text-[#101D31]">
                                        Save Configuration
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Changes will apply to future pricing calculations.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#101D31] px-6 py-3 text-sm font-bold text-[#D8C39A] transition hover:bg-[#263A55] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={17} />
                                    {processing ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
