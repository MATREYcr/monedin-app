export const FamilyRole = {
  PARENT: 'PARENT',
  CHILD: 'CHILD',
} as const

export type FamilyRole = (typeof FamilyRole)[keyof typeof FamilyRole]
