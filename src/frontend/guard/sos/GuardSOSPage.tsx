import React, { useState } from 'react';
import {
  Shield,
  QrCode,
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  AlertTriangle,
  Megaphone,
  MapPin,
  Clock,
  Send,
  XCircle,
  CheckCircle2,
  Radio,
  Flame,
  CloudLightning,
  ShieldAlert,
  MessageSquare,
  History,
  AlertCircle,
  Users,
  CalendarDays,
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// ── Types ─────────────────────────────────────────────────────────────────────

type EmergencyType = {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  iconColor: string;
  borderColor: string;
};

type SOSRecord = {
  id: number;
  type: string;
  message: string;
  triggeredBy: string;
  avatar: string;
  location: string;
  date: string;
  time: string;
  status: 'Active' | 'Closed';
  duration: string | null;
};

// ── Mock data ─────────────────────────────────────────────────────────────────

/** Simulated active emergency — set to null for "no active SOS" state */
const activeEmergency: SOSRecord | null = {
  id: 101,
  type: 'Security Threat',
  message: 'Suspicious individual spotted near the administration building. All personnel on alert.',
  triggeredBy: 'Grd. Torres',
  avatar: 'GT',
  location: 'Admin Building',
  date: 'Feb 26, 2026',
  time: '01:45 PM',
  status: 'Active',
  duration: null,
};

const sosHistory: SOSRecord[] = [
  {
    id: 1,
    type: 'Fire',
    message: 'Smoke detected near the Chemistry lab storage room. Evacuation in progress.',
    triggeredBy: 'Grd. Fernandez',
    avatar: 'GF',
    location: 'Science Building',
    date: 'Feb 25, 2026',
    time: '10:22 AM',
    status: 'Closed',
    duration: '38 min',
  },
  {
    id: 2,
    type: 'Weather Warning',
    message: 'Strong winds and heavy rainfall incoming. Students advised to stay indoors.',
    triggeredBy: 'Admin',
    avatar: 'AD',
    location: 'Campus-wide',
    date: 'Feb 24, 2026',
    time: '02:10 PM',
    status: 'Closed',
    duration: '2 hr 15 min',
  },
  {
    id: 3,
    type: 'Earthquake',
    message: 'Tremors detected. All occupants to evacuate buildings immediately.',
    triggeredBy: 'Grd. Reyes',
    avatar: 'GR',
    location: 'Campus-wide',
    date: 'Feb 22, 2026',
    time: '08:54 AM',
    status: 'Closed',
    duration: '1 hr 05 min',
  },
  {
    id: 4,
    type: 'Security Threat',
    message: 'Unauthorized entry detected at the back gate. Security team responding.',
    triggeredBy: 'Grd. Fernandez',
    avatar: 'GF',
    location: 'Back Gate',
    date: 'Feb 20, 2026',
    time: '11:30 AM',
    status: 'Closed',
    duration: '22 min',
  },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, badge: null, href: '/guard/',            active: false },
  { label: 'QR Scanner',       icon: QrCode,          badge: null, href: '/guard/scanner',     active: false },
  { label: 'Entry Logs',       icon: ClipboardList,   badge: '24', href: '/guard/logs',        active: false },
  { label: 'Visitor Approval', icon: UserCheck,       badge: '2',  href: '#',                  active: false },
  { label: 'Incident Reports', icon: AlertTriangle,   badge: '5',  href: '/guard/incidents',   active: false },
  { label: 'SOS Broadcast',    icon: Megaphone,       badge: null, href: '/guard/sos',         active: true  },
];

// ── Emergency type options ────────────────────────────────────────────────────

const emergencyTypes: EmergencyType[] = [
  {
    id: 'earthquake',
    label: 'Earthquake',
    icon: AlertCircle,
    description: 'Seismic activity — trigger evacuation',
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    iconColor: 'bg-orange-100 text-orange-600',
    borderColor: 'border-orange-400',
  },
  {
    id: 'fire',
    label: 'Fire',
    icon: Flame,
    description: 'Fire or smoke — evacuate immediately',
    color: 'bg-red-50 hover:bg-red-100 border-red-200',
    iconColor: 'bg-red-100 text-red-600',
    borderColor: 'border-red-500',
  },
  {
    id: 'security',
    label: 'Security Threat',
    icon: ShieldAlert,
    description: 'Unauthorized access or threat',
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    iconColor: 'bg-purple-100 text-purple-600',
    borderColor: 'border-purple-400',
  },
  {
    id: 'weather',
    label: 'Weather Warning',
    icon: CloudLightning,
    description: 'Severe weather — seek shelter',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    iconColor: 'bg-blue-100 text-blue-600',
    borderColor: 'border-blue-400',
  },
  {
    id: 'custom',
    label: 'Custom Message',
    icon: MessageSquare,
    description: 'Send a custom announcement',
    color: 'bg-muted/80 hover:bg-muted border-border',
    iconColor: 'bg-muted text-muted-foreground',
    borderColor: 'border-foreground/30',
  },
];

