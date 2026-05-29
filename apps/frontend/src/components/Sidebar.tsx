'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Rocket,
  ClipboardList,
  Trophy,
  Zap,
  Network,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/initiatives', icon: Rocket, label: 'Iniciativas' },
  { href: '/surveys', icon: ClipboardList, label: 'Surveys' },
  { href: '/gamification', icon: Trophy, label: 'Gamificação' },
  { href: '/nudges', icon: Zap, label: 'Nudges IA' },
  { href: '/network', icon: Network, label: 'Rede ONA' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col bg-forge-900 text-white">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
          <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5">
            <path
              d="M16 3L3 9v14l13 6 13-6V9L16 3z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path d="M16 3v22M3 9l13 6 13-6" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <span className="font-bold tracking-tight">ChangeForge</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-xs text-white/40">ChangeForge v0.1.0 · MVP</p>
      </div>
    </aside>
  );
}
