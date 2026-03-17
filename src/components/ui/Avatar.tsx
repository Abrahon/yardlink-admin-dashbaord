/* eslint-disable react-hooks/purity */
export interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-rose-500",
];

export const Avatar = ({
  name,
  size = "md",
  color,
  className = "",
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
  };

  const bgColor =
    color || avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="text-white font-bold">{initials}</span>
    </div>
  );
};
