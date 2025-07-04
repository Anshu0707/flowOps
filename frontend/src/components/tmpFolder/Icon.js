import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";

const icons = {
  ArrowRight: ArrowRightIcon,
  ArrowUpRight: ArrowUpRightIcon,
};

export default function Icon({ name, className = "w-5 h-5", ...props }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} {...props} />;
}
