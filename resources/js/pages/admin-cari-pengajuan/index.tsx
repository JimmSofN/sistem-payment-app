import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toaster, toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cari Pengajuan',
        href: '/admin-cari-pengajuan',
    },
];

interface Payment {
    id: number;
    nis: string;
    nama_lengkap: string;
    jenis_iuran: string;
    periode_pembayaran: string;
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


export default function AdminCariPengajuan({ payments = [], total = 0, per_page = 10, current_page = 1, flash }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
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

    // Client-side filtering
    const filteredPayments = payments.filter(
        (payment) =>
            payment.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.jenis_iuran.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.periode_pembayaran.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.href = `/cari-pengajuan?page=${page}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cari Pengajuan" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Search Bar */}
                <div className="w-full max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Cari berdasarkan NIS, nama, jenis, atau periode..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">NIS</TableHead>
                                <TableHead className="font-semibold">Nama</TableHead>
                                <TableHead className="font-semibold">Jenis</TableHead>
                                <TableHead className="font-semibold">Periode</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-mono text-sm">{payment.nis}</TableCell>
                                        <TableCell className="font-medium">{payment.user_name}</TableCell>
                                        <TableCell>{payment.jenis_iuran === 'spp-bulanan' ? 'SPP Bulanan' : 'SPP Lainnya'}</TableCell>
                                        <TableCell>{payment.periode_pembayaran}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={payment.status} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        Tidak ada data yang ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                            <Card key={payment.id}>
                                <CardContent className="p-4">
                                    <div className="space-y-3">
                                        {/* Header with Name and Status */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-base truncate">{payment.user_name}</h3>
                                                <p className="text-sm">NIS: {payment.nis}</p>
                                            </div>
                                            <StatusBadge status={payment.status} />
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span>Jenis:</span>
                                                <p className="font-medium">{payment.jenis_iuran === 'spp-bulanan' ? 'SPP Bulanan' : 'SPP Lainnya'}</p>
                                            </div>
                                            <div>
                                                <span>Periode:</span>
                                                <p className="font-medium">{payment.periode_pembayaran}</p>
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Search className="w-12 h-12 mx-auto mb-2" />
                            <h3 className="text-lg font-medium mb-1">Tidak ada hasil</h3>
                            <p>Coba ubah kata kunci pencarian Anda.</p>
                        </div>
                    )}
                </div>

                {/* Results Counter */}
                {searchTerm && (
                    <div className="text-sm mt-2">
                        Menampilkan {filteredPayments.length} dari {total} data
                    </div>
                )}

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