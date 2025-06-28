import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Toaster, toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Verifikasi Pengajuan',
        href: '/verifikasi-pengajuan',
    },
    {
        title: 'Check Pengajuan',
        href: '#',
    },
];

interface Payment {
    id: number;
    nis: string;
    nama_lengkap: string;
    ttl: string;
    jenis_kelamin: string;
    kelas: string;
    alamat_lengkap: string;
    jenis_iuran: string;
    periode_pembayaran: string;
    bukti_pembayaran: string | null;
    status: 'Menunggu' | 'Berhasil';
    user_name: string;
}

interface Flash {
    success?: string | null;
    error?: string | null;
}

interface Props {
    payment: Payment;
    flash?: Flash;
}

export default function VerifikasiPengajuanCheck({ payment, flash }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        status: payment.status,
    });
    const pageProps = usePage().props as Flash;

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

    const handleBack = () => {
        router.visit('/verifikasi-pengajuan');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('verifikasi-pengajuan.update', payment.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Check Pengajuan" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Back Button */}
                <div className="flex justify-start">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="flex items-center gap-2 p-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>
                </div>

                {/* Form Card */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Process Student Payment</CardTitle>
                        <p className="text-sm mt-1">Review and update student payment information</p>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* NIS */}
                            <div className="space-y-2">
                                <Label htmlFor="nis">NIS</Label>
                                <Input
                                    id="nis"
                                    type="text"
                                    value={payment.nis}
                                    className="font-mono"
                                    disabled
                                />
                            </div>

                            {/* Nama Lengkap */}
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama Lengkap</Label>
                                <Input
                                    id="nama"
                                    type="text"
                                    value={payment.user_name}
                                    disabled
                                />
                            </div>

                            {/* Tempat Tanggal Lahir */}
                            <div className="space-y-2">
                                <Label htmlFor="ttl">Tempat Tanggal Lahir</Label>
                                <Input
                                    id="ttl"
                                    type="text"
                                    value={payment.ttl}
                                    disabled
                                />
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="space-y-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <Input
                                    id="gender"
                                    type="text"
                                    value={payment.jenis_kelamin}
                                    disabled
                                />
                            </div>

                            {/* Kelas */}
                            <div className="space-y-2">
                                <Label htmlFor="kelas">Kelas</Label>
                                <Input
                                    id="kelas"
                                    type="text"
                                    value={payment.kelas}
                                    disabled
                                />
                            </div>

                            {/* Alamat Lengkap */}
                            <div className="space-y-2">
                                <Label htmlFor="alamat">Alamat Lengkap</Label>
                                <Textarea
                                    id="alamat"
                                    className="min-h-[80px] resize-none"
                                    value={payment.alamat_lengkap}
                                    disabled
                                />
                            </div>

                            {/* Jenis Iuran */}
                            <div className="space-y-2">
                                <Label htmlFor="jenis-iuran">Jenis Iuran</Label>
                                <Input
                                    id="jenis-iuran"
                                    type="text"
                                    value={payment.jenis_iuran === 'spp-bulanan' ? 'SPP Bulanan' : 'SPP Lainnya'}
                                    disabled
                                />
                            </div>

                            {/* Periode Pembayaran */}
                            <div className="space-y-2">
                                <Label htmlFor="periode">Periode Pembayaran</Label>
                                <Input
                                    id="periode"
                                    type="text"
                                    value={payment.periode_pembayaran}
                                    disabled
                                />
                            </div>

                            {/* Bukti Pembayaran */}
                            <div className="space-y-2">
                                <Label htmlFor="bukti-pembayaran">Bukti Pembayaran</Label>
                                {payment.bukti_pembayaran ? (
                                    <img
                                        src={payment.bukti_pembayaran}
                                        alt="Bukti pembayaran"
                                        className="w-full h-auto max-h-[500px] object-contain rounded-lg border bg-gray-100"
                                        onError={() => {
                                            console.error('Image failed to load:', payment.bukti_pembayaran);
                                            toast.error(`Gagal memuat gambar: ${payment.bukti_pembayaran}`);
                                        }}
                                    />
                                ) : (
                                    <p className="text-sm">Tidak ada bukti pembayaran.</p>
                                )}
                            </div>

                            {/* Status Dropdown */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value as 'Menunggu' | 'Berhasil')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Menunggu">Menunggu</SelectItem>
                                        <SelectItem value="Berhasil">Berhasil</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                            </div>

                            {/* Process Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing} className="w-full">
                                    Process
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}