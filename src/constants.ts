/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeDefinition } from './types';

export const THEMES: ThemeDefinition[] = [
  {
    id: 'outfits',
    name: 'Outfit Builder',
    setALabel: 'Shirts',
    setBLabel: 'Pants',
    itemsA: [
      { id: 'a1', label: 'Red Shirt', icon: 'Shirt' },
      { id: 'a2', label: 'Blue Shirt', icon: 'Shirt' },
    ],
    itemsB: [
      { id: 'b1', label: 'Jeans', icon: 'Palmtree' }, // Using Palmtree for "Shorts" or generic pants vibe if pants missing
      { id: 'b2', label: 'Shorts', icon: 'Sun' },
      { id: 'b3', label: 'Khakis', icon: 'Briefcase' },
    ],
  },
  {
    id: 'snacks',
    name: 'Snack Combos',
    setALabel: 'Drinks',
    setBLabel: 'Snacks',
    itemsA: [
      { id: 'sa1', label: 'Coffee', icon: 'Coffee' },
      { id: 'sa2', label: 'Tea', icon: 'CupSoda' },
      { id: 'sa3', label: 'Milk', icon: 'GlassWater' },
    ],
    itemsB: [
      { id: 'sb1', label: 'Cookie', icon: 'Cookie' },
      { id: 'sb2', label: 'Sandwich', icon: 'Sandwich' },
    ],
  },
  {
    id: 'shapes',
    name: 'Shapes & Colors',
    setALabel: 'Colors',
    setBLabel: 'Shapes',
    itemsA: [
      { id: 'sh1', label: 'Red', icon: 'Circle' },
      { id: 'sh2', label: 'Green', icon: 'Circle' },
      { id: 'sh3', label: 'Blue', icon: 'Circle' },
    ],
    itemsB: [
      { id: 'sq1', label: 'Triangle', icon: 'Triangle' },
      { id: 'sq2', label: 'Square', icon: 'Square' },
    ],
  },
];
