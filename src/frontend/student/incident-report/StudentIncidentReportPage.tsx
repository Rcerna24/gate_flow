import React, { useState } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  History,
  Bell,
  LayoutDashboard,
  AlertTriangle,
  MapPin,
  Clock,
  CalendarDays,
  Search,
  ChevronDown,
  ArrowUpDown,
  Plus,
  ImagePlus,
  CheckCircle2,
  CircleDashed,
  Eye,
  FileWarning,
  Info,
  ShieldCheck,
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// ── Types ─────────────────────────────────────────────────────────────────────

type Severity = 'High' | 'Medium' | 'Low';
type ReportStatus = 'Pending' | 'Resolved';

type IncidentReport = {
  id: number;
  title: string;
  description: string;
  location: string;
  severity: Severity;
  status: ReportStatus;
  hasImage: boolean;
  submittedAt: string;
  resolvedAt: string | null;
  actionTaken: string | null;
  resolvedBy: string | null;
};

// ── Config ────────────────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<Severity, { label: string; color: string; bg: string; border: string }> = {
  High:   { label: 'High',   color: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200'   },
  Medium: { label: 'Medium', color: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  Low:    { label: 'Low',    color: 'text-sky-700',    bg: 'bg-sky-50',    border: 'border-sky-200'   },
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockReports: IncidentReport[] = [
  {
    id: 1,
    title: 'Broken Streetlight Near Dormitory',
    description: 'The streetlight along the pathway to the female dormitory has been out for three days. The area is very dark at night, posing a safety risk for students.',
    location: 'Female Dormitory Pathway',
    severity: 'Medium',
    status: 'Resolved',
    hasImage: true,
    submittedAt: 'Feb 20, 2026 — 08:30 PM',
    resolvedAt: 'Feb 22, 2026 — 10:00 AM',
    actionTaken: 'Maintenance team was dispatched. Streetlight has been replaced and is now fully operational.',
    resolvedBy: 'Admin Santos',
  },
  {
    id: 2,
    title: 'Suspicious Person Loitering Near Chapel',
    description: 'An unidentified individual has been seen loitering near the VSU Chapel for an extended period. They do not appear to be a student or staff member.',
    location: 'VSU Chapel Area',
    severity: 'High',
    status: 'Pending',
    hasImage: false,
    submittedAt: 'Feb 26, 2026 — 09:15 AM',
    resolvedAt: null,
    actionTaken: null,
    resolvedBy: null,
  },
  {
    id: 3,
    title: 'Damaged Gate Lock at Side Entrance',
    description: 'The lock on the side gate near the College of Agriculture building appears to be broken. The gate does not close properly and can be pushed open.',
    location: 'Side Gate — College of Agriculture',
    severity: 'Medium',
    status: 'Resolved',
    hasImage: true,
    submittedAt: 'Feb 14, 2026 — 03:45 PM',
    resolvedAt: 'Feb 16, 2026 — 09:00 AM',
    actionTaken: 'Lock has been replaced and the gate is now secured. Security personnel have been assigned to monitor the area.',
    resolvedBy: 'Admin Reyes',
  },
  {
    id: 4,
    title: 'Stray Dogs Inside Campus',
    description: 'Multiple stray dogs entered through an unclosed gate and are roaming near the library and canteen areas, causing disturbance to students.',
    location: 'Library & Canteen Area',
    severity: 'Low',
    status: 'Resolved',
    hasImage: false,
    submittedAt: 'Feb 10, 2026 — 11:20 AM',
    resolvedAt: 'Feb 10, 2026 — 02:00 PM',
    actionTaken: 'Security personnel escorted the stray animals out of campus. Gate has been secured and reminded guards to maintain entry control.',
    resolvedBy: 'Admin Santos',
  },
  {
    id: 5,
    title: 'Harassment Witnessed Near Parking Area',
    description: 'I witnessed a verbal altercation near the faculty parking area involving two individuals. One appeared to be threatening the other. The situation was tense.',
    location: 'Faculty Parking Area',
    severity: 'High',
    status: 'Pending',
    hasImage: false,
    submittedAt: 'Feb 25, 2026 — 04:50 PM',
    resolvedAt: null,
    actionTaken: null,
    resolvedBy: null,
  },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, href: '/student/',          active: false },
  { label: 'My QR Code',       icon: QrCode,          href: '/student/qr',        active: false },
  { label: 'Entry History',    icon: History,         href: '/student/history',   active: false },
  { label: 'Incident Reports', icon: ClipboardList,   href: '/student/incidents', active: true  },
  { label: 'Emergency Alerts', icon: Bell,            href: '/student/alerts',    active: false },
];

const LOCATIONS = [
  'Main Gate', 'Side Gate A', 'Faculty Gate', 'Library', 'Canteen',
  'Dormitory', 'Chapel Area', 'Administration Building', 'Science Complex',
  'College of Agriculture', 'Engineering Building', 'Faculty Parking Area', 'Other',
];

// ── Main Component ────────────────────────────────────────────────────────────

const StudentIncidentReportPage: React.FC = () => {
  const [search,       setSearch]       = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
  const [sortDir,      setSortDir]      = useState<'desc' | 'asc'>('desc');

  // Submit dialog
  const [submitOpen,   setSubmitOpen]   = useState(false);
  const [formTitle,    setFormTitle]    = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formSeverity, setFormSeverity] = useState<Severity | ''>('');
  const [formDesc,     setFormDesc]     = useState('');
  const [formError,    setFormError]    = useState('');
  const [submitted,    setSubmitted]    = useState(false);

  // View dialog
  const [viewReport,   setViewReport]   = useState<IncidentReport | null>(null);

  // ── Derived ──────────────────────────────────────────────────────

  const q = search.toLowerCase();
  const filtered = mockReports
    .filter(
      (r) =>
        (severityFilter === 'all' || r.severity === severityFilter) &&
        (statusFilter   === 'all' || r.status   === statusFilter)   &&
        (q === '' ||
          r.title.toLowerCase().includes(q)       ||
          r.location.toLowerCase().includes(q)    ||
          r.description.toLowerCase().includes(q)),
    )
    .sort((a, b) => (sortDir === 'desc' ? b.id - a.id : a.id - b.id));

  const totalReports   = mockReports.length;
  const pendingCount   = mockReports.filter((r) => r.status === 'Pending').length;
  const resolvedCount  = mockReports.filter((r) => r.status === 'Resolved').length;
  const highCount      = mockReports.filter((r) => r.severity === 'High').length;
  const hasFilters     = severityFilter !== 'all' || statusFilter !== 'all' || search !== '';

  function clearFilters() {
    setSearch(''); setSeverityFilter('all'); setStatusFilter('all');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!formTitle.trim()) { setFormError('Please provide a title.'); return; }
    if (!formLocation)     { setFormError('Please select a location.'); return; }
    if (!formSeverity)     { setFormError('Please select a severity level.'); return; }
    if (!formDesc.trim())  { setFormError('Please add a description.'); return; }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubmitOpen(false);
      setFormTitle(''); setFormLocation(''); setFormSeverity(''); setFormDesc(''); setFormError('');
    }, 2000);
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
                          {item.label === 'Incident Reports' && pendingCount > 0 && (
                            <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-white">
                              {pendingCount}
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
                  <BreadcrumbPage className="text-sm font-medium">Incident Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <CalendarDays size={10} />
                Feb 26, 2026
              </Badge>
              <Button
                size="sm"
                className="gap-1.5 text-xs bg-[#0d7c3d] hover:bg-[#0b6835] text-white"
                onClick={() => setSubmitOpen(true)}
              >
                <Plus size={13} />
                Submit Report
              </Button>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-5">

            {/* ── Info Notice ── */}
            <div className="flex items-start gap-2.5 rounded-lg border border-muted bg-white px-4 py-3">
              <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                You can submit security-related incidents for review by VSU Security. Once submitted, you can track the status of your reports and view admin responses here.
              </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{totalReports}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ClipboardList size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">Submitted by you</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CircleDashed size={11} className="text-amber-500" />
                    <p className="text-[11px] text-muted-foreground">Awaiting admin review</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-[#0d7c3d]">{resolvedCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 size={11} className="text-[#0d7c3d]" />
                    <p className="text-[11px] text-muted-foreground">Action taken by admin</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">High Severity</p>
                  <p className="text-2xl font-bold text-red-600">{highCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle size={11} className="text-red-500" />
                    <p className="text-[11px] text-muted-foreground">Urgent reports</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Reports List ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <CardTitle className="text-base font-semibold shrink-0">My Reports</CardTitle>

                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search reports…"
                      className="pl-8 h-8 text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 ml-auto flex-wrap">
                    {/* Severity filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                          <AlertTriangle size={11} />
                          {severityFilter === 'all' ? 'Severity' : severityFilter}
                          <ChevronDown size={10} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuLabel className="text-xs">Severity</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(['all', 'High', 'Medium', 'Low'] as const).map((s) => (
                          <DropdownMenuCheckboxItem
                            key={s}
                            checked={severityFilter === s}
                            onCheckedChange={() => setSeverityFilter(s)}
                            className="text-xs"
                          >
                            {s === 'all' ? 'All Severities' : s}
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
                        {(['all', 'Pending', 'Resolved'] as const).map((s) => (
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

                    {/* Sort */}
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
                    {severityFilter !== 'all' && (
                      <Badge variant="secondary" className="text-[11px]">{severityFilter}</Badge>
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
                    <FileWarning size={32} strokeWidth={1.5} />
                    <p className="text-sm">No reports match your filters.</p>
                    <Button variant="ghost" size="sm" className="text-xs mt-1" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filtered.map((report) => {
                      const sev    = SEVERITY_CONFIG[report.severity];
                      const isPending  = report.status === 'Pending';
                      return (
                        <div key={report.id} className="flex items-start gap-4 px-6 py-5 hover:bg-muted/20 transition-colors">
                          {/* Severity dot */}
                          <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${sev.bg} ${sev.border}`}>
                            <AlertTriangle size={16} className={sev.color} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-foreground">{report.title}</span>
                              {/* Severity badge */}
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${sev.bg} ${sev.color} ${sev.border}`}>
                                {report.severity}
                              </span>
                              {/* Status badge */}
                              {isPending ? (
                                <Badge className="text-[10px] gap-1 bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 py-0">
                                  <CircleDashed size={9} />
                                  Pending
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-[10px] border-green-300 text-green-700 gap-1 py-0">
                                  <CheckCircle2 size={9} />
                                  Resolved
                                </Badge>
                              )}
                              {report.hasImage && (
                                <Badge variant="secondary" className="text-[10px] gap-1 py-0">
                                  <ImagePlus size={9} />
                                  Photo
                                </Badge>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {report.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin size={10} />
                                {report.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                Submitted: {report.submittedAt}
                              </span>
                              {report.resolvedAt && (
                                <span className="flex items-center gap-1 text-[#0d7c3d]">
                                  <CheckCircle2 size={10} />
                                  Resolved: {report.resolvedAt}
                                </span>
                              )}
                            </div>

                            {/* Action taken preview */}
                            {report.actionTaken && (
                              <div className="mt-2.5 flex items-start gap-2 rounded-md border border-[#0d7c3d]/20 bg-[#0d7c3d]/5 px-3 py-2">
                                <ShieldCheck size={12} className="text-[#0d7c3d] shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                  <p className="text-[10px] font-semibold text-[#0d7c3d] mb-0.5">
                                    Admin Action · {report.resolvedBy}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                                    {report.actionTaken}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Pending notice */}
                            {isPending && (
                              <div className="mt-2.5 flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                                <CircleDashed size={12} className="text-amber-500 shrink-0" />
                                <p className="text-[11px] text-amber-700">
                                  Your report is under review by the security admin.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* View button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-1.5 shrink-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setViewReport(report)}
                          >
                            <Eye size={13} />
                            View
                          </Button>
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
                      <span className="font-medium text-foreground">{totalReports}</span> reports
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="text-[11px] gap-1 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-50">
                        <CircleDashed size={9} />
                        {pendingCount} pending
                      </Badge>
                      <Badge variant="outline" className="text-[11px] gap-1 border-green-300 text-green-700">
                        <CheckCircle2 size={9} />
                        {resolvedCount} resolved
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>

      {/* ── Submit Report Dialog ── */}
      <Dialog open={submitOpen} onOpenChange={(o) => { if (!submitted) setSubmitOpen(o); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d7c3d]">
                <ClipboardList size={14} className="text-white" />
              </div>
              Submit Incident Report
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0d7c3d]/10">
                <CheckCircle2 size={28} className="text-[#0d7c3d]" />
              </div>
              <p className="font-semibold text-foreground">Report Submitted!</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Your incident report has been sent to VSU Security. You will be notified once the admin reviews it.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Incident Title <span className="text-red-500">*</span></Label>
                <Input
                  className="h-9 text-sm"
                  placeholder="Brief title describing the incident"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              {/* Location + Severity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Location <span className="text-red-500">*</span></Label>
                  <Select value={formLocation} onValueChange={setFormLocation}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc} className="text-sm">{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Severity <span className="text-red-500">*</span></Label>
                  <Select value={formSeverity} onValueChange={(v) => setFormSeverity(v as Severity)}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High"   className="text-sm">🔴 High</SelectItem>
                      <SelectItem value="Medium" className="text-sm">🟡 Medium</SelectItem>
                      <SelectItem value="Low"    className="text-sm">🔵 Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Description <span className="text-red-500">*</span>
                  <span className="ml-2 font-normal text-muted-foreground">({formDesc.length}/500)</span>
                </Label>
                <Textarea
                  placeholder="Describe what happened in as much detail as possible…"
                  className="text-sm resize-none min-h-24"
                  maxLength={500}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>

              {/* Image upload (UI only) */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Attach Photo <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <label className="flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 px-4 py-5 text-center cursor-pointer hover:bg-muted/40 transition-colors">
                  <ImagePlus size={20} className="text-muted-foreground/50" />
                  <p className="text-xs text-muted-foreground">Click to upload image</p>
                  <p className="text-[10px] text-muted-foreground/60">PNG, JPG up to 5MB</p>
                  <input type="file" accept="image/*" className="sr-only" />
                </label>
              </div>

              {/* Error */}
              {formError && (
                <div className="flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2.5">
                  <AlertTriangle size={13} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-600">{formError}</p>
                </div>
              )}

              <DialogFooter className="pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSubmitOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs bg-[#0d7c3d] hover:bg-[#0b6835] text-white gap-1.5"
                >
                  <ClipboardList size={13} />
                  Submit Report
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ── View Report Dialog ── */}
      {viewReport && (() => {
        const sev = SEVERITY_CONFIG[viewReport.severity];
        const isPending = viewReport.status === 'Pending';
        return (
          <Dialog open onOpenChange={() => setViewReport(null)}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base leading-snug">
                  <AlertTriangle size={16} className={sev.color} />
                  {viewReport.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-1">
                {/* Badges row */}
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${sev.bg} ${sev.color} ${sev.border}`}>
                    {viewReport.severity} Severity
                  </span>
                  {isPending ? (
                    <Badge className="text-[11px] gap-1 bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50">
                      <CircleDashed size={10} />
                      Pending Review
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[11px] border-green-300 text-green-700 gap-1">
                      <CheckCircle2 size={10} />
                      Resolved
                    </Badge>
                  )}
                  {viewReport.hasImage && (
                    <Badge variant="secondary" className="text-[11px] gap-1">
                      <ImagePlus size={10} />
                      Photo Attached
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-[10px] text-muted-foreground font-medium mb-1.5 uppercase tracking-wider">Description</p>
                  <p className="text-sm text-foreground leading-relaxed">{viewReport.description}</p>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-muted-foreground mb-1">Location</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <MapPin size={11} className="text-muted-foreground" />
                      {viewReport.location}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-muted-foreground mb-1">Submitted At</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <CalendarDays size={11} className="text-muted-foreground" />
                      {viewReport.submittedAt}
                    </p>
                  </div>
                  {viewReport.resolvedAt && (
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-muted-foreground mb-1">Resolved At</p>
                      <p className="font-medium text-[#0d7c3d] flex items-center gap-1">
                        <CheckCircle2 size={11} />
                        {viewReport.resolvedAt}
                      </p>
                    </div>
                  )}
                  {viewReport.resolvedBy && (
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-muted-foreground mb-1">Resolved By</p>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <ShieldCheck size={11} className="text-[#0d7c3d]" />
                        {viewReport.resolvedBy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Image placeholder */}
                {viewReport.hasImage && (
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 h-32">
                    <div className="flex flex-col items-center gap-1.5 text-muted-foreground/50">
                      <ImagePlus size={22} strokeWidth={1.5} />
                      <p className="text-xs">Attached photo</p>
                    </div>
                  </div>
                )}

                {/* Admin action taken */}
                {viewReport.actionTaken ? (
                  <div className="rounded-lg border border-[#0d7c3d]/25 bg-[#0d7c3d]/5 p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <ShieldCheck size={14} className="text-[#0d7c3d]" />
                      <p className="text-xs font-semibold text-[#0d7c3d]">
                        Admin Action Taken · {viewReport.resolvedBy}
                      </p>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{viewReport.actionTaken}</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CircleDashed size={14} className="text-amber-500" />
                      <p className="text-xs font-semibold text-amber-700">Awaiting Admin Review</p>
                    </div>
                    <p className="text-xs text-amber-600 leading-relaxed">
                      Your report has been received and is currently under review by VSU Security. You will be notified once action is taken.
                    </p>
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

export default StudentIncidentReportPage;
