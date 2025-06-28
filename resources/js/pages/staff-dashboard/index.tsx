import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Payment {
    id: number;
    title: string;
    subtitle: string;
    status: 'Menunggu' | 'Berhasil';
    created_at: string;
    user_name: string;
}

interface Flash {
    success?: string | null;
    error?: string | null;
}

interface Props {
    payments: Payment[];
    total: number;
    per_page: number;
    current_page: number;
    flash?: Flash;
}

const StatusBadge = ({ status }: { status: 'Menunggu' | 'Berhasil' }) => {
    return (
        <Badge
            variant={status === 'Berhasil' ? 'default' : 'secondary'}
            className={
                status === 'Berhasil'
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200'
            }
        >
            {status}
        </Badge>
    );
};

export default function Dashboard({ payments = [], total = 0, per_page = 10, current_page = 1, flash }: Props) {
    const [currentPage, setCurrentPage] = useState(current_page);
    const pageProps = usePage().props as Flash;
    const totalPages = Math.ceil(total / per_page);

    // Handle flash messages
    useEffect(() => {
        const success = flash?.success || pageProps.success;
        const error = flash?.error || pageProps.error;
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [flash, pageProps]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.href = `/dashboard?page=${page}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Selamat Datang, Staff 👋</h1>
                    <p className="text-sm md:text-base">Berikut adalah daftar semua pengajuan pembayaran</p>
                </div>

                {/* Payment Cards */}
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {payments.length === 0 ? (
                        <p className="text-center">Belum ada data pembayaran.</p>
                    ) : (
                        payments.map((card) => (
                            <Card key={card.id} className="hover:shadow-md transition-shadow duration-200">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-base md:text-lg font-semibold leading-tight">
                                                {card.title}
                                            </CardTitle>
                                        </div>
                                        <StatusBadge status={card.status} />
                                    </div>
                                    <CardDescription className="text-sm mt-1">{card.subtitle}</CardDescription>
                                    <CardDescription className="text-sm mt-1">Diajukan oleh: {card.user_name}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs">
                                            {card.status === 'Berhasil' ? 'Dibayar' : 'Belum dibayar'}
                                        </span>
                                    </div>
                                    <div className="text-sm mt-1">{card.created_at}</div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {total > per_page && (
                    <div className="flex justify-center gap-2 mt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}