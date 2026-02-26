import React, { useState } from 'react';
import {
  Shield,
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  UserCheck,
  Megaphone,
  LogIn,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Plus,
  Bell,
  Eye,
  MoreHorizontal,
  Send,
  QrCode,
  UserCog,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  RefreshCw,
  Ban,
  ChevronRight,
  Filter,
  Calendar,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ── Mock Data ─────────────────────────────────────────────────────────────────

const users = [
  { id: 1, name: 'Maria Santos', role: 'Student', email: 'msantos@vsu.edu.ph', status: 'Active', joined: 'Aug 2023' },
  { id: 2, name: 'Juan dela Cruz', role: 'Faculty', email: 'jdelacruz@vsu.edu.ph', status: 'Active', joined: 'Jun 2020' },
  { id: 3, name: 'Rosa Lomibao', role: 'Student', email: 'rlomibao@vsu.edu.ph', status: 'Active', joined: 'Aug 2024' },
  { id: 4, name: 'Grd. Fernandez', role: 'Guard', email: 'efernandez@vsu.edu.ph', status: 'Active', joined: 'Jan 2022' },
  { id: 5, name: 'Pedro Alcantara', role: 'Student', email: 'palcantara@vsu.edu.ph', status: 'Inactive', joined: 'Aug 2022' },
  { id: 6, name: 'Prof. Ana Reyes', role: 'Faculty', email: 'areyes@vsu.edu.ph', status: 'Active', joined: 'Mar 2018' },
  { id: 7, name: 'Grd. Torres', role: 'Guard', email: 'btorres@vsu.edu.ph', status: 'Active', joined: 'Mar 2023' },
];

const incidentReports = [
  {
    id: 1,
    title: 'Suspicious Individual',
    desc: 'Unknown person seen loitering near the College of Engineering after hours.',
    location: 'College of Engineering',
    reportedBy: 'Grd. Torres',
    timestamp: 'Feb 26, 2026 · 11:45 AM',
    severity: 'High',
    status: 'Pending',
    actionTaken: null,
  },
  {
    id: 2,
    title: 'Unauthorized Vehicle',
    desc: 'Unregistered vehicle parked in the faculty-only area.',
    location: 'Parking Area B',
    reportedBy: 'Grd. Fernandez',
    timestamp: 'Feb 26, 2026 · 09:30 AM',
    severity: 'Medium',
    status: 'Pending',
    actionTaken: null,
  },
  {
    id: 3,
    title: 'Lost ID Reported',
    desc: 'Student reported losing university ID near the library entrance.',
    location: 'Library',
    reportedBy: 'Self-report',
    timestamp: 'Feb 26, 2026 · 10:15 AM',
    severity: 'Low',
    status: 'Resolved',
    actionTaken: 'ID reported to registrar. Student issued temporary pass.',
  },
  {
    id: 4,
    title: 'Broken Streetlight',
    desc: 'Streetlight along dormitory road not functioning.',
    location: 'Dormitory Road',
    reportedBy: 'Maria Santos',
    timestamp: 'Feb 20, 2026 · 7:00 PM',
    severity: 'Low',
    status: 'Resolved',
    actionTaken: 'Maintenance dispatched. Light replaced Feb 22.',
  },
];

const entryLogs = [
  { id: 1, name: 'Maria Santos', role: 'Student', type: 'Entry', location: 'Main Gate', date: 'Feb 26, 2026', time: '07:58 AM', avatar: 'MS' },
  { id: 2, name: 'Juan dela Cruz', role: 'Faculty', type: 'Entry', location: 'Faculty Gate', date: 'Feb 26, 2026', time: '08:10 AM', avatar: 'JC' },
  { id: 3, name: 'Liza Reyes', role: 'Visitor', type: 'Entry', location: 'Main Gate', date: 'Feb 26, 2026', time: '09:05 AM', avatar: 'LR' },
  { id: 4, name: 'Rosa Lomibao', role: 'Student', type: 'Exit', location: 'Main Gate', date: 'Feb 26, 2026', time: '12:15 PM', avatar: 'RL' },
  { id: 5, name: 'Pedro Alcantara', role: 'Student', type: 'Entry', location: 'Side Gate A', date: 'Feb 26, 2026', time: '08:45 AM', avatar: 'PA' },
  { id: 6, name: 'Prof. Ana Reyes', role: 'Faculty', type: 'Exit', location: 'Faculty Gate', date: 'Feb 26, 2026', time: '05:30 PM', avatar: 'AR' },
  { id: 7, name: 'Unknown QR', role: '—', type: 'Entry', location: 'Back Gate', date: 'Feb 26, 2026', time: '11:03 AM', avatar: '??', rejected: true },
];

const visitorPasses = [
  { id: 1, name: 'Carlo Mendoza', contact: '09171234567', purpose: 'Alumni Visit', host: 'Dean Aguilar', date: 'Feb 26, 2026', window: '10:00 AM – 12:00 PM', status: 'Pending' },
  { id: 2, name: 'Jessa Tan', contact: '09281234567', purpose: 'Parents Day', host: 'Admissions Office', date: 'Feb 26, 2026', window: '11:00 AM – 2:00 PM', status: 'Pending' },
  { id: 3, name: 'Liza Reyes', contact: '09391234567', purpose: 'Meeting with Dean', host: 'Dean Aguilar', date: 'Feb 26, 2026', window: '9:00 AM – 3:00 PM', status: 'Approved' },
  { id: 4, name: 'Mark Villanueva', contact: '09501234567', purpose: 'Equipment Delivery', host: 'IT Department', date: 'Feb 26, 2026', window: '8:00 AM – 1:30 PM', status: 'Approved' },
  { id: 5, name: 'Ana Corpus', contact: '09611234567', purpose: 'Campus Tour', host: 'Admissions', date: 'Feb 25, 2026', window: '10:00 AM – 12:00 PM', status: 'Expired' },
  { id: 6, name: 'Ben Torres', contact: '09721234567', purpose: 'Research Collaboration', host: 'Prof. Santos', date: 'Feb 24, 2026', window: '2:00 PM – 4:00 PM', status: 'Rejected' },
];

const sosHistory = [
  { id: 1, type: 'Fire Drill', message: 'Scheduled fire drill at Main Building. Proceed to assembly areas.', issuedBy: 'Admin', time: 'Feb 26, 2026 · 10:00 AM', status: 'Active' },
  { id: 2, type: 'Security Threat', message: 'Unidentified individual reported near Engineering building. Area has been cleared.', issuedBy: 'Grd. Torres', time: 'Feb 20, 2026 · 2:15 PM', status: 'Closed' },
  { id: 3, type: 'Weather Warning', message: 'Tropical depression signal raised. Classes suspended. Remain indoors.', issuedBy: 'Admin', time: 'Feb 14, 2026 · 6:00 AM', status: 'Closed' },
];

const analyticsStats = [
  { gate: 'Main Gate', entries: 84, exits: 61, pct: 84 },
  { gate: 'Faculty Gate', entries: 43, exits: 38, pct: 61 },
  { gate: 'Side Gate A', entries: 32, exits: 27, pct: 47 },
  { gate: 'Back Gate', entries: 18, exits: 14, pct: 24 },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { label: 'User Management', icon: Users, badge: null },
  { label: 'Entry Logs', icon: BookOpen, badge: '177' },
  { label: 'Incident Reports', icon: ClipboardList, badge: '2' },
  { label: 'Visitor Passes', icon: UserCheck, badge: '2' },
  { label: 'SOS Broadcast', icon: Megaphone, badge: '1' },
];

const emergencyTypes = [
  'Earthquake',
  'Fire',
  'Security Threat',
  'Weather Warning',
  'Medical Emergency',
  'Custom Message',
];

// ── Helper Components ─────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[severity] ?? ''}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Resolved: 'bg-green-100 text-green-700 border-green-200',
    Active: 'bg-red-100 text-red-700 border-red-200',
    Closed: 'bg-muted text-muted-foreground border-border',
    Approved: 'bg-green-100 text-green-700 border-green-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200',
    Expired: 'bg-muted text-muted-foreground border-border',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[status] ?? ''}`}>
      {status}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    Student: { cls: 'bg-blue-100 text-blue-700 border-blue-200', icon: <GraduationCap size={10} /> },
    Faculty: { cls: 'bg-purple-100 text-purple-700 border-purple-200', icon: <Briefcase size={10} /> },
    Guard: { cls: 'bg-[#0d7c3d]/10 text-[#0d7c3d] border-[#0d7c3d]/20', icon: <ShieldCheck size={10} /> },
    Staff: { cls: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Briefcase size={10} /> },
    Visitor: { cls: 'bg-slate-100 text-slate-600 border-slate-200', icon: <Users size={10} /> },
  };
  const config = map[role] ?? { cls: 'bg-muted text-muted-foreground', icon: null };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${config.cls}`}>
      {config.icon}
      {role}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const AdminDashboardPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sosOpen, setSosOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<(typeof incidentReports)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = entryLogs.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        {/* ── Sidebar ───────────────────────────────────────────────────── */}
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7c3d]">
                <Shield size={16} className="text-white" />
              </div>
              <div className="leading-none">
                <p className="font-semibold text-sm text-foreground">VSU Security</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  Admin Portal
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

          <SidebarFooter className="px-4 py-4 border-t">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-xs font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="leading-none min-w-0">
                <p className="text-sm font-medium text-foreground truncate">System Admin</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">admin@vsu.edu.ph</p>
              </div>
              <Badge variant="outline" className="ml-auto shrink-0 border-green-300 text-green-700 text-[10px]">
                Admin
              </Badge>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* ── Header ── */}
          <header className="flex h-14 items-center gap-3 border-b bg-white px-5 shrink-0">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-sm text-muted-foreground">
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              {/* Add User Dialog */}
              <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                    <Plus size={14} />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Register a new Student, Faculty/Staff, or Guard account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-1.5">
                        <Label htmlFor="u-first">First Name</Label>
                        <Input id="u-first" placeholder="e.g. Maria" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="u-last">Last Name</Label>
                        <Input id="u-last" placeholder="e.g. Santos" />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="u-email">Email Address</Label>
                      <Input id="u-email" type="email" placeholder="user@vsu.edu.ph" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="u-role">Role</Label>
                      <Select>
                        <SelectTrigger id="u-role">
                          <SelectValue placeholder="Assign a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="faculty">Faculty</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="guard">Guard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="u-password">Temporary Password</Label>
                      <Input id="u-password" type="password" placeholder="Min. 8 characters" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setAddUserOpen(false)}>Cancel</Button>
                    <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5">
                      <Plus size={13} />
                      Create Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* SOS Dialog */}
              <Dialog open={sosOpen} onOpenChange={setSosOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1.5 text-sm bg-red-600 hover:bg-red-700 text-white">
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
                      Sends an SMS and in-app alert to all registered Students, Faculty/Staff, and Guards.
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
                            <SelectItem key={t} value={t.toLowerCase().replace(/ /g, '-')}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="sos-msg">Custom Message (optional)</Label>
                      <Textarea id="sos-msg" placeholder="Add details for the broadcast..." className="resize-none" rows={3} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setSosOpen(false)}>Cancel</Button>
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
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Students Registered</p>
                  <p className="text-3xl font-bold mt-1">1,284</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <TrendingUp size={12} />
                    <span>+12 this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Faculty / Staff</p>
                  <p className="text-3xl font-bold mt-1">243</p>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                    <TrendingDown size={12} />
                    <span>No change</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Guards on Duty</p>
                  <p className="text-3xl font-bold mt-1">18</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <ShieldCheck size={12} />
                    <span>All gates covered</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Active Visitors</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                  <div className="flex items-center gap-1 mt-2 text-blue-600 text-xs font-medium">
                    <UserCheck size={12} />
                    <span>2 pending approval</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Analytics Row ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Entries Today</p>
                  <p className="text-3xl font-bold mt-1">177</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <LogIn size={12} />
                    <span>+18 vs yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Incidents Today</p>
                  <p className="text-3xl font-bold mt-1 text-amber-600">3</p>
                  <div className="flex items-center gap-1 mt-2 text-amber-600 text-xs font-medium">
                    <AlertTriangle size={12} />
                    <span>2 pending · 1 resolved</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Visitor Passes Issued</p>
                  <p className="text-3xl font-bold mt-1">5</p>
                  <div className="flex items-center gap-1 mt-2 text-blue-600 text-xs font-medium">
                    <QrCode size={12} />
                    <span>2 active today</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Active SOS Broadcast</p>
                  <p className="text-3xl font-bold mt-1 text-red-600">1</p>
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-xs font-medium">
                    <Megaphone size={12} />
                    <span>Fire Drill · Ongoing</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Gate Throughput ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <Card className="shadow-none border bg-white lg:col-span-2">
                <CardHeader className="px-6 pt-5 pb-4">
                  <CardTitle className="text-base font-semibold">Gate Throughput (Today)</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-5 space-y-4">
                  {analyticsStats.map((g) => (
                    <div key={g.gate} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{g.gate}</span>
                        <span className="text-muted-foreground text-xs">
                          {g.entries} in · {g.exits} out
                        </span>
                      </div>
                      <Progress value={g.pct} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Summaries */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Role Breakdown */}
                <Card className="shadow-none border bg-white sm:col-span-2">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <CardTitle className="text-base font-semibold">User Role Breakdown</CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-6 py-5 space-y-3">
                    {[
                      { label: 'Students', count: 1284, total: 1545, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
                      { label: 'Faculty / Staff', count: 243, total: 1545, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
                      { label: 'Guards', count: 18, total: 1545, icon: ShieldCheck, color: 'text-[#0d7c3d]', bg: 'bg-[#0d7c3d]/10' },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${r.bg} ${r.color}`}>
                          <r.icon size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{r.label}</span>
                            <span className="text-xs text-muted-foreground">{r.count}</span>
                          </div>
                          <Progress value={Math.round((r.count / r.total) * 100)} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* SOS Active Warning */}
                <Card className="shadow-none border border-red-200 bg-red-50">
                  <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Megaphone size={16} className="text-red-600" />
                        <p className="text-sm font-semibold text-red-700">Active SOS</p>
                      </div>
                      <p className="text-xs font-bold text-red-700">Fire Drill</p>
                      <p className="text-xs text-red-600/80 mt-1 leading-relaxed">
                        Issued by Admin at 10:00 AM. Campus-wide notification sent.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-1.5 text-xs border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <XCircle size={12} />
                      Close Broadcast
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ── Main Tabs ── */}
            <Card className="shadow-none border bg-white">
              <Tabs defaultValue="users" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="w-auto">
                    <TabsTrigger value="users" className="text-xs gap-1.5">
                      <Users size={13} />
                      Users
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="text-xs gap-1.5">
                      <BookOpen size={13} />
                      Entry Logs
                    </TabsTrigger>
                    <TabsTrigger value="incidents" className="text-xs gap-1.5">
                      <ClipboardList size={13} />
                      Incidents
                    </TabsTrigger>
                    <TabsTrigger value="visitors" className="text-xs gap-1.5">
                      <UserCheck size={13} />
                      Visitors
                    </TabsTrigger>
                    <TabsTrigger value="sos" className="text-xs gap-1.5">
                      <Megaphone size={13} />
                      SOS History
                    </TabsTrigger>
                  </TabsList>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setAddUserOpen(true)}
                  >
                    <Plus size={13} />
                    Add User
                  </Button>
                </div>

                {/* ── Users Tab ── */}
                <TabsContent value="users" className="mt-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-xs">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search users..." className="pl-8 h-8 text-sm" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue placeholder="All roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All roles</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="guard">Guard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">Name</TableHead>
                        <TableHead className="text-xs">Role</TableHead>
                        <TableHead className="text-xs">Email</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">Joined</TableHead>
                        <TableHead className="text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-[10px] font-semibold">
                                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell><RoleBadge role={user.role} /></TableCell>
                          <TableCell className="text-xs text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-muted text-muted-foreground border-border'}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{user.joined}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                  <MoreHorizontal size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="text-sm">
                                <DropdownMenuItem className="gap-2">
                                  <Eye size={13} /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <UserCog size={13} /> Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <RefreshCw size={13} /> Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <ShieldCheck size={13} /> Change Role
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                                  <Ban size={13} /> Deactivate Account
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* ── Entry Logs Tab ── */}
                <TabsContent value="logs" className="mt-0">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <div className="relative flex-1 min-w-40 max-w-xs">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or role..."
                        className="pl-8 h-8 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                      <Calendar size={12} />
                      Filter by Date
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                      <Filter size={12} />
                      Filter by Role
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8 ml-auto">
                      <Download size={12} />
                      Download CSV
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">Name</TableHead>
                        <TableHead className="text-xs">Role</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Location</TableHead>
                        <TableHead className="text-xs">Date</TableHead>
                        <TableHead className="text-xs text-right">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className={`text-[10px] font-semibold ${log.rejected ? 'bg-red-100 text-red-600' : 'bg-[#0d7c3d]/10 text-[#0d7c3d]'}`}>
                                  {log.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{log.name}</span>
                            </div>
                          </TableCell>
                          <TableCell><RoleBadge role={log.role} /></TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1 text-xs font-medium ${log.rejected ? 'text-red-600' : log.type === 'Entry' ? 'text-[#0d7c3d]' : 'text-muted-foreground'}`}>
                              {log.rejected ? <XCircle size={11} /> : log.type === 'Entry' ? <LogIn size={11} /> : <LogOut size={11} />}
                              {log.rejected ? 'Rejected' : log.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin size={10} />{log.location}</span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{log.date}</TableCell>
                          <TableCell className="text-xs text-right text-muted-foreground">{log.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* ── Incidents Tab ── */}
                <TabsContent value="incidents" className="mt-0">
                  {/* Inline Action Taken dialog */}
                  <Dialog open={actionOpen} onOpenChange={setActionOpen}>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Incident</DialogTitle>
                        <DialogDescription>
                          {selectedIncident?.title} — {selectedIncident?.location}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-2">
                        <div className="grid gap-1.5">
                          <Label htmlFor="action-status">Update Status</Label>
                          <Select defaultValue={selectedIncident?.status.toLowerCase()}>
                            <SelectTrigger id="action-status">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="action-taken">Action Taken</Label>
                          <Textarea
                            id="action-taken"
                            placeholder="Describe actions taken to resolve this incident..."
                            className="resize-none"
                            rows={3}
                            defaultValue={selectedIncident?.actionTaken ?? ''}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setActionOpen(false)}>Cancel</Button>
                        <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5">
                          <CheckCircle2 size={13} />
                          Save & Mark Resolved
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="space-y-3">
                    {incidentReports.map((inc) => (
                      <div key={inc.id} className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${inc.severity === 'High' ? 'bg-red-100 text-red-600' : inc.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                              <AlertTriangle size={15} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{inc.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{inc.desc}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><MapPin size={10} />{inc.location}</span>
                                <span>By {inc.reportedBy}</span>
                                <span className="flex items-center gap-1"><Clock size={10} />{inc.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <SeverityBadge severity={inc.severity} />
                            <StatusBadge status={inc.status} />
                          </div>
                        </div>

                        {inc.actionTaken ? (
                          <div className="flex items-start gap-2 rounded-md bg-[#0d7c3d]/5 border border-[#0d7c3d]/10 px-3 py-2.5">
                            <CheckCircle2 size={13} className="text-[#0d7c3d] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] font-semibold text-[#0d7c3d] uppercase tracking-wide">Action Taken</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{inc.actionTaken}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-100 px-3 py-2 flex-1">
                              <Clock size={12} className="text-amber-600 shrink-0" />
                              <p className="text-xs text-amber-700">Awaiting admin action.</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 text-xs shrink-0"
                              onClick={() => { setSelectedIncident(inc); setActionOpen(true); }}
                            >
                              <Eye size={12} />
                              Update
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* ── Visitor Passes Tab ── */}
                <TabsContent value="visitors" className="mt-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-xs">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search visitors..." className="pl-8 h-8 text-sm" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    {visitorPasses.map((v) => (
                      <div key={v.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-semibold">
                                {v.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold">{v.name}</p>
                              <p className="text-xs text-muted-foreground">{v.purpose}</p>
                              <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                                <span>Host: <span className="font-medium text-foreground">{v.host}</span></span>
                                <span className="flex items-center gap-1"><Calendar size={10} />{v.date}</span>
                                <span className="flex items-center gap-1"><Clock size={10} />{v.window}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">Contact: {v.contact}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <StatusBadge status={v.status} />
                            {v.status === 'Approved' && (
                              <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7">
                                <QrCode size={11} />
                                View QR
                              </Button>
                            )}
                          </div>
                        </div>

                        {v.status === 'Pending' && (
                          <div className="flex gap-2 mt-3 pt-3 border-t">
                            <Button size="sm" className="flex-1 h-7 text-xs bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1">
                              <CheckCircle2 size={11} />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 gap-1">
                              <XCircle size={11} />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                              <Clock size={11} />
                              Set Window
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* ── SOS History Tab ── */}
                <TabsContent value="sos" className="mt-0">
                  <div className="space-y-3">
                    {sosHistory.map((s) => (
                      <div
                        key={s.id}
                        className={`rounded-lg border p-4 space-y-2 ${s.status === 'Active' ? 'border-red-200 bg-red-50' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <Megaphone size={16} className={`mt-0.5 shrink-0 ${s.status === 'Active' ? 'text-red-600' : 'text-muted-foreground'}`} />
                            <div>
                              <p className={`text-sm font-semibold ${s.status === 'Active' ? 'text-red-700' : ''}`}>
                                {s.type}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {s.time} · Issued by {s.issuedBy}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <StatusBadge status={s.status} />
                            {s.status === 'Active' && (
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-red-300 text-red-700 hover:bg-red-100">
                                <XCircle size={11} />
                                Close
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className={`text-xs leading-relaxed pl-6 ${s.status === 'Active' ? 'text-red-700/80' : 'text-muted-foreground'}`}>
                          {s.message}
                        </p>
                      </div>
                    ))}

                    <div className="flex justify-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => setSosOpen(true)}
                      >
                        <Megaphone size={13} />
                        Trigger New Broadcast
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* ── Bottom Row: Recent Activity + Quick Stats ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Entries Quick View */}
              <Card className="shadow-none border bg-white">
                <CardHeader className="px-6 pt-5 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">Live Entry Feed</CardTitle>
                    <Button variant="link" className="h-auto p-0 text-[#0d7c3d] text-sm gap-1">
                      Full log <ChevronRight size={14} />
                    </Button>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-4 space-y-3">
                  {entryLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className={`text-[10px] font-semibold ${log.rejected ? 'bg-red-100 text-red-600' : 'bg-[#0d7c3d]/10 text-[#0d7c3d]'}`}>
                            {log.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{log.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{log.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium flex items-center gap-1 ${log.rejected ? 'text-red-600' : log.type === 'Entry' ? 'text-[#0d7c3d]' : 'text-muted-foreground'}`}>
                          {log.rejected ? <XCircle size={11} /> : log.type === 'Entry' ? <LogIn size={11} /> : <LogOut size={11} />}
                          {log.rejected ? 'Rejected' : log.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Open Incidents Overview */}
              <Card className="shadow-none border bg-white">
                <CardHeader className="px-6 pt-5 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">Open Incidents</CardTitle>
                    <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-xs">
                      2 pending
                    </Badge>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-4 space-y-3">
                  {incidentReports.filter((i) => i.status === 'Pending').map((inc) => (
                    <div key={inc.id} className="flex items-start justify-between gap-3 py-0.5">
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${inc.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                          <AlertTriangle size={13} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{inc.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin size={10} />{inc.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <SeverityBadge severity={inc.severity} />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-[11px] px-2 gap-1"
                          onClick={() => { setSelectedIncident(inc); setActionOpen(true); }}
                        >
                          <Send size={10} /> Action
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardPage;
