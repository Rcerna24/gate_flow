import React, { useState } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  History,
  Bell,
  LayoutDashboard,
  AlertTriangle,
  Flame,
  Waves,
  CloudLightning,
  MessageSquareWarning,
  Siren,
  Clock,
  CalendarDays,
  Search,
  ArrowUpDown,
  ChevronDown,
  Phone,
  Info,
  CheckCircle2,
  Radio,
  Smartphone,
  MonitorSmartphone,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// ── Types ─────────────────────────────────────────────────────────────────────

type EmergencyType = 'Earthquake' | 'Fire' | 'Security Threat' | 'Weather Warning' | 'Custom Message';
type AlertStatus   = 'Active' | 'Resolved';

type EmergencyAlert = {
  id: number;
  type: EmergencyType;
  message: string;
  triggeredBy: string;
  triggeredAt: string;
  resolvedAt: string | null;
  status: AlertStatus;
  notifiedCount: number;
  smsDelivered: boolean;
};

// ── Emergency type config ─────────────────────────────────────────────────────

const TYPE_CONFIG: Record<EmergencyType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  'Earthquake':       { icon: Waves,                 color: 'text-orange-600', bg: 'bg-orange-50',  border: 'border-orange-200' },
  'Fire':             { icon: Flame,                 color: 'text-red-600',    bg: 'bg-red-50',     border: 'border-red-200'    },
  'Security Threat':  { icon: AlertTriangle,         color: 'text-red-700',    bg: 'bg-red-50',     border: 'border-red-300'    },
  'Weather Warning':  { icon: CloudLightning,        color: 'text-sky-600',    bg: 'bg-sky-50',     border: 'border-sky-200'    },
  'Custom Message':   { icon: MessageSquareWarning,  color: 'text-amber-600',  bg: 'bg-amber-50',   border: 'border-amber-200'  },
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockAlerts: EmergencyAlert[] = [
  {
    id: 1,
    type: 'Security Threat',
    message: 'Unauthorized individual reported near the Engineering Building. All students are advised to stay indoors and await further instructions from security personnel.',
    triggeredBy: 'Admin Reyes',
    triggeredAt: 'Feb 26, 2026 — 10:14 AM',
    resolvedAt: null,
    status: 'Active',
    notifiedCount: 1248,
    smsDelivered: true,
  },
  {
    id: 2,
    type: 'Weather Warning',
    message: 'Signal No. 1 is now raised over the province of Leyte. Classes may be suspended. Monitor official announcements from VSU administration.',
    triggeredBy: 'Admin Santos',
    triggeredAt: 'Feb 24, 2026 — 06:30 AM',
    resolvedAt: 'Feb 24, 2026 — 03:00 PM',
    status: 'Resolved',
    notifiedCount: 1302,
    smsDelivered: true,
  },
  {
    id: 3,
    type: 'Fire',
    message: 'Smoke detected in the vicinity of the Science Complex. Evacuation of all nearby buildings is underway. Proceed to the main field immediately.',
    triggeredBy: 'Grd. Fernandez',
    triggeredAt: 'Feb 20, 2026 — 02:45 PM',
    resolvedAt: 'Feb 20, 2026 — 04:10 PM',
    status: 'Resolved',
    notifiedCount: 1195,
    smsDelivered: true,
  },
  {
    id: 4,
    type: 'Earthquake',
    message: 'A 5.2-magnitude earthquake has been recorded near Leyte. Please drop, cover, and hold on. Do not use elevators. Await clearance from security before resuming activities.',
    triggeredBy: 'Admin Reyes',
    triggeredAt: 'Feb 15, 2026 — 11:22 AM',
    resolvedAt: 'Feb 15, 2026 — 12:00 PM',
    status: 'Resolved',
    notifiedCount: 1260,
    smsDelivered: true,
  },
  {
    id: 5,
    type: 'Custom Message',
    message: 'Scheduled fire drill will commence at 3:00 PM today. All students and personnel are required to participate. Please follow directions from floor wardens.',
    triggeredBy: 'Admin Santos',
    triggeredAt: 'Feb 12, 2026 — 02:30 PM',
    resolvedAt: 'Feb 12, 2026 — 03:45 PM',
    status: 'Resolved',
    notifiedCount: 1280,
    smsDelivered: false,
  },
  {
    id: 6,
    type: 'Security Threat',
    message: 'Suspicious package found near the Administration Building. Security is on-site. Avoid the area until further notice.',
    triggeredBy: 'Grd. Torres',
    triggeredAt: 'Feb 5, 2026 — 09:50 AM',
    resolvedAt: 'Feb 5, 2026 — 11:30 AM',
    status: 'Resolved',
    notifiedCount: 1215,
    smsDelivered: true,
  },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, href: '/student/',          active: false },
  { label: 'My QR Code',       icon: QrCode,          href: '/student/qr',        active: false },
  { label: 'Entry History',    icon: History,         href: '/student/history',   active: false },
  { label: 'Incident Reports', icon: ClipboardList,   href: '/student/incidents', active: false },
  { label: 'Emergency Alerts', icon: Bell,            href: '/student/alerts',    active: true  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const EMERGENCY_TYPES: EmergencyType[] = [
  'Earthquake', 'Fire', 'Security Threat', 'Weather Warning', 'Custom Message',
];

// ── Main Component ────────────────────────────────────────────────────────────

const StudentEmergencyAlertsPage: React.FC = () => {
  const [search,      setSearch]      = useState('');
  const [typeFilter,  setTypeFilter]  = useState<EmergencyType | 'all'>('all');
  const [statusFilter,setStatusFilter]= useState<AlertStatus | 'all'>('all');
  const [sortDir,     setSortDir]     = useState<'desc' | 'asc'>('desc');
  const [selected,    setSelected]    = useState<EmergencyAlert | null>(null);

  const activeAlert = mockAlerts.find((a) => a.status === 'Active') ?? null;

  const q = search.toLowerCase();
  const filtered = mockAlerts
    .filter(
      (a) =>
        (typeFilter   === 'all' || a.type   === typeFilter)  &&
        (statusFilter === 'all' || a.status === statusFilter) &&
        (q === '' ||
          a.type.toLowerCase().includes(q)        ||
          a.message.toLowerCase().includes(q)     ||
          a.triggeredBy.toLowerCase().includes(q) ||
          a.triggeredAt.toLowerCase().includes(q)),
    )
    .sort((a, b) => (sortDir === 'desc' ? b.id - a.id : a.id - b.id));

  const totalAlerts  = mockAlerts.length;
  const activeCount  = mockAlerts.filter((a) => a.status === 'Active').length;
  const todayCount   = mockAlerts.filter((a) => a.triggeredAt.startsWith('Feb 26, 2026')).length;
  const monthCount   = mockAlerts.length;

  const hasFilters = typeFilter !== 'all' || statusFilter !== 'all' || search !== '';

  function clearFilters() {
    setSearch('');
    setTypeFilter('all');
    setStatusFilter('all');
  }

  const student = { name: 'Maria Santos', section: 'BSN 3-A', initials: 'MS' };

  // ── Render ────────────────────────────────────────────────────────

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">

        {/* ── Sidebar ── */}
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7c3d]">
                <Shield size={16} className="text-white" />
              </div>
              <div className="leading-none">
                <p className="font-semibold text-sm text-foreground">VSU Security</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  Student Portal
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent className="px-2 py-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-1">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton isActive={item.active} className="gap-2.5" asChild>
                        <a href={item.href}>
                          <item.icon size={16} />
                          <span>{item.label}</span>
                          {item.label === 'Emergency Alerts' && activeCount > 0 && (
                            <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                              {activeCount}
                            </span>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-4 py-4 border-t">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-xs font-semibold">
                  {student.initials}
                </AvatarFallback>
              </Avatar>
              <div className="leading-none min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{student.section}</p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto shrink-0 border-green-300 text-green-700 text-[10px]"
              >
                Active
              </Badge>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main Content ── */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex h-14 items-center gap-3 border-b bg-white px-5 shrink-0">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/student/" className="text-sm text-muted-foreground">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">Emergency Alerts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <CalendarDays size={10} />
                Feb 26, 2026
              </Badge>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-5">

            {/* ── Active Emergency Banner ── */}
            {activeAlert && (() => {
              const cfg = TYPE_CONFIG[activeAlert.type];
              const Icon = cfg.icon;
              return (
                <div className="relative overflow-hidden rounded-xl border-2 border-red-400 bg-red-50 p-5 shadow-sm">
                  {/* Pulsing background ring */}
                  <span className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-red-200 opacity-40 animate-ping" />
                  <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500 shadow">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse inline-block" />
                            Active Emergency
                          </span>
                          <Badge className="bg-red-100 text-red-700 border border-red-300 hover:bg-red-100 text-[10px]">
                            {activeAlert.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-red-900 leading-snug">
                          {activeAlert.message}
                        </p>
                        <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                          <Siren size={11} />
                          Triggered by {activeAlert.triggeredBy} · {activeAlert.triggeredAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white/60 px-3 py-2 text-xs text-red-700 font-medium">
                        <Smartphone size={12} />
                        SMS sent to {activeAlert.notifiedCount.toLocaleString()} users
                      </div>
                      <a
                        href="tel:09123456789"
                        className="flex items-center justify-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600 transition-colors"
                      >
                        <Phone size={12} />
                        Call Security
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── Read-only notice ── */}
            <div className="flex items-start gap-2.5 rounded-lg border border-muted bg-white px-4 py-3">
              <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This page displays emergency broadcasts issued by VSU Security. You cannot trigger an SOS from this portal. In case of emergency, contact the nearest guard or call the security office.
              </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Total Alerts</p>
                  <p className="text-2xl font-bold text-foreground">{totalAlerts}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Radio size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">All broadcasts</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Active Now</p>
                  <p className={`text-2xl font-bold ${activeCount > 0 ? 'text-red-600' : 'text-foreground'}`}>
                    {activeCount}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Siren size={11} className={activeCount > 0 ? 'text-red-500' : 'text-muted-foreground'} />
                    <p className="text-[11px] text-muted-foreground">
                      {activeCount > 0 ? 'Ongoing emergency' : 'No active emergency'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Today</p>
                  <p className="text-2xl font-bold text-foreground">{todayCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CalendarDays size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">Feb 26, 2026</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">This Month</p>
                  <p className="text-2xl font-bold text-foreground">{monthCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MonitorSmartphone size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">Feb 2026</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Alert History ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <CardTitle className="text-base font-semibold shrink-0">Broadcast History</CardTitle>

                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts…"
                      className="pl-8 h-8 text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 ml-auto flex-wrap">
                    {/* Type filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                          <Siren size={11} />
                          {typeFilter === 'all' ? 'Type' : typeFilter}
                          <ChevronDown size={10} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">Emergency Type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={typeFilter === 'all'}
                          onCheckedChange={() => setTypeFilter('all')}
                          className="text-xs"
                        >
                          All Types
                        </DropdownMenuCheckboxItem>
                        {EMERGENCY_TYPES.map((t) => (
                          <DropdownMenuCheckboxItem
                            key={t}
                            checked={typeFilter === t}
                            onCheckedChange={() => setTypeFilter(t)}
                            className="text-xs"
                          >
                            {t}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Status filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                          <CheckCircle2 size={11} />
                          {statusFilter === 'all' ? 'Status' : statusFilter}
                          <ChevronDown size={10} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(['all', 'Active', 'Resolved'] as const).map((s) => (
                          <DropdownMenuCheckboxItem
                            key={s}
                            checked={statusFilter === s}
                            onCheckedChange={() => setStatusFilter(s)}
                            className="text-xs"
                          >
                            {s === 'all' ? 'All Statuses' : s}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Sort toggle */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs gap-1.5"
                      onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
                    >
                      <ArrowUpDown size={11} />
                      {sortDir === 'desc' ? 'Newest' : 'Oldest'}
                    </Button>

                    {hasFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-muted-foreground"
                        onClick={clearFilters}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>

                {/* Filter pills */}
                {hasFilters && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {search && (
                      <Badge variant="secondary" className="text-[11px] gap-1">
                        Search: "{search}"
                      </Badge>
                    )}
                    {typeFilter !== 'all' && (
                      <Badge variant="secondary" className="text-[11px]">{typeFilter}</Badge>
                    )}
                    {statusFilter !== 'all' && (
                      <Badge variant="secondary" className="text-[11px]">{statusFilter}</Badge>
                    )}
                    <span className="text-[11px] text-muted-foreground ml-0.5 self-center">
                      {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground/50">
                    <Bell size={32} strokeWidth={1.5} />
                    <p className="text-sm">No alerts match your filters.</p>
                    <Button variant="ghost" size="sm" className="text-xs mt-1" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filtered.map((alert) => {
                      const cfg  = TYPE_CONFIG[alert.type];
                      const Icon = cfg.icon;
                      const isActive = alert.status === 'Active';
                      return (
                        <div
                          key={alert.id}
                          className={`flex items-start gap-4 px-6 py-5 hover:bg-muted/20 transition-colors cursor-pointer ${isActive ? 'bg-red-50/40' : ''}`}
                          onClick={() => setSelected(alert)}
                        >
                          {/* Icon */}
                          <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${cfg.bg} ${cfg.border}`}>
                            <Icon size={18} className={cfg.color} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-foreground">{alert.type}</span>
                              {isActive ? (
                                <span className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                                  <span className="h-1 w-1 rounded-full bg-white animate-pulse inline-block" />
                                  Live
                                </span>
                              ) : (
                                <Badge variant="outline" className="text-[10px] border-green-300 text-green-700 gap-1 py-0">
                                  <CheckCircle2 size={9} />
                                  Resolved
                                </Badge>
                              )}
                              {alert.smsDelivered && (
                                <Badge variant="secondary" className="text-[10px] gap-1 py-0">
                                  <Smartphone size={9} />
                                  SMS
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {alert.message}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Siren size={10} />
                                {alert.triggeredBy}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                {alert.triggeredAt}
                              </span>
                              {alert.resolvedAt && (
                                <span className="flex items-center gap-1 text-[#0d7c3d]">
                                  <CheckCircle2 size={10} />
                                  Resolved {alert.resolvedAt}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Notified count */}
                          <div className="shrink-0 text-right hidden sm:block">
                            <p className="text-sm font-semibold text-foreground">
                              {alert.notifiedCount.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-muted-foreground">notified</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {filtered.length > 0 && (
                  <div className="flex items-center justify-between px-6 py-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Showing{' '}
                      <span className="font-medium text-foreground">{filtered.length}</span> of{' '}
                      <span className="font-medium text-foreground">{totalAlerts}</span> alerts
                    </p>
                    <div className="flex items-center gap-2">
                      {activeCount > 0 && (
                        <Badge className="text-[11px] gap-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-50">
                          <Siren size={9} />
                          {activeCount} active
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-[11px] gap-1">
                        <CheckCircle2 size={9} />
                        {mockAlerts.filter((a) => a.status === 'Resolved').length} resolved
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>

      {/* ── Alert Detail Dialog ── */}
      {selected && (() => {
        const cfg  = TYPE_CONFIG[selected.type];
        const Icon = cfg.icon;
        const isActive = selected.status === 'Active';
        return (
          <Dialog open onOpenChange={() => setSelected(null)}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${cfg.bg} border ${cfg.border}`}>
                    <Icon size={16} className={cfg.color} />
                  </div>
                  {selected.type}
                  {isActive ? (
                    <span className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                      <span className="h-1 w-1 rounded-full bg-white animate-pulse inline-block" />
                      Active
                    </span>
                  ) : (
                    <Badge variant="outline" className="text-[10px] border-green-300 text-green-700">
                      Resolved
                    </Badge>
                  )}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-1">
                {/* Message */}
                <div className={`rounded-lg border p-4 ${cfg.bg} ${cfg.border}`}>
                  <p className="text-sm text-foreground leading-relaxed">{selected.message}</p>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-muted-foreground mb-1">Triggered By</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <Siren size={11} className="text-muted-foreground" />
                      {selected.triggeredBy}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-muted-foreground mb-1">Users Notified</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <Smartphone size={11} className="text-muted-foreground" />
                      {selected.notifiedCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-muted-foreground mb-1">Triggered At</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <Clock size={11} className="text-muted-foreground" />
                      {selected.triggeredAt}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-muted-foreground mb-1">Resolved At</p>
                    <p className={`font-medium flex items-center gap-1 ${selected.resolvedAt ? 'text-[#0d7c3d]' : 'text-amber-600'}`}>
                      <CheckCircle2 size={11} />
                      {selected.resolvedAt ?? 'Still Active'}
                    </p>
                  </div>
                </div>

                {/* SMS delivery */}
                <div className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 ${selected.smsDelivered ? 'bg-[#0d7c3d]/5 border-[#0d7c3d]/20' : 'bg-muted/30'}`}>
                  <Smartphone size={14} className={selected.smsDelivered ? 'text-[#0d7c3d]' : 'text-muted-foreground'} />
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {selected.smsDelivered ? 'SMS broadcast delivered' : 'No SMS broadcast for this alert'}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {selected.smsDelivered
                        ? `Sent to ${selected.notifiedCount.toLocaleString()} registered users`
                        : 'In-app notification only'}
                    </p>
                  </div>
                </div>

                {/* Emergency contacts */}
                {isActive && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-xs font-semibold text-red-700 mb-2">Emergency Contacts</p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { label: 'VSU Security Office', number: '(053) 565-0600' },
                        { label: 'Baybay City Police Station', number: '(053) 563-xxxx' },
                      ].map(({ label, number }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-[11px] text-red-700">{label}</span>
                          <a href={`tel:${number}`} className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-800">
                            <Phone size={10} />
                            {number}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        );
      })()}
    </SidebarProvider>
  );
};

export default StudentEmergencyAlertsPage;
