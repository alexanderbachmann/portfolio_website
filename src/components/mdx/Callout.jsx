import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

const ICONS = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
};

const Callout = ({ type = 'info', children }) => {
  const Icon = ICONS[type] ?? Info;

  return (
    <aside className={`prose-callout prose-callout--${type}`}>
      <Icon size={18} aria-hidden />
      <div>{children}</div>
    </aside>
  );
};

export default Callout;
