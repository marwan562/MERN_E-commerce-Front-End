"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

type BreadcrumbProps = {
  homeElement: React.ReactNode;
  separator: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  productTitle?: string; // Add this prop for product title
};

const NextBreadcrumb: React.FC<BreadcrumbProps> = ({
  homeElement,
  separator,
  containerClasses = '',
  listClasses = '',
  activeClasses = '',
  capitalizeLinks = false,
  productTitle,
}) => {
  const pathname = usePathname();
  const pathNames = pathname.split('/').filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList className={containerClasses}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{homeElement}</BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemClasses = pathname === href ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1) : link;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className={itemClasses}>
                {index === pathNames.length - 1 && productTitle ? (
                  <BreadcrumbPage>{productTitle}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NextBreadcrumb;
