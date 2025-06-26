import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Banknote, LayoutGrid, Clock4, ShieldCheck, Search, Pencil } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        roles: ['user']
    },
    {
        title: 'Ajukan Pembayaran',
        href: '/pembayaran',
        icon: Banknote,
        roles: ['user']
    },
    {
        title: 'History',
        href: '/history',
        icon: Clock4,
        roles: ['user']
    },
    {
        title: 'Staff Dashboard',
        href: '/staff-dashboard',
        icon: LayoutGrid,
        roles: ['staff']
    },
    {
        title: 'Verifikasi Pengajuan',
        href: '/verifikasi-pengajuan',
        icon: ShieldCheck,
        roles: ['staff']
    },
    {
        title: 'Cari Pengajuan',
        href: '/cari-pengajuan',
        icon: Search,
        roles: ['staff']
    },
    {
        title: 'Admin Dashboard',
        href: '/admin-dashboard',
        icon: LayoutGrid,
        roles: ['admin']
    },
    {
        title: 'Edit Pengajuan',
        href: '/admin-edit-pengajuan',
        icon: Pencil,
        roles: ['admin']
    },
    {
        title: 'Cari Pengajuan',
        href: '/admin-cari-pengajuan',
        icon: Search,
        roles: ['admin']
    },
];


export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { role: string } | null } }>().props;
    const userRole = auth.user?.role || 'user';

    const logoRedirect = userRole === 'staff' ? '/staff-dashboard' : userRole === 'admin' ? '/admin-dashboard' : '/dashboard';


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={logoRedirect} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems.filter(item => !item.roles || item.roles.includes(userRole))} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}