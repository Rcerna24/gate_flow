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
  Clock,
  CalendarDays,
  Phone,
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  Eye,
  Timer,
  UserPlus,
  BadgeCheck,
  Hourglass,
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// ── Types ─────────────────────────────────────────────────────────────────────

type VisitorStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';

type VisitorPass = {
  id: number;
  fullName: string;
  avatar: string;
  contactNumber: string;
  purposeOfVisit: string;
  personToVisit: string;
  date: string;
  timeWindow: string;
  duration: string;
  status: VisitorStatus;
  submittedAt: string;
  type: 'Scheduled' | 'Walk-in';
  validUntil: string | null;
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockVisitors: VisitorPass[] = [
  {
    id: 1,
    fullName: 'Carlo Mendoza',
    avatar: 'CM',
    contactNumber: '09171234567',
    purposeOfVisit: 'Alumni Visit',
    personToVisit: 'Dean Aguilar',
    date: 'Feb 26, 2026',
    timeWindow: '10:00 AM – 12:00 PM',
    duration: '2 hours',
    status: 'Pending',
    submittedAt: '09:45 AM',
    type: 'Scheduled',
    validUntil: null,
  },
  {
    id: 2,
    fullName: 'Jessa Tan',
    avatar: 'JT',
    contactNumber: '09281234567',
    purposeOfVisit: 'Parents Day',
    personToVisit: 'Maria Santos (Student)',
    date: 'Feb 26, 2026',
    timeWindow: '11:00 AM – 01:00 PM',
    duration: '2 hours',
    status: 'Pending',
    submittedAt: '10:30 AM',
    type: 'Scheduled',
    validUntil: null,
  },
  {
    id: 3,
    fullName: 'Roberto Lim',
    avatar: 'RL',
    contactNumber: '09391234567',
    purposeOfVisit: 'Package Delivery',
    personToVisit: 'IT Department',
    date: 'Feb 26, 2026',
    timeWindow: '01:00 PM – 02:00 PM',
    duration: '1 hour',
    status: 'Approved',
    submittedAt: '12:55 PM',
    type: 'Walk-in',
    validUntil: '02:00 PM',
  },
  {
    id: 4,
    fullName: 'Liza Reyes',
    avatar: 'LR',
    contactNumber: '09451234567',
    purposeOfVisit: 'Meeting with Dean',
    personToVisit: 'Dean Aguilar',
    date: 'Feb 26, 2026',
    timeWindow: '09:00 AM – 11:00 AM',
    duration: '2 hours',
    status: 'Approved',
    submittedAt: '08:50 AM',
    type: 'Scheduled',
    validUntil: '11:00 AM',
  },
  {
    id: 5,
    fullName: 'Mark Villanueva',
    avatar: 'MV',
    contactNumber: '09561234567',
    purposeOfVisit: 'Equipment Delivery',
    personToVisit: 'IT Department',
    date: 'Feb 26, 2026',
    timeWindow: '10:30 AM – 01:30 PM',
    duration: '3 hours',
    status: 'Approved',
    submittedAt: '10:15 AM',
    type: 'Scheduled',
    validUntil: '01:30 PM',
  },
  {
    id: 6,
    fullName: 'Ana Corpus',
    avatar: 'AC',
    contactNumber: '09671234567',
    purposeOfVisit: 'Campus Tour',
    personToVisit: 'Admissions Office',
    date: 'Feb 26, 2026',
    timeWindow: '08:00 AM – 10:00 AM',
    duration: '2 hours',
    status: 'Expired',
    submittedAt: '07:55 AM',
    type: 'Scheduled',
    validUntil: '10:00 AM',
  },
  {
    id: 7,
    fullName: 'Ramon Guerrero',
    avatar: 'RG',
    contactNumber: '09781234567',
    purposeOfVisit: 'Job Application',
    personToVisit: 'HR Department',
    date: 'Feb 26, 2026',
    timeWindow: '09:00 AM – 10:00 AM',
    duration: '1 hour',
    status: 'Rejected',
    submittedAt: '08:45 AM',
    type: 'Walk-in',
    validUntil: null,
  },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, badge: null, href: '/guard/',            active: false },
  { label: 'QR Scanner',       icon: QrCode,          badge: null, href: '/guard/scanner',     active: false },
  { label: 'Entry Logs',       icon: ClipboardList,   badge: '24', href: '/guard/logs',        active: false },
  { label: 'Visitor Approval', icon: UserCheck,       badge: '2',  href: '/guard/visitors',    active: true  },
  { label: 'Incident Reports', icon: AlertTriangle,   badge: '5',  href: '/guard/incidents',   active: false },
  { label: 'SOS Broadcast',    icon: Megaphone,       badge: null, href: '/guard/sos',         active: false },
];

