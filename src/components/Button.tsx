import React from 'react';
import { cn } from '@/lib/utils';

// Button组件的属性类型
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  'data-theme'?: 'light' | 'dark';
}

// Button组件 - 简洁而强大
const Button: React.FC<ButtonProps> = ({ 
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props 
}) => {
  // 添加主题属性
  const theme = props['data-theme'] as 'light' | 'dark' || 'dark';

  // 基础样式
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // 变体样式映射 - 主题响应
  const variantStyles = {
    default: theme === 'dark'
      ? 'bg-white text-black hover:bg-gray-200'
      : 'bg-black text-white hover:bg-gray-800',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: theme === 'dark'
      ? 'border border-white text-white hover:bg-white/10'
      : 'border border-black text-black hover:bg-black/10',
    secondary: theme === 'dark'
      ? 'bg-gray-800 text-white hover:bg-gray-700'
      : 'bg-gray-200 text-black hover:bg-gray-300',
    ghost: theme === 'dark'
      ? 'text-white hover:bg-white/10'
      : 'text-black hover:bg-black/10',
    link: theme === 'dark'
      ? 'text-white underline-offset-4 hover:underline'
      : 'text-black underline-offset-4 hover:underline',
  };
  
  // 尺寸样式映射
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  
  // 根据asChild属性决定使用的元素类型
  const Comp = asChild ? 'span' : 'button';
  
  return (
    <Comp className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props} />
  );
};

export { Button };
