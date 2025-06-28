import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toaster, toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Edit Pengajuan',
        href: '/admin-edit-pengajuan',
    },
];

interface Payment {
    id: number;
    nis: string;
    nama: string;
    kelas: string;
    status: 'Menunggu' | 'Berhasil';
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

const CheckButton = ({ paymentId }: { paymentId: number }) => {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => router.visit(`/admin-edit-pengajuan/${paymentId}/edit`)}
            className="bg-transparent"
        >
            Check
        </Button>
    );
};

export default function AdminEditPengajuan({ payments = [], total = 0, per_page = 10, current_page = 1, flash }: Props) {
    const [currentPage, setCurrentPage] = useState(current_page);
    const [searchTerm, setSearchTerm] = useState('');
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

    // Client-side filtering
    const filteredPayments = payments.filter(
        (payment) =>
            payment.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.href = `/admin-edit-pengajuan?page=${page}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Edit Pengajuan" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Admin Edit Pengajuan</h1>
                    <p className="text-sm md:text-base">Berikut adalah daftar semua pengajuan pembayaran</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan NIS atau Nama..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                    />
                </div>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">NIS</TableHead>
                                <TableHead className="font-semibold">Nama</TableHead>
                                <TableHead className="font-semibold">Kelas</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        Tidak ada data pembayaran ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPayments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-mono text-sm">{payment.nis}</TableCell>
                                        <TableCell className="font-medium">{payment.user_name}</TableCell>
                                        <TableCell>{payment.kelas}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={payment.status} />
                                        </TableCell>
                                        <TableCell>
                                            <CheckButton paymentId={payment.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
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

                {/* Results Counter */}
                {searchTerm && (
                    <div className="text-sm text-gray-600 mt-2">
                        Menampilkan {filteredPayments.length} dari {total} data
                    </div>
                )}
            </div>
        </AppLayout>
    );
}