import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cari Pengajuan',
        href: '/cari-pengajuan',
    },
];


export default function CariPengajuan() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cari Pengajuan" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                Test Ajah Ah...
            </div>
        </AppLayout>
    );
}