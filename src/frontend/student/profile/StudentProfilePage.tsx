import React, { useState } from 'react';
import {
  Shield,
  QrCode,
  ClipboardList,
  History,
  Bell,
  LayoutDashboard,
  User,
  Mail,
  Phone,
  BookOpen,
  Hash,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  GraduationCap,
  UserCog,
  Save,
  KeyRound,
  BellRing,
  MessageSquare,
  Smartphone,
  ChevronRight,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
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
import { Textarea } from '@/components/ui/textarea';

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, href: '/student/',          active: false },
  { label: 'My QR Code',       icon: QrCode,          href: '/student/qr',        active: false },
  { label: 'Entry History',    icon: History,         href: '/student/history',   active: false },
  { label: 'Incident Reports', icon: ClipboardList,   href: '/student/incidents', active: false },
  { label: 'Emergency Alerts', icon: Bell,            href: '/student/alerts',    active: false },
];

// ── Mock student data ─────────────────────────────────────────────────────────

const student = {
  name:       'Maria Santos',
  firstName:  'Maria',
  lastName:   'Santos',
  email:      'maria.santos@vsu.edu.ph',
  contact:    '+63 912 345 6789',
  studentId:  'VSU-2023-0042',
  course:     'Bachelor of Science in Nursing',
  year:       '3rd Year',
  section:    'BSN 3-A',
  gender:     'Female',
  address:    'Baybay City, Leyte',
  memberSince:'August 2023',
  role:       'Student',
  initials:   'MS',
};

// ── Main Component ────────────────────────────────────────────────────────────

