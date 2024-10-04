'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

/**
 * BreadcrumbComponent for displaying the current navigation path.
 * @param {Object} props - The component props.
 * @param {string} [props.projectTitle] - The title of the current project.
 * @param {string} [props.projectId] - The ID of the current project.
 * @param {string} [props.locationName] - The name of the current location.
 * @param {string} [props.locationId] - The ID of the current location.
 * @returns {JSX.Element} The rendered BreadcrumbComponent.
 */
const BreadcrumbComponent = ({ projectTitle, projectId, locationName, locationId }) => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    const breadcrumbItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
    ];

    if (projectId && projectTitle) {
        breadcrumbItems.push({ href: `/projects/${projectId}`, label: projectTitle });
    }

    if (locationId && locationName) {
        breadcrumbItems.push({ href: `/projects/${projectId}/locations/${locationId}`, label: locationName });
    }

    const lastSegment = pathSegments[pathSegments.length - 1];

    if (['create', 'edit', 'preview'].includes(lastSegment)) {
        breadcrumbItems.push({ href: pathname, label: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) });
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.href}>
                        <BreadcrumbItem>
                            {index < breadcrumbItems.length - 1 ? (
                                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;