import React, { useState } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  Users,
  Megaphone,
  LayoutDashboard,
  LogIn,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  UserCheck,
  ScanLine,
  Bell,
  ChevronRight,
  TrendingUp,
  Activity,
  Camera,
  Send,
  Eye,
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ── Mock Data ────────────────────────────────────────────────────────────────

const entryLogs = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Student',
    type: 'Entry',
    location: 'Main Gate',
    time: '08:12 AM',
    avatar: 'MS',
    status: 'success',
  },
  {
    id: 2,
    name: 'Juan dela Cruz',
    role: 'Faculty',
    type: 'Entry',
    location: 'Main Gate',
    time: '08:25 AM',
    avatar: 'JC',
    status: 'success',
  },
  {
    id: 3,
    name: 'Rosa Lomibao',
    role: 'Visitor',
    type: 'Entry',
    location: 'Side Gate',
    time: '09:00 AM',
    avatar: 'RL',
    status: 'success',
  },
  {
    id: 4,
    name: 'Pedro Alcantara',
    role: 'Student',
    type: 'Exit',
    location: 'Main Gate',
    time: '10:45 AM',
    avatar: 'PA',
    status: 'success',
  },
  {
    id: 5,
    name: 'Unknown QR',
    role: '—',
    type: 'Entry',
    location: 'Main Gate',
    time: '11:03 AM',
    avatar: '??',
    status: 'rejected',
  },
];

const activeVisitors = [
  {
    id: 1,
    name: 'Liza Reyes',
    purpose: 'Meeting with Dean',
    host: 'Dean Aguilar',
    validUntil: '3:00 PM',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Mark Villanueva',
    purpose: 'Equipment Delivery',
    host: 'IT Department',
    validUntil: '1:30 PM',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Ana Corpus',
    purpose: 'Campus Tour',
    host: 'Admissions Office',
    validUntil: '12:00 PM',
    status: 'Expiring',
  },
];

const incidentReports = [
  {
    id: 1,
    title: 'Unauthorized Vehicle',
    location: 'Parking Area B',
    severity: 'Medium',
    reporter: 'Grd. Fernandez',
    time: '09:30 AM',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Lost ID Reported',
    location: 'Library',
    severity: 'Low',
    reporter: 'Self-report',
    time: '10:15 AM',
    status: 'Resolved',
  },
  {
    id: 3,
    title: 'Suspicious Individual',
    location: 'College of Engineering',
    severity: 'High',
    reporter: 'Grd. Torres',
    time: '11:45 AM',
    status: 'Pending',
  },
];

const gateThroughput = [
  { gate: 'Main Gate', entries: 84, exits: 61, pct: 84 },
  { gate: 'Side Gate A', entries: 32, exits: 27, pct: 47 },
  { gate: 'Back Gate', entries: 18, exits: 14, pct: 24 },
  { gate: 'Faculty Gate', entries: 43, exits: 38, pct: 61 },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, badge: null, active: true },
  { label: 'QR Scanner', icon: QrCode, badge: null, active: false },
  { label: 'Entry Logs', icon: ClipboardList, badge: '177', active: false },
  { label: 'Visitor Approval', icon: UserCheck, badge: '2', active: false },
  { label: 'Incident Reports', icon: AlertTriangle, badge: '3', active: false },
  { label: 'SOS Broadcast', icon: Megaphone, badge: null, active: false },
];

const emergencyTypes = [
  'Earthquake',
  'Fire',
  'Security Threat',
  'Weather Warning',
  'Medical Emergency',
  'Custom Message',
];

// ── Helper Components ────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[severity] ?? ''}`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Resolved: 'bg-green-100 text-green-700 border-green-200',
    Active: 'bg-blue-100 text-blue-700 border-blue-200',
    Expiring: 'bg-orange-100 text-orange-700 border-orange-200',
    Approved: 'bg-green-100 text-green-700 border-green-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[status] ?? ''}`}
    >
      {status}
    </span>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

