import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// js
// import { twMerge } from 'tailwind-merge'
// import { clsx } from 'clsx'

// export function cn(...inputs) {
//   return twMerge(clsx(inputs))
// }