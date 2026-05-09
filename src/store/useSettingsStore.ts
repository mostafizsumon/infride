import { create } from 'zustand';
import { AppSettings } from '../types';

interface SettingsState {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    appName: "INFRIDE",
    slogan: "Transparent Community Investment System",
    monthlyDepositRequirement: 5000,
  },
  setSettings: (settings) => set({ settings }),
}));