const TYPE_BADGE: Record<string, string> = {
  Earthquake:       'bg-orange-100 text-orange-700 border-orange-200',
  Fire:             'bg-red-100 text-red-700 border-red-200',
  'Security Threat':'bg-purple-100 text-purple-700 border-purple-200',
  'Weather Warning':'bg-blue-100 text-blue-700 border-blue-200',
  'Custom Message': 'bg-muted text-muted-foreground border-border',
};

// ── Main Component ────────────────────────────────────────────────────────────

const GuardSOSPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const canBroadcast = selectedType !== null && (selectedType.id !== 'custom' || customMessage.trim() !== '');

  function handleSendBroadcast() {
    setConfirmOpen(false);
    setBroadcastSent(true);
    // Reset form after short delay to simulate success
    setTimeout(() => {
      setSelectedType(null);
      setCustomMessage('');
    }, 100);
  }

  function handleCloseEmergency() {
    setCloseConfirmOpen(false);
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
                  <BreadcrumbPage className="text-sm font-medium">SOS Broadcast</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs hidden sm:inline-flex">
                <CalendarDays size={10} />
                Feb 26, 2026
              </Badge>
              {activeEmergency && (
                <Badge className="gap-1.5 text-xs bg-red-600 text-white animate-pulse border-0">
                  <Radio size={10} />
                  Active SOS
                </Badge>
              )}
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Active Emergency Banner ── */}
            {activeEmergency && (
              <div className="rounded-xl border-2 border-red-400 bg-red-50 p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    {/* Pulsing red dot */}
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-40" />
                      <Megaphone size={20} className="text-red-600 relative" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-red-700 uppercase tracking-wide">
                          Active Emergency
                        </p>
                        <Badge className="bg-red-200 text-red-800 border-0 text-[10px]">
                          {activeEmergency.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-red-700 mt-1 leading-relaxed">
                        {activeEmergency.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-red-600/80">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {activeEmergency.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          Triggered at {activeEmergency.time} by {activeEmergency.triggeredBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100 gap-1.5 shrink-0"
                    onClick={() => setCloseConfirmOpen(true)}
                  >
                    <XCircle size={13} />
                    Close Emergency
                  </Button>
                </div>
              </div>
            )}

            {/* ── Broadcast Sent Success Banner ── */}
            {broadcastSent && (
              <div className="rounded-xl border border-[#0d7c3d]/30 bg-[#0d7c3d]/5 p-4 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#0d7c3d] shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0d7c3d]">Broadcast Sent Successfully</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    SMS and in-app notifications have been sent to all registered users on campus.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground"
                  onClick={() => setBroadcastSent(false)}
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Active SOS</p>
                  <p className={`text-2xl font-bold ${activeEmergency ? 'text-red-600' : 'text-foreground'}`}>
                    {activeEmergency ? '1' : '0'}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Radio size={11} className={activeEmergency ? 'text-red-500' : 'text-muted-foreground'} />
                    <p className="text-[11px] text-muted-foreground">
                      {activeEmergency ? 'Emergency ongoing' : 'Campus is clear'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Broadcasts Today</p>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Megaphone size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">Sent this session</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Users Notified</p>
                  <p className="text-2xl font-bold text-foreground">1,248</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">Registered campus users</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Total History</p>
                  <p className="text-2xl font-bold text-foreground">{sosHistory.length + 1}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <History size={11} className="text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground">All time broadcasts</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Two-column layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left: Trigger SOS */}
              <div className="lg:col-span-3">
                <Card className="shadow-none border bg-white h-full">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                        <Megaphone size={16} className="text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          Trigger SOS Broadcast
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Sends SMS and in-app alerts to all registered users immediately
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="px-6 py-6 space-y-6">
                    {/* ── Emergency Type Selection ── */}
                    <div className="space-y-2.5">
                      <Label className="text-sm font-medium">
                        Select Emergency Type
                        <span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {emergencyTypes.map((type) => {
                          const isSelected = selectedType?.id === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setSelectedType(type)}
                              className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all cursor-pointer ${
                                isSelected
                                  ? `${type.color} ${type.borderColor} ring-2 ring-offset-1 ring-red-400/40`
                                  : `${type.color} border-transparent`
                              }`}
                            >
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${type.iconColor}`}
                              >
                                <type.icon size={17} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold leading-snug">{type.label}</p>
                                <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 truncate">
                                  {type.description}
                                </p>
                              </div>
                              {isSelected && (
                                <CheckCircle2
                                  size={16}
                                  className="ml-auto shrink-0 text-red-500"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Custom Message ── */}
                    <div className="space-y-1.5">
                      <Label htmlFor="sos-msg" className="text-sm font-medium">
                        Broadcast Message
                        {selectedType?.id === 'custom' && (
                          <span className="text-red-500 ml-0.5">*</span>
                        )}
                      </Label>
                      <Textarea
                        id="sos-msg"
                        placeholder={
                          selectedType
                            ? selectedType.id === 'custom'
                              ? 'Type your custom announcement here...'
                              : `Optional: Add details about this ${selectedType.label.toLowerCase()} emergency...`
                            : 'Select an emergency type first, then add details...'
                        }
                        className="resize-none text-sm"
                        rows={4}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        disabled={!selectedType}
                      />
                      <p className="text-[11px] text-muted-foreground">
                        This message will be included in the SMS and in-app notification sent to all users.
                      </p>
                    </div>

                    {/* ── Preview ── */}
                    {selectedType && (
                      <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Broadcast Preview
                        </p>
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${selectedType.iconColor}`}
                          >
                            <selectedType.icon size={13} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              VSU Security Alert — {selectedType.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {customMessage.trim()
                                ? customMessage.trim()
                                : `A ${selectedType.label.toLowerCase()} emergency has been declared. Please follow safety protocols.`}
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">
                              Triggered by Grd. Fernandez · Main Gate · Feb 26, 2026
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Broadcast Button ── */}
                    <Button
                      className="w-full h-11 text-sm font-semibold gap-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
                      disabled={!canBroadcast}
                      onClick={() => setConfirmOpen(true)}
                    >
                      <Megaphone size={16} />
                      Send Emergency Broadcast
                    </Button>

                    {!canBroadcast && (
                      <p className="text-center text-[11px] text-muted-foreground -mt-2">
                        {!selectedType
                          ? 'Select an emergency type to continue.'
                          : 'Add a message for the Custom Message type.'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right: SOS History */}
              <div className="lg:col-span-2">
                <Card className="shadow-none border bg-white h-full">
                  <CardHeader className="px-6 pt-5 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">Broadcast History</CardTitle>
                      <Badge variant="secondary" className="text-[11px]">
                        {sosHistory.length} records
                      </Badge>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="p-0">
                    {/* Active emergency at top */}
                    {activeEmergency && (
                      <div className="px-5 py-4 border-b bg-red-50/60">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <div className="relative mt-0.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" />
                              <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                                <Radio size={12} className="text-red-600" />
                              </div>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <Badge className="bg-red-200 text-red-800 border-0 text-[10px] px-1.5">
                                  LIVE
                                </Badge>
                                <span className="text-xs font-semibold text-red-700">
                                  {activeEmergency.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-red-600/80 mt-0.5 line-clamp-2">
                                {activeEmergency.message}
                              </p>
                              <p className="text-[10px] text-red-400 mt-1">
                                {activeEmergency.triggeredBy} · {activeEmergency.time}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-red-300 text-red-600 text-[10px] shrink-0"
                          >
                            Active
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Past broadcasts */}
                    <div className="divide-y">
                      {sosHistory.map((record) => (
                        <div key={record.id} className="px-5 py-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5 flex-1 min-w-0">
                              <Avatar className="h-7 w-7 mt-0.5 shrink-0">
                                <AvatarFallback className="bg-muted text-muted-foreground text-[9px] font-semibold">
                                  {record.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <Badge
                                    variant="outline"
                                    className={`text-[10px] px-1.5 ${TYPE_BADGE[record.type] ?? ''}`}
                                  >
                                    {record.type}
                                  </Badge>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                  {record.message}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground/70">
                                  <span className="flex items-center gap-0.5">
                                    <Clock size={9} />
                                    {record.date} · {record.time}
                                  </span>
                                  {record.duration && (
                                    <>
                                      <span>·</span>
                                      <span>{record.duration}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-[10px] shrink-0 bg-green-50 text-green-700 border border-green-200"
                            >
                              Closed
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* ── Broadcast Confirm Dialog ── */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Megaphone size={18} />
              Confirm Emergency Broadcast
            </DialogTitle>
            <DialogDescription>
              This action will immediately send an SMS and in-app alert to{' '}
              <strong>all 1,248 registered users</strong> on campus. This cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedType && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 space-y-2 my-1">
              <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${selectedType.iconColor}`}>
                  <selectedType.icon size={14} />
                </div>
                <p className="text-sm font-bold text-red-700">{selectedType.label}</p>
              </div>
              <p className="text-xs text-red-600 leading-relaxed">
                {customMessage.trim()
                  ? customMessage.trim()
                  : `A ${selectedType.label.toLowerCase()} emergency has been declared. Please follow safety protocols.`}
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Only trigger this broadcast for genuine emergencies. False alarms may result in unnecessary
            panic and disciplinary action.
          </p>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-1.5"
              onClick={handleSendBroadcast}
            >
              <Send size={13} />
              Confirm & Broadcast
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Close Emergency Confirm Dialog ── */}
      <Dialog open={closeConfirmOpen} onOpenChange={setCloseConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle size={18} className="text-muted-foreground" />
              Close Active Emergency
            </DialogTitle>
            <DialogDescription>
              Are you sure the emergency has been resolved? This will close the active SOS
              broadcast and notify all users that the situation is under control.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCloseConfirmOpen(false)}>
              Go Back
            </Button>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 gap-1.5"
              onClick={handleCloseEmergency}
            >
              <CheckCircle2 size={13} />
              Yes, Close Emergency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default GuardSOSPage;
