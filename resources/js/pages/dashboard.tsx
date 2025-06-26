import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from 'react-hot-toast';

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
    status: 'pending' | 'complete';
    created_at: string;
}

interface DashboardProps {
    payments?: Payment[];
    user_name?: string;
}

const StatusBadge = ({ status }: { status: 'pending' | 'complete' }) => {
    return (
        <Badge
            variant={status === 'complete' ? 'default' : 'secondary'}
            className={
                status === 'complete'
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200'
            }
        >
            {status === 'complete' ? 'Selesai' : 'Menunggu'}
        </Badge>
    );
};

export default function Dashboard({ payments = [], user_name = 'Pengguna' }: DashboardProps) {
    const totalPayments = payments.length;
    const paidPayments = payments.filter((p) => p.status === 'complete').length;
    const pendingPayments = payments.filter((p) => p.status === 'pending').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Selamat Datang, {user_name} 👋</h1>
                    <p className="text-sm md:text-base">Berikut adalah ringkasan pembayaran dan tagihan Anda</p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {payments.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">Belum ada data pembayaran.</p>
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
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs">
                                            {card.status === 'complete' ? 'Dibayar' : 'Belum dibayar'}
                                        </span>
                                    </div>
                                    <div className="text-sm mt-1">{card.created_at}</div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{totalPayments}</p>
                                <p className="text-sm text-blue-800">Total Tagihan</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">{paidPayments}</p>
                                <p className="text-sm text-green-800">Sudah Dibayar</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
                                <p className="text-sm text-yellow-800">Menunggu Pembayaran</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}