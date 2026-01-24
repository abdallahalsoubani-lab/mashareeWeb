/**
 * Authentication Validation Schemas
 * Using Zod for runtime validation
 */

import { z } from 'zod';

// ========== REGISTER VALIDATION ==========

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(100, 'الاسم طويل جداً'),
  email: z
    .string()
    .email('البريد الإلكتروني غير صالح')
    .toLowerCase(),
  phone: z
    .string()
    .regex(/^(05|5)\d{8}$/, 'رقم الجوال غير صالح (مثال: 0501234567)')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ========== LOGIN VALIDATION ==========

export const loginSchema = z.object({
  email: z
    .string()
    .email('البريد الإلكتروني غير صالح')
    .toLowerCase(),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ========== PASSWORD RESET VALIDATION ==========

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .email('البريد الإلكتروني غير صالح')
    .toLowerCase(),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ========== NEW PASSWORD VALIDATION ==========

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
