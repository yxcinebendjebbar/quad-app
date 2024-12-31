// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Installation",
        href: "/installation",
      },
    ],
  },
  {
    title: "Key Features",
    href: "/key-features",
    noLink: true,
    items: [
      { title: "Models", href: "/models" },
      { title: "Controllers", href: "/controllers" },
      { title: "Routes", href: "/routes" },
    ],
  },
  {
    title: "API Reference",
    href: "/api-reference",
    noLink: true,
    items: [
      { title: "Typescript", href: "/typescript" },
      { title: "Sequelize", href: "/sequelize" },
      { title: "JWT", href: "/jwt" },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
