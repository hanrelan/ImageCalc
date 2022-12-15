import { Suspense } from "react";

// TODO(rohan): Remember to move this elsewhere at some point
// TODO(rohan): Ideally this would be inside the Card element
export function suspensify(Element: () => JSX.Element | null) {
  return (props: any) => (
    <Suspense fallback="Loading...">
      <Element {...props} />
    </Suspense>
  );
}

export async function runSql(sql: string) {
  return new Promise((res) => setTimeout(() => res({ count: 4000 }), 1000));
}
