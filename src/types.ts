/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from 'lucide-react';

export interface SetItem {
  id: string;
  label: string;
  icon?: string; // Icon name from lucide-react
}

export type ThemeType = 'outfits' | 'snacks' | 'shapes' | 'generic';

export interface ThemeDefinition {
  id: ThemeType;
  name: string;
  setALabel: string;
  setBLabel: string;
  itemsA: SetItem[];
  itemsB: SetItem[];
}
