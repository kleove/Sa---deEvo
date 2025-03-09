import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 24.9) return 'Peso normal';
  if (bmi < 29.9) return 'Sobrepeso';
  if (bmi < 34.9) return 'Obesidade grau 1';
  if (bmi < 39.9) return 'Obesidade grau 2';
  return 'Obesidade grau 3';
}