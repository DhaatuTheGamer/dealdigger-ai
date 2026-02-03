// @vitest-environment jsdom
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import React from 'react';
import PriceHistoryModal from './PriceHistoryModal';
import { Deal, PriceDataPoint } from '../types';

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const mockDeal: Deal = {
  id: 'deal-123',
  title: 'Test Deal',
  description: 'A test deal description',
  originalPrice: '$100',
  discountedPrice: '$80',
  merchant: 'TestMerchant',
  category: 'TestCategory',
};

const mockPriceHistory: PriceDataPoint[] = [
  { date: '2023-01-01', price: 90 },
  { date: '2023-01-02', price: 80 },
];

describe('PriceHistoryModal', () => {
  it('should be stable and NOT change prediction on re-render', () => {
    // 1. Mock Math.random to return > 0.5 -> "likely to remain stable"
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValue(0.6);

    const { rerender } = render(
      <PriceHistoryModal
        deal={mockDeal}
        priceHistory={mockPriceHistory}
        onClose={() => {}}
      />
    );

    // Initial check: Should show "stable"
    expect(screen.getByText(/likely to remain stable/i)).toBeDefined();

    // 2. Mock Math.random to return < 0.5 -> "showing good value" (if it were called)
    randomSpy.mockReturnValue(0.4);

    // 3. Rerender with same props
    rerender(
        <PriceHistoryModal
        deal={mockDeal}
        priceHistory={mockPriceHistory}
        onClose={() => {}}
      />
    );

    // Verify: Expect text to REMAIN "likely to remain stable".
    expect(screen.getByText(/likely to remain stable/i)).toBeDefined();
    expect(screen.queryByText(/showing good value/i)).toBeNull();
  });
});