const StudentProfilePage: React.FC = () => {
  // ── Form state ────────────────────────────────────────────────────
  const [firstName,  setFirstName]  = useState(student.firstName);
  const [lastName,   setLastName]   = useState(student.lastName);
  const [email,      setEmail]      = useState(student.email);
  const [contact,    setContact]    = useState(student.contact);
  const [year,       setYear]       = useState(student.year);
  const [address,    setAddress]    = useState(student.address);
  const [gender,     setGender]     = useState(student.gender);
  const [profileSaved, setProfileSaved] = useState(false);

  // ── Password state ────────────────────────────────────────────────
  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [showCurrent,setShowCurrent]= useState(false);
  const [showNew,    setShowNew]    = useState(false);
  const [showConfirm,setShowConfirm]= useState(false);
  const [pwSaved,    setPwSaved]    = useState(false);
  const [pwError,    setPwError]    = useState('');

  // ── Notification prefs ────────────────────────────────────────────
  const [notifSms,       setNotifSms]       = useState(true);
  const [notifInApp,     setNotifInApp]     = useState(true);
  const [notifIncident,  setNotifIncident]  = useState(true);
  const [notifEmergency, setNotifEmergency] = useState(true);
  const [notifSaved,     setNotifSaved]     = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    if (!currentPw) { setPwError('Please enter your current password.'); return; }
    if (newPw.length < 8) { setPwError('New password must be at least 8 characters.'); return; }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return; }
    setPwSaved(true);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setTimeout(() => setPwSaved(false), 3000);
  }

  function handleNotifSave() {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  }

  const pwStrength: 'weak' | 'fair' | 'strong' =
    newPw.length === 0 ? 'weak'
    : newPw.length < 8 ? 'weak'
    : newPw.length < 12 ? 'fair'
    : 'strong';

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
                    <SidebarMenuButton isActive className="gap-2.5" asChild>
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
                  <BreadcrumbPage className="text-sm font-medium">My Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto space-y-6">

              {/* ── Profile Hero Card ── */}
              <Card className="shadow-none border bg-white overflow-hidden">
                {/* Green accent strip */}
                <div className="h-2 bg-[#0d7c3d]" />
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Avatar with camera overlay */}
                    <div className="relative shrink-0">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-2xl font-bold">
                          {student.initials}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#0d7c3d] text-white shadow-sm hover:bg-[#0b6835] transition-colors"
                        title="Change photo"
                      >
                        <Camera size={11} />
                      </button>
                    </div>

                    {/* Name & meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h1 className="text-xl font-bold text-foreground">{student.name}</h1>
                        <Badge className="bg-[#0d7c3d]/10 text-[#0d7c3d] border-0 hover:bg-[#0d7c3d]/10 text-[11px]">
                          {student.role}
                        </Badge>
                        <Badge variant="outline" className="border-green-300 text-green-700 text-[10px]">
                          Active
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Hash size={11} /> {student.studentId}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap size={11} /> {student.section}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail size={11} /> {student.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays size={11} /> Member since {student.memberSince}
                        </span>
                      </div>
                    </div>

                    {/* Quick info pills */}
                    <div className="max-sm:hidden flex flex-col gap-2 shrink-0">
                      <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
                        <BookOpen size={13} className="text-[#0d7c3d]" />
                        <div>
                          <p className="text-[10px] text-muted-foreground">Course</p>
                          <p className="text-xs font-medium text-foreground leading-none mt-0.5">
                            {student.course}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
                        <User size={13} className="text-[#0d7c3d]" />
                        <div>
                          <p className="text-[10px] text-muted-foreground">Year Level</p>
                          <p className="text-xs font-medium text-foreground leading-none mt-0.5">
                            {student.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ── Tabs ── */}
              <Tabs defaultValue="profile" className="space-y-5">
                <TabsList className="bg-white border h-10 p-1 rounded-lg">
                  <TabsTrigger value="profile" className="gap-1.5 text-xs data-[state=active]:bg-[#0d7c3d] data-[state=active]:text-white">
                    <User size={13} />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="security" className="gap-1.5 text-xs data-[state=active]:bg-[#0d7c3d] data-[state=active]:text-white">
                    <Lock size={13} />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="gap-1.5 text-xs data-[state=active]:bg-[#0d7c3d] data-[state=active]:text-white">
                    <BellRing size={13} />
                    Notifications
                  </TabsTrigger>
                </TabsList>

                {/* ── Tab: Personal Info ── */}
                <TabsContent value="profile" className="mt-0">
                  <form onSubmit={handleProfileSave}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                      {/* Left: read-only account info */}
                      <div className="space-y-4">
                        <Card className="shadow-none border bg-white">
                          <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className="text-sm font-semibold">Account Info</CardTitle>
                            <CardDescription className="text-xs">
                              These fields are managed by the admin.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="px-5 pb-5 space-y-3">
                            {[
                              { label: 'Student ID',  icon: Hash,          value: student.studentId  },
                              { label: 'Course',      icon: BookOpen,      value: student.course      },
                              { label: 'Year Level',  icon: GraduationCap, value: student.year        },
                              { label: 'Section',     icon: User,          value: student.section     },
                            ].map(({ label, icon: Icon, value }) => (
                              <div key={label} className="flex items-start gap-2.5">
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0d7c3d]/8">
                                  <Icon size={13} className="text-[#0d7c3d]" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[10px] text-muted-foreground">{label}</p>
                                  <p className="text-xs font-medium text-foreground truncate">{value}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card className="shadow-none border bg-white">
                          <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className="text-sm font-semibold">Account Status</CardTitle>
                          </CardHeader>
                          <CardContent className="px-5 pb-5 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Status</span>
                              <Badge variant="outline" className="border-green-300 text-green-700 text-[10px]">
                                Active
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Role</span>
                              <span className="text-xs font-medium">{student.role}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Member since</span>
                              <span className="text-xs font-medium">{student.memberSince}</span>
                            </div>
                            <Separator />
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                              Contact the security admin for account-level changes such as role updates or deactivation.
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right: editable fields */}
                      <div className="lg:col-span-2">
                        <Card className="shadow-none border bg-white">
                          <CardHeader className="px-6 pt-5 pb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-sm font-semibold">Edit Personal Details</CardTitle>
                                <CardDescription className="text-xs mt-0.5">
                                  Update your contact and personal information.
                                </CardDescription>
                              </div>
                              {profileSaved && (
                                <span className="flex items-center gap-1 text-xs text-[#0d7c3d] font-medium">
                                  <CheckCircle2 size={13} />
                                  Saved!
                                </span>
                              )}
                            </div>
                          </CardHeader>
                          <Separator />
                          <CardContent className="px-6 py-6 space-y-5">
                            {/* Name row */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium">First Name</Label>
                                <div className="relative">
                                  <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                  <Input
                                    className="pl-8 h-9 text-sm"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Last Name</Label>
                                <Input
                                  className="h-9 text-sm"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">
                                Email Address
                                <span className="ml-2 text-[10px] font-normal text-muted-foreground">(VSU email only)</span>
                              </Label>
                              <div className="relative">
                                <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  type="email"
                                  className="pl-8 h-9 text-sm"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>

                            {/* Contact + Gender row */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Contact Number</Label>
                                <div className="relative">
                                  <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                  <Input
                                    className="pl-8 h-9 text-sm"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium">Gender</Label>
                                <Select value={gender} onValueChange={setGender}>
                                  <SelectTrigger className="h-9 text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Year level */}
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Year Level</Label>
                              <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'].map((y) => (
                                    <SelectItem key={y} value={y}>{y}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Address */}
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Home Address</Label>
                              <div className="relative">
                                <MapPin size={13} className="absolute left-2.5 top-3 text-muted-foreground" />
                                <Textarea
                                  className="pl-8 text-sm min-h-18 resize-none"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <Separator />
                          <div className="flex items-center justify-end px-6 py-4">
                            <Button
                              type="submit"
                              className="bg-[#0d7c3d] hover:bg-[#0b6835] text-white gap-1.5 text-sm"
                            >
                              <Save size={14} />
                              Save Changes
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                {/* ── Tab: Security ── */}
                <TabsContent value="security" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Tips panel */}
                    <div className="space-y-4">
                      <Card className="shadow-none border bg-white">
                        <CardHeader className="px-5 pt-5 pb-3">
                          <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                            <KeyRound size={14} className="text-[#0d7c3d]" />
                            Password Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5 space-y-2">
                          {[
                            'Use at least 8 characters',
                            'Mix letters, numbers & symbols',
                            'Avoid using your name or ID',
                            'Never share your password',
                          ].map((tip) => (
                            <div key={tip} className="flex items-start gap-2">
                              <ChevronRight size={12} className="text-[#0d7c3d] mt-0.5 shrink-0" />
                              <p className="text-xs text-muted-foreground">{tip}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="shadow-none border bg-amber-50 border-amber-200">
                        <CardContent className="px-5 py-4 flex items-start gap-3">
                          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700 leading-relaxed">
                            Changing your password will log you out of all active sessions.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Change password form */}
                    <div className="lg:col-span-2">
                      <Card className="shadow-none border bg-white">
                        <CardHeader className="px-6 pt-5 pb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-sm font-semibold">Change Password</CardTitle>
                              <CardDescription className="text-xs mt-0.5">
                                Choose a strong password to keep your account secure.
                              </CardDescription>
                            </div>
                            {pwSaved && (
                              <span className="flex items-center gap-1 text-xs text-[#0d7c3d] font-medium">
                                <CheckCircle2 size={13} />
                                Password updated!
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <Separator />
                        <form onSubmit={handlePasswordSave}>
                          <CardContent className="px-6 py-6 space-y-5">
                            {/* Current password */}
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Current Password</Label>
                              <div className="relative">
                                <Lock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  type={showCurrent ? 'text' : 'password'}
                                  className="pl-8 pr-9 h-9 text-sm"
                                  placeholder="Enter current password"
                                  value={currentPw}
                                  onChange={(e) => setCurrentPw(e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowCurrent((v) => !v)}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                  {showCurrent ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                              </div>
                            </div>

                            {/* New password */}
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">New Password</Label>
                              <div className="relative">
                                <Lock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  type={showNew ? 'text' : 'password'}
                                  className="pl-8 pr-9 h-9 text-sm"
                                  placeholder="At least 8 characters"
                                  value={newPw}
                                  onChange={(e) => setNewPw(e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNew((v) => !v)}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                  {showNew ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                              </div>
                              {/* Strength bar */}
                              {newPw.length > 0 && (
                                <div className="space-y-1 pt-1">
                                  <div className="flex gap-1">
                                    {(['weak', 'fair', 'strong'] as const).map((level, i) => (
                                      <div
                                        key={level}
                                        className={`h-1 flex-1 rounded-full transition-colors ${
                                          i <= (['weak', 'fair', 'strong'].indexOf(pwStrength))
                                            ? pwStrength === 'weak'   ? 'bg-red-400'
                                              : pwStrength === 'fair' ? 'bg-amber-400'
                                              : 'bg-[#0d7c3d]'
                                            : 'bg-muted'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className={`text-[10px] font-medium ${
                                    pwStrength === 'weak' ? 'text-red-500'
                                    : pwStrength === 'fair' ? 'text-amber-500'
                                    : 'text-[#0d7c3d]'
                                  }`}>
                                    {pwStrength === 'weak' ? 'Weak — add more characters'
                                    : pwStrength === 'fair' ? 'Fair — add numbers or symbols'
                                    : 'Strong password'}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Confirm password */}
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Confirm New Password</Label>
                              <div className="relative">
                                <Lock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  type={showConfirm ? 'text' : 'password'}
                                  className={`pl-8 pr-9 h-9 text-sm ${
                                    confirmPw && confirmPw !== newPw ? 'border-red-400 focus-visible:ring-red-300' : ''
                                  }`}
                                  placeholder="Re-enter new password"
                                  value={confirmPw}
                                  onChange={(e) => setConfirmPw(e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirm((v) => !v)}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                  {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                              </div>
                              {confirmPw && confirmPw !== newPw && (
                                <p className="text-[10px] text-red-500 flex items-center gap-1">
                                  <AlertCircle size={10} /> Passwords do not match
                                </p>
                              )}
                              {confirmPw && confirmPw === newPw && newPw.length >= 8 && (
                                <p className="text-[10px] text-[#0d7c3d] flex items-center gap-1">
                                  <CheckCircle2 size={10} /> Passwords match
                                </p>
                              )}
                            </div>

                            {/* Error */}
                            {pwError && (
                              <div className="flex items-center gap-1.5 rounded-md bg-red-50 border border-red-200 px-3 py-2.5">
                                <AlertCircle size={13} className="text-red-500 shrink-0" />
                                <p className="text-xs text-red-600">{pwError}</p>
                              </div>
                            )}
                          </CardContent>
                          <Separator />
                          <div className="flex items-center justify-end px-6 py-4">
                            <Button
                              type="submit"
                              className="bg-[#0d7c3d] hover:bg-[#0b6835] text-white gap-1.5 text-sm"
                            >
                              <KeyRound size={14} />
                              Update Password
                            </Button>
                          </div>
                        </form>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* ── Tab: Notifications ── */}
                <TabsContent value="notifications" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Info panel */}
                    <Card className="shadow-none border bg-white h-fit">
                      <CardHeader className="px-5 pt-5 pb-3">
                        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                          <Bell size={14} className="text-[#0d7c3d]" />
                          About Notifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 pb-5 space-y-3 text-xs text-muted-foreground">
                        <p className="leading-relaxed">
                          Emergency alerts (SOS broadcasts) are always delivered and cannot be disabled.
                        </p>
                        <p className="leading-relaxed">
                          SMS notifications are sent to your registered contact number.
                        </p>
                        <Separator />
                        <p className="text-[10px] leading-relaxed">
                          Contact your admin to update your registered phone number for SMS delivery.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Notification settings */}
                    <div className="lg:col-span-2 space-y-4">
                      <Card className="shadow-none border bg-white">
                        <CardHeader className="px-6 pt-5 pb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
                              <CardDescription className="text-xs mt-0.5">
                                Control how and when you receive alerts.
                              </CardDescription>
                            </div>
                            {notifSaved && (
                              <span className="flex items-center gap-1 text-xs text-[#0d7c3d] font-medium">
                                <CheckCircle2 size={13} />
                                Saved!
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="px-6 py-5 space-y-0 divide-y">

                          {/* SMS */}
                          <div className="flex items-center justify-between py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#0d7c3d]/8 shrink-0">
                                <Smartphone size={15} className="text-[#0d7c3d]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  Receive alerts via text message to {student.contact}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={notifSms}
                              onCheckedChange={setNotifSms}
                              className="data-[state=checked]:bg-[#0d7c3d]"
                            />
                          </div>

                          {/* In-app */}
                          <div className="flex items-center justify-between py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#0d7c3d]/8 shrink-0">
                                <Bell size={15} className="text-[#0d7c3d]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">In-App Notifications</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  Show banner alerts and notifications inside the portal
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={notifInApp}
                              onCheckedChange={setNotifInApp}
                              className="data-[state=checked]:bg-[#0d7c3d]"
                            />
                          </div>

                          {/* Incident updates */}
                          <div className="flex items-center justify-between py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#0d7c3d]/8 shrink-0">
                                <MessageSquare size={15} className="text-[#0d7c3d]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Incident Report Updates</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  Get notified when the admin responds to your incident reports
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={notifIncident}
                              onCheckedChange={setNotifIncident}
                              className="data-[state=checked]:bg-[#0d7c3d]"
                            />
                          </div>

                          {/* Emergency — always on */}
                          <div className="flex items-center justify-between py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-red-50 shrink-0">
                                <BellRing size={15} className="text-red-500" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-foreground">Emergency Broadcasts</p>
                                  <Badge className="text-[9px] bg-red-50 text-red-600 border border-red-200 hover:bg-red-50 px-1.5">
                                    Always On
                                  </Badge>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  SOS alerts are always delivered for your safety
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={notifEmergency}
                              onCheckedChange={setNotifEmergency}
                              disabled
                              className="data-[state=checked]:bg-red-500 opacity-75"
                            />
                          </div>
                        </CardContent>
                        <Separator />
                        <div className="flex items-center justify-end px-6 py-4">
                          <Button
                            type="button"
                            onClick={handleNotifSave}
                            className="bg-[#0d7c3d] hover:bg-[#0b6835] text-white gap-1.5 text-sm"
                          >
                            <Save size={14} />
                            Save Preferences
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StudentProfilePage;
