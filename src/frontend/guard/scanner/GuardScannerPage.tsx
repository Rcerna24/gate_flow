import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Shield,
  QrCode,
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  AlertTriangle,
  Megaphone,
  LogIn,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  ScanLine,
  ChevronLeft,
  Radio,
  Pause,
  Play,
  Volume2,
  RotateCcw,
} from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ── Types ─────────────────────────────────────────────────────────────────────

type ScanResult = {
  id: number;
  qrData: string;
  name: string;
  role: 'Student' | 'Faculty' | 'Visitor' | 'Unknown';
  type: 'Entry' | 'Exit';
  location: string;
  time: string;
  status: 'success' | 'rejected';
  reason?: string;
  avatar: string;
};

// ── Mock resolution logic ─────────────────────────────────────────────────────

const knownQRCodes: Record<
  string,
  { name: string; role: 'Student' | 'Faculty' | 'Visitor'; avatar: string; expired?: boolean }
> = {
  'VSU-STU-2023-0042-MARIA-SANTOS': { name: 'Maria Santos', role: 'Student', avatar: 'MS' },
  'VSU-STU-2024-0108-ROSA-LOMIBAO': { name: 'Rosa Lomibao', role: 'Student', avatar: 'RL' },
  'VSU-FAC-2020-0015-JUAN-DELACRUZ': { name: 'Juan dela Cruz', role: 'Faculty', avatar: 'JC' },
  'VSU-VIS-TEMP-LIZA-REYES-20260226': { name: 'Liza Reyes', role: 'Visitor', avatar: 'LR' },
  'VSU-VIS-TEMP-ANA-CORPUS-20260225': {
    name: 'Ana Corpus',
    role: 'Visitor',
    avatar: 'AC',
    expired: true,
  },
};

function resolveQR(data: string): {
  name: string;
  role: ScanResult['role'];
  status: 'success' | 'rejected';
  reason?: string;
  avatar: string;
} {
  const match = knownQRCodes[data];
  if (!match) {
    return {
      name: 'Unknown QR',
      role: 'Unknown',
      status: 'rejected',
      reason: 'Invalid QR code — not found in system.',
      avatar: '??',
    };
  }
  if (match.expired) {
    return {
      name: match.name,
      role: match.role,
      status: 'rejected',
      reason: 'Visitor QR has expired.',
      avatar: match.avatar,
    };
  }
  return { name: match.name, role: match.role, status: 'success', avatar: match.avatar };
}

function currentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, badge: null, href: '/guard/', active: false },
  { label: 'QR Scanner', icon: QrCode, badge: null, href: '/guard/scanner', active: true },
  { label: 'Entry Logs', icon: ClipboardList, badge: '177', href: '#', active: false },
  { label: 'Visitor Approval', icon: UserCheck, badge: '2', href: '#', active: false },
  { label: 'Incident Reports', icon: AlertTriangle, badge: '3', href: '#', active: false },
  { label: 'SOS Broadcast', icon: Megaphone, badge: null, href: '#', active: false },
];

// ── Main Component ────────────────────────────────────────────────────────────

