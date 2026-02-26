import React, { useRef, useState } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  History,
  Bell,
  LayoutDashboard,
  Hash,
  GraduationCap,
  Mail,
  UserCog,
  Download,
  RefreshCw,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, href: '/student/',          active: false },
  { label: 'My QR Code',       icon: QrCode,          href: '/student/qr',        active: true  },
  { label: 'Entry History',    icon: History,         href: '/student/history',   active: false },
  { label: 'Incident Reports', icon: ClipboardList,   href: '/student/incidents', active: false },
  { label: 'Emergency Alerts', icon: Bell,            href: '/student/alerts',    active: false },
];

// ── Mock student data ─────────────────────────────────────────────────────────

const student = {
  name:       'Maria Santos',
  email:      'maria.santos@vsu.edu.ph',
  studentId:  'VSU-2023-0042',
  course:     'Bachelor of Science in Nursing',
  year:       '3rd Year',
  section:    'BSN 3-A',
  role:       'Student',
  initials:   'MS',
};

// QR payload — encoded as a JSON string (backend would sign this in production)
const QR_PAYLOAD = JSON.stringify({
  id:   student.studentId,
  role: student.role,
  ts:   '2026-02-26',
});

// Last refreshed label
const LAST_REFRESHED = 'Feb 26, 2026 — 8:00 AM';

// ── Main Component ────────────────────────────────────────────────────────────

const StudentQRCodePage: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [copied, setCopied] = useState(false);

  function handleDownload() {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.studentId}-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopyId() {
    navigator.clipboard.writeText(student.studentId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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

            <SidebarGroup className="mt-2">
              <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-1">
                Account
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-2.5" asChild>
                      <a href="/student/profile">
                        <UserCog size={16} />
                        <span>My Profile</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
                  <BreadcrumbPage className="text-sm font-medium">My QR Code</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto space-y-6">

              {/* ── Page heading ── */}
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">My QR Code</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Present this code at campus entry and exit points for scanning.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── QR Code card ── */}
                <div className="lg:col-span-2 space-y-5">
                  <Card className="shadow-none border bg-white overflow-hidden">
                    {/* Green accent strip */}
                    <div className="h-1.5 bg-[#0d7c3d]" />
                    <CardHeader className="px-6 pt-5 pb-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                            <QrCode size={15} className="text-[#0d7c3d]" />
                            Entry / Exit QR Code
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            Unique to your account — do not share with others
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-green-300 text-green-700 text-[10px] gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                          Valid
                        </Badge>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="px-6 py-8 flex flex-col items-center gap-6">
                      {/* QR Code */}
                      <div className="rounded-2xl border-2 border-dashed border-[#0d7c3d]/20 bg-[#0d7c3d]/3 p-6 flex flex-col items-center gap-4">
                        {/* Logo above QR */}
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0d7c3d]">
                            <Shield size={14} className="text-white" />
                          </div>
                          <span className="text-xs font-semibold text-[#0d7c3d] tracking-tight">
                            VSU Security
                          </span>
                        </div>

                        {/* The QR */}
                        <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100">
                          <QRCodeSVG
                            ref={svgRef}
                            value={QR_PAYLOAD}
                            size={200}
                            level="H"
                            marginSize={1}
                          />
                        </div>

                        {/* ID below QR */}
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={handleCopyId}
                            className="group flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0d7c3d] hover:text-[#0b6835] transition-colors"
                            title="Click to copy"
                          >
                            <Hash size={11} />
                            {student.studentId}
                            {copied
                              ? <CheckCircle2 size={11} className="text-green-500" />
                              : <span className="text-[9px] text-muted-foreground font-sans opacity-0 group-hover:opacity-100 transition-opacity">copy</span>
                            }
                          </button>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{student.role} · {student.section}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 w-full max-w-xs">
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          className="flex-1 gap-1.5 text-sm h-9"
                        >
                          <Download size={14} />
                          Download SVG
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 gap-1.5 text-sm h-9 text-muted-foreground"
                          disabled
                          title="QR codes auto-refresh daily"
                        >
                          <RefreshCw size={14} />
                          Refresh
                        </Button>
                      </div>

                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <RefreshCw size={10} />
                        Last refreshed: {LAST_REFRESHED}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* ── Right info panel ── */}
                <div className="space-y-4">

                  {/* Student identity card */}
                  <Card className="shadow-none border bg-white">
                    <CardHeader className="px-5 pt-5 pb-3">
                      <CardTitle className="text-sm font-semibold">Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-3">
                      {[
                        { icon: Hash,          label: 'Student ID',  value: student.studentId   },
                        { icon: GraduationCap, label: 'Course',      value: student.course       },
                        { icon: Mail,          label: 'Email',       value: student.email        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0d7c3d]/8">
                            <Icon size={13} className="text-[#0d7c3d]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-muted-foreground">{label}</p>
                            <p className="text-xs font-medium text-foreground break-all">{value}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Usage guide */}
                  <Card className="shadow-none border bg-white">
                    <CardHeader className="px-5 pt-5 pb-3">
                      <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                        <Info size={13} className="text-[#0d7c3d]" />
                        How to Use
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-3">
                      {[
                        { step: '1', text: 'Open this page on your device.' },
                        { step: '2', text: 'Present the QR code to the guard scanner at the gate.' },
                        { step: '3', text: 'Wait for the green confirmation beep.' },
                        { step: '4', text: 'Your entry or exit is automatically logged.' },
                      ].map(({ step, text }) => (
                        <div key={step} className="flex items-start gap-2.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d7c3d] text-white text-[10px] font-bold">
                            {step}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Security notice */}
                  <Card className="shadow-none border bg-amber-50 border-amber-200">
                    <CardContent className="px-5 py-4 space-y-1.5">
                      <p className="text-xs font-semibold text-amber-700">Security Notice</p>
                      <p className="text-[11px] text-amber-700/80 leading-relaxed">
                        Your QR code is uniquely linked to your account. Never share it — misuse may result in
                        disciplinary action.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StudentQRCodePage;
