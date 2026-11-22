
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { dashboard, login } from '@/routes';

const WHATSAPP_NUMBER = '15551234567';
const WHATSAPP_DISPLAY = '+1 555 123 4567 (Demo)';

interface PricingSettings {
    basic_plan_price: number;
    standard_plan_price: number;
    premium_plan_price: number;
    private_car_rate: number;
    noah_rate: number;
    hiace_rate: number;
    hearse_rate: number;
    usd_rate: number;
}

const defaultPricing: PricingSettings = {
    basic_plan_price: 500,
    standard_plan_price: 1000,
    premium_plan_price: 1500,
    private_car_rate: 30,
    noah_rate: 40,
    hiace_rate: 50,
    hearse_rate: 60,
    usd_rate: 120,
};

const content = {
    en: {
        title: 'SAWBAN ENTERPRISE | Premium Airport Assistance',
        description: 'Premium airport assistance, VIP protocol, meet and greet and corporate travel support.',
        nav: ['Home', 'About Us', 'Services', 'Transportation', 'Our Plans', 'Contact'],
        login: 'Admin Login',
        dashboard: 'Dashboard',
        getInTouch: 'GET IN TOUCH',
        heroLabel: 'PREMIUM AIRPORT SERVICES',
        heroTitle: 'Your Journey.',
        heroItalic: 'Our Priority.',
        heroText: 'Experience exceptional airport assistance, personalized meet and greet, and premium protocol services with SAWBAN ENTERPRISE.',
        request: 'REQUEST A SERVICE →',
        explore: 'EXPLORE SERVICES',
        highlights: [
            ['PREMIUM', 'Personalized Experience'],
            ['PROFESSIONAL', 'Dedicated Assistance'],
            ['SEAMLESS', 'Travel Coordination'],
        ],
        galleryLabel: 'AIRPORT EXPERIENCE',
        galleryTitle: 'Experience Our',
        galleryItalic: 'Airport Services.',
        galleryText: 'Discover professional airport assistance designed to make every journey comfortable, convenient and stress-free.',
        galleryItems: [
            ['Airport Meet & Greet', 'Personalized welcome and assistance for arriving passengers.'],
            ['VIP Airport Assistance', 'Dedicated support for distinguished guests and travelers.'],
            ['Arrival & Departure', 'Professional assistance throughout airport procedures.'],
            ['Passenger Assistance', 'Convenient support to make your airport journey easier.'],
        ],
        aboutLabel: 'ABOUT SAWBAN ENTERPRISE',
        aboutTitle: 'Redefining the',
        aboutItalic: 'Airport Experience.',
        aboutText: 'SAWBAN ENTERPRISE is focused on delivering a refined airport assistance experience. From personalized meet and greet to professional protocol support, our goal is to make every journey more comfortable and convenient.',
        aboutButton: 'DISCOVER MORE →',
        aboutSliderLabel: 'OUR COMMITMENT',
        aboutSliderText: 'Professional care at every step of your journey.',
        serviceLabel: 'OUR PREMIUM SERVICES',
        serviceTitle: 'Our Premium',
        serviceItalic: 'Services',
        serviceText: 'Thoughtfully designed airport services for travelers who value comfort, convenience and professional assistance.',
        enquire: 'ENQUIRE NOW →',
        services: [
            ['✈', 'Airport Meet & Greet', 'Personalized airport assistance for a smooth, comfortable and stress-free journey.'],
            ['♛', 'VIP Airport Protocol', 'Premium airport protocol services designed for distinguished guests and executives.'],
            ['◆', 'Fast Track Assistance', 'Dedicated guidance and assistance through airport procedures and formalities.'],
            ['◇', 'Corporate Travel Support', 'Professional airport coordination and travel assistance for corporate clients.'],
            ['▣', 'Luggage Handling', 'Convenient luggage assistance to help passengers manage their baggage with ease.'],
            ['⇄', 'Terminal Transfer', 'Smooth transfer assistance between airport terminals and designated areas.'],
            ['▤', 'On Arrival Visa Support', 'Guidance and assistance with arrival visa-related procedures at the airport.'],
        ],
        transportLabel: 'AIRPORT TRANSPORTATION',
        transportTitle: 'Choose Your',
        transportItalic: 'Transportation.',
        transportText: 'Airport transportation is optional. Select a vehicle if you need one, or continue without transportation.',
        optional: 'OPTIONAL SERVICE',
        noTransport: 'No Transportation Required',
        noTransportText: 'I will arrange my own transportation.',
        vehicleTitle: 'Available Vehicles',
        vehicle: 'Select Your Vehicle',
        destination: 'Destination',
        destinationPlaceholder: 'e.g. Gulshan, Dhaka',
        carTrip: 'Trip Type',
        oneWay: 'One-way',
        roundTrip: 'Round Trip',
        currency: 'Currency',
        distance: 'Estimated One-way Distance (KM)',
        distancePlaceholder: 'Enter distance in KM',
        distanceHelp: 'Enter the estimated one-way road distance. Round trip will automatically calculate double distance.',
        airportOrigin: 'Starting Point',
        quoteRequired: 'Enter distance to calculate',
        carFare: 'Estimated Vehicle Fare',
        fareNotice: 'This is an estimated fare based on the distance you enter. Actual road distance and final fare will be confirmed by our team.',
        planLabel: 'WHAT WE OFFER',
        planTitle: 'Choose Your',
        planItalic: 'Service Plan.',
        planText: 'Select a plan that suits your requirements. Our team will contact you to discuss your service.',
        choosePlan: 'CHOOSE THIS PLAN →',
        selectedPlan: 'Selected Plan',
        selectedPlanText: 'Complete the booking form below to send your request.',
        changePlan: 'You can change your plan before submitting your booking request.',
        perPerson: 'BDT / PERSON',
        planCurrency: 'Plan Currency',
        bookingLabel: 'BOOK YOUR AIRPORT SERVICE',
        bookingTitle: 'Plan Your',
        bookingItalic: 'Journey With Us.',
        bookingText: 'Fill out the form below. Our team will review your request and contact you.',
        fullName: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        serviceType: 'Select Service',
        tripType: 'Airport Trip Type',
        arrival: 'Arrival',
        departure: 'Departure',
        airport: 'Airport',
        travelDate: 'Travel Date',
        flightNumber: 'Flight Number',
        passengers: 'Number of Passengers',
        message: 'Additional Message',
        messagePlaceholder: 'Tell us about your requirements...',
        selectService: 'Choose a service',
        serviceOptions: [
            'Airport Meet & Greet',
            'VIP Airport Protocol',
            'Fast Track Assistance',
            'Corporate Travel Support',
            'Luggage Handling',
            'Terminal Transfer',
            'On Arrival Visa Support',
            'Other',
        ],
        bookingSummary: 'Booking Summary',
        bookingOptions: 'YOUR SELECTION',
        planSubtotal: 'Plan Subtotal',
        estimatedTotal: 'Estimated Total',
        submitBooking: 'SUBMIT BOOKING REQUEST →',
        submitting: 'SUBMITTING...',
        bookingSuccess: 'Your booking request has been submitted successfully! Our team will contact you soon.',
        requiredNote: '* Required fields',
        contactLabel: 'LET’S MAKE YOUR JOURNEY BETTER',
        contactTitle: 'Experience Airport Services with a Difference.',
        contactText: 'Get in touch with our team to discuss your airport assistance requirements.',
        contactButton: 'BOOK YOUR SERVICE →',
        footerText: 'Premium airport assistance and professional protocol services.',
        quickLinks: 'QUICK LINKS',
        administration: 'ADMINISTRATION',
        contactUs: 'CONTACT US',
        whatsappUs: 'CHAT WITH US ON WHATSAPP',
        copyright: 'All rights reserved.',
        tagline: 'LUXURY · COMFORT · EXCELLENCE',
    },

    bn: {
        title: 'SAWBAN ENTERPRISE | প্রিমিয়াম বিমানবন্দর সেবা',
        description: 'প্রিমিয়াম বিমানবন্দর সহায়তা, ভিআইপি প্রোটোকল এবং কর্পোরেট ভ্রমণ সহায়তা।',
        nav: ['হোম', 'আমাদের সম্পর্কে', 'সেবাসমূহ', 'পরিবহন', 'সার্ভিস প্ল্যান', 'যোগাযোগ'],
        login: 'অ্যাডমিন লগইন',
        dashboard: 'ড্যাশবোর্ড',
        getInTouch: 'যোগাযোগ করুন',
        heroLabel: 'প্রিমিয়াম বিমানবন্দর সেবা',
        heroTitle: 'আপনার যাত্রা।',
        heroItalic: 'আমাদের অগ্রাধিকার।',
        heroText: 'SAWBAN ENTERPRISE-এর সঙ্গে উপভোগ করুন উন্নত বিমানবন্দর সহায়তা, ব্যক্তিগত অভ্যর্থনা এবং প্রিমিয়াম প্রোটোকল সেবা।',
        request: 'সেবা নিতে যোগাযোগ করুন →',
        explore: 'সেবাসমূহ দেখুন',
        highlights: [
            ['প্রিমিয়াম', 'ব্যক্তিগত অভিজ্ঞতা'],
            ['পেশাদার', 'নিবেদিত সহায়তা'],
            ['সহজ যাত্রা', 'ভ্রমণ সমন্বয়'],
        ],
        galleryLabel: 'বিমানবন্দরের অভিজ্ঞতা',
        galleryTitle: 'উপভোগ করুন আমাদের',
        galleryItalic: 'বিমানবন্দর সেবাসমূহ।',
        galleryText: 'প্রতিটি যাত্রাকে আরামদায়ক, সুবিধাজনক ও নির্বিঘ্ন করতে আমাদের পেশাদার বিমানবন্দর সেবাসমূহ।',
        galleryItems: [
            ['এয়ারপোর্ট মিট অ্যান্ড গ্রিট', 'আগমনকারী যাত্রীদের জন্য ব্যক্তিগত অভ্যর্থনা ও সহায়তা।'],
            ['ভিআইপি বিমানবন্দর সহায়তা', 'বিশিষ্ট অতিথি ও ভ্রমণকারীদের জন্য বিশেষ সহায়তা।'],
            ['আগমন ও প্রস্থান', 'বিমানবন্দরের বিভিন্ন প্রক্রিয়ায় পেশাদার সহায়তা।'],
            ['যাত্রী সহায়তা', 'আপনার বিমানবন্দর যাত্রাকে সহজ করতে প্রয়োজনীয় সহায়তা।'],
        ],
        aboutLabel: 'SAWBAN ENTERPRISE সম্পর্কে',
        aboutTitle: 'বিমানবন্দরের',
        aboutItalic: 'অভিজ্ঞতায় নতুন মাত্রা।',
        aboutText: 'SAWBAN ENTERPRISE উন্নত মানের বিমানবন্দর সহায়তা প্রদানে প্রতিশ্রুতিবদ্ধ। ব্যক্তিগত অভ্যর্থনা থেকে পেশাদার প্রোটোকল সহায়তা পর্যন্ত, প্রতিটি যাত্রাকে আরও আরামদায়ক ও সহজ করাই আমাদের লক্ষ্য।',
        aboutButton: 'আরও জানুন →',
        aboutSliderLabel: 'আমাদের অঙ্গীকার',
        aboutSliderText: 'আপনার যাত্রার প্রতিটি ধাপে পেশাদার সহায়তা।',
        serviceLabel: 'আমাদের প্রিমিয়াম সেবাসমূহ',
        serviceTitle: 'আমাদের প্রিমিয়াম',
        serviceItalic: 'সেবাসমূহ',
        serviceText: 'যেসব ভ্রমণকারী আরাম, সুবিধা ও পেশাদার সহায়তাকে গুরুত্ব দেন, তাঁদের জন্য পরিকল্পিত বিমানবন্দর সেবা।',
        enquire: 'বিস্তারিত জানতে →',
        services: [
            ['✈', 'এয়ারপোর্ট মিট অ্যান্ড গ্রিট', 'স্বাচ্ছন্দ্যময় ও নির্বিঘ্ন যাত্রার জন্য ব্যক্তিগত বিমানবন্দর সহায়তা।'],
            ['♛', 'ভিআইপি এয়ারপোর্ট প্রোটোকল', 'বিশিষ্ট অতিথি ও নির্বাহীদের জন্য প্রিমিয়াম বিমানবন্দর প্রোটোকল সেবা।'],
            ['◆', 'ফাস্ট ট্র্যাক সহায়তা', 'বিমানবন্দরের বিভিন্ন প্রক্রিয়া ও আনুষ্ঠানিকতায় বিশেষ নির্দেশনা ও সহায়তা।'],
            ['◇', 'কর্পোরেট ট্রাভেল সাপোর্ট', 'কর্পোরেট গ্রাহকদের জন্য পেশাদার বিমানবন্দর সমন্বয় ও ভ্রমণ সহায়তা।'],
            ['▣', 'লাগেজ হ্যান্ডলিং', 'যাত্রীদের ব্যাগেজ ব্যবস্থাপনায় সহজ ও সুবিধাজনক সহায়তা।'],
            ['⇄', 'টার্মিনাল ট্রান্সফার', 'বিমানবন্দরের বিভিন্ন টার্মিনাল ও নির্ধারিত স্থানে যাতায়াতে সহায়তা।'],
            ['▤', 'অন অ্যারাইভাল ভিসা সাপোর্ট', 'বিমানবন্দরে পৌঁছানোর পর ভিসা-সংক্রান্ত প্রক্রিয়ায় নির্দেশনা ও সহায়তা।'],
        ],
        transportLabel: 'বিমানবন্দর যাতায়াত',
        transportTitle: 'আপনার পছন্দের',
        transportItalic: 'যাতায়াত ব্যবস্থা।',
        transportText: 'গাড়ি নেওয়া সম্পূর্ণ ঐচ্ছিক। প্রয়োজন হলে গাড়ি নির্বাচন করুন, না হলে নিজস্ব যাতায়াত ব্যবস্থা রাখতে পারবেন।',
        optional: 'ঐচ্ছিক সেবা',
        noTransport: 'গাড়ির প্রয়োজন নেই',
        noTransportText: 'আমি নিজেই যাতায়াতের ব্যবস্থা করব।',
        vehicleTitle: 'উপলভ্য গাড়িসমূহ',
        vehicle: 'আপনার গাড়ি নির্বাচন করুন',
        destination: 'গন্তব্য',
        destinationPlaceholder: 'যেমন: গুলশান, ঢাকা',
        carTrip: 'যাতায়াতের ধরন',
        oneWay: 'একমুখী',
        roundTrip: 'যাওয়া ও আসা',
        currency: 'মুদ্রা',
        distance: 'একমুখী আনুমানিক দূরত্ব (কিলোমিটার)',
        distancePlaceholder: 'দূরত্ব লিখুন',
        distanceHelp: 'একমুখী রাস্তার আনুমানিক দূরত্ব লিখুন। রাউন্ড ট্রিপ হলে স্বয়ংক্রিয়ভাবে দ্বিগুণ দূরত্ব হিসাব হবে।',
        airportOrigin: 'শুরুর স্থান',
        quoteRequired: 'দূরত্ব লিখলে হিসাব হবে',
        carFare: 'আনুমানিক গাড়ির ভাড়া',
        fareNotice: 'আপনার দেওয়া দূরত্ব অনুযায়ী এটি আনুমানিক ভাড়া। প্রকৃত রাস্তার দূরত্ব ও চূড়ান্ত ভাড়া আমাদের টিম নিশ্চিত করবে।',
        planLabel: 'আমরা যা প্রদান করি',
        planTitle: 'আপনার পছন্দের',
        planItalic: 'সার্ভিস প্ল্যান।',
        planText: 'আপনার প্রয়োজন অনুযায়ী একটি প্ল্যান নির্বাচন করুন। সেবা সম্পর্কে আলোচনা করতে আমাদের টিম আপনার সঙ্গে যোগাযোগ করবে।',
        choosePlan: 'এই প্ল্যান নির্বাচন করুন →',
        selectedPlan: 'নির্বাচিত প্ল্যান',
        selectedPlanText: 'বুকিং অনুরোধ পাঠাতে নিচের ফর্মটি পূরণ করুন।',
        changePlan: 'বুকিং জমা দেওয়ার আগে চাইলে প্ল্যান পরিবর্তন করতে পারবেন।',
        perPerson: 'BDT / জনপ্রতি',
        planCurrency: 'প্ল্যানের মুদ্রা',
        bookingLabel: 'আপনার বিমানবন্দর সেবা বুক করুন',
        bookingTitle: 'আপনার যাত্রা',
        bookingItalic: 'আমাদের সঙ্গে পরিকল্পনা করুন।',
        bookingText: 'নিচের ফর্মটি পূরণ করুন। আমাদের টিম আপনার অনুরোধ পর্যালোচনা করে যোগাযোগ করবে।',
        fullName: 'আপনার পুরো নাম',
        phone: 'মোবাইল নম্বর',
        email: 'ইমেইল ঠিকানা',
        serviceType: 'সেবা নির্বাচন করুন',
        tripType: 'বিমানবন্দর যাত্রার ধরন',
        arrival: 'আগমন',
        departure: 'প্রস্থান',
        airport: 'বিমানবন্দরের নাম',
        travelDate: 'ভ্রমণের তারিখ',
        flightNumber: 'ফ্লাইট নম্বর',
        passengers: 'যাত্রীর সংখ্যা',
        message: 'অতিরিক্ত তথ্য',
        messagePlaceholder: 'আপনার প্রয়োজনীয়তা সম্পর্কে লিখুন...',
        selectService: 'একটি সেবা নির্বাচন করুন',
        serviceOptions: [
            'এয়ারপোর্ট মিট অ্যান্ড গ্রিট',
            'ভিআইপি এয়ারপোর্ট প্রোটোকল',
            'ফাস্ট ট্র্যাক সহায়তা',
            'কর্পোরেট ট্রাভেল সাপোর্ট',
            'লাগেজ হ্যান্ডলিং',
            'টার্মিনাল ট্রান্সফার',
            'অন অ্যারাইভাল ভিসা সাপোর্ট',
            'অন্যান্য',
        ],
        bookingSummary: 'বুকিংয়ের সারসংক্ষেপ',
        bookingOptions: 'আপনার নির্বাচন',
        planSubtotal: 'প্ল্যানের মোট মূল্য',
        estimatedTotal: 'আনুমানিক সর্বমোট',
        submitBooking: 'বুকিং অনুরোধ জমা দিন →',
        submitting: 'জমা হচ্ছে...',
        bookingSuccess: 'আপনার বুকিং অনুরোধ সফলভাবে জমা হয়েছে! আমাদের টিম শীঘ্রই যোগাযোগ করবে।',
        requiredNote: '* চিহ্নিত তথ্যগুলো পূরণ করা বাধ্যতামূলক',
        contactLabel: 'আপনার যাত্রাকে আরও সুন্দর করে তুলি',
        contactTitle: 'বিমানবন্দর সেবায় উপভোগ করুন ভিন্ন মাত্রা।',
        contactText: 'আপনার বিমানবন্দর সহায়তার প্রয়োজনীয়তা নিয়ে আলোচনা করতে আমাদের সঙ্গে যোগাযোগ করুন।',
        contactButton: 'সেবা বুক করুন →',
        footerText: 'প্রিমিয়াম বিমানবন্দর সহায়তা এবং পেশাদার প্রোটোকল সেবা।',
        quickLinks: 'গুরুত্বপূর্ণ লিংক',
        administration: 'প্রশাসনিক বিভাগ',
        contactUs: 'যোগাযোগ করুন',
        whatsappUs: 'হোয়াটসঅ্যাপে যোগাযোগ করুন',
        copyright: 'সর্বস্বত্ব সংরক্ষিত।',
        tagline: 'বিলাসিতা · আরাম · উৎকর্ষ',
    },
};

