import React, { useState, useMemo } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  History,
  Bell,
  LayoutDashboard,
  LogIn,
  LogOut,
  MapPin,
  Search,
  CalendarDays,
  ArrowUpDown,
  ChevronDown,
  Clock,
  TrendingUp,
  Download,
  UserCheck,
  Timer,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

// ── Types ─────────────────────────────────────────────────────────────────────

type LogEntry = {
  id: number;
  date: string;
  location: string;
  timeIn: string;
  timeOut: string | null;    // null = still on campus
  scannedInBy: string;
  scannedOutBy: string | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseMinutes(t: string): number {
  const [time, period] = t.split(' ');
  const parts = time.split(':').map(Number);
  let h = parts[0];
  const m = parts[1];
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function calcDuration(timeIn: string, timeOut: string | null): string {
  if (!timeOut) return '—';
  const diff = parseMinutes(timeOut) - parseMinutes(timeIn);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockLogs: LogEntry[] = [
  { id: 1,  date: 'Feb 26, 2026', location: 'Main Gate',    timeIn: '07:58 AM', timeOut: null,       scannedInBy: 'Grd. Fernandez', scannedOutBy: null             },
  { id: 2,  date: 'Feb 25, 2026', location: 'Side Gate A',  timeIn: '08:05 AM', timeOut: '05:30 PM', scannedInBy: 'Grd. Reyes',     scannedOutBy: 'Grd. Fernandez' },
  { id: 3,  date: 'Feb 24, 2026', location: 'Main Gate',    timeIn: '08:20 AM', timeOut: '04:45 PM', scannedInBy: 'Grd. Torres',    scannedOutBy: 'Grd. Reyes'     },
  { id: 4,  date: 'Feb 23, 2026', location: 'Main Gate',    timeIn: '07:55 AM', timeOut: '06:10 PM', scannedInBy: 'Grd. Fernandez', scannedOutBy: 'Grd. Torres'    },
  { id: 5,  date: 'Feb 22, 2026', location: 'Main Gate',    timeIn: '08:33 AM', timeOut: '03:50 PM', scannedInBy: 'Grd. Reyes',     scannedOutBy: 'Grd. Fernandez' },
  { id: 6,  date: 'Feb 21, 2026', location: 'Faculty Gate', timeIn: '08:10 AM', timeOut: '05:00 PM', scannedInBy: 'Grd. Torres',    scannedOutBy: 'Grd. Reyes'     },
  { id: 7,  date: 'Feb 20, 2026', location: 'Main Gate',    timeIn: '07:48 AM', timeOut: '04:20 PM', scannedInBy: 'Grd. Fernandez', scannedOutBy: 'Grd. Torres'    },
  { id: 8,  date: 'Feb 19, 2026', location: 'Side Gate A',  timeIn: '08:15 AM', timeOut: '05:45 PM', scannedInBy: 'Grd. Reyes',     scannedOutBy: 'Grd. Fernandez' },
  { id: 9,  date: 'Feb 18, 2026', location: 'Main Gate',    timeIn: '07:50 AM', timeOut: '04:55 PM', scannedInBy: 'Grd. Torres',    scannedOutBy: 'Grd. Reyes'     },
  { id: 10, date: 'Feb 17, 2026', location: 'Main Gate',    timeIn: '08:00 AM', timeOut: '03:30 PM', scannedInBy: 'Grd. Fernandez', scannedOutBy: 'Grd. Torres'    },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',       icon: LayoutDashboard, href: '/student/',          active: false },
  { label: 'My QR Code',      icon: QrCode,          href: '/student/qr',        active: false },
  { label: 'Entry History',   icon: History,         href: '/student/history',   active: true  },
  { label: 'Incident Reports',icon: ClipboardList,   href: '/student/incidents', active: false },
  { label: 'Emergency Alerts',icon: Bell,            href: '/student/alerts',    active: false },
];

// ── Main Component ────────────────────────────────────────────────────────────

const StudentLogHistoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState<'all' | string>('all');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');

  // ── Derived ──────────────────────────────────────────────────────

  const locations = useMemo(
    () => ['all', ...Array.from(new Set(mockLogs.map((l) => l.location)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockLogs
      .filter(
        (l) =>
          (locationFilter === 'all' || l.location === locationFilter) &&
          (q === '' ||
            l.location.toLowerCase().includes(q) ||
            l.date.toLowerCase().includes(q) ||
            l.scannedInBy.toLowerCase().includes(q) ||
            (l.scannedOutBy ?? '').toLowerCase().includes(q)),
      )
      .sort((a, b) => (sortDir === 'desc' ? b.id - a.id : a.id - b.id));
  }, [search, locationFilter, sortDir]);

  const totalVisits  = mockLogs.length;
  const stillInside  = mockLogs.filter((l) => !l.timeOut).length;
  const completed    = totalVisits - stillInside;
  // This week: Feb 23–26
  const thisWeek     = mockLogs.filter((l) =>
    ['Feb 26, 2026', 'Feb 25, 2026', 'Feb 24, 2026', 'Feb 23, 2026'].includes(l.date),
  ).length;

  const hasFilters = locationFilter !== 'all' || search !== '';

  function clearFilters() {
    setSearch('');
    setLocationFilter('all');
  }

  const student = {
    name: 'Maria Santos',
    course: 'BSN 3-A',
    initials: 'MS',
  };

  // ── Render ───────────────────────────────────────────────────────

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
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{student.course}</p>
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
                  <BreadcrumbPage className="text-sm font-medium">Entry History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <CalendarDays size={10} />
                Feb 26, 2026
              </Badge>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Download size={13} />
                Export
              </Button>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Student Identity Banner ── */}
            <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-none">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] font-semibold text-sm">
                  {student.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{student.name}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[11px]">
                    {student.course}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">VSU-2023-0042</span>
                </div>
              </div>
              <div className="text-right hidden sm:block shrink-0">
                <p className="text-xs text-muted-foreground">Showing logs for</p>
                <p className="text-sm font-semibold text-foreground">Feb 2026</p>
              </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Total Visits</p>
                  <p className="text-2xl font-bold text-foreground">{totalVisits}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <History size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">All records this month</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-[#0d7c3d]">{completed}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <UserCheck size={11} className="text-[#0d7c3d]" />
                    <p className="text-[11px] text-muted-foreground">Entry &amp; exit recorded</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Still Inside</p>
                  <p className="text-2xl font-bold text-amber-600">{stillInside}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <LogIn size={11} className="text-amber-500" />
                    <p className="text-[11px] text-muted-foreground">No exit scanned yet</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">This Week</p>
                  <p className="text-2xl font-bold text-foreground">{thisWeek}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={11} className="text-[#0d7c3d]" />
                    <p className="text-[11px] text-muted-foreground">Feb 23–26</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Log Table ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <CardTitle className="text-base font-semibold shrink-0">Entry History</CardTitle>

                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search
                      size={14}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search by location or guard…"
                      className="pl-8 h-8 text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 ml-auto flex-wrap">
                    {/* Location filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                          <MapPin size={11} />
                          {locationFilter === 'all' ? 'Location' : locationFilter}
                          <ChevronDown size={10} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel className="text-xs">Gate / Location</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {locations.map((loc) => (
                          <DropdownMenuCheckboxItem
                            key={loc}
                            checked={locationFilter === loc}
                            onCheckedChange={() => setLocationFilter(loc)}
                            className="text-xs"
                          >
                            {loc === 'all' ? 'All Locations' : loc}
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

                    {/* Clear filters */}
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

                {/* Active filter pills */}
                {hasFilters && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {search && (
                      <Badge variant="secondary" className="text-[11px] gap-1">
                        Search: "{search}"
                      </Badge>
                    )}
                    {locationFilter !== 'all' && (
                      <Badge variant="secondary" className="text-[11px]">
                        {locationFilter}
                      </Badge>
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
                    <History size={32} strokeWidth={1.5} />
                    <p className="text-sm">No logs match your filters.</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs mt-1"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs pl-6">Date</TableHead>
                        <TableHead className="text-xs">Location</TableHead>
                        <TableHead className="text-xs">Time In</TableHead>
                        <TableHead className="text-xs">Time Out</TableHead>
                        <TableHead className="text-xs">Duration</TableHead>
                        <TableHead className="text-xs pr-6">Scanned By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((log) => (
                        <TableRow key={log.id} className="hover:bg-muted/30">
                          {/* Date */}
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays size={12} className="text-muted-foreground shrink-0" />
                              <span className="text-sm font-medium">{log.date}</span>
                            </div>
                          </TableCell>

                          {/* Location */}
                          <TableCell>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin size={10} />
                              {log.location}
                            </span>
                          </TableCell>

                          {/* Time In */}
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#0d7c3d]/10">
                                <LogIn size={9} className="text-[#0d7c3d]" />
                              </span>
                              <span className="text-xs text-foreground font-medium">{log.timeIn}</span>
                            </div>
                          </TableCell>

                          {/* Time Out */}
                          <TableCell>
                            {log.timeOut ? (
                              <div className="flex items-center gap-1.5">
                                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-muted">
                                  <LogOut size={9} className="text-muted-foreground" />
                                </span>
                                <span className="text-xs text-foreground font-medium">{log.timeOut}</span>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200">
                                <Clock size={9} />
                                On Campus
                              </span>
                            )}
                          </TableCell>

                          {/* Duration */}
                          <TableCell>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Timer size={11} />
                              {calcDuration(log.timeIn, log.timeOut)}
                            </div>
                          </TableCell>

                          {/* Scanned By */}
                          <TableCell className="pr-6">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[11px] text-muted-foreground">
                                In: {log.scannedInBy}
                              </span>
                              {log.scannedOutBy && (
                                <span className="text-[11px] text-muted-foreground">
                                  Out: {log.scannedOutBy}
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {filtered.length > 0 && (
                  <div className="flex items-center justify-between px-6 py-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Showing{' '}
                      <span className="font-medium text-foreground">{filtered.length}</span> of{' '}
                      <span className="font-medium text-foreground">{totalVisits}</span> visits
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[11px] gap-1">
                        <UserCheck size={9} />
                        {completed} completed
                      </Badge>
                      {stillInside > 0 && (
                        <Badge className="text-[11px] gap-1 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-50">
                          <Clock size={9} />
                          {stillInside} on campus
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StudentLogHistoryPage;
