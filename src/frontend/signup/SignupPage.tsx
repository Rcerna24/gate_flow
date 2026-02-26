import React, { useState } from 'react';
import {
  Shield, MapPin, QrCode, Megaphone, Users, ClipboardList,
  Bell, Eye, EyeOff, Lock, Mail, UserRound, Phone, Hash,
  BookOpen, UserPlus, ChevronDown,
} from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: <QrCode size={17} />,
    label: 'QR Code Scanning',
    desc: 'Seamless ingress & egress tracking',
  },
  {
    icon: <Megaphone size={17} />,
    label: 'SOS Broadcast',
    desc: 'Instant campus-wide emergency alerts',
  },
  {
    icon: <Users size={17} />,
    label: 'Role-Based Access',
    desc: 'Permissions tailored per role',
  },
  {
    icon: <ClipboardList size={17} />,
    label: 'Entry Audit Logs',
    desc: 'Exportable, filterable activity trail',
  },
  {
    icon: <Bell size={17} />,
    label: 'Incident Reporting',
    desc: 'Structured reporting with status tracking',
  },
];

const ROLES = ['Student', 'Faculty', 'Staff'] as const;
type Role = (typeof ROLES)[number];

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState<Role>('Student');
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-105 xl:w-115 shrink-0 bg-[#0d1117] text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/3" />
          <div className="absolute -bottom-15 -right-15 w-64 h-64 rounded-full bg-white/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/1.5" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield size={21} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-[15px] leading-none tracking-tight">VSU Security</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                  Campus Security System
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="border-white/15 text-white/50 text-[11px] gap-1.5 mt-1"
            >
              <MapPin size={10} />
              Main Campus – Visayas State University
            </Badge>
          </div>

          {/* Hero copy */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Join the<br />Campus Network.
            </h2>
            <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-xs">
              Create your account to access QR-based entry tracking, incident
              reporting, and emergency alerts — all from one place.
            </p>
          </div>

          {/* Feature list */}
          <div className="mt-10 space-y-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5 text-white/70">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white/90">{f.label}</p>
                  <p className="text-[12px] text-white/35 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10 flex items-center justify-between">
            <p className="text-[11px] text-white/25">© 2026 VSU Security Department</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Badge
                variant="outline"
                className="border-white/15 text-white/35 text-[10px] py-0.5"
              >
                v1.0.0
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ──────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center bg-slate-50 py-10 px-6 sm:px-12 overflow-y-auto">
        <div className="w-full max-w-105">
          {/* Mobile-only brand header */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Shield size={15} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[14px] text-slate-900 leading-none">VSU Security</p>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">Campus Portal</p>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create an account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Fill in your details to register as a VSU member
            </p>
          </div>

          <Card className="border-0 shadow-xl shadow-slate-200/80 rounded-2xl overflow-hidden">
            <CardContent className="px-5 pt-6 pb-5 space-y-4">

              {/* ── Row: Full Name + ID Number ── */}
              <div className="grid grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullname" className="text-xs font-medium text-slate-600">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="Juan dela Cruz"
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>

                {/* ID Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="idnumber" className="text-xs font-medium text-slate-600">
                    ID Number
                  </Label>
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="idnumber"
                      type="text"
                      placeholder="2024-XXXXX"
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-slate-600">
                  Institutional Email
                </Label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@vsu.edu.ph"
                    className="pl-8 h-9 text-sm"
                  />
                </div>
              </div>

              {/* ── Row: Role + Contact ── */}
              <div className="grid grid-cols-2 gap-3">
                {/* Role */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600">Role</Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setRoleOpen((o) => !o)}
                      className="w-full h-9 pl-8 pr-3 text-sm text-left border border-input rounded-md bg-background flex items-center justify-between shadow-xs focus:outline-none focus:ring-1 focus:ring-ring transition-colors hover:bg-slate-50"
                    >
                      <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <span className={role ? 'text-slate-900' : 'text-slate-400'}>{role || 'Select'}</span>
                      <ChevronDown size={13} className={`text-slate-400 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {roleOpen && (
                      <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
                        {ROLES.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => { setRole(r); setRoleOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-slate-50 ${role === r ? 'font-medium text-slate-900' : 'text-slate-600'}`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact" className="text-xs font-medium text-slate-600">
                    Contact Number
                  </Label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="09XXXXXXXXX"
                      className="pl-8 h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Department / Course */}
              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-xs font-medium text-slate-600">
                  {role === 'Student' ? 'Course & Year' : 'Department / Office'}
                </Label>
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="department"
                    type="text"
                    placeholder={
                      role === 'Student'
                        ? 'e.g. BS Computer Science – 3rd Year'
                        : 'e.g. College of Engineering and Technology'
                    }
                    className="pl-8 h-9 text-sm"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-0.5">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] text-slate-400 font-medium">Security</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium text-slate-600">
                  Password
                </Label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="pl-8 pr-9 h-9 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-medium text-slate-600">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    className="pl-8 pr-9 h-9 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Terms notice */}
              <p className="text-[11px] text-slate-400 leading-relaxed">
                By registering, you agree that your campus entry data may be recorded
                and monitored in accordance with VSU security policies.
              </p>

              {/* Submit */}
              <Button className="w-full h-9 gap-2 text-sm font-medium">
                <UserPlus size={14} />
                Create Account
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 px-5 pb-5 pt-0">
              <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                Already have an account?
                <a
                  href="/login"
                  className="text-slate-900 font-medium hover:underline underline-offset-2 transition-colors"
                >
                  Sign in
                </a>
              </div>
              <p className="text-[11px] text-center text-slate-400 w-full">
                © 2026 Visayas State University · Security Department
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
