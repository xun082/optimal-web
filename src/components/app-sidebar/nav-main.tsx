'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>工具集</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(({ title, url, icon: Icon, isActive, items: subItems }) => (
          <Collapsible key={title} asChild defaultOpen={isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {subItems ? (
                  <SidebarMenuButton tooltip={title}>
                    {Icon && <Icon />}
                    <span>{title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                ) : (
                  <a href={url}>
                    <SidebarMenuButton tooltip={title}>
                      {Icon && <Icon />}
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </a>
                )}
              </CollapsibleTrigger>
              {subItems && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {subItems.map(({ title: subTitle, url: subUrl }) => (
                      <SidebarMenuSubItem key={subTitle}>
                        <SidebarMenuSubButton asChild>
                          <a href={subUrl}>
                            <span>{subTitle}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