const galleryImages = [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1800&q=90',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1800&q=90',
];

const serviceValues = [
    'Airport Meet & Greet',
    'VIP Airport Protocol',
    'Fast Track Assistance',
    'Corporate Travel Support',
    'Luggage Handling',
    'Terminal Transfer',
    'On Arrival Visa Support',
    'Other',
];

const planNames = ['Basic', 'Standard', 'Premium'] as const;

const vehicleOptions = [
    {
        value: 'Private Car',
        label: 'Private Car',
        description: 'New model Toyota Premio / Axio',
        bnDescription: 'নতুন মডেলের টয়োটা প্রিমিও / এক্সিও',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2016-2021_Toyota_Premio.jpg?width=900',
    },
    {
        value: 'Noah',
        label: 'Toyota Noah',
        description: 'New model Toyota Noah for family and group travel',
        bnDescription: 'পরিবার ও গ্রুপের জন্য নতুন মডেলের টয়োটা নোয়া',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Toyota_Noah_X.jpg?width=900',
    },
    {
        value: 'HiAce',
        label: 'Toyota HiAce',
        description: 'Comfortable transportation for larger groups',
        bnDescription: 'বড় গ্রুপের জন্য আরামদায়ক পরিবহন',
        image: 'https://cdn.sellca-sellcar.com/public/car/media/292477/lFUhT1cBdyGEY5w1XLW0CU44g5u5nNm94vOwlSxn.png',
    },
    {
        value: 'Hearse',
        label: 'Hearse / Dead Body Transport',
        description: 'Dedicated dead body transportation',
        bnDescription: 'মৃতদেহ পরিবহনের জন্য নির্ধারিত গাড়ি',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85',
    },
];

