import { AriaRole, useEffect, useRef, useState } from 'react';
import { NavLink, } from 'react-router-dom';
import { navItems, } from '@/shared/const/navItems';
import { useDevice } from '@/shared/hooks/useDevice';
import { NavItem } from '@/entities/Navigation/types';
import { Icon } from '@/shared/ui/Icon';
import ChevronDown from '@/shared/assets/icons/ChevronDown.svg';

type NavBarProps = {
    className?: string;
    role?: AriaRole;
}
export const NavBar = (props: NavBarProps) => {
    const { className, role, } = props
    const { isDesktop, } = useDevice();

    const [activeDropdown, setActiveDropdown,] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закрытие dropdown при клике вне области (актуально только для десктопа)
    useEffect(() => {
        if (!isDesktop) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDesktop,]);

    const toggleDropdown = (path: string) => {
        setActiveDropdown(prev => (prev === path ? null : path));
    };

    const closeAllDropdowns = () => {
        setActiveDropdown(null);
    };

    const isDropdownActive = (item: NavItem) => {
        if (!item.children) return false;

        const currentPath = window.location.pathname;
        return currentPath === item.path || item.children.some(child => currentPath === child.path);
    };

    const getNavLinkClass = (isActive: boolean, mobile = false) => {
        if (mobile) {
            return `block w-full text-left font-btn-md transition-all
            ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`;
        }

        return `text-nowrap bg-background rounded-full px-4 py-2.5 font-btn-md transition-all cursor-pointer
        ${isActive ? 'text-text-primary hover:bg-primary hover:text-text-white' : 'text-text-secondary hover:bg-primary hover:text-text-white'}`;
    };

    // Helper: для мобильной версии — расплющиваем структуру в один список (item + children)
    const flatNavForMobile = () => {
        const flat: { label: string; path: string }[] = [];

        navItems.forEach((item) => {
            // основной пункт
            if (!item.children) {
                flat.push({ label: item.label, path: item.path, });
            }

            // дети, если есть
            if (item.children && item.children.length > 0) {
                item.children.forEach((child) => flat.push({ label: child.label, path: child.path, }));
            }
        });

        return flat;
    };

    const renderDesktop = () => (
        <div
            ref={dropdownRef}
            className={`flex gap-6 items-center ${className}`}
            role={role}
        >
            {navItems.map((item) => (
                <div
                    key={item.path}
                    className="relative grow justify-items-center py-2.5"
                >
                    {item.children ? (
                        <div className="relative flex justify-center w-full">
                            <button
                                onClick={() => toggleDropdown(item.path)}
                                aria-expanded={activeDropdown === item.path}
                                aria-haspopup="menu"
                                className={`text-nowrap bg-background rounded-full px-4 py-2.5 font-btn-md transition-all cursor-pointer flex items-center gap-2.5
                                    ${isDropdownActive(item) ? 'text-text-primary hover:bg-primary hover:text-text-white' : 'text-text-secondary hover:bg-primary hover:text-text-white'}`}
                            >
                                <span className="flex items-center gap-2.5 justify-center w-full">
                                    {item.label}
                                    <Icon
                                        Svg={ChevronDown}
                                        width={20}
                                        height={20}
                                        className={`stroke-4 stroke-current transition-transform duration-200
                                            ${activeDropdown === item.path ? 'rotate-180' : ''}`}
                                    />
                                </span>
                            </button>

                            {activeDropdown === item.path && (
                                <div
                                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50"
                                    role="menu"
                                    aria-label={`${item.label} menu`}
                                >
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.path}
                                            to={child.path}
                                            className={({ isActive, }) =>
                                                `block px-4 py-2 text-base transition-colors duration-200 ${isActive
                                                    ? 'bg-primary-light text-text-primary font-medium'
                                                    : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                                                }`
                                            }
                                            onClick={closeAllDropdowns}
                                            role="menuitem"
                                        >
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative flex justify-center w-full">
                            <NavLink
                                to={item.path}
                                className={({ isActive, }) => getNavLinkClass(isActive)}
                                onClick={closeAllDropdowns}
                            >
                                {item.label}
                            </NavLink>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderMobile = () => {
        const flat = flatNavForMobile();

        return (
            <nav className={`${className} w-full`} role={role} aria-label="Main navigation">
                <ul className="flex flex-col gap-5 w-full">
                    {flat.map((n) => (
                        <li key={n.path} className="w-full">
                            <NavLink
                                to={n.path}
                                className={({ isActive, }) => getNavLinkClass(isActive, true)}
                                onClick={closeAllDropdowns}
                            >
                                {n.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    return isDesktop ? renderDesktop() : renderMobile();
}