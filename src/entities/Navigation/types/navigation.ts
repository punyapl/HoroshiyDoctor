import { AriaRole, } from 'react';

export interface NavItem {
    path: string;
    label: string;
    children?: NavItem[];
}

export interface NavBarProps {
    className?: string;
    role?: AriaRole;
}