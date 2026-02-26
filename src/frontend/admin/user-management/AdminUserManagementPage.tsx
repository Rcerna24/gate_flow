import React, { useState } from 'react';
import {
  Shield,
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  UserCheck,
  Megaphone,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  UserCog,
  RefreshCw,
  ShieldCheck,
  Ban,
  GraduationCap,
  Briefcase,
  TrendingUp,
  ChevronRight,
  X,
  CheckCircle2,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Progress } from '@/components/ui/progress';

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = 'Student' | 'Faculty' | 'Staff' | 'Guard';
type Status = 'Active' | 'Inactive';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  department: string;
  status: Status;
  joined: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const initialUsers: User[] = [
  { id: 1, firstName: 'Maria', lastName: 'Santos', email: 'msantos@vsu.edu.ph', role: 'Student', department: 'CITE', status: 'Active', joined: 'Aug 2023' },
  { id: 2, firstName: 'Juan', lastName: 'dela Cruz', email: 'jdelacruz@vsu.edu.ph', role: 'Faculty', department: 'CAS', status: 'Active', joined: 'Jun 2020' },
  { id: 3, firstName: 'Rosa', lastName: 'Lomibao', email: 'rlomibao@vsu.edu.ph', role: 'Student', department: 'COE', status: 'Active', joined: 'Aug 2024' },
  { id: 4, firstName: 'Eduardo', lastName: 'Fernandez', email: 'efernandez@vsu.edu.ph', role: 'Guard', department: 'Security Office', status: 'Active', joined: 'Jan 2022' },
  { id: 5, firstName: 'Pedro', lastName: 'Alcantara', email: 'palcantara@vsu.edu.ph', role: 'Student', department: 'CITE', status: 'Inactive', joined: 'Aug 2022' },
  { id: 6, firstName: 'Ana', lastName: 'Reyes', email: 'areyes@vsu.edu.ph', role: 'Faculty', department: 'COE', status: 'Active', joined: 'Mar 2018' },
  { id: 7, firstName: 'Ben', lastName: 'Torres', email: 'btorres@vsu.edu.ph', role: 'Guard', department: 'Security Office', status: 'Active', joined: 'Mar 2023' },
  { id: 8, firstName: 'Liza', lastName: 'Villanueva', email: 'lvillanueva@vsu.edu.ph', role: 'Staff', department: 'Registrar', status: 'Active', joined: 'Jul 2019' },
  { id: 9, firstName: 'Carlo', lastName: 'Mendoza', email: 'cmendoza@vsu.edu.ph', role: 'Student', department: 'CAS', status: 'Active', joined: 'Aug 2024' },
  { id: 10, firstName: 'Jessa', lastName: 'Tan', email: 'jtan@vsu.edu.ph', role: 'Staff', department: 'Admin Office', status: 'Inactive', joined: 'Sep 2021' },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { label: 'User Management', icon: Users, badge: null },
  { label: 'Entry Logs', icon: BookOpen, badge: '177' },
  { label: 'Incident Reports', icon: ClipboardList, badge: '2' },
  { label: 'Visitor Passes', icon: UserCheck, badge: '2' },
  { label: 'SOS Broadcast', icon: Megaphone, badge: '1' },
];

