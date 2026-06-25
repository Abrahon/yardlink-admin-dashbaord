/* eslint-disable react-hooks/purity */
import Image from "next/image";

export interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  image?: string | null;
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
  image,
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

  const sizePixels = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const bgColor =
    color || avatarColors[Math.floor(Math.random() * avatarColors.length)];

  // If image is provided and valid, show it
  if (image && image.trim().length > 0) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      >
        <Image
          src={image}
          alt={name}
          width={sizePixels[size]}
          height={sizePixels[size]}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    );
  }

  // Fallback to initials
  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="text-white font-bold">{initials}</span>
    </div>
  );
};

