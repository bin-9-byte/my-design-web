import React from 'react';
import { cn } from '@/lib/utils';

// Button组件的属性类型
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

// cn函数已从@/lib/utils导入

// Button组件
const Button: React.FC<ButtonProps> = ({ 
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props 
}) => {
  // 基础样式
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // 变体样式
  const variantStyles = {
    default: 'bg-white text-black hover:bg-gray-200',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-white text-white hover:bg-white/10',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    ghost: 'text-white hover:bg-white/10',
    link: 'text-white underline-offset-4 hover:underline',
  };
  
  // 尺寸样式
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  
  const Comp = asChild ? 'span' : 'button';
  
  return (
    <Comp
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};

export { Button };