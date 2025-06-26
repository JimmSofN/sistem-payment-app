import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Banknote, LayoutGrid, Clock4, ShieldCheck } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Ajukan Pembayaran',
        href: '/pembayaran',
        icon: Banknote
    },
    {
        title: 'History',
        href: '/history',
        icon: Clock4
    },
    {
        title: 'Verifikasi Pengajuan',
        href: '/verifikasi-pengajuan',
        icon: ShieldCheck,
        roles: ['staff']
    }
];


export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { role: string } | null } }>().props;
    const userRole = auth.user?.role || 'user';

    const filteredNavItems = mainNavItems.filter(item =>
        !item.roles || item.roles.includes(userRole)
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}