// ── Color maps ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<VisitorStatus, string> = {
  Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  Approved: 'bg-green-50 text-green-700 border-green-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
  Expired:  'bg-muted text-muted-foreground border-border',
};

const TYPE_COLORS: Record<string, string> = {
  Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  'Walk-in': 'bg-orange-50 text-orange-700 border-orange-200',
};

// ── Main Component ────────────────────────────────────────────────────────────

const GuardVisitorApprovalPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [walkInOpen, setWalkInOpen] = useState(false);
  const [viewVisitor, setViewVisitor] = useState<VisitorPass | null>(null);
  const [actionVisitor, setActionVisitor] = useState<{ visitor: VisitorPass; action: 'approve' | 'reject' } | null>(null);
  const [validityDuration, setValidityDuration] = useState('2');

  // ── Derived ──────────────────────────────────────────────────────

  const pending  = useMemo(() => mockVisitors.filter((v) => v.status === 'Pending'), []);
  const approved = useMemo(() => mockVisitors.filter((v) => v.status === 'Approved'), []);

  const filteredPending = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return pending;
    return pending.filter(
      (v) =>
        v.fullName.toLowerCase().includes(q) ||
        v.purposeOfVisit.toLowerCase().includes(q) ||
        v.personToVisit.toLowerCase().includes(q),
    );
  }, [search, pending]);

  const filteredApproved = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return approved;
    return approved.filter(
      (v) =>
        v.fullName.toLowerCase().includes(q) ||
        v.purposeOfVisit.toLowerCase().includes(q) ||
        v.personToVisit.toLowerCase().includes(q),
    );
  }, [search, approved]);

  const pendingCount  = pending.length;
  const approvedCount = approved.length;
  const rejectedCount = mockVisitors.filter((v) => v.status === 'Rejected').length;
  const expiredCount  = mockVisitors.filter((v) => v.status === 'Expired').length;

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
                  <BreadcrumbPage className="text-sm font-medium">Visitor Approval</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <CalendarDays size={10} />
                Feb 26, 2026
              </Badge>

              {/* Register Walk-in Button */}
              <Button
                size="sm"
                className="gap-1.5 text-sm bg-[#0d7c3d] hover:bg-[#0a6633] text-white"
                onClick={() => setWalkInOpen(true)}
              >
                <UserPlus size={14} />
                Register Walk-in
              </Button>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Hourglass size={11} className="text-amber-600" />
                    <p className="text-[11px] text-muted-foreground">Awaiting review</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Active Visitors</p>
                  <p className="text-2xl font-bold text-[#0d7c3d]">{approvedCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users size={11} className="text-[#0d7c3d]" />
                    <p className="text-[11px] text-muted-foreground">On campus now</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <XCircle size={11} className="text-red-500" />
                    <p className="text-[11px] text-muted-foreground">Access denied today</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Expired</p>
                  <p className="text-2xl font-bold text-foreground">{expiredCount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Timer size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">QR lapsed today</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Visitor Panels ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <CardTitle className="text-base font-semibold shrink-0">Visitor Passes</CardTitle>

                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search
                      size={14}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search by name, purpose, or host…"
                      className="pl-8 h-8 text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <Separator />

              <Tabs defaultValue="pending" className="w-full">
                <div className="px-6 pt-4">
                  <TabsList className="w-auto">
                    <TabsTrigger value="pending" className="text-xs gap-1.5">
                      Pending
                      {pendingCount > 0 && (
                        <span className="rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 leading-none">
                          {pendingCount}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="active" className="text-xs gap-1.5">
                      Active
                      {approvedCount > 0 && (
                        <span className="rounded-full bg-green-100 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 leading-none">
                          {approvedCount}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* ── Pending Tab ── */}
                <TabsContent value="pending" className="mt-0">
                  <CardContent className="px-6 pb-6 pt-4">
                    {filteredPending.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground/50">
                        <UserCheck size={32} strokeWidth={1.5} />
                        <p className="text-sm">No pending visitor requests.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredPending.map((visitor) => (
                          <div
                            key={visitor.id}
                            className="rounded-xl border bg-amber-50/40 border-amber-100 p-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                              {/* Left: visitor info */}
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <Avatar className="h-10 w-10 shrink-0">
                                  <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
                                    {visitor.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold">{visitor.fullName}</p>
                                    <Badge
                                      variant="outline"
                                      className={`text-[10px] ${TYPE_COLORS[visitor.type]}`}
                                    >
                                      {visitor.type}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {visitor.purposeOfVisit}
                                  </p>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <UserCheck size={10} />
                                      Visiting: <span className="font-medium text-foreground ml-0.5">{visitor.personToVisit}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock size={10} />
                                      {visitor.timeWindow}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone size={10} />
                                      {visitor.contactNumber}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <CalendarDays size={10} />
                                      Submitted: {visitor.submittedAt}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: actions */}
                              <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs gap-1 text-[#0d7c3d] hover:bg-[#0d7c3d]/10"
                                  onClick={() => setViewVisitor(visitor)}
                                >
                                  <Eye size={12} />
                                  View
                                </Button>
                                <div className="flex gap-1.5">
                                  <Button
                                    size="sm"
                                    className="h-7 text-xs bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1 px-3"
                                    onClick={() =>
                                      setActionVisitor({ visitor, action: 'approve' })
                                    }
                                  >
                                    <CheckCircle2 size={11} />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50 gap-1 px-3"
                                    onClick={() =>
                                      setActionVisitor({ visitor, action: 'reject' })
                                    }
                                  >
                                    <XCircle size={11} />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </TabsContent>

                {/* ── Active Visitors Tab ── */}
                <TabsContent value="active" className="mt-0">
                  <CardContent className="px-6 pb-6 pt-4">
                    {filteredApproved.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground/50">
                        <Users size={32} strokeWidth={1.5} />
                        <p className="text-sm">No active visitors on campus.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredApproved.map((visitor) => (
                          <div
                            key={visitor.id}
                            className="rounded-xl border bg-white p-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                              {/* Left: visitor info */}
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <Avatar className="h-10 w-10 shrink-0">
                                  <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-xs font-semibold">
                                    {visitor.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold">{visitor.fullName}</p>
                                    <Badge
                                      variant="outline"
                                      className={`text-[10px] ${TYPE_COLORS[visitor.type]}`}
                                    >
                                      {visitor.type}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-[10px] bg-green-50 text-green-700 border-green-200"
                                    >
                                      <BadgeCheck size={9} className="mr-0.5" />
                                      Approved
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {visitor.purposeOfVisit}
                                  </p>
                                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <UserCheck size={10} />
                                      Visiting: <span className="font-medium text-foreground ml-0.5">{visitor.personToVisit}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock size={10} />
                                      Valid until:{' '}
                                      <span className="font-semibold text-[#0d7c3d] ml-0.5">
                                        {visitor.validUntil}
                                      </span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone size={10} />
                                      {visitor.contactNumber}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: actions */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs gap-1 text-[#0d7c3d] hover:bg-[#0d7c3d]/10"
                                  onClick={() => setViewVisitor(visitor)}
                                >
                                  <Eye size={12} />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50 gap-1 px-3"
                                >
                                  <XCircle size={11} />
                                  Revoke
                                </Button>
                              </div>
                            </div>

                            {/* QR validity progress bar */}
                            <div className="mt-3 flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[#0d7c3d]"
                                  style={{ width: '60%' }}
                                />
                              </div>
                              <span className="text-[10px] text-muted-foreground shrink-0">
                                QR Active
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </main>
        </SidebarInset>
      </div>

      {/* ── View Visitor Detail Dialog ── */}
      <Dialog open={viewVisitor !== null} onOpenChange={(open) => !open && setViewVisitor(null)}>
        <DialogContent className="sm:max-w-md">
          {viewVisitor && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="h-11 w-11 shrink-0">
                    <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-sm font-semibold">
                      {viewVisitor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-base">{viewVisitor.fullName}</DialogTitle>
                    <DialogDescription className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${TYPE_COLORS[viewVisitor.type]}`}
                      >
                        {viewVisitor.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${STATUS_COLORS[viewVisitor.status]}`}
                      >
                        {viewVisitor.status}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-1">
                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Contact Number', value: viewVisitor.contactNumber, icon: Phone },
                    { label: 'Date', value: viewVisitor.date, icon: CalendarDays },
                    { label: 'Purpose', value: viewVisitor.purposeOfVisit, icon: ClipboardList },
                    { label: 'Person to Visit', value: viewVisitor.personToVisit, icon: UserCheck },
                    { label: 'Time Window', value: viewVisitor.timeWindow, icon: Clock },
                    { label: 'Duration', value: viewVisitor.duration, icon: Timer },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-lg border p-3 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                        <Icon size={9} />
                        {label}
                      </div>
                      <p className="text-xs font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>

                {/* If approved — show QR placeholder */}
                {viewVisitor.status === 'Approved' && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Temporary QR Code
                    </p>
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/20">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-white">
                        <QrCode size={36} className="text-muted-foreground/30" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-[#0d7c3d]">QR Active</p>
                        <p className="text-[11px] text-muted-foreground">
                          Valid until <span className="font-semibold text-foreground">{viewVisitor.validUntil}</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground/70">
                          QR auto-expires at end of time window
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="ghost" onClick={() => setViewVisitor(null)}>
                  Close
                </Button>
                {viewVisitor.status === 'Pending' && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5"
                      onClick={() => {
                        setViewVisitor(null);
                        setActionVisitor({ visitor: viewVisitor, action: 'reject' });
                      }}
                    >
                      <XCircle size={13} />
                      Reject
                    </Button>
                    <Button
                      className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5"
                      onClick={() => {
                        setViewVisitor(null);
                        setActionVisitor({ visitor: viewVisitor, action: 'approve' });
                      }}
                    >
                      <CheckCircle2 size={13} />
                      Approve
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Approve / Reject Confirm Dialog ── */}
      <Dialog
        open={actionVisitor !== null}
        onOpenChange={(open) => !open && setActionVisitor(null)}
      >
        <DialogContent className="sm:max-w-sm">
          {actionVisitor && (
            <>
              <DialogHeader>
                <DialogTitle
                  className={`flex items-center gap-2 ${
                    actionVisitor.action === 'approve' ? 'text-[#0d7c3d]' : 'text-red-600'
                  }`}
                >
                  {actionVisitor.action === 'approve' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <XCircle size={18} />
                  )}
                  {actionVisitor.action === 'approve' ? 'Approve Visitor' : 'Reject Visitor'}
                </DialogTitle>
                <DialogDescription>
                  {actionVisitor.action === 'approve'
                    ? `Approve access for ${actionVisitor.visitor.fullName}? A time-bound QR code will be generated.`
                    : `Deny entry to ${actionVisitor.visitor.fullName}? This action will be recorded.`}
                </DialogDescription>
              </DialogHeader>

              {actionVisitor.action === 'approve' && (
                <div className="space-y-3 py-1">
                  <div className="rounded-xl border bg-muted/30 p-3.5 space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-[10px] font-semibold">
                          {actionVisitor.visitor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-semibold">{actionVisitor.visitor.fullName}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {actionVisitor.visitor.purposeOfVisit}
                        </p>
                      </div>
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      Requested: {actionVisitor.visitor.timeWindow}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                      Set Validity Duration
                    </Label>
                    <Select value={validityDuration} onValueChange={setValidityDuration}>
                      <SelectTrigger className="h-9 text-sm">
                        <Timer size={12} className="text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="full">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[11px] text-muted-foreground">
                      QR code will automatically expire after the selected duration.
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="ghost" onClick={() => setActionVisitor(null)}>
                  Cancel
                </Button>
                {actionVisitor.action === 'approve' ? (
                  <Button
                    className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5"
                    onClick={() => setActionVisitor(null)}
                  >
                    <CheckCircle2 size={13} />
                    Approve & Generate QR
                  </Button>
                ) : (
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white gap-1.5"
                    onClick={() => setActionVisitor(null)}
                  >
                    <XCircle size={13} />
                    Confirm Rejection
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Register Walk-in Visitor Dialog ── */}
      <Dialog open={walkInOpen} onOpenChange={setWalkInOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus size={18} className="text-[#0d7c3d]" />
              Register Walk-in Visitor
            </DialogTitle>
            <DialogDescription>
              Fill in the visitor's details to create a temporary access pass.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="wk-name">Full Name <span className="text-red-500">*</span></Label>
                <Input id="wk-name" placeholder="e.g. Juan dela Cruz" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wk-contact">Contact Number <span className="text-red-500">*</span></Label>
                <Input id="wk-contact" placeholder="09XXXXXXXXX" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wk-duration">Validity Duration <span className="text-red-500">*</span></Label>
                <Select defaultValue="1">
                  <SelectTrigger id="wk-duration" className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">30 minutes</SelectItem>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="wk-purpose">Purpose of Visit <span className="text-red-500">*</span></Label>
                <Input id="wk-purpose" placeholder="e.g. Package Delivery" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="wk-host">Person / Department to Visit <span className="text-red-500">*</span></Label>
                <Input id="wk-host" placeholder="e.g. IT Department" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wk-date">Date</Label>
                <Input id="wk-date" type="date" defaultValue="2026-02-26" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wk-location">Entry Gate</Label>
                <Select defaultValue="main">
                  <SelectTrigger id="wk-location" className="h-9">
                    <MapPin size={12} className="text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Gate</SelectItem>
                    <SelectItem value="side">Side Gate A</SelectItem>
                    <SelectItem value="back">Back Gate</SelectItem>
                    <SelectItem value="faculty">Faculty Gate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setWalkInOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5">
              <Plus size={13} />
              Register & Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default GuardVisitorApprovalPage;
