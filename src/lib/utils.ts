// 工具函数：合并类名
export function cn(...inputs: (string | null | undefined | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

// 工具函数：延迟执行
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 工具函数：生成随机ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}