// ── Helper Components ─────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    Student: { cls: 'bg-blue-100 text-blue-700 border-blue-200', icon: <GraduationCap size={10} /> },
    Faculty: { cls: 'bg-purple-100 text-purple-700 border-purple-200', icon: <Briefcase size={10} /> },
    Staff: { cls: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Briefcase size={10} /> },
    Guard: { cls: 'bg-[#0d7c3d]/10 text-[#0d7c3d] border-[#0d7c3d]/20', icon: <ShieldCheck size={10} /> },
  };
  const config = map[role] ?? { cls: 'bg-muted text-muted-foreground border-border', icon: null };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${config.cls}`}>
      {config.icon}
      {role}
    </span>
  );
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

// ── Main Component ────────────────────────────────────────────────────────────

const AdminUserManagementPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState('User Management');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal states
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form state
  const emptyForm = { firstName: '', lastName: '', email: '', role: 'Student' as Role, department: '', status: 'Active' as Status, password: '' };
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<typeof emptyForm>>({});

  // ── Derived ──────────────────────────────────────────────────────────────

  const filtered = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role.toLowerCase() === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status.toLowerCase() === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const stats = {
    students: users.filter((u) => u.role === 'Student').length,
    faculty: users.filter((u) => u.role === 'Faculty').length,
    staff: users.filter((u) => u.role === 'Staff').length,
    guards: users.filter((u) => u.role === 'Guard').length,
    inactive: users.filter((u) => u.status === 'Inactive').length,
    total: users.length,
  };

  // ── Handlers ─────────────────────────────────────────────────────────────

  const openAdd = () => {
    setForm(emptyForm);
    setFormErrors({});
    setAddOpen(true);
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, department: user.department, status: user.status, password: '' });
    setFormErrors({});
    setEditOpen(true);
  };

  const openView = (user: User) => {
    setSelectedUser(user);
    setViewOpen(true);
  };

  const openReset = (user: User) => {
    setSelectedUser(user);
    setResetOpen(true);
  };

  const openDeactivate = (user: User) => {
    setSelectedUser(user);
    setDeactivateOpen(true);
  };

  const validate = () => {
    const errors: Partial<typeof emptyForm> = {};
    if (!form.firstName.trim()) errors.firstName = 'Required';
    if (!form.lastName.trim()) errors.lastName = 'Required';
    if (!form.email.trim()) errors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Invalid email';
    if (!form.department.trim()) errors.department = 'Required';
    return errors;
  };

  const handleAdd = () => {
    const errors = validate();
    if (!form.password.trim()) errors.password = 'Required';
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    const newUser: User = {
      id: Date.now(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      role: form.role,
      department: form.department.trim(),
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    setUsers((prev) => [newUser, ...prev]);
    setAddOpen(false);
  };

  const handleEdit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), role: form.role, department: form.department.trim(), status: form.status }
          : u,
      ),
    );
    setEditOpen(false);
  };

  const handleToggleStatus = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u,
      ),
    );
    setDeactivateOpen(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────

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
                  <BreadcrumbPage className="text-sm font-medium">User Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto">
              <Button
                size="sm"
                className="gap-1.5 text-sm bg-[#0d7c3d] hover:bg-[#0a6633] text-white"
                onClick={openAdd}
              >
                <Plus size={14} />
                Add User
              </Button>
            </div>
          </header>

          {/* ── Page Body ── */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* ── Page Title ── */}
            <div>
              <h1 className="text-xl font-bold text-foreground">User Management</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage student, faculty/staff, and guard accounts across the campus.
              </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground font-medium">Students</p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                      <GraduationCap size={14} className="text-blue-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{stats.students}</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <TrendingUp size={11} />
                    <span>+3 this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground font-medium">Faculty</p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100">
                      <Briefcase size={14} className="text-purple-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{stats.faculty}</p>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                    <span>No change</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground font-medium">Staff</p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100">
                      <Briefcase size={14} className="text-orange-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{stats.staff}</p>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                    <span>No change</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground font-medium">Guards</p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d7c3d]/10">
                      <ShieldCheck size={14} className="text-[#0d7c3d]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{stats.guards}</p>
                  <div className="flex items-center gap-1 mt-2 text-[#0d7c3d] text-xs font-medium">
                    <ShieldCheck size={11} />
                    <span>All gates covered</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none border bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground font-medium">Inactive</p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
                      <Ban size={14} className="text-red-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium">
                    <span>of {stats.total} total accounts</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Role Breakdown ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="shadow-none border bg-white lg:col-span-1">
                <CardHeader className="px-6 pt-5 pb-4">
                  <CardTitle className="text-base font-semibold">Role Distribution</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-5 space-y-4">
                  {[
                    { label: 'Students', count: stats.students, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Faculty', count: stats.faculty, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { label: 'Staff', count: stats.staff, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100' },
                    { label: 'Guards', count: stats.guards, icon: ShieldCheck, color: 'text-[#0d7c3d]', bg: 'bg-[#0d7c3d]/10' },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${r.bg} ${r.color}`}>
                        <r.icon size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{r.label}</span>
                          <span className="text-xs text-muted-foreground">{r.count} / {stats.total}</span>
                        </div>
                        <Progress value={stats.total > 0 ? Math.round((r.count / stats.total) * 100) : 0} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* ── Users Table ── */}
              <Card className="shadow-none border bg-white lg:col-span-2">
                <CardHeader className="px-6 pt-5 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">All Accounts</CardTitle>
                    <span className="text-xs text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="px-6 py-5 space-y-4">
                  {/* ── Filters ── */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative flex-1 min-w-44 max-w-xs">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search name, email, department..."
                        className="pl-8 h-8 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue placeholder="All roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All roles</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="guard">Guard</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue placeholder="All status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ── Table ── */}
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">Name</TableHead>
                        <TableHead className="text-xs">Role</TableHead>
                        <TableHead className="text-xs">Department</TableHead>
                        <TableHead className="text-xs">Email</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">Joined</TableHead>
                        <TableHead className="text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                            No users match your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filtered.map((user) => (
                          <TableRow key={user.id}>
                            {/* Name */}
                            <TableCell>
                              <div className="flex items-center gap-2.5">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-[10px] font-semibold">
                                    {getInitials(user.firstName, user.lastName)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium whitespace-nowrap">
                                  {user.firstName} {user.lastName}
                                </span>
                              </div>
                            </TableCell>

                            {/* Role */}
                            <TableCell><RoleBadge role={user.role} /></TableCell>

                            {/* Department */}
                            <TableCell className="text-xs text-muted-foreground">{user.department}</TableCell>

                            {/* Email */}
                            <TableCell className="text-xs text-muted-foreground">{user.email}</TableCell>

                            {/* Status */}
                            <TableCell>
                              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-muted text-muted-foreground border-border'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                {user.status}
                              </span>
                            </TableCell>

                            {/* Joined */}
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{user.joined}</TableCell>

                            {/* Actions */}
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreHorizontal size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="text-sm w-44">
                                  <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openView(user)}>
                                    <Eye size={13} /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openEdit(user)}>
                                    <UserCog size={13} /> Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openReset(user)}>
                                    <RefreshCw size={13} /> Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className={`gap-2 cursor-pointer ${user.status === 'Active' ? 'text-red-600 focus:text-red-600' : 'text-[#0d7c3d] focus:text-[#0d7c3d]'}`}
                                    onClick={() => openDeactivate(user)}
                                  >
                                    {user.status === 'Active' ? (
                                      <><Ban size={13} /> Deactivate</>
                                    ) : (
                                      <><CheckCircle2 size={13} /> Activate</>
                                    )}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* ── Add User Dialog ────────────────────────────────────────────────── */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus size={16} className="text-[#0d7c3d]" />
              Add New User
            </DialogTitle>
            <DialogDescription>
              Register a new Student, Faculty, Staff, or Guard account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="a-first">First Name</Label>
                <Input
                  id="a-first"
                  placeholder="e.g. Maria"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                />
                {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="a-last">Last Name</Label>
                <Input
                  id="a-last"
                  placeholder="e.g. Santos"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                />
                {formErrors.lastName && <p className="text-xs text-red-500">{formErrors.lastName}</p>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="a-email">Email Address</Label>
              <Input
                id="a-email"
                type="email"
                placeholder="user@vsu.edu.ph"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="a-role">Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm((f) => ({ ...f, role: v as Role }))}>
                  <SelectTrigger id="a-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Guard">Guard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="a-dept">Department</Label>
                <Input
                  id="a-dept"
                  placeholder="e.g. CITE"
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                />
                {formErrors.department && <p className="text-xs text-red-500">{formErrors.department}</p>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="a-password">Temporary Password</Label>
              <Input
                id="a-password"
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
              {formErrors.password && <p className="text-xs text-red-500">{formErrors.password}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5" onClick={handleAdd}>
              <Plus size={13} />
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit User Dialog ───────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog size={16} className="text-[#0d7c3d]" />
              Edit User
            </DialogTitle>
            <DialogDescription>
              Update account details for {selectedUser?.firstName} {selectedUser?.lastName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="e-first">First Name</Label>
                <Input
                  id="e-first"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                />
                {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="e-last">Last Name</Label>
                <Input
                  id="e-last"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                />
                {formErrors.lastName && <p className="text-xs text-red-500">{formErrors.lastName}</p>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="e-email">Email Address</Label>
              <Input
                id="e-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="e-role">Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm((f) => ({ ...f, role: v as Role }))}>
                  <SelectTrigger id="e-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Guard">Guard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="e-dept">Department</Label>
                <Input
                  id="e-dept"
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                />
                {formErrors.department && <p className="text-xs text-red-500">{formErrors.department}</p>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="e-status">Account Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v as Status }))}>
                <SelectTrigger id="e-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button className="bg-[#0d7c3d] hover:bg-[#0a6633] text-white gap-1.5" onClick={handleEdit}>
              <CheckCircle2 size={13} />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View Details Dialog ────────────────────────────────────────────── */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye size={16} className="text-[#0d7c3d]" />
              User Details
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-2">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-[#0d7c3d]/10 text-[#0d7c3d] text-lg font-bold">
                    {getInitials(selectedUser.firstName, selectedUser.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{selectedUser.firstName} {selectedUser.lastName}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="mt-1.5"><RoleBadge role={selectedUser.role} /></div>
                </div>
              </div>
              <Separator />
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Department', value: selectedUser.department },
                  { label: 'Date Joined', value: selectedUser.joined },
                  { label: 'Status', value: selectedUser.status },
                  { label: 'ID', value: `USR-${String(selectedUser.id).padStart(4, '0')}` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    {label === 'Status' ? (
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${value === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-muted text-muted-foreground border-border'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${value === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {value}
                      </span>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setViewOpen(false)}>
              <X size={13} className="mr-1" /> Close
            </Button>
            <Button
              variant="outline"
              className="gap-1.5 text-sm"
              onClick={() => { setViewOpen(false); if (selectedUser) openEdit(selectedUser); }}
            >
              <UserCog size={13} />
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reset Password Dialog ──────────────────────────────────────────── */}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw size={16} className="text-amber-600" />
              Reset Password
            </DialogTitle>
            <DialogDescription>
              A temporary password will be sent to{' '}
              <span className="font-medium text-foreground">{selectedUser?.email}</span>.
              The user will be prompted to change it on next login.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border bg-amber-50 border-amber-200 px-4 py-3 text-sm text-amber-700 flex items-start gap-2">
            <ChevronRight size={14} className="mt-0.5 shrink-0" />
            <span>
              This action cannot be undone. The user's current password will be immediately invalidated.
            </span>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResetOpen(false)}>Cancel</Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5"
              onClick={() => setResetOpen(false)}
            >
              <RefreshCw size={13} />
              Confirm Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Deactivate / Activate Dialog ──────────────────────────────────── */}
      <Dialog open={deactivateOpen} onOpenChange={setDeactivateOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className={`flex items-center gap-2 ${selectedUser?.status === 'Active' ? 'text-red-600' : 'text-[#0d7c3d]'}`}>
              {selectedUser?.status === 'Active' ? (
                <><Ban size={16} /> Deactivate Account</>
              ) : (
                <><CheckCircle2 size={16} /> Activate Account</>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === 'Active'
                ? `Deactivating this account will prevent ${selectedUser?.firstName} ${selectedUser?.lastName} from logging in. Their data will be preserved.`
                : `Activating this account will restore access for ${selectedUser?.firstName} ${selectedUser?.lastName}.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeactivateOpen(false)}>Cancel</Button>
            <Button
              className={`gap-1.5 text-white ${selectedUser?.status === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#0d7c3d] hover:bg-[#0a6633]'}`}
              onClick={handleToggleStatus}
            >
              {selectedUser?.status === 'Active' ? (
                <><Ban size={13} /> Deactivate</>
              ) : (
                <><CheckCircle2 size={13} /> Activate</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default AdminUserManagementPage;
