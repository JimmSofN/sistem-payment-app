import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin-dashboard',
    },
];


export default function AdminDashboard() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cari Pengajuan" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                Ini admin dashboard
            </div>
        </AppLayout>
    );
}