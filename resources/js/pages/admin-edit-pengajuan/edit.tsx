import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Edit Pengajuan',
        href: '/admin-edit-pengajuan'
    },
    {
        title: 'Edit',
        href: '#'
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

interface Props {
    payment: Payment;
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}

export default function EditAdminPengajuan({ payment, flash }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        status: payment.status,
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin-edit-pengajuan.update', payment.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus pembayaran ini?')) {
            router.delete(route('admin-edit-pengajuan.destroy', payment.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pengajuan" />
            <Toaster position="top-right" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Pengajuan Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column: Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="nis">NIS</Label>
                                    <Input id="nis" value={payment.nis} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                                    <Input id="nama_lengkap" value={payment.user_name} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="ttl">TTL</Label>
                                    <Input id="ttl" value={payment.ttl} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                    <Input id="jenis_kelamin" value={payment.jenis_kelamin} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="kelas">Kelas</Label>
                                    <Input id="kelas" value={payment.kelas} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="alamat_lengkap">Alamat Lengkap</Label>
                                    <Input id="alamat_lengkap" value={payment.alamat_lengkap} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="jenis_iuran">Jenis Iuran</Label>
                                    <Input id="jenis_iuran" value={payment.jenis_iuran === 'spp-bulanan' ? 'SPP Bulanan' : 'SPP Lainnya'} disabled />
                                </div>
                                <div>
                                    <Label htmlFor="periode_pembayaran">Periode Pembayaran</Label>
                                    <Input id="periode_pembayaran" value={payment.periode_pembayaran} disabled />
                                </div>
                                <div>
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
                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing}>
                                        Process
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={processing}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </form>
                            {/* Right Column: Image */}
                            <div>
                                <Label>Bukti Pembayaran</Label>
                                {payment.bukti_pembayaran ? (
                                    <img
                                        src={payment.bukti_pembayaran}
                                        alt="Bukti Pembayaran"
                                        className="mt-2 max-w-full h-auto rounded-md"
                                        onError={() => console.error('Gagal memuat gambar:', payment.bukti_pembayaran)}
                                    />
                                ) : (
                                    <p className="text-gray-500">Tidak ada bukti pembayaran.</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}