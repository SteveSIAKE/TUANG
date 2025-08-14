// Fil d'Ariane pour la navigation

import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

export default function Breadcrumb() {
  return (
    <div className="flex justify-center items-center p-2 bg-gray-100 dark:bg-gray-800">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/about">À propos</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/services">Services</BreadcrumbLink>
      </BreadcrumbItem>
    </div>
  );
}