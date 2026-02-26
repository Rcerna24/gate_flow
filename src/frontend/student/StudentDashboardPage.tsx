import React, { useState } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  History,
  Bell,
  LayoutDashboard,
  LogIn,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Camera,
  Send,
  Download,
  Megaphone,
  Info,
  X,
  BookOpen,
  TrendingUp,
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
import { QRCodeSVG } from 'qrcode.react';

// ── Mock Data ─────────────────────────────────────────────────────────────────

const entryHistory = [
  {
    id: 1,
    type: 'Entry',
    location: 'Main Gate',
    date: 'Feb 26, 2026',
    time: '07:58 AM',
  },
  {
    id: 2,
    type: 'Exit',
    location: 'Main Gate',
    date: 'Feb 26, 2026',
    time: '12:15 PM',
  },
  {
    id: 3,
    type: 'Entry',
    location: 'Side Gate A',
    date: 'Feb 25, 2026',
    time: '08:05 AM',
  },
  {
    id: 4,
    type: 'Exit',
    location: 'Main Gate',
    date: 'Feb 25, 2026',
    time: '05:30 PM',
  },
  {
    id: 5,
    type: 'Entry',
    location: 'Main Gate',
    date: 'Feb 24, 2026',
    time: '08:20 AM',
  },
  {
    id: 6,
    type: 'Exit',
    location: 'Main Gate',
    date: 'Feb 24, 2026',
    time: '04:45 PM',
  },
];

const myIncidents = [
  {
    id: 1,
    title: 'Broken Streetlight on Path to Dorm',
    location: 'Dormitory Road',
    severity: 'Low',
    date: 'Feb 20, 2026',
    status: 'Resolved',
    actionTaken: 'Maintenance team dispatched. Light replaced Feb 22.',
  },
  {
    id: 2,
    title: 'Suspicious Person Near Canteen',
    location: 'University Canteen',
    severity: 'Medium',
    date: 'Feb 25, 2026',
    status: 'Pending',
    actionTaken: null,
  },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My QR Code', icon: QrCode },
  { label: 'Entry History', icon: History },
  { label: 'Incident Reports', icon: ClipboardList },
  { label: 'Emergency Alerts', icon: Bell },
];

const weeklyStats = [
  { day: 'Mon', entries: 2 },
  { day: 'Tue', entries: 3 },
  { day: 'Wed', entries: 2 },
  { day: 'Thu', entries: 4 },
  { day: 'Fri', entries: 2 },
];

const maxEntries = Math.max(...weeklyStats.map((d) => d.entries));

