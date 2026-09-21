// One source of truth for the sidebar links and the header title.
export const NAV_ITEMS = [
  { to: "/dashboard", label: "Statement of Account", end: true, icon: "document" },
];

export function titleForPath(pathname) {
  const match = [...NAV_ITEMS]
    .sort((a, b) => b.to.length - a.to.length)
    .find(
      (item) => pathname === item.to || pathname.startsWith(`${item.to}/`)
    );
  return match ? match.label : "Dashboard";
}