export default function Welcome() {
    const [bookingSubmitted, setBookingSubmitted] = useState(false);
    const [language, setLanguage] = useState<'en' | 'bn'>('en');
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutSliderIndex, setAboutSliderIndex] = useState(0);

    const pageProps = usePage().props as any;
    const auth = pageProps.auth;

    const pricing: PricingSettings = {
        ...defaultPricing,
        ...(pageProps.pricingSettings ?? {}),
    };

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        full_name: '',
        phone: '',
        email: '',
        service_type: '',
        trip_type: 'arrival',
        airport: 'Hazrat Shahjalal International Airport',
        travel_date: '',
        flight_number: '',
        passenger_count: 1,
        message: '',

        plan_name: 'Basic',
        plan_currency: 'BDT',
        currency: 'BDT',
        transport_currency: 'BDT',
        car_type: 'none',
        destination: '',
        car_trip_type: 'one_way',
        route_distance_km: '',
    });

    useEffect(() => {
        const saved = localStorage.getItem('sawban-language');

        if (saved === 'bn' || saved === 'en') {
            setLanguage(saved);
        }
    }, []);

    const changeLanguage = (lang: 'en' | 'bn') => {
        setLanguage(lang);
        localStorage.setItem('sawban-language', lang);
    };

    const nextAboutImage = () => {
        setAboutSliderIndex((current) => (current + 1) % galleryImages.length);
    };

    const previousAboutImage = () => {
        setAboutSliderIndex(
            (current) => (current - 1 + galleryImages.length) % galleryImages.length
        );
    };

    const getPlanPrice = (planName: string) => {
        if (planName === 'Basic') return Number(pricing.basic_plan_price);
        if (planName === 'Standard') return Number(pricing.standard_plan_price);
        return Number(pricing.premium_plan_price);
    };

    const selectedPlanPrice = getPlanPrice(data.plan_name);
    const planSubtotal = selectedPlanPrice * Number(data.passenger_count || 1);
    const exchangeRate = Number(pricing.usd_rate) || 120;

    const vehicleRate =
        data.car_type === 'Private Car'
            ? Number(pricing.private_car_rate)
            : data.car_type === 'Noah'
              ? Number(pricing.noah_rate)
              : data.car_type === 'HiAce'
                ? Number(pricing.hiace_rate)
                : data.car_type === 'Hearse'
                  ? Number(pricing.hearse_rate)
                  : 0;

    const oneWayDistance = Number(data.route_distance_km || 0);
    const hasTransportation = data.car_type !== 'none';

    const chargedDistance =
        data.car_trip_type === 'round_trip'
            ? oneWayDistance * 2
            : oneWayDistance;

    const carFare = hasTransportation ? vehicleRate * chargedDistance : 0;

    const convertCurrency = (amount: number, from: string, to: string) => {
        if (from === to) return amount;
        if (from === 'BDT' && to === 'USD') return amount / exchangeRate;
        if (from === 'USD' && to === 'BDT') return amount * exchangeRate;
        return amount;
    };

    const formatCurrency = (amount: number, currency: string) => {
        if (currency === 'USD') {
            return `$${amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        }

        return `৳${amount.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })}`;
    };

    const planDisplay = (amount: number) =>
        formatCurrency(amount, data.plan_currency);

    const transportDisplay = (amount: number) =>
        formatCurrency(amount, data.transport_currency);

    const carFareInPlanCurrency = convertCurrency(
        carFare,
        data.transport_currency,
        data.plan_currency
    );

    const estimatedTotal = planSubtotal + carFareInPlanCurrency;

    const choosePlan = (planName: string) => {
        setData('plan_name', planName);

        document.getElementById('booking')?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const submitBooking = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBookingSubmitted(false);

        post('/booking', {
            preserveScroll: true,
            onSuccess: () => {
                setBookingSubmitted(true);

                setData({
                    full_name: '',
                    phone: '',
                    email: '',
                    service_type: '',
                    trip_type: 'arrival',
                    airport: 'Hazrat Shahjalal International Airport',
                    travel_date: '',
                    flight_number: '',
                    passenger_count: 1,
                    message: '',
                    plan_name: 'Basic',
                    plan_currency: 'BDT',
                    currency: 'BDT',
                    transport_currency: 'BDT',
                    car_type: 'none',
                    destination: '',
                    car_trip_type: 'one_way',
                    route_distance_km: '',
                });
            },
        });
    };

    const t = content[language];

    const navItems = [
        [t.nav[0], '#home'],
        [t.nav[1], '#about'],
        [t.nav[2], '#services'],
        [t.nav[3], '#transportation'],
        [t.nav[4], '#plans'],
        [t.nav[5], '#contact'],
    ];

    const inputClass =
        'mt-2 w-full border border-[#D8C39A] bg-white px-4 py-3 text-sm text-[#101D31] outline-none transition focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]';

    const labelClass = 'block text-sm font-semibold text-[#101D31]';

    const plans = planNames.map((name) => ({
        name,
        price: getPlanPrice(name),
    }));

    return (
        <>
            <Head title={t.title}>
                <meta name="description" content={t.description} />
            </Head>

            <main className={`min-h-screen bg-[#F7F4EC] text-[#101D31] ${language === 'bn' ? 'font-normal' : ''}`}>

                {/* NAVBAR */}
                <header className="fixed top-0 z-50 w-full border-b border-[#D8C39A] bg-[#101D31]/95 shadow-lg backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 lg:px-8">
                        <a href="#home" className="flex shrink-0 items-center">
                            <img
                                src="/images/SAWBAN%20ENTERPRISE%20Logo.png"
                                alt="SAWBAN ENTERPRISE Logo"
                                className="h-16 w-56 object-contain object-left sm:h-20 sm:w-72 lg:h-20 lg:w-80"
                            />
                        </a>

                        <nav className="hidden items-center gap-5 xl:flex">
                            {navItems.map(([label, href]) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="text-xs font-semibold text-white/80 transition hover:text-[#C9A45C]"
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-4 lg:flex">
                            <div className="flex items-center gap-2 border-r border-white/20 pr-4 text-xs">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={language === 'en' ? 'font-bold text-[#C9A45C]' : 'text-white/60'}
                                >
                                    EN
                                </button>
                                <span className="text-white/30">|</span>
                                <button
                                    onClick={() => changeLanguage('bn')}
                                    className={language === 'bn' ? 'font-bold text-[#C9A45C]' : 'text-white/60'}
                                >
                                    বাংলা
                                </button>
                            </div>

                            {auth?.user ? (
                                <Link href={dashboard()} className="text-sm font-semibold text-white transition hover:text-[#C9A45C]">
                                    {t.dashboard}
                                </Link>
                            ) : (
                                <Link href={login()} className="text-sm font-semibold text-white transition hover:text-[#C9A45C]">
                                    {t.login}
                                </Link>
                            )}

                            <a
                                href="#booking"
                                className="bg-[#C9A45C] px-5 py-3 text-xs font-bold text-[#101D31] transition hover:bg-[#D8C39A]"
                            >
                                {t.getInTouch}
                            </a>
                        </div>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="shrink-0 text-2xl text-white lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? '×' : '☰'}
                        </button>
                    </div>

                    {menuOpen && (
                        <div className="border-t border-white/15 bg-[#101D31] px-6 py-5 lg:hidden">
                            <div className="mb-4 flex items-center gap-3 border-b border-white/15 pb-4 text-sm">
                                <span className="text-white/60">
                                    {language === 'en' ? 'Language:' : 'ভাষা:'}
                                </span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={language === 'en' ? 'font-bold text-[#C9A45C]' : 'text-white/60'}
                                >
                                    English
                                </button>
                                <span className="text-white/40">|</span>
                                <button
                                    onClick={() => changeLanguage('bn')}
                                    className={language === 'bn' ? 'font-bold text-[#C9A45C]' : 'text-white/60'}
                                >
                                    বাংলা
                                </button>
                            </div>

                            {navItems.map(([label, href]) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block border-b border-white/10 py-3 text-sm text-white/80 transition hover:text-[#C9A45C]"
                                >
                                    {label}
                                </a>
                            ))}

                            <a
                                href="#booking"
                                onClick={() => setMenuOpen(false)}
                                className="mt-4 block text-sm font-semibold text-[#C9A45C]"
                            >
                                {t.getInTouch}
                            </a>

                            <Link href={login()} className="mt-4 block text-sm font-semibold text-white">
                                {t.login}
                            </Link>
                        </div>
                    )}
                </header>

                {/* HERO SECTION */}
                <section
                    id="home"
                    className="relative flex min-h-[760px] items-center overflow-hidden bg-[#101D31] pt-24"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85"
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src="/videos/airport-plane.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#101D31]/90 via-[#101D31]/65 to-[#101D31]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101D31]/65 to-transparent" />

                    <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
                        <div className="max-w-3xl">
                            <div className="mb-8 flex items-center gap-3">
                                <span className="h-px w-12 bg-[#C9A45C]" />
                                <span className="text-xs font-bold tracking-[0.25em] text-[#D8C39A]">
                                    {t.heroLabel}
                                </span>
                            </div>

                            <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
                                {t.heroTitle}
                                <br />
                                <span className="font-serif italic text-[#C9A45C]">
                                    {t.heroItalic}
                                </span>
                            </h1>

                            <p className="mt-8 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
                                {t.heroText}
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="#booking"
                                    className="bg-[#C9A45C] px-8 py-4 text-xs font-bold text-[#101D31] transition hover:bg-[#D8C39A]"
                                >
                                    {t.request}
                                </a>

                                <a
                                    href="#services"
                                    className="border border-[#D8C39A]/80 px-8 py-4 text-xs font-bold text-white transition hover:border-[#C9A45C] hover:bg-[#263A55] hover:text-[#D8C39A]"
                                >
                                    {t.explore}
                                </a>
                            </div>

                            <div className="mt-16 flex flex-wrap gap-10 border-t border-white/30 pt-8">
                                {t.highlights.map(([heading, sub]) => (
                                    <div key={heading}>
                                        <div className="text-sm font-bold text-[#C9A45C]">{heading}</div>
                                        <div className="mt-1 text-xs text-white/75">{sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* AIRPORT EXPERIENCE */}
                <section className="bg-[#F7F4EC] py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mb-14 max-w-2xl text-center">
                            <div className="mb-5 text-xs font-bold tracking-[0.25em] text-[#C9A45C]">
                                {t.galleryLabel}
                            </div>

                            <h2 className="text-4xl font-semibold text-[#101D31] sm:text-5xl">
                                {t.galleryTitle}{' '}
                                <span className="font-serif italic text-[#C9A45C]">{t.galleryItalic}</span>
                            </h2>

                            <p className="mt-6 text-sm leading-7 text-[#263A55]/75">{t.galleryText}</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {t.galleryItems.map(([title, description], index) => (
                                <article
                                    key={title}
                                    className="group overflow-hidden border border-[#D8C39A] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#C9A45C] hover:shadow-xl"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={galleryImages[index]}
                                            alt={title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#101D31]/70 to-transparent opacity-70 transition group-hover:opacity-100" />
                                        <div className="absolute bottom-4 left-5 text-xs font-bold tracking-widest text-[#D8C39A]">
                                            0{index + 1}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-[#101D31] transition group-hover:text-[#C9A45C]">
                                            {title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-[#263A55]/75">{description}</p>
                                        <a href="#booking" className="mt-6 inline-block text-xs font-bold tracking-wider text-[#C9A45C] transition hover:text-[#101D31]">
                                            {t.enquire}
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section id="about" className="overflow-hidden bg-[#F7F4EC] py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                        <div>
                            <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#C9A45C]">
                                <span className="h-px w-9 bg-[#C9A45C]" />
                                {t.aboutLabel}
                            </div>

                            <h2 className="text-4xl font-semibold leading-tight text-[#101D31] sm:text-5xl">
                                {t.aboutTitle}
                                <br />
                                <span className="font-serif italic text-[#C9A45C]">{t.aboutItalic}</span>
                            </h2>

                            <p className="mt-7 text-base leading-8 text-[#263A55]/75">{t.aboutText}</p>

                            <a href="#services" className="mt-8 inline-block border-b-2 border-[#C9A45C] pb-2 text-xs font-bold tracking-widest text-[#101D31] transition hover:text-[#C9A45C]">
                                {t.aboutButton}
                            </a>

                            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-[#D8C39A] pt-8">
                                <div>
                                    <div className="font-serif text-3xl text-[#C9A45C]">01</div>
                                    <div className="mt-2 text-xs font-bold tracking-wider text-[#101D31]">
                                        {language === 'en' ? 'PERSONALIZED CARE' : 'ব্যক্তিগত যত্ন'}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-serif text-3xl text-[#C9A45C]">02</div>
                                    <div className="mt-2 text-xs font-bold tracking-wider text-[#101D31]">
                                        {language === 'en' ? 'PROFESSIONAL SERVICE' : 'পেশাদার সেবা'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative h-[390px] overflow-hidden bg-[#101D31] shadow-2xl sm:h-[500px] lg:h-[540px]">
                                {galleryImages.map((image, index) => (
                                    <div
                                        key={image}
                                        className={`absolute inset-0 transition-opacity duration-700 ${
                                            aboutSliderIndex === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
                                        }`}
                                    >
                                        <img src={image} alt={t.galleryItems[index][0]} className="h-full w-full object-cover" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#101D31]/90 via-[#101D31]/10 to-transparent" />
                                    </div>
                                ))}

                                <div className="absolute bottom-0 left-0 z-20 w-full p-7 text-white sm:p-10">
                                    <div className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#D8C39A]">{t.aboutSliderLabel}</div>
                                    <h3 className="text-2xl font-bold sm:text-3xl">{t.galleryItems[aboutSliderIndex][0]}</h3>
                                    <p className="mt-3 max-w-md text-sm leading-7 text-white/80">{t.aboutSliderText}</p>
                                </div>

                                <button type="button" onClick={previousAboutImage} aria-label="Previous About image" className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8C39A]/70 bg-[#101D31]/80 text-2xl text-white transition hover:border-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#101D31] sm:left-6 sm:h-14 sm:w-14">‹</button>
                                <button type="button" onClick={nextAboutImage} aria-label="Next About image" className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8C39A]/70 bg-[#101D31]/80 text-2xl text-white transition hover:border-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#101D31] sm:right-6 sm:h-14 sm:w-14">›</button>
                            </div>

                            <div className="flex items-center justify-center gap-3 bg-[#101D31] py-5">
                                {galleryImages.map((image, index) => (
                                    <button
                                        key={image}
                                        type="button"
                                        onClick={() => setAboutSliderIndex(index)}
                                        aria-label={`Show About image ${index + 1}`}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            aboutSliderIndex === index ? 'w-9 bg-[#C9A45C]' : 'w-2.5 bg-white/40 hover:bg-[#D8C39A]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PREMIUM SERVICES */}
                <section id="services" className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#C9A45C]">
                                    <span className="h-px w-9 bg-[#C9A45C]" />
                                    {t.serviceLabel}
                                </div>
                                <h2 className="text-4xl font-semibold text-[#101D31] sm:text-5xl">
                                    {t.serviceTitle}{' '}
                                    <span className="font-serif italic text-[#C9A45C]">{t.serviceItalic}</span>
                                </h2>
                            </div>
                            <p className="max-w-sm text-sm leading-7 text-[#263A55]/75">{t.serviceText}</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {t.services.map(([icon, title, description], index) => (
                                <article key={title} className="group flex flex-col border border-[#D8C39A] bg-[#F7F4EC] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#C9A45C] hover:bg-white hover:shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="flex h-14 w-14 items-center justify-center border border-[#D8C39A] bg-[#F7F4EC] text-3xl text-[#C9A45C] transition group-hover:bg-[#101D31] group-hover:text-[#D8C39A]">{icon}</span>
                                        <span className="text-xs font-semibold tracking-widest text-[#C9A45C]">0{index + 1}</span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-bold text-[#101D31] transition group-hover:text-[#C9A45C]">{title}</h3>
                                    <p className="mt-4 flex-1 text-sm leading-7 text-[#263A55]/75">{description}</p>
                                    <a href="#booking" className="mt-8 inline-block border-t border-[#D8C39A] pt-5 text-xs font-bold tracking-wider text-[#C9A45C] transition hover:text-[#101D31]">{t.enquire}</a>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEPARATE TRANSPORTATION SECTION */}
                <section id="transportation" className="bg-[#F7F4EC] py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mb-14 max-w-2xl text-center">
                            <div className="mb-5 text-xs font-bold tracking-[0.25em] text-[#C9A45C]">
                                {t.transportLabel}
                            </div>
                            <h2 className="text-4xl font-semibold text-[#101D31] sm:text-5xl">
                                {t.transportTitle}{' '}
                                <span className="font-serif italic text-[#C9A45C]">{t.transportItalic}</span>
                            </h2>
                            <p className="mt-6 text-sm leading-7 text-[#263A55]/75">{t.transportText}</p>
                            <span className="mt-5 inline-block border border-[#C9A45C] px-5 py-2 text-[10px] font-bold tracking-[0.2em] text-[#9A7839]">
                                {t.optional}
                            </span>
                        </div>

                        <div className="mx-auto max-w-6xl">
                            {/* TRANSPORT CURRENCY */}
                            <div className="mb-8 flex flex-col items-start justify-between gap-4 border border-[#D8C39A] bg-white p-6 sm:flex-row sm:items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-[#101D31]">{t.currency}</h3>
                                    <p className="mt-1 text-xs text-[#263A55]/60">
                                        {language === 'en'
                                            ? 'Choose the currency for your vehicle fare.'
                                            : 'গাড়ির ভাড়ার জন্য মুদ্রা নির্বাচন করুন।'}
                                    </p>
                                </div>
                                <select
                                    value={data.transport_currency}
                                    onChange={(e) => setData('transport_currency', e.target.value)}
                                    className="w-full border border-[#D8C39A] bg-white px-5 py-3 text-sm font-semibold text-[#101D31] outline-none focus:border-[#C9A45C] sm:w-72"
                                >
                                    <option value="BDT">BDT — Bangladeshi Taka</option>
                                    <option value="USD">USD — US Dollar</option>
                                </select>
                            </div>

                            {/* NO TRANSPORT OPTION */}
                            <button
                                type="button"
                                onClick={() => {
                                    setData('car_type', 'none');
                                    setData('destination', '');
                                    setData('route_distance_km', '');
                                    setData('car_trip_type', 'one_way');
                                }}
                                className={`mb-8 flex w-full items-center gap-5 border p-6 text-left transition ${
                                    !hasTransportation
                                        ? 'border-2 border-[#C9A45C] bg-[#101D31] text-white shadow-lg'
                                        : 'border-[#D8C39A] bg-white text-[#101D31] hover:border-[#C9A45C]'
                                }`}
                            >
                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center border ${
                                    !hasTransportation ? 'border-[#C9A45C] bg-[#C9A45C] text-[#101D31]' : 'border-[#D8C39A]'
                                }`}>
                                    {!hasTransportation ? '✓' : ''}
                                </span>
                                <span>
                                    <span className={`block text-base font-bold ${!hasTransportation ? 'text-[#D8C39A]' : ''}`}>
                                        {t.noTransport}
                                    </span>
                                    <span className={`mt-1 block text-xs ${!hasTransportation ? 'text-white/65' : 'text-[#263A55]/60'}`}>
                                        {t.noTransportText}
                                    </span>
                                </span>
                            </button>

                            <div className="mb-5">
                                <h3 className="text-xl font-bold text-[#101D31]">{t.vehicleTitle}</h3>
                                <p className="mt-2 text-sm text-[#263A55]/65">{t.vehicle}</p>
                            </div>

                            {/* VEHICLE CARDS */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                {vehicleOptions.map((vehicle) => {
                                    const isSelected = data.car_type === vehicle.value;

                                    const rate =
                                        vehicle.value === 'Private Car'
                                            ? pricing.private_car_rate
                                            : vehicle.value === 'Noah'
                                              ? pricing.noah_rate
                                              : vehicle.value === 'HiAce'
                                                ? pricing.hiace_rate
                                                : pricing.hearse_rate;

                                    return (
                                        <button
                                            key={vehicle.value}
                                            type="button"
                                            onClick={() => setData('car_type', vehicle.value)}
                                            className={`group overflow-hidden border text-left transition duration-300 ${
                                                isSelected
                                                    ? 'border-2 border-[#C9A45C] bg-[#101D31] shadow-xl'
                                                    : 'border-[#D8C39A] bg-white hover:border-[#C9A45C] hover:shadow-lg'
                                            }`}
                                        >
                                            <div className="relative h-56 overflow-hidden bg-[#101D31]">
                                                <img
                                                    src={vehicle.image}
                                                    alt={vehicle.label}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#101D31]/80 to-transparent" />

                                                {isSelected && (
                                                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A45C] font-bold text-[#101D31]">
                                                        ✓
                                                    </span>
                                                )}

                                                <span className="absolute bottom-4 left-4 text-xs font-bold tracking-widest text-white">
                                                    {isSelected
                                                        ? language === 'en' ? 'SELECTED VEHICLE' : 'নির্বাচিত গাড়ি'
                                                        : language === 'en' ? 'SELECT VEHICLE' : 'গাড়ি নির্বাচন করুন'}
                                                </span>
                                            </div>

                                            <div className="p-6">
                                                <h4 className={`text-lg font-bold ${
                                                    isSelected ? 'text-[#D8C39A]' : 'text-[#101D31]'
                                                }`}>
                                                    {language === 'bn' && vehicle.value === 'Hearse'
                                                        ? 'হেয়ার্স / মৃতদেহ পরিবহন'
                                                        : vehicle.label}
                                                </h4>

                                                <p className={`mt-2 text-xs leading-6 ${
                                                    isSelected ? 'text-white/60' : 'text-[#263A55]/60'
                                                }`}>
                                                    {language === 'bn' ? vehicle.bnDescription : vehicle.description}
                                                </p>

                                                <div className="mt-4 border-t border-[#D8C39A]/40 pt-4">
                                                    <span className={`text-sm font-bold ${
                                                        isSelected ? 'text-[#C9A45C]' : 'text-[#101D31]'
                                                    }`}>
                                                        {transportDisplay(Number(rate))} / KM
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* TRANSPORT DETAILS ONLY WHEN A VEHICLE IS SELECTED */}
                            {hasTransportation && (
                                <div className="mt-10 border border-[#D8C39A] bg-white p-6 shadow-lg sm:p-9">
                                    <div className="mb-7 border-b border-[#D8C39A] pb-5">
                                        <span className="text-xs font-bold tracking-[0.2em] text-[#C9A45C]">
                                            {language === 'en' ? 'ROUTE INFORMATION' : 'যাতায়াতের তথ্য'}
                                        </span>
                                        <h3 className="mt-2 text-2xl font-bold text-[#101D31]">
                                            {language === 'en' ? 'Transportation Details' : 'গাড়ি যাতায়াতের বিস্তারিত'}
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className={labelClass}>{t.destination} *</label>
                                            <input
                                                type="text"
                                                value={data.destination}
                                                onChange={(e) => setData('destination', e.target.value)}
                                                className={inputClass}
                                                required={hasTransportation}
                                                maxLength={255}
                                                placeholder={t.destinationPlaceholder}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t.carTrip} *</label>
                                            <select
                                                value={data.car_trip_type}
                                                onChange={(e) => setData('car_trip_type', e.target.value)}
                                                className={inputClass}
                                                required={hasTransportation}
                                            >
                                                <option value="one_way">{t.oneWay}</option>
                                                <option value="round_trip">{t.roundTrip}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t.distance} *</label>
                                            <input
                                                type="number"
                                                min="0.1"
                                                max="10000"
                                                step="0.1"
                                                value={data.route_distance_km}
                                                onChange={(e) => setData('route_distance_km', e.target.value)}
                                                className={inputClass}
                                                required={hasTransportation}
                                                placeholder={t.distancePlaceholder}
                                            />
                                            <p className="mt-2 text-xs leading-5 text-[#263A55]/60">
                                                {t.distanceHelp}
                                            </p>
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t.airportOrigin}</label>
                                            <input
                                                type="text"
                                                value="Hazrat Shahjalal International Airport, Dhaka"
                                                className={`${inputClass} bg-[#F7F4EC]`}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    {/* VEHICLE FARE SUMMARY */}
                                    <div className="mt-8 border border-[#C9A45C] bg-[#101D31] p-6 text-white sm:p-8">
                                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5">
                                            <div>
                                                <span className="text-xs font-bold tracking-[0.2em] text-[#D8C39A]">
                                                    {language === 'en' ? 'TRANSPORT PRICE ESTIMATION' : 'গাড়ির ভাড়ার হিসাব'}
                                                </span>
                                                <h3 className="mt-2 text-2xl font-bold">
                                                    {language === 'en' ? 'Vehicle Fare Summary' : 'গাড়ির ভাড়ার সারসংক্ষেপ'}
                                                </h3>
                                            </div>
                                            <span className="border border-[#C9A45C]/50 px-4 py-2 text-xs font-bold text-[#D8C39A]">
                                                {data.transport_currency}
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-5 text-sm">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-white/65">{data.car_type} — {language === 'en' ? 'Rate / KM' : 'প্রতি কিলোমিটার'}</span>
                                                <strong className="text-[#D8C39A]">{transportDisplay(vehicleRate)}</strong>
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-white/65">{language === 'en' ? 'One-way Distance' : 'একমুখী দূরত্ব'}</span>
                                                <strong className="text-[#D8C39A]">{oneWayDistance || 0} KM</strong>
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-white/65">{language === 'en' ? 'Charged Distance' : 'হিসাবের দূরত্ব'}</span>
                                                <strong className="text-[#D8C39A]">
                                                    {oneWayDistance || 0} × {data.car_trip_type === 'round_trip' ? 2 : 1} = {chargedDistance} KM
                                                </strong>
                                            </div>

                                            <div className="border-t border-white/20 pt-5">
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="font-bold">{t.carFare}</span>
                                                    <strong className="text-2xl text-[#C9A45C]">
                                                        {oneWayDistance > 0 ? transportDisplay(carFare) : t.quoteRequired}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 border border-[#D8C39A]/30 bg-white/5 p-4 text-xs leading-6 text-[#D8C39A]">
                                            {t.fareNotice}
                                            {' '}
                                            {language === 'en'
                                                ? 'Google Maps automatic distance lookup has not been connected yet.'
                                                : 'Google Maps থেকে স্বয়ংক্রিয় দূরত্ব নেওয়ার ব্যবস্থা এখনো যুক্ত করা হয়নি।'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!hasTransportation && (
                                <div className="mt-8 border border-dashed border-[#C9A45C] bg-white p-6 text-center">
                                    <p className="text-sm font-semibold text-[#101D31]">
                                        {language === 'en'
                                            ? 'No vehicle selected. Transportation fare will be ৳0 / $0.'
                                            : 'কোনো গাড়ি নির্বাচন করা হয়নি। যাতায়াতের ভাড়া ৳০ / $০।'}
                                    </p>
                                </div>
                            )}

                            <div className="mt-8 flex justify-end">
                                <a
                                    href="#booking"
                                    className="bg-[#101D31] px-8 py-4 text-xs font-bold tracking-widest text-white transition hover:bg-[#C9A45C] hover:text-[#101D31]"
                                >
                                    {language === 'en' ? 'CONTINUE TO BOOKING →' : 'বুকিং করতে এগিয়ে যান →'}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING PLANS */}
                <section id="plans" className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mb-14 max-w-2xl text-center">
                            <div className="mb-5 text-xs font-bold tracking-[0.25em] text-[#C9A45C]">{t.planLabel}</div>
                            <h2 className="text-4xl font-semibold text-[#101D31] sm:text-5xl">
                                {t.planTitle}{' '}
                                <span className="font-serif italic text-[#C9A45C]">{t.planItalic}</span>
                            </h2>
                            <p className="mt-6 text-sm leading-7 text-[#263A55]/75">{t.planText}</p>
                        </div>

                        {/* PLAN CURRENCY SELECTOR */}
                        <div className="mx-auto mb-10 flex max-w-5xl flex-col items-start justify-between gap-4 border border-[#D8C39A] bg-[#F7F4EC] p-6 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-lg font-bold text-[#101D31]">{t.planCurrency}</h3>
                                <p className="mt-1 text-xs text-[#263A55]/60">
                                    {language === 'en'
                                        ? 'Choose the currency for your service plan.'
                                        : 'সার্ভিস প্ল্যানের মূল্য যে মুদ্রায় দেখতে চান সেটি নির্বাচন করুন।'}
                                </p>
                            </div>
                            <select
                                value={data.plan_currency}
                                onChange={(e) => {
                                    setData('plan_currency', e.target.value);
                                    setData('currency', e.target.value);
                                }}
                                className="w-full border border-[#D8C39A] bg-white px-5 py-3 text-sm font-semibold text-[#101D31] outline-none focus:border-[#C9A45C] sm:w-72"
                            >
                                <option value="BDT">BDT — Bangladeshi Taka</option>
                                <option value="USD">USD — US Dollar</option>
                            </select>
                        </div>

                        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-3">
                            {plans.map((plan, index) => (
                                <article key={plan.name} className={`relative flex flex-col border bg-[#F7F4EC] p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
                                    index === 1 ? 'border-2 border-[#C9A45C] md:scale-105' : 'border-[#D8C39A]'
                                }`}>
                                    {index === 1 && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#C9A45C] px-5 py-2 text-[10px] font-bold tracking-widest text-[#101D31]">
                                            STANDARD CHOICE
                                        </div>
                                    )}
                                    <div className="text-xs font-bold tracking-[0.2em] text-[#C9A45C]">{plan.name.toUpperCase()}</div>
                                    <h3 className="mt-5 text-3xl font-semibold text-[#101D31]">{plan.name}</h3>
                                    <div className="mt-7 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-[#C9A45C]">
                                            {data.plan_currency === 'USD' ? '$' : '৳'}
                                        </span>
                                        <span className="text-5xl font-bold tracking-tight text-[#101D31]">
                                            {convertCurrency(plan.price, 'BDT', data.plan_currency).toLocaleString('en-US', {
                                                minimumFractionDigits: data.plan_currency === 'USD' ? 2 : 0,
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                        <span className="text-xs font-semibold text-[#263A55]/60">
                                            {data.plan_currency === 'USD' ? 'USD / PERSON' : t.perPerson}
                                        </span>
                                    </div>
                                    <div className="my-7 h-px bg-[#D8C39A]" />
                                    <p className="min-h-16 text-sm leading-7 text-[#263A55]/75">
                                        {language === 'en'
                                            ? index === 0 ? 'A simple option for your airport assistance needs.' : index === 1 ? 'A balanced option for a more convenient journey.' : 'Our premium option for enhanced airport assistance.'
                                            : index === 0 ? 'আপনার বিমানবন্দর সহায়তার জন্য একটি সাধারণ প্ল্যান।' : index === 1 ? 'আরও সুবিধাজনক যাত্রার জন্য একটি ভারসাম্যপূর্ণ প্ল্যান।' : 'উন্নত বিমানবন্দর সহায়তার জন্য আমাদের প্রিমিয়াম প্ল্যান।'}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => choosePlan(plan.name)}
                                        className={`mt-8 w-full px-5 py-4 text-xs font-bold tracking-widest transition ${
                                            index === 1 ? 'bg-[#C9A45C] text-[#101D31] hover:bg-[#D8C39A]' : 'bg-[#101D31] text-white hover:bg-[#263A55]'
                                        }`}
                                    >
                                        {t.choosePlan}
                                    </button>
                                </article>
                            ))}
                        </div>

                        <p className="mt-10 text-center text-xs text-[#263A55]/60">
                            {language === 'en'
                                ? 'Prices are per passenger. Vehicle fare is calculated separately and transportation is optional.'
                                : 'প্রতিটি প্ল্যানের মূল্য জনপ্রতি। গাড়ির ভাড়া আলাদাভাবে হিসাব হবে এবং গাড়ি নেওয়া ঐচ্ছিক।'}
                        </p>
                    </div>
                </section>

                {/* BOOKING FORM */}
                <section id="booking" className="bg-[#F7F4EC] py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mb-14 max-w-2xl text-center">
                            <div className="mb-5 text-xs font-bold tracking-[0.25em] text-[#C9A45C]">{t.bookingLabel}</div>
                            <h2 className="text-4xl font-semibold leading-tight text-[#101D31] sm:text-5xl">
                                {t.bookingTitle}
                                <br />
                                <span className="font-serif italic text-[#C9A45C]">{t.bookingItalic}</span>
                            </h2>
                            <p className="mt-6 text-sm leading-7 text-[#263A55]/75">{t.bookingText}</p>
                        </div>

                        <div className="mx-auto max-w-4xl border border-[#D8C39A] bg-white p-6 shadow-xl sm:p-10">
                            {bookingSubmitted && (
                                <div className="mb-8 border border-green-200 bg-green-50 p-5 text-sm leading-7 text-green-800">
                                    <strong>{t.bookingSuccess}</strong>
                                </div>
                            )}

                            <form onSubmit={submitBooking} className="grid gap-6 md:grid-cols-2">

                                {/* CUSTOMER DETAILS */}
                                <div className="md:col-span-2 border-b border-[#D8C39A] pb-3">
                                    <h3 className="text-lg font-bold text-[#101D31]">
                                        {language === 'en' ? 'Customer Information' : 'গ্রাহকের তথ্য'}
                                    </h3>
                                </div>

                                <div>
                                    <label className={labelClass}>{t.fullName} *</label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className={inputClass}
                                        required
                                        maxLength={255}
                                        autoComplete="name"
                                    />
                                    {errors.full_name && <p className="mt-2 text-xs text-red-600">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.phone} *</label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={inputClass}
                                        required
                                        maxLength={30}
                                        autoComplete="tel"
                                    />
                                    {errors.phone && <p className="mt-2 text-xs text-red-600">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.email}</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={inputClass}
                                        maxLength={255}
                                        autoComplete="email"
                                    />
                                    {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.serviceType} *</label>
                                    <select
                                        value={data.service_type}
                                        onChange={(e) => setData('service_type', e.target.value)}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">{t.selectService}</option>
                                        {t.serviceOptions.map((service, index) => (
                                            <option key={service} value={serviceValues[index]}>{service}</option>
                                        ))}
                                    </select>
                                    {errors.service_type && <p className="mt-2 text-xs text-red-600">{errors.service_type}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.tripType} *</label>
                                    <select
                                        value={data.trip_type}
                                        onChange={(e) => setData('trip_type', e.target.value)}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="arrival">{t.arrival}</option>
                                        <option value="departure">{t.departure}</option>
                                    </select>
                                    {errors.trip_type && <p className="mt-2 text-xs text-red-600">{errors.trip_type}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.airport} *</label>
                                    <input
                                        type="text"
                                        value={data.airport}
                                        onChange={(e) => setData('airport', e.target.value)}
                                        className={inputClass}
                                        required
                                        maxLength={255}
                                    />
                                    {errors.airport && <p className="mt-2 text-xs text-red-600">{errors.airport}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.travelDate} *</label>
                                    <input
                                        type="date"
                                        value={data.travel_date}
                                        onChange={(e) => setData('travel_date', e.target.value)}
                                        className={inputClass}
                                        required
                                        min={new Date().toLocaleDateString('en-CA')}
                                    />
                                    {errors.travel_date && <p className="mt-2 text-xs text-red-600">{errors.travel_date}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.flightNumber}</label>
                                    <input
                                        type="text"
                                        value={data.flight_number}
                                        onChange={(e) => setData('flight_number', e.target.value)}
                                        className={inputClass}
                                        maxLength={50}
                                        placeholder="e.g. BG 147"
                                    />
                                    {errors.flight_number && <p className="mt-2 text-xs text-red-600">{errors.flight_number}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.passengers} *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={data.passenger_count}
                                        onChange={(e) => setData('passenger_count', Number(e.target.value))}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.passenger_count && <p className="mt-2 text-xs text-red-600">{errors.passenger_count}</p>}
                                </div>

                                {/* BOOKING SELECTION SUMMARY */}
                                <div className="md:col-span-2 mt-5 border border-[#D8C39A] bg-[#F7F4EC] p-6">
                                    <div className="mb-5 border-b border-[#D8C39A] pb-4">
                                        <span className="text-xs font-bold tracking-[0.2em] text-[#C9A45C]">
                                            {t.bookingOptions}
                                        </span>
                                        <h3 className="mt-2 text-xl font-bold text-[#101D31]">{t.bookingSummary}</h3>
                                    </div>

                                    <div className="space-y-4 text-sm">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="text-[#263A55]/70">
                                                {language === 'en' ? 'Selected Plan' : 'নির্বাচিত প্ল্যান'}: <strong className="text-[#101D31]">{data.plan_name}</strong>
                                            </span>
                                            <strong className="text-[#101D31]">
                                                {planDisplay(planSubtotal)}
                                            </strong>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="text-[#263A55]/70">
                                                {language === 'en' ? 'Transportation' : 'যাতায়াত'}
                                            </span>
                                            <strong className="text-[#101D31]">
                                                {hasTransportation ? data.car_type : t.noTransport}
                                            </strong>
                                        </div>

                                        {hasTransportation && (
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <span className="text-[#263A55]/70">{t.carFare}</span>
                                                <strong className="text-[#101D31]">
                                                    {transportDisplay(carFare)}
                                                </strong>
                                            </div>
                                        )}

                                        <div className="border-t border-[#D8C39A] pt-5">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <span className="font-bold text-[#101D31]">{t.estimatedTotal}</span>
                                                <strong className="text-2xl text-[#9A7839]">
                                                    {planDisplay(estimatedTotal)}
                                                </strong>
                                            </div>
                                            <p className="mt-2 text-xs text-[#263A55]/60">
                                                {language === 'en'
                                                    ? `Plan currency: ${data.plan_currency}. Transportation currency: ${data.transport_currency}. Combined total is shown in plan currency.`
                                                    : `প্ল্যানের মুদ্রা: ${data.plan_currency}। পরিবহনের মুদ্রা: ${data.transport_currency}। সর্বমোট প্ল্যানের মুদ্রায় দেখানো হয়েছে।`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* MESSAGE */}
                                <div className="md:col-span-2">
                                    <label className={labelClass}>{t.message}</label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className={inputClass}
                                        rows={5}
                                        maxLength={2000}
                                        placeholder={t.messagePlaceholder}
                                    />
                                    {errors.message && <p className="mt-2 text-xs text-red-600">{errors.message}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <p className="mb-5 text-xs text-[#263A55]/60">{t.requiredNote}</p>
                                    <button
                                        type="submit"
                                        disabled={processing || (hasTransportation && (!data.destination.trim() || !data.route_distance_km || Number(data.route_distance_km) <= 0))}
                                        className="w-full bg-[#101D31] px-8 py-5 text-xs font-bold tracking-widest text-white transition hover:bg-[#C9A45C] hover:text-[#101D31] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? t.submitting : t.submitBooking}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="bg-[#263A55] py-20">
                    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
                        <div>
                            <div className="mb-4 text-xs font-bold tracking-[0.25em] text-[#D8C39A]">{t.contactLabel}</div>
                            <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">{t.contactTitle}</h2>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">{t.contactText}</p>
                        </div>
                        <a href="#booking" className="shrink-0 bg-[#C9A45C] px-9 py-5 text-xs font-bold text-[#101D31] transition hover:bg-[#D8C39A]">{t.contactButton}</a>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-[#101D31] py-14 text-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-10 border-b border-[#D8C39A]/25 pb-10 md:grid-cols-4">
                            <div>
                                <a href="#home" className="inline-flex items-center">
                                    <img src="/images/SAWBAN%20ENTERPRISE%20Logo.png" alt="SAWBAN ENTERPRISE Logo" className="h-20 w-64 object-contain object-left sm:h-24 sm:w-72" />
                                </a>
                                <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">{t.footerText}</p>
                            </div>

                            <div>
                                <div className="mb-5 text-xs font-bold tracking-widest text-[#C9A45C]">{t.quickLinks}</div>
                                <div className="flex flex-col gap-3 text-sm text-white/70">
                                    {navItems.map(([label, href]) => (
                                        <a key={href} href={href} className="transition hover:text-[#C9A45C]">{label}</a>
                                    ))}
                                    <a href="#booking" className="transition hover:text-[#C9A45C]">{t.bookingLabel}</a>
                                </div>
                            </div>

                            <div>
                                <div className="mb-5 text-xs font-bold tracking-widest text-[#C9A45C]">{t.administration}</div>
                                <div className="flex flex-col gap-3 text-sm text-white/70">
                                    <Link href={login()} className="transition hover:text-[#C9A45C]">{t.login}</Link>
                                    {auth?.user && (
                                        <Link href={dashboard()} className="transition hover:text-[#C9A45C]">{t.dashboard}</Link>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="mb-5 text-xs font-bold tracking-widest text-[#C9A45C]">{t.contactUs}</div>
                                <p className="mb-4 text-xs leading-6 text-white/60">{t.whatsappUs}</p>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 rounded-sm border border-white/15 bg-white/5 px-4 py-3 transition hover:border-[#25D366] hover:bg-[#25D366]/10"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition group-hover:scale-110">
                                        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                                            <path d="M16.02 3C8.85 3 3.02 8.81 3.02 15.96c0 2.28.6 4.5 1.74 6.46L3 29l6.77-1.72a13.1 13.1 0 0 0 6.25 1.59h.01c7.17 0 13-5.82 13-12.97 0-3.47-1.35-6.73-3.81-9.18A12.9 12.9 0 0 0 16.02 3zm0 23.67h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.24-4.02 1.02 1.07-3.91-.26-.41a10.65 10.65 0 0 1-1.64-5.67c0-5.9 4.82-10.7 10.76-10.7 2.87 0 5.57 1.12 7.6 3.15a10.62 10.62 0 0 1 3.15 7.57c0 5.9-4.82 10.69-10.75 10.69zm5.9-8.01c-.32-.16-1.9-.93-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.78-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.1 1.32 3.31c.16.21 2.28 3.47 5.53 4.86.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38z" />
                                        </svg>
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-xs font-semibold text-white/60">WhatsApp</span>
                                        <span className="mt-1 block text-sm font-bold text-white transition group-hover:text-[#25D366]">{WHATSAPP_DISPLAY}</span>
                                    </span>
                                </a>
                                <p className="mt-3 text-[10px] text-white/40">Demo contact number — update before launch.</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-white/50 sm:flex-row">
                            <p>© {new Date().getFullYear()} SAWBAN ENTERPRISE. {t.copyright}</p>
                            <p className="tracking-widest text-[#D8C39A]">{t.tagline}</p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
