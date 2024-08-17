import type { NavItemInterface } from '~/composables/useNavigation/types';

export const findNode = (keys: string[], navigationItems: NavItemInterface[]): NavItemInterface | false => {
  if (!navigationItems || navigationItems.length === 0) {
    // No haystack to search inside
    return false; // No keys to search for
  }

  if (keys.length === 0) {
    // No needle to search in haystack, return first item.
    return navigationItems?.[0];
  }

  let currentNavItem = navigationItems[0]?.children?.find((navItem) => navItem._path === keys[0]);
  if (!currentNavItem) {
    return false; // Early exit if first key doesn't match
  }

  // Traverse down the children
  for (let index = 1; index < keys.length; index++) {
    if (!currentNavItem || !currentNavItem.children) {
      return false; // No matching node or no children to traverse
    }
    currentNavItem = currentNavItem.children.find((childNavItem) => childNavItem._path === keys[index]);
  }
  return currentNavItem || false;
};
