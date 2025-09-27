"use client";

import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string; // permite customizar tamanho
  color?: string; // permite customizar cor
}

export const ShoppingBagIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke={color}
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 8h14l-1 12H6L5 8z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 8a4 4 0 01-8 0"
    />
  </svg>
);

export default ShoppingBagIcon;
