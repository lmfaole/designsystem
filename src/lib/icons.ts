/**
 * The design system's icon surface. Apps import the icons they need from
 * here instead of from `lucide-react` directly (a project.s
 * `no-restricted-imports` lint rule can block that), so the icon dependency stays inside
 * this package and changing one icon is one place. Add an icon here when
 * an app needs one.
 */
export {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  ExternalLink,
  Gamepad2,
  LayoutGrid,
  Lock,
  LockOpen,
  Menu,
  Settings,
  Shuffle,
  Star,
  Trash2,
  X,
} from 'lucide-react'