// ── Helper Components ─────────────────────────────────────────────────────────

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
    'Under Review': 'bg-blue-100 text-blue-700 border-blue-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[status] ?? ''}`}
    >
      {status}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const StudentDashboardPage: React.FC = () => {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sosVisible, setSosVisible] = useState(true);

  // Mock student data – would come from auth context in real app
  const student = {
    name: 'Maria Santos',
    id: 'VSU-2023-0042',
    course: 'BSN 3-A',
    initials: 'MS',
    qrValue: 'VSU-STU-2023-0042-MARIA-SANTOS',
  };

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
                  Student Portal
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
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer student info */}
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
              {/* Report Incident Dialog */}
              <Dialog open={incidentOpen} onOpenChange={setIncidentOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                    <AlertTriangle size={14} />
                    Report Incident
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Incident Report</DialogTitle>
                    <DialogDescription>
                      Report a campus safety concern. Your report will be reviewed by security
                      personnel.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="inc-title">Incident Title</Label>
                      <Input id="inc-title" placeholder="e.g. Broken streetlight" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="inc-location">Location</Label>
                      <Input id="inc-location" placeholder="e.g. College of Nursing building" />
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
                        rows={3}
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
            </div>
          </header>

          {/* ── Page Body ── */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Emergency Banner (conditionally shown) ── */}
            {sosVisible && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3.5">
                <Megaphone size={18} className="text-red-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-red-700">
                    Active Emergency Broadcast — Fire Drill
                  </p>
                  <p className="text-xs text-red-600/80 mt-0.5 leading-relaxed">
                    A scheduled fire drill is ongoing at the Main Building. Please follow evacuation
                    procedures and proceed to the designated assembly areas. Issued by Admin at
                    10:00 AM.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 shrink-0"
                  onClick={() => setSosVisible(false)}
                >
                  <X size={14} />
                </Button>
              </div>
            )}

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Entries This Week</p>
                  <p className="text-3xl font-bold mt-1 text-foreground">13</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <TrendingUp size={12} />
                    <span>+2 vs last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Today's Status</p>
                  <p className="text-3xl font-bold mt-1 text-[#0d7c3d]">On Campus</p>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                    <LogIn size={12} />
                    <span>Entered 07:58 AM</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Incidents Filed</p>
                  <p className="text-3xl font-bold mt-1 text-foreground">2</p>
                  <div className="flex items-center gap-1 mt-2 text-amber-600 text-xs font-medium">
                    <ClipboardList size={12} />
                    <span>1 pending · 1 resolved</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground font-medium">Emergency Alerts</p>
                  <p className="text-3xl font-bold mt-1 text-red-600">1</p>
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-xs font-medium">
                    <Bell size={12} />
                    <span>1 active broadcast</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── QR Code + Weekly Activity Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* QR Code Card */}
              <Card className="shadow-none border bg-white lg:col-span-2">
                <CardHeader className="px-6 pt-5 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">My Campus QR Code</CardTitle>
                    <Badge
                      variant="outline"
                      className="border-green-300 text-green-700 text-xs gap-1"
                    >
                      <CheckCircle2 size={10} />
                      Valid
                    </Badge>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-5 flex flex-col items-center gap-4">
                  {/* QR Code */}
                  <div className="flex items-center justify-center rounded-xl border bg-white p-4 shadow-sm">
                    <QRCodeSVG
                      value={student.qrValue}
                      size={160}
                      level="M"
                      fgColor="#0d1117"
                    />
                  </div>

                  {/* Student info */}
                  <div className="w-full text-center space-y-0.5">
                    <p className="font-semibold text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.id}</p>
                    <p className="text-xs text-muted-foreground">{student.course}</p>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 text-xs"
                    >
                      <Download size={12} />
                      Save QR
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5 text-xs bg-[#0d7c3d] hover:bg-[#0a6633] text-white"
                    >
                      <QrCode size={12} />
                      Show Full Screen
                    </Button>
                  </div>

                  <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
                    Present this QR code to the guard upon entering or exiting the campus. This
                    code is unique to your account and does not expose personal data.
                  </p>
                </CardContent>
              </Card>

              {/* Weekly Activity + Recent Entry Preview */}
              <div className="lg:col-span-3 space-y-4">
                {/* Weekly bar chart */}
                <Card className="shadow-none border bg-white">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">
                        Weekly Campus Activity
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">Feb 23 – 27, 2026</span>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-6 py-5">
                    <div className="flex items-end justify-around gap-3 h-24">
                      {weeklyStats.map((d) => (
                        <div key={d.day} className="flex flex-col items-center gap-1.5 flex-1">
                          <span className="text-xs font-semibold text-[#0d7c3d]">{d.entries}</span>
                          <div className="w-full rounded-t-md bg-[#0d7c3d]/15 relative overflow-hidden">
                            <div
                              className="w-full rounded-t-md bg-[#0d7c3d] transition-all"
                              style={{ height: `${(d.entries / maxEntries) * 60}px` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{d.day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent entry summary */}
                <Card className="shadow-none border bg-white">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">Recent Entry</CardTitle>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-[#0d7c3d] text-sm font-medium gap-1"
                      >
                        Full history
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-6 py-4 space-y-3">
                    {entryHistory.slice(0, 3).map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                              log.type === 'Entry'
                                ? 'bg-[#0d7c3d]/10 text-[#0d7c3d]'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {log.type === 'Entry' ? <LogIn size={14} /> : <LogOut size={14} />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{log.type}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin size={10} /> {log.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">{log.time}</p>
                          <p className="text-xs text-muted-foreground">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ── Entry History + Incidents (tabs) ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">My Records</CardTitle>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[#0d7c3d] text-sm font-medium gap-1"
                  >
                    Export CSV
                    <Download size={13} />
                  </Button>
                </div>
              </CardHeader>

              <Tabs defaultValue="history" className="px-6 pb-6 pt-3">
                <TabsList className="w-auto">
                  <TabsTrigger value="history" className="text-xs">
                    Entry History
                  </TabsTrigger>
                  <TabsTrigger value="incidents" className="text-xs">
                    My Incidents
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="text-xs">
                    Emergency Alerts
                  </TabsTrigger>
                </TabsList>

                {/* Entry History Tab */}
                <TabsContent value="history" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Location</TableHead>
                        <TableHead className="text-xs">Date</TableHead>
                        <TableHead className="text-xs text-right">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entryHistory.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                log.type === 'Entry'
                                  ? 'text-[#0d7c3d]'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {log.type === 'Entry' ? (
                                <LogIn size={12} />
                              ) : (
                                <LogOut size={12} />
                              )}
                              {log.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin size={11} />
                              {log.location}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{log.date}</TableCell>
                          <TableCell className="text-sm text-right text-muted-foreground">
                            {log.time}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* My Incidents Tab */}
                <TabsContent value="incidents" className="mt-4">
                  <div className="space-y-3">
                    {myIncidents.map((inc) => (
                      <div key={inc.id} className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
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
                              <p className="text-xs text-muted-foreground">Filed {inc.date}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <SeverityBadge severity={inc.severity} />
                            <StatusBadge status={inc.status} />
                          </div>
                        </div>

                        {/* Action taken section */}
                        {inc.actionTaken ? (
                          <div className="flex items-start gap-2 rounded-md bg-[#0d7c3d]/5 border border-[#0d7c3d]/10 px-3 py-2.5">
                            <CheckCircle2 size={13} className="text-[#0d7c3d] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[11px] font-semibold text-[#0d7c3d] uppercase tracking-wide">
                                Action Taken
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {inc.actionTaken}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-100 px-3 py-2">
                            <Clock size={12} className="text-amber-600 shrink-0" />
                            <p className="text-xs text-amber-700">
                              Awaiting review by security personnel.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}

                    <Button
                      onClick={() => setIncidentOpen(true)}
                      variant="outline"
                      className="w-full gap-2 text-sm border-dashed"
                    >
                      <AlertTriangle size={14} />
                      Submit New Incident Report
                    </Button>
                  </div>
                </TabsContent>

                {/* Emergency Alerts Tab */}
                <TabsContent value="alerts" className="mt-4">
                  <div className="space-y-3">
                    {/* Active alert */}
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <Megaphone size={16} className="text-red-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-red-700">Fire Drill</p>
                            <p className="text-xs text-red-600/80 mt-0.5">
                              Today · Issued at 10:00 AM · By Admin
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-700 border border-red-200 text-[10px] shrink-0">
                          Active
                        </Badge>
                      </div>
                      <p className="text-xs text-red-700/80 leading-relaxed pl-6.5">
                        A scheduled fire drill is ongoing at the Main Building. Please follow
                        evacuation procedures and proceed to the designated assembly areas.
                      </p>
                    </div>

                    {/* Past alerts */}
                    {[
                      {
                        type: 'Security Threat',
                        msg: 'Unidentified individual reported near Engineering building. Area has been cleared.',
                        date: 'Feb 20, 2026 · 2:15 PM',
                        closed: true,
                      },
                      {
                        type: 'Weather Warning',
                        msg: 'Tropical depression signal raised. Classes suspended. Remain indoors.',
                        date: 'Feb 14, 2026 · 6:00 AM',
                        closed: true,
                      },
                    ].map((alert, i) => (
                      <div key={i} className="rounded-lg border p-4 space-y-2 opacity-70">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <Bell size={15} className="text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold">{alert.type}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{alert.date}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            Closed
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-5.75">
                          {alert.msg}
                        </p>
                      </div>
                    ))}

                    {/* Info note */}
                    <div className="flex items-start gap-2.5 rounded-lg bg-muted/50 border px-3 py-2.5 mt-1">
                      <Info size={13} className="text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Emergency broadcasts are sent by Admin or Guards. You will also receive SMS
                        and in-app notifications. Students cannot trigger SOS broadcasts.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* ── Bottom Info Row ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campus Hours */}
              <Card className="shadow-none border bg-white">
                <CardHeader className="px-6 pt-5 pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Clock size={15} />
                    Campus Hours
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-4 space-y-2">
                  {[
                    { label: 'Main Gate', hours: '5:00 AM – 9:00 PM' },
                    { label: 'Side Gate A', hours: '6:00 AM – 6:00 PM' },
                    { label: 'Faculty Gate', hours: '6:00 AM – 8:00 PM' },
                    { label: 'Back Gate', hours: '7:00 AM – 5:00 PM' },
                  ].map((g) => (
                    <div key={g.label} className="flex items-center justify-between py-1">
                      <span className="text-sm text-foreground font-medium">{g.label}</span>
                      <span className="text-xs text-muted-foreground">{g.hours}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Attendance this month */}
              <Card className="shadow-none border bg-white">
                <CardHeader className="px-6 pt-5 pb-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <BookOpen size={15} />
                    Monthly Summary
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-5 space-y-3">
                  {[
                    { label: 'Campus Days (Feb)', value: 16, pct: 80 },
                    { label: 'Days Entered', value: 13, pct: 65 },
                    { label: 'On-Time Arrivals', value: 11, pct: 55 },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-semibold text-foreground">{stat.value}</span>
                      </div>
                      <Progress value={stat.pct} className="h-1.5" />
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

export default StudentDashboardPage;
