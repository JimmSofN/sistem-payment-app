import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pembayaran',
        href: '/pembayaran',
    },
];

export default function Pembayaran({ flash }: { flash?: { success?: string; error?: string } }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nis: '',
        nama_lengkap: '',
        ttl: '',
        jenis_kelamin: '',
        kelas: '',
        alamat_lengkap: '',
        jenis_iuran: '',
        periode_pembayaran: '',
        bukti_pembayaran: null as File | null,
    });

    if (flash?.success) {
        toast.success(flash.success, { duration: 4000 });
    }
    if (flash?.error) {
        toast.error(flash.error, { duration: 4000 });
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error('File harus berupa PNG, JPG, atau JPEG.');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error('Ukuran file maksimum adalah 10MB.');
                return;
            }

            setData('bukti_pembayaran', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setData('bukti_pembayaran', null);
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            !data.nis ||
            !data.nama_lengkap ||
            !data.ttl ||
            !data.jenis_kelamin ||
            !data.kelas ||
            !data.alamat_lengkap ||
            !data.jenis_iuran ||
            !data.periode_pembayaran ||
            !data.bukti_pembayaran
        ) {
            toast.error('Semua kolom wajib diisi, termasuk bukti pembayaran.');
            return;
        }

        post('/pembayaran', {
            onSuccess: () => {
                toast.success('Pembayaran berhasil dikirim!', { duration: 4000 });
                reset();
                setImagePreview(null);
                if (formRef.current) {
                    formRef.current.reset();
                }
            },
            onError: () => {
                toast.error('Terjadi kesalahan, periksa input Anda.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pembayaran" />
            <Toaster position="top-right" />
            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl py-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-center">Form Pembayaran Siswa</CardTitle>
                            <CardDescription className="text-center">Silakan lengkapi data pembayaran dengan benar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                                {/* NIS */}
                                <div className="space-y-2">
                                    <Label htmlFor="nis">Nomor Induk Siswa (NIS)</Label>
                                    <Input
                                        id="nis"
                                        type="text"
                                        placeholder="Masukkan NIS"
                                        value={data.nis}
                                        onChange={(e) => setData('nis', e.target.value)}
                                        required
                                    />
                                    {errors.nis && <p className="text-red-500 text-sm">{errors.nis}</p>}
                                </div>

                                {/* Nama Lengkap */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama">Nama Lengkap</Label>
                                    <Input
                                        id="nama"
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        value={data.nama_lengkap}
                                        onChange={(e) => setData('nama_lengkap', e.target.value)}
                                        required
                                    />
                                    {errors.nama_lengkap && <p className="text-red-500 text-sm">{errors.nama_lengkap}</p>}
                                </div>

                                {/* Tempat Tanggal Lahir */}
                                <div className="space-y-2">
                                    <Label htmlFor="ttl">Tempat Tanggal Lahir</Label>
                                    <Input
                                        id="ttl"
                                        type="text"
                                        placeholder="Contoh: Jakarta, 15 Januari 2005"
                                        value={data.ttl}
                                        onChange={(e) => setData('ttl', e.target.value)}
                                        required
                                    />
                                    {errors.ttl && <p className="text-red-500 text-sm">{errors.ttl}</p>}
                                </div>

                                {/* Jenis Kelamin */}
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <Select
                                        value={data.jenis_kelamin}
                                        onValueChange={(value) => setData('jenis_kelamin', value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_kelamin && <p className="text-red-500 text-sm">{errors.jenis_kelamin}</p>}
                                </div>

                                {/* Kelas */}
                                <div className="space-y-2">
                                    <Label htmlFor="kelas">Kelas</Label>
                                    <Input
                                        id="kelas"
                                        type="text"
                                        placeholder="Contoh: XII IPA 1"
                                        value={data.kelas}
                                        onChange={(e) => setData('kelas', e.target.value)}
                                        required
                                    />
                                    {errors.kelas && <p className="text-red-500 text-sm">{errors.kelas}</p>}
                                </div>

                                {/* Alamat Lengkap */}
                                <div className="space-y-2">
                                    <Label htmlFor="alamat">Alamat Lengkap</Label>
                                    <Textarea
                                        id="alamat"
                                        placeholder="Masukkan alamat lengkap"
                                        className="min-h-[100px] resize-none"
                                        value={data.alamat_lengkap}
                                        onChange={(e) => setData('alamat_lengkap', e.target.value)}
                                        required
                                    />
                                    {errors.alamat_lengkap && <p className="text-red-500 text-sm">{errors.alamat_lengkap}</p>}
                                </div>

                                {/* Jenis Iuran */}
                                <div className="space-y-2">
                                    <Label htmlFor="jenis-iuran">Jenis Iuran</Label>
                                    <Select
                                        value={data.jenis_iuran}
                                        onValueChange={(value) => setData('jenis_iuran', value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis iuran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="spp-bulanan">SPP Bulanan</SelectItem>
                                            <SelectItem value="spp-lainnya">SPP Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_iuran && <p className="text-red-500 text-sm">{errors.jenis_iuran}</p>}
                                </div>

                                {/* Periode Pembayaran */}
                                <div className="space-y-2">
                                    <Label htmlFor="periode">Periode Pembayaran</Label>
                                    <Select
                                        value={data.periode_pembayaran}
                                        onValueChange={(value) => setData('periode_pembayaran', value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih periode pembayaran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="januari-2025">Januari 2025</SelectItem>
                                            <SelectItem value="februari-2025">Februari 2025</SelectItem>
                                            <SelectItem value="maret-2025">Maret 2025</SelectItem>
                                            <SelectItem value="april-2025">April 2025</SelectItem>
                                            <SelectItem value="mei-2025">Mei 2025</SelectItem>
                                            <SelectItem value="juni-2025">Juni 2025</SelectItem>
                                            <SelectItem value="januari-juni-2025">Januari 2025 - Juni 2025</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.periode_pembayaran && <p className="text-red-500 text-sm">{errors.periode_pembayaran}</p>}
                                </div>

                                {/* Bukti Pembayaran */}
                                <div className="space-y-2">
                                    <Label htmlFor="bukti-pembayaran">Bukti Pembayaran</Label>
                                    <div className="space-y-4 min-h-[200px]">
                                        {!imagePreview ? (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                                <div className="text-center">
                                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="mt-4">
                                                        <Label
                                                            htmlFor="file-upload"
                                                            className="cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                                                        >
                                                            <span>Upload gambar</span>
                                                            <Input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                accept="image/png,image/jpeg,image/jpg"
                                                                onChange={handleImageUpload}
                                                                required
                                                            />
                                                        </Label>
                                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG hingga 10MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview || "/placeholder.svg"}
                                                    alt="Preview bukti pembayaran"
                                                    className="w-full max-h-96 object-contain rounded-lg border"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={removeImage}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                        {errors.bukti_pembayaran && <p className="text-red-500 text-sm">{errors.bukti_pembayaran}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing ? 'Mengirim...' : 'Kirim Data Pembayaran'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}