const GuardScannerPage: React.FC = () => {
  const isMobile = useIsMobile();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'Entry' | 'Exit'>('Entry');
  const [scanLog, setScanLog] = useState<ScanResult[]>([]);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [location] = useState('Main Gate');
  const idCounter = useRef(0);
  const lastScanRef = useRef<{ text: string; time: number }>({ text: '', time: 0 });

  // ── Handle scan result ───────────────────────────────────────────

  const handleScanSuccess = useCallback(
    (decodedText: string) => {
      const now = Date.now();
      if (
        lastScanRef.current.text === decodedText &&
        now - lastScanRef.current.time < 3000
      ) {
        return;
      }
      lastScanRef.current = { text: decodedText, time: now };

      const resolved = resolveQR(decodedText);
      idCounter.current += 1;

      const result: ScanResult = {
        id: idCounter.current,
        qrData: decodedText,
        name: resolved.name,
        role: resolved.role,
        type: scanMode,
        location,
        time: currentTime(),
        status: resolved.status,
        reason: resolved.reason,
        avatar: resolved.avatar,
      };

      setLastResult(result);
      setFeedbackOpen(true);
      setScanLog((prev) => [result, ...prev]);
    },
    [scanMode, location],
  );

  // ── Scanner lifecycle ────────────────────────────────────────────

  const startScanner = useCallback(async () => {
    if (scannerRef.current?.isScanning) return;

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      const cameras = await Html5Qrcode.getCameras();
      if (!cameras.length) {
        alert('No camera found on this device.');
        return;
      }

      const backCam = cameras.find(
        (c) =>
          c.label.toLowerCase().includes('back') ||
          c.label.toLowerCase().includes('environment'),
      );
      const cameraId = backCam?.id ?? cameras[0].id;

      await scanner.start(
        cameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        undefined,
      );

      setScanning(true);
    } catch (err) {
      console.error('Scanner start failed:', err);
    }
  }, [handleScanSuccess]);

  const stopScanner = useCallback(async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }
      scannerRef.current?.clear();
      setScanning(false);
    } catch (err) {
      console.error('Scanner stop error:', err);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // ── Stats ────────────────────────────────────────────────────────

  const rejectedCount = scanLog.filter((s) => s.status === 'rejected').length;
  const entryCount = scanLog.filter((s) => s.status === 'success' && s.type === 'Entry').length;
  const exitCount = scanLog.filter((s) => s.status === 'success' && s.type === 'Exit').length;

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
                  <BreadcrumbPage className="text-sm font-medium">QR Scanner</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <MapPin size={10} />
                {location}
              </Badge>
              {isMobile && (
                <Badge
                  variant="outline"
                  className={`gap-1.5 text-xs ${scanning ? 'border-green-300 text-green-700' : 'border-muted text-muted-foreground'}`}
                >
                  <Radio size={10} />
                  {scanning ? 'Scanning' : 'Idle'}
                </Badge>
              )}
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Mobile: Scanner Active ── */}
            {isMobile ? (
              <>
                {/* Scanner Controls */}
                <Card className="shadow-none border bg-white">
                  <CardHeader className="px-5 pt-5 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <QrCode size={16} />
                        QR Code Scanner
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`gap-1 text-xs ${scanning ? 'border-green-300 text-green-700' : 'border-muted text-muted-foreground'}`}
                      >
                        {scanning ? (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            Live
                          </>
                        ) : (
                          'Stopped'
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="p-5 space-y-4">
                    {/* Scan mode selector */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground shrink-0">
                        Log as:
                      </span>
                      <Select
                        value={scanMode}
                        onValueChange={(v) => setScanMode(v as 'Entry' | 'Exit')}
                      >
                        <SelectTrigger className="w-32 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry">
                            <span className="flex items-center gap-1.5">
                              <LogIn size={12} /> Entry
                            </span>
                          </SelectItem>
                          <SelectItem value="Exit">
                            <span className="flex items-center gap-1.5">
                              <LogOut size={12} /> Exit
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Camera viewfinder */}
                    <div className="relative rounded-xl overflow-hidden border bg-black">
                      <div
                        id="qr-reader"
                        className="w-full"
                        style={{ minHeight: scanning ? 300 : 0 }}
                      />
                      {!scanning && (
                        <div className="flex flex-col items-center justify-center h-56 gap-3 text-white/50">
                          <ScanLine size={48} strokeWidth={1.5} />
                          <p className="text-sm font-medium">Camera inactive</p>
                        </div>
                      )}
                    </div>

                    {/* Scanner action buttons */}
                    <div className="flex gap-2">
                      {!scanning ? (
                        <Button
                          className="flex-1 bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-2"
                          onClick={startScanner}
                        >
                          <Play size={14} />
                          Start Scanner
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 border-red-300 text-red-600 hover:bg-red-50"
                          onClick={stopScanner}
                        >
                          <Pause size={14} />
                          Stop Scanner
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          stopScanner().then(() => startScanner());
                        }}
                        disabled={!scanning}
                        title="Restart Scanner"
                      >
                        <RotateCcw size={14} />
                      </Button>
                    </div>

                    {/* Accepted QR types */}
                    <div className="flex flex-wrap gap-1.5">
                      {['Student', 'Faculty / Staff', 'Visitor'].map((t) => (
                        <Badge key={t} variant="secondary" className="text-[11px]">
                          {t}
                        </Badge>
                      ))}
                      <Badge variant="secondary" className="text-[11px] gap-1">
                        <Clock size={9} />
                        Auto-timestamp
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* ── Quick Stats ── */}
                <div className="grid grid-cols-4 gap-3">
                  <Card className="shadow-none border bg-white">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-foreground">{scanLog.length}</p>
                      <p className="text-[11px] text-muted-foreground">Total</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-none border bg-white">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-[#0d7c3d]">{entryCount}</p>
                      <p className="text-[11px] text-muted-foreground">In</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-none border bg-white">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-muted-foreground">{exitCount}</p>
                      <p className="text-[11px] text-muted-foreground">Out</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-none border bg-white">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                      <p className="text-[11px] text-muted-foreground">Denied</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              /* ── Desktop: Scanner not available ── */
              <Card className="shadow-none border bg-white">
                <CardContent className="p-10 flex flex-col items-center text-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50">
                    <Smartphone
                      size={40}
                      strokeWidth={1.5}
                      className="text-muted-foreground/50"
                    />
                  </div>
                  <div className="max-w-sm space-y-2">
                    <h2 className="text-lg font-semibold">Mobile Device Required</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The QR code scanner uses your device's camera and is only available on mobile
                      phones. Please open this page on your mobile device to start scanning.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1.5">
                      <Smartphone size={14} className="text-[#0d7c3d]" />
                      <span>
                        Mobile — <span className="font-medium text-[#0d7c3d]">Enabled</span>
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <Monitor size={14} className="text-muted-foreground" />
                      <span>
                        Desktop — <span className="font-medium">View only</span>
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 mt-2" asChild>
                    <a href="/guard/">
                      <ChevronLeft size={14} />
                      Back to Dashboard
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* ── Scan Log Table (visible on both) ── */}
            <Card className="shadow-none border bg-white">
              <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Scan Session Log</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {scanLog.length} scanned
                  </Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                {scanLog.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-2 text-muted-foreground/50">
                    <ScanLine size={32} strokeWidth={1.5} />
                    <p className="text-sm">No scans yet this session.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs pl-6">Person</TableHead>
                        <TableHead className="text-xs">Role</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Location</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs text-right pr-6">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scanLog.map((s) => (
                        <TableRow
                          key={s.id}
                          className={s.status === 'rejected' ? 'bg-red-50/50' : ''}
                        >
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-2.5">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback
                                  className={`text-[10px] font-semibold ${s.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-[#0d7c3d]/10 text-[#0d7c3d]'}`}
                                >
                                  {s.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="text-sm font-medium">{s.name}</span>
                                {s.reason && (
                                  <p className="text-[11px] text-red-500 mt-0.5">{s.reason}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px]">
                              {s.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-medium ${s.type === 'Entry' ? 'text-[#0d7c3d]' : 'text-muted-foreground'}`}
                            >
                              {s.type === 'Entry' ? <LogIn size={11} /> : <LogOut size={11} />}
                              {s.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin size={10} />
                              {s.location}
                            </span>
                          </TableCell>
                          <TableCell>
                            {s.status === 'success' ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0d7c3d]">
                                <CheckCircle2 size={11} /> Accepted
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
                                <XCircle size={11} /> Rejected
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-xs text-right text-muted-foreground pr-6">
                            {s.time}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>

      {/* ── Scan Feedback Dialog ── */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent
          className={`sm:max-w-xs ${lastResult?.status === 'rejected' ? 'border-red-200' : 'border-green-200'}`}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {lastResult?.status === 'success' ? (
                <>
                  <CheckCircle2 size={18} className="text-[#0d7c3d]" />
                  <span className="text-[#0d7c3d]">Scan Accepted</span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-red-600" />
                  <span className="text-red-600">Scan Rejected</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {lastResult?.status === 'success'
                ? `${lastResult.name} — ${lastResult.type} logged at ${lastResult.location}`
                : lastResult?.reason ?? 'QR code could not be validated.'}
            </DialogDescription>
          </DialogHeader>

          {lastResult && (
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback
                    className={`font-semibold ${lastResult.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-[#0d7c3d]/10 text-[#0d7c3d]'}`}
                  >
                    {lastResult.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{lastResult.name}</p>
                  <p className="text-xs text-muted-foreground">{lastResult.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border p-2.5 space-y-0.5">
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-semibold flex items-center gap-1">
                    {lastResult.type === 'Entry' ? <LogIn size={11} /> : <LogOut size={11} />}
                    {lastResult.type}
                  </p>
                </div>
                <div className="rounded-md border p-2.5 space-y-0.5">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-semibold flex items-center gap-1">
                    <MapPin size={11} />
                    {lastResult.location}
                  </p>
                </div>
                <div className="rounded-md border p-2.5 space-y-0.5">
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Clock size={11} />
                    {lastResult.time}
                  </p>
                </div>
                <div className="rounded-md border p-2.5 space-y-0.5">
                  <p className="text-muted-foreground">Guard</p>
                  <p className="font-semibold">Grd. Fernandez</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              className={`w-full gap-1.5 ${lastResult?.status === 'success' ? 'bg-[#0d7c3d] hover:bg-[#0a6633] text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              onClick={() => setFeedbackOpen(false)}
            >
              <Volume2 size={13} />
              Dismiss & Continue Scanning
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default GuardScannerPage;