const GuardDashboardPage: React.FC = () => {
  const [sosOpen, setSosOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        {/* ── Sidebar ───────────────────────────────────────────────────── */}
        <Sidebar className="border-r bg-white">
          {/* Logo */}
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

          {/* Nav */}
          <SidebarContent className="px-2 py-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-1">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        isActive={item.label === activeNav}
                        onClick={() => setActiveNav(item.label)}
                        className="gap-2.5"
                      >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                        {item.badge && (
                          <SidebarMenuBadge className="ml-auto bg-muted text-muted-foreground text-[10px]">
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer guard info */}
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

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* ── Top Header ── */}
          <header className="flex h-14 items-center gap-3 border-b bg-white px-5 shrink-0">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm text-muted-foreground">
                    Portal
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              {/* Incident Report Dialog */}
              <Dialog open={incidentOpen} onOpenChange={setIncidentOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                    <ClipboardList size={14} />
                    Report Incident
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Incident Report</DialogTitle>
                    <DialogDescription>
                      Document a campus security incident with details and severity.
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
                        placeholder="Describe what happened..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Attach Image (optional)</Label>
                      <Button variant="outline" className="gap-2 justify-start text-muted-foreground">
                        <Camera size={14} />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIncidentOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5">
                      <Send size={13} />
                      Submit Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* SOS Broadcast Dialog */}
              <Dialog open={sosOpen} onOpenChange={setSosOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="gap-1.5 text-sm bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Megaphone size={14} />
                    Trigger SOS
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                      <Megaphone size={18} />
                      SOS Emergency Broadcast
                    </DialogTitle>
                    <DialogDescription>
                      This will send an SMS alert and in-app notification to all registered users
                      on campus immediately.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="sos-type">Emergency Type</Label>
                      <Select>
                        <SelectTrigger id="sos-type">
                          <SelectValue placeholder="Select emergency type" />
                        </SelectTrigger>
                        <SelectContent>
                          {emergencyTypes.map((t) => (
                            <SelectItem key={t} value={t.toLowerCase().replace(/ /g, '-')}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="sos-msg">Custom Message (optional)</Label>
                      <Textarea
                        id="sos-msg"
                        placeholder="Add additional details for the broadcast..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setSosOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white gap-1.5">
                      <Bell size={13} />
                      Send Broadcast
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          {/* ── Page Body ── */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Today's Entries */}
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Today's Entries</p>
                  <p className="text-3xl font-bold mt-1 text-foreground">177</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <TrendingUp size={12} />
                    <span>+18 vs yesterday</span>
                  </div>
                </CardContent>
              </Card>

              {/* Active Visitors */}
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Active Visitors</p>
                  <p className="text-3xl font-bold mt-1 text-foreground">3</p>
                  <div className="flex items-center gap-1 mt-2 text-blue-600 text-xs font-medium">
                    <Users size={12} />
                    <span>2 approved · 1 walk-in</span>
                  </div>
                </CardContent>
              </Card>

              {/* Open Incidents */}
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Open Incidents</p>
                  <p className="text-3xl font-bold mt-1 text-amber-600">2</p>
                  <div className="flex items-center gap-1 mt-2 text-amber-600 text-xs font-medium">
                    <AlertTriangle size={12} />
                    <span>1 high severity</span>
                  </div>
                </CardContent>
              </Card>

              {/* SOS Status */}
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Active SOS</p>
                  <p className="text-3xl font-bold mt-1 text-foreground">0</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <CheckCircle2 size={12} />
                    <span>No active emergency</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── QR Scanner Panel ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">QR Entry Scanner</CardTitle>
                  <Badge variant="outline" className="border-green-300 text-green-700 gap-1 text-xs">
                    <Activity size={10} />
                    Ready to Scan
                  </Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Scanner placeholder */}
                  <div className="flex flex-col items-center justify-center w-44 h-44 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/20 shrink-0 gap-3 text-muted-foreground/40">
                    <ScanLine size={40} strokeWidth={1.5} />
                    <span className="text-xs font-medium tracking-wide">SCAN AREA</span>
                  </div>

                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Position the QR code within the scan area. The system accepts{' '}
                      <strong className="text-foreground">Student</strong>,{' '}
                      <strong className="text-foreground">Faculty / Staff</strong>, and{' '}
                      <strong className="text-foreground">Visitor</strong> QR codes. Expired or
                      invalid codes will be automatically rejected.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1.5 text-xs">
                        <LogIn size={11} />
                        Log Entry
                      </Badge>
                      <Badge variant="secondary" className="gap-1.5 text-xs">
                        <LogOut size={11} />
                        Log Exit
                      </Badge>
                      <Badge variant="secondary" className="gap-1.5 text-xs">
                        <Clock size={11} />
                        Auto-timestamp
                      </Badge>
                      <Badge variant="secondary" className="gap-1.5 text-xs">
                        <MapPin size={11} />
                        Gate Linked
                      </Badge>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-2">
                        <QrCode size={14} />
                        Open Scanner
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Eye size={14} />
                        View Entry Log
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Bottom Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Left: Entry Logs + Visitors + Incidents (tabs) */}
              <div className="lg:col-span-3 space-y-4">
                <Card className="shadow-none border bg-white">
                  <CardHeader className="px-6 pt-5 pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">Activity Log</CardTitle>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-[#0d7c3d] text-sm font-medium gap-1"
                      >
                        View all
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </CardHeader>

                  <Tabs defaultValue="entries" className="px-6 pb-5 pt-3">
                    <TabsList className="w-auto">
                      <TabsTrigger value="entries" className="text-xs">
                        Entry Logs
                      </TabsTrigger>
                      <TabsTrigger value="visitors" className="text-xs">
                        Visitors
                      </TabsTrigger>
                      <TabsTrigger value="incidents" className="text-xs">
                        Incidents
                      </TabsTrigger>
                    </TabsList>

                    {/* Entry Logs Tab */}
                    <TabsContent value="entries" className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-xs">Person</TableHead>
                            <TableHead className="text-xs">Role</TableHead>
                            <TableHead className="text-xs">Type</TableHead>
                            <TableHead className="text-xs">Location</TableHead>
                            <TableHead className="text-xs text-right">Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {entryLogs.map((log) => (
                            <TableRow key={log.id} className="group">
                              <TableCell>
                                <div className="flex items-center gap-2.5">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback
                                      className={`text-[10px] font-semibold ${
                                        log.status === 'rejected'
                                          ? 'bg-red-100 text-red-600'
                                          : 'bg-[#0d7c3d]/10 text-[#0d7c3d]'
                                      }`}
                                    >
                                      {log.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{log.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-[10px]">
                                  {log.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                                    log.status === 'rejected'
                                      ? 'text-red-600'
                                      : log.type === 'Entry'
                                      ? 'text-[#0d7c3d]'
                                      : 'text-muted-foreground'
                                  }`}
                                >
                                  {log.status === 'rejected' ? (
                                    <XCircle size={11} />
                                  ) : log.type === 'Entry' ? (
                                    <LogIn size={11} />
                                  ) : (
                                    <LogOut size={11} />
                                  )}
                                  {log.status === 'rejected' ? 'Rejected' : log.type}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {log.location}
                              </TableCell>
                              <TableCell className="text-xs text-right text-muted-foreground">
                                {log.time}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    {/* Visitors Tab */}
                    <TabsContent value="visitors" className="mt-4">
                      <div className="space-y-3">
                        {activeVisitors.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-start justify-between rounded-lg border p-4 gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                                  {v.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-semibold">{v.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{v.purpose}</p>
                                <p className="text-xs text-muted-foreground">
                                  Host: <span className="font-medium text-foreground">{v.host}</span>
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <StatusBadge status={v.status} />
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Clock size={10} /> Valid until {v.validUntil}
                              </span>
                            </div>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          className="w-full gap-2 text-sm border-dashed"
                        >
                          <UserCheck size={14} />
                          Approve Walk-in Visitor
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Incidents Tab */}
                    <TabsContent value="incidents" className="mt-4">
                      <div className="space-y-3">
                        {incidentReports.map((inc) => (
                          <div
                            key={inc.id}
                            className="flex items-start justify-between rounded-lg border p-4 gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                  inc.severity === 'High'
                                    ? 'bg-red-100 text-red-600'
                                    : inc.severity === 'Medium'
                                    ? 'bg-amber-100 text-amber-600'
                                    : 'bg-green-100 text-green-600'
                                }`}
                              >
                                <AlertTriangle size={15} />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{inc.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                  <MapPin size={10} /> {inc.location}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  By {inc.reporter} · {inc.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <SeverityBadge severity={inc.severity} />
                              <StatusBadge status={inc.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>

              {/* Right: Gate Throughput + Visitor Approval Quick Actions */}
              <div className="lg:col-span-2 space-y-4">
                {/* Gate Throughput */}
                <Card className="shadow-none border bg-white">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <CardTitle className="text-base font-semibold">
                      Gate Throughput (Today)
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-6 py-5 space-y-4">
                    {gateThroughput.map((g) => (
                      <div key={g.gate} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{g.gate}</span>
                          <span className="text-muted-foreground text-xs">
                            {g.entries} in · {g.exits} out
                          </span>
                        </div>
                        <Progress
                          value={g.pct}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Visitor Approval */}
                <Card className="shadow-none border bg-white">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">
                        Pending Approval
                      </CardTitle>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">
                        2 waiting
                      </Badge>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-6 py-5 space-y-3">
                    {[
                      { name: 'Carlo Mendoza', purpose: 'Alumni Visit', time: '10:30 AM' },
                      { name: 'Jessa Tan', purpose: 'Parents Day', time: '11:15 AM' },
                    ].map((v, i) => (
                      <div key={i} className="rounded-lg border p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold">{v.name}</p>
                            <p className="text-xs text-muted-foreground">{v.purpose}</p>
                          </div>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock size={10} /> {v.time}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 h-7 text-xs bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1"
                          >
                            <CheckCircle2 size={11} />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 gap-1"
                          >
                            <XCircle size={11} />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default GuardDashboardPage;
