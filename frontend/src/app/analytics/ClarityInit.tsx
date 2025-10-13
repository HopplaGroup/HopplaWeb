'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';
import { menv } from '@/lib/utils/menv';

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Clarity.init(menv.NEXT_PUBLIC_CLARITY_PROJECT_ID!);
    }
  }, []);

  return null;
}
