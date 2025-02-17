import { z } from 'zod'

const plans = ['free', 'basic', 'medium', 'premium'] as const

export type Plans = typeof plans[number]

export const mappedPlans: { [key in Plans]: string } = {
    basic: 'Basic',
    free: 'Free',
    medium: 'Medium',
    premium: 'Premium'
}

export const userSchema = z.object({
    name: z.string()
        .min(3, {
            message: 'Name must be at least 3 characters long'
        })
        .max(255, {
            message: 'Name must be at most 255 characters long'
        }),
    email: z.string()
        .email({
            message: 'Invalid email'
        }),
    password: z.string()
        .min(6, {
            message: 'Password must be at least 6 characters long'
        }),
    confirmPassword: z.string()
        .min(6, {
            message: 'Password must be at least 6 characters long'
        }),
    weigth: z.string()
        .refine(value => !isNaN(parseFloat(value)), {
            message: 'Weight must be a number'
        }),
    plan: z.enum(plans, {
        errorMap: () => ({ message: 'Please select a valid plan' })
    }),
    dayOfBirth: z.string()
        .refine(value => new Date(value).toString() !== "Invalid Date", {
            message: 'Invalid date'
        })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})
