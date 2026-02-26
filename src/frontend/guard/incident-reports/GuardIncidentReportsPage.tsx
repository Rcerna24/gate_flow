import React, { useState, useMemo } from 'react';
import {
  Shield,
  QrCode,
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  AlertTriangle,
  Megaphone,
  MapPin,
  Search,
  Filter,
  CalendarDays,
  ArrowUpDown,
  ChevronDown,
  Clock,
  Plus,
  Send,
  Camera,
  Eye,
  FileText,
  CircleDot,
  CheckCircle2,
  ImageIcon,
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
  SidebarMenuBadge,
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// ── Types ─────────────────────────────────────────────────────────────────────

type Severity = 'High' | 'Medium' | 'Low';
type IncidentStatus = 'Pending' | 'Resolved';

type IncidentReport = {
  id: number;
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  avatar: string;
  severity: Severity;
  status: IncidentStatus;
  date: string;
  time: string;
  hasImage: boolean;
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockIncidents: IncidentReport[] = [
  {
    id: 1,
    title: 'Suspicious Individual Near Admin Building',
    description: 'Unidentified person loitering near the administration building entrance for over 30 minutes. Refused to show identification when approached.',
    location: 'Admin Building',
    reportedBy: 'Grd. Fernandez',
    avatar: 'GF',
    severity: 'High',
    status: 'Pending',
    date: 'Feb 26, 2026',
    time: '08:15 AM',
    hasImage: true,
  },
  {
    id: 2,
    title: 'Unauthorized Vehicle in Restricted Zone',
    description: 'Unmarked vehicle parked in the faculty-only parking area without a valid permit. License plate recorded.',
    location: 'Parking Area B',
    reportedBy: 'Grd. Fernandez',
    avatar: 'GF',
    severity: 'Medium',
    status: 'Pending',
    date: 'Feb 26, 2026',
    time: '09:30 AM',
    hasImage: true,
  },
  {
    id: 3,
    title: 'Lost Student ID Reported',
    description: 'Student Maria Santos reported a lost ID card near the library area. ID may have been dropped between 10:00 AM and 10:30 AM.',
    location: 'Library',
    reportedBy: 'Grd. Torres',
    avatar: 'GT',
    severity: 'Low',
    status: 'Resolved',
    date: 'Feb 26, 2026',
    time: '10:15 AM',
    hasImage: false,
  },
  {
    id: 4,
    title: 'Broken Perimeter Fence',
    description: 'Section of the perimeter fence near the athletics field is damaged. Gap large enough for unauthorized entry.',
    location: 'Athletics Field',
    reportedBy: 'Grd. Reyes',
    avatar: 'GR',
    severity: 'High',
    status: 'Pending',
    date: 'Feb 26, 2026',
    time: '11:00 AM',
    hasImage: true,
  },
  {
    id: 5,
    title: 'Fire Extinguisher Missing',
    description: 'Fire extinguisher from the second floor hallway of the Engineering building is missing from its mount.',
    location: 'College of Engineering',
    reportedBy: 'Grd. Fernandez',
    avatar: 'GF',
    severity: 'Medium',
    status: 'Pending',
    date: 'Feb 26, 2026',
    time: '11:45 AM',
    hasImage: false,
  },
  {
    id: 6,
    title: 'Minor Altercation at Canteen',
    description: 'Two students involved in a verbal altercation at the main canteen. Situation was de-escalated by guard on duty.',
    location: 'Main Canteen',
    reportedBy: 'Grd. Torres',
    avatar: 'GT',
    severity: 'Medium',
    status: 'Resolved',
    date: 'Feb 26, 2026',
    time: '12:20 PM',
    hasImage: false,
  },
  {
    id: 7,
    title: 'Water Leak Near Electrical Panel',
    description: 'Water leak detected near the electrical panel at the ground floor of the Science building. Maintenance notified.',
    location: 'Science Building',
    reportedBy: 'Grd. Reyes',
    avatar: 'GR',
    severity: 'High',
    status: 'Resolved',
    date: 'Feb 26, 2026',
    time: '01:05 PM',
    hasImage: true,
  },
  {
    id: 8,
    title: 'Stray Animal on Campus',
    description: 'Stray dog spotted near the main gate area. Animal appears non-aggressive but may cause concern for students.',
    location: 'Main Gate',
    reportedBy: 'Grd. Fernandez',
    avatar: 'GF',
    severity: 'Low',
    status: 'Resolved',
    date: 'Feb 26, 2026',
    time: '01:30 PM',
    hasImage: false,
  },
  {
    id: 9,
    title: 'Unattended Bag in Lobby',
    description: 'Unattended backpack left in the lobby of the IT building for over an hour. Area cordoned off as precaution.',
    location: 'IT Building',
    reportedBy: 'Grd. Torres',
    avatar: 'GT',
    severity: 'High',
    status: 'Pending',
    date: 'Feb 26, 2026',
    time: '02:10 PM',
    hasImage: true,
  },
  {
    id: 10,
    title: 'Graffiti on Gymnasium Wall',
    description: 'New graffiti found on the south wall of the gymnasium. Photos taken for documentation.',
    location: 'Gymnasium',
    reportedBy: 'Grd. Reyes',
    avatar: 'GR',
    severity: 'Low',
    status: 'Pending',
    date: 'Feb 26, 2026',
    time: '02:45 PM',
    hasImage: true,
  },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, badge: null, href: '/guard/',            active: false },
  { label: 'QR Scanner',       icon: QrCode,          badge: null, href: '/guard/scanner',     active: false },
  { label: 'Entry Logs',       icon: ClipboardList,   badge: '24', href: '/guard/logs',        active: false },
  { label: 'Visitor Approval', icon: UserCheck,        badge: '2',  href: '#',                  active: false },
  { label: 'Incident Reports', icon: AlertTriangle,    badge: '5',  href: '/guard/incidents',   active: true  },
  { label: 'SOS Broadcast',    icon: Megaphone,        badge: null, href: '#',                  active: false },
];

// ── Color maps ────────────────────────────────────────────────────────────────

const SEVERITY_COLORS: Record<Severity, string> = {
  High:   'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low:    'bg-green-50 text-green-700 border-green-200',
};

const SEVERITY_ICON_COLORS: Record<Severity, string> = {
  High:   'bg-red-100 text-red-600',
  Medium: 'bg-amber-100 text-amber-600',
  Low:    'bg-green-100 text-green-600',
};

const STATUS_COLORS: Record<IncidentStatus, string> = {
  Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  Resolved: 'bg-green-50 text-green-700 border-green-200',
};

// ── Main Component ────────────────────────────────────────────────────────────

const GuardIncidentReportsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | Severity>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | IncidentStatus>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | string>('all');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [submitOpen, setSubmitOpen] = useState(false);
  const [viewIncident, setViewIncident] = useState<IncidentReport | null>(null);

  // ── Derived ──────────────────────────────────────────────────────

  const locations = useMemo(
    () => ['all', ...Array.from(new Set(mockIncidents.map((i) => i.location)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockIncidents
      .filter(
        (i) =>
          (severityFilter === 'all' || i.severity === severityFilter) &&
          (statusFilter === 'all' || i.status === statusFilter) &&
          (locationFilter === 'all' || i.location === locationFilter) &&
          (q === '' ||
            i.title.toLowerCase().includes(q) ||
            i.reportedBy.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q)),
      )
      .sort((a, b) => (sortDir === 'desc' ? b.id - a.id : a.id - b.id));
  }, [search, severityFilter, statusFilter, locationFilter, sortDir]);

  const totalReports = mockIncidents.length;
  const pendingCount = mockIncidents.filter((i) => i.status === 'Pending').length;
  const resolvedCount = mockIncidents.filter((i) => i.status === 'Resolved').length;
  const highCount = mockIncidents.filter((i) => i.severity === 'High').length;

  const hasFilters =
    severityFilter !== 'all' || statusFilter !== 'all' || locationFilter !== 'all' || search !== '';

  function clearFilters() {
    setSearch('');
    setSeverityFilter('all');
    setStatusFilter('all');
    setLocationFilter('all');
  }

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
                  Guard Portal
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
                          {item.badge && (
                            <SidebarMenuBadge className="ml-auto bg-muted text-muted-foreground text-[10px]">
                              {item.badge}
                            </SidebarMenuBadge>
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
                  GF
                </AvatarFallback>
              </Avatar>
              <div className="leading-none">
                <p className="text-sm font-medium text-foreground">Grd. Fernandez</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Main Gate · On Duty</p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto border-green-300 text-green-700 text-[10px]"
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
                  <BreadcrumbLink href="/guard/" className="text-sm text-muted-foreground">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">Incident Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <CalendarDays size={10} />
                Feb 26, 2026
              </Badge>

              {/* Submit Incident Dialog */}
              <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="gap-1.5 text-sm bg-[#0d7c3d] hover:bg-[#0a6633] text-white"
                  >
                    <Plus size={14} />
                    Report Incident
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle size={18} className="text-amber-600" />
                      Submit Incident Report
                    </DialogTitle>
                    <DialogDescription>
                      Document a campus security incident with details and severity level.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="inc-title">Incident Title</Label>
                      <Input id="inc-title" placeholder="e.g. Unauthorized Vehicle" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="inc-location">Location</Label>
                      <Input id="inc-location" placeholder="e.g. Parking Area B" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="inc-severity">Severity</Label>
                      <Select>
                        <SelectTrigger id="inc-severity">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="inc-desc">Description</Label>
                      <Textarea
                        id="inc-desc"
                        placeholder="Describe what happened in detail..."
                        className="resize-none"
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Attach Image (optional)</Label>
                      <Button
                        variant="outline"
                        className="gap-2 justify-start text-muted-foreground"
                      >
                        <Camera size={14} />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setSubmitOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5">
                      <Send size={13} />
                      Submit Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{totalReports}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FileText size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">All incidents today</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CircleDot size={11} className="text-amber-600" />
                    <p className="text-[11px] text-muted-foreground">Awaiting resolution</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-[#0d7c3d]">{resolvedCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 size={11} className="text-[#0d7c3d]" />
                    <p className="text-[11px] text-muted-foreground">Closed today</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">High Severity</p>
                  <p className="text-2xl font-bold text-red-600">{highCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle size={11} className="text-red-600" />
                    <p className="text-[11px] text-muted-foreground">Requires attention</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Incident Table ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <CardTitle className="text-base font-semibold shrink-0">
                    Incident Reports
                  </CardTitle>

                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search
                      size={14}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search by title, reporter, or location…"
                      className="pl-8 h-8 text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 ml-auto flex-wrap">
                    {/* Severity filter */}
                    <Select
                      value={severityFilter}
                      onValueChange={(v) => setSeverityFilter(v as typeof severityFilter)}
                    >
                      <SelectTrigger className="h-8 w-32 text-xs gap-1">
                        <Filter size={11} />
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Status filter */}
                    <Select
                      value={statusFilter}
                      onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
                    >
                      <SelectTrigger className="h-8 w-32 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Location filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                          <MapPin size={11} />
                          {locationFilter === 'all' ? 'Location' : locationFilter}
                          <ChevronDown size={10} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel className="text-xs">Location</DropdownMenuLabel>
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
                    {severityFilter !== 'all' && (
                      <Badge variant="secondary" className="text-[11px]">
                        {severityFilter} Severity
                      </Badge>
                    )}
                    {statusFilter !== 'all' && (
                      <Badge variant="secondary" className="text-[11px]">
                        {statusFilter}
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
                    <AlertTriangle size={32} strokeWidth={1.5} />
                    <p className="text-sm">No incidents match your filters.</p>
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
                        <TableHead className="text-xs pl-6">Incident</TableHead>
                        <TableHead className="text-xs">Location</TableHead>
                        <TableHead className="text-xs">Reported By</TableHead>
                        <TableHead className="text-xs text-center">Severity</TableHead>
                        <TableHead className="text-xs text-center">Status</TableHead>
                        <TableHead className="text-xs text-right">Time</TableHead>
                        <TableHead className="text-xs text-center pr-6">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((inc) => (
                        <TableRow key={inc.id} className="hover:bg-muted/30">
                          <TableCell className="pl-6 max-w-65">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${SEVERITY_ICON_COLORS[inc.severity]}`}
                              >
                                <AlertTriangle size={14} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{inc.title}</p>
                                {inc.hasImage && (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground mt-0.5">
                                    <ImageIcon size={9} />
                                    Photo attached
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin size={10} />
                              {inc.location}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-[9px] font-semibold">
                                  {inc.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{inc.reportedBy}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${SEVERITY_COLORS[inc.severity]}`}
                            >
                              {inc.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${STATUS_COLORS[inc.status]}`}
                            >
                              {inc.status === 'Pending' && <CircleDot size={9} className="mr-0.5" />}
                              {inc.status === 'Resolved' && <CheckCircle2 size={9} className="mr-0.5" />}
                              {inc.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock size={10} />
                              {inc.time}
                            </span>
                          </TableCell>
                          <TableCell className="text-center pr-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1 text-[#0d7c3d] hover:text-[#0d7c3d] hover:bg-[#0d7c3d]/10"
                              onClick={() => setViewIncident(inc)}
                            >
                              <Eye size={12} />
                              View
                            </Button>
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
                      <span className="font-medium text-foreground">{totalReports}</span> incidents
                    </p>
                    <Badge variant="secondary" className="text-[11px]">
                      Today · Feb 26, 2026
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>

      {/* ── View Incident Detail Dialog ── */}
      <Dialog open={viewIncident !== null} onOpenChange={(open) => !open && setViewIncident(null)}>
        <DialogContent className="sm:max-w-lg">
          {viewIncident && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${SEVERITY_ICON_COLORS[viewIncident.severity]}`}
                  >
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <DialogTitle className="text-base">{viewIncident.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {viewIncident.location}
                      </span>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {viewIncident.date} at {viewIncident.time}
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Meta badges */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${SEVERITY_COLORS[viewIncident.severity]}`}
                  >
                    {viewIncident.severity} Severity
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${STATUS_COLORS[viewIncident.status]}`}
                  >
                    {viewIncident.status === 'Pending' && (
                      <CircleDot size={10} className="mr-1" />
                    )}
                    {viewIncident.status === 'Resolved' && (
                      <CheckCircle2 size={10} className="mr-1" />
                    )}
                    {viewIncident.status}
                  </Badge>
                  {viewIncident.hasImage && (
                    <Badge variant="secondary" className="text-xs gap-1">
                      <ImageIcon size={10} />
                      Image Attached
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {viewIncident.description}
                  </p>
                </div>

                {/* Image placeholder */}
                {viewIncident.hasImage && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Attached Photo
                    </p>
                    <div className="flex items-center justify-center h-36 rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/20 text-muted-foreground/40">
                      <div className="flex flex-col items-center gap-1.5">
                        <ImageIcon size={28} strokeWidth={1.5} />
                        <span className="text-xs font-medium">Image preview</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reporter info */}
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-xs font-semibold">
                      {viewIncident.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{viewIncident.reportedBy}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Reported on {viewIncident.date} at {viewIncident.time}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="ghost" onClick={() => setViewIncident(null)}>
                  Close
                </Button>
                {viewIncident.status === 'Pending' && (
                  <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5">
                    <CheckCircle2 size={13} />
                    Mark Resolved
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default GuardIncidentReportsPage;
