import { create } from 'zustand'

interface AppState {
  activeStopId: string | null
  setActiveStop: (stopId: string | null) => void
  darkMode: boolean
  toggleDarkMode: () => void
  muted: boolean
  toggleMuted: () => void
  /** Bumped to signal "teleport the car back to spawn" without a direct ref. */
  resetSignal: number
  requestReset: () => void
}

// Car position stays out of this store (mutated per-frame via refs in
// useCarController) — this store only holds infrequent UI-facing state.
export const useAppStore = create<AppState>((set) => ({
  activeStopId: null,
  setActiveStop: (stopId) => set({ activeStopId: stopId }),
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  muted: true,
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
  resetSignal: 0,
  requestReset: () => set((state) => ({ resetSignal: state.resetSignal + 1 })),
}))
