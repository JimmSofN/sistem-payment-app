import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat Pembayaran',
        href: '/history',
    },
];

interface Payment {
    id: number;
    nama_lengkap: string;
    kelas: string;
    jenis_iuran: string;
    status: 'Menunggu' | 'Berhasil';
    periode_pembayaran: string;
}

interface HistoryProps {
    payments: Payment[];
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

export default function History({ payments }: HistoryProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pembayaran" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Nama</TableHead>
                                    <TableHead className="font-semibold">Kelas</TableHead>
                                    <TableHead className="font-semibold">Jenis</TableHead>
                                    <TableHead className="font-semibold">Tanggal</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">{payment.nama_lengkap}</TableCell>
                                        <TableCell>{payment.kelas}</TableCell>
                                        <TableCell>
                                            {payment.jenis_iuran === 'spp-bulanan' ? 'SPP Bulanan' : 'SPP Lainnya'}
                                        </TableCell>
                                        <TableCell>{payment.periode_pembayaran}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={payment.status} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {payments.map((payment) => (
                        <Card key={payment.id}>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-base">{payment.nama_lengkap}</h3>
                                            <p>{payment.kelas}</p>
                                        </div>
                                        <StatusBadge status={payment.status} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span>Jenis:</span>
                                            <p className="font-medium">
                                                {payment.jenis_iuran === 'spp-bulanan' ? 'SPP Bulanan' : 'SPP Lainnya'}
                                            </p>
                                        </div>
                                        <div>
                                            <span>Tanggal:</span>
                                            <p className="font-medium">{payment.periode_pembayaran}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium">Tidak ada data</h3>
                        <p>Belum ada data pembayaran yang tersedia.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}