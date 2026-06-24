import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Patient Record Dashboard" },
    {
      name: "description",
      content: "Manage and view patient records efficiently",
    },
  ];
}

export default function Home() {
  return <></>;
}
