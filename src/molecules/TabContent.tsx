import { PropsWithChildren } from 'react';

type TabContentProps = {
  currentTab: number;
  index: number;
};

export function TabContent({ currentTab, index, children }: PropsWithChildren<TabContentProps>) {
  if (currentTab === index) {
    return <>{children}</>;
  }
  return null;
}
