import { AlertTriangle, BellRing, BookOpen, Building2, CalendarClock, FileSearch, HelpCircle, History, Info, Layers, LayoutDashboard, Link2, ListOrdered, Lock, Mail, Map, Plug, RefreshCcw, Rocket, ShieldCheck, Sparkles, Store, Sun, Tag, TrendingUp, UploadCloud, Users, Workflow, Circle } from 'lucide-react'
const icons = { AlertTriangle, BellRing, BookOpen, Building2, CalendarClock, FileSearch, HelpCircle, History, Info, Layers, LayoutDashboard, Link2, ListOrdered, Lock, Mail, Map, Plug, RefreshCcw, Rocket, ShieldCheck, Sparkles, Store, Sun, Tag, TrendingUp, UploadCloud, Users, Workflow }
export default function Icon({ name, ...props }) {
  const C = icons[name] ?? Circle
  return <C aria-hidden="true" {...props} />
}
