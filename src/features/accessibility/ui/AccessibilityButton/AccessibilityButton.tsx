import React from 'react';
import { useAccessibility } from '../../model/context';
import { Button } from '@/shared/ui/Button';
import Eye from '@/shared/assets/icons/Eye.svg'

export const AccessibilityButton: React.FC = () => {
  const { togglePanel } = useAccessibility();

  return (
    <Button icon={Eye} iconType='stroke' theme='blue' onClick={togglePanel} aria-label="Версия для слабовидящих"/>
  );
};
