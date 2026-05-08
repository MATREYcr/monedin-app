export const queryKeys = {
  children: {
    all: ['children'] as const,
  },
  childMe: {
    me: ['children', 'me'] as const,
  },
  tasks: {
    all: ['tasks'] as const,
  },
  rewards: {
    all: ['rewards'] as const,
  },
  redemptions: {
    all: ['redemptions'] as const,
  },
}
