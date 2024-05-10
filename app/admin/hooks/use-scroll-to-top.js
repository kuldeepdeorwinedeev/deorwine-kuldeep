import { useRouter } from "next/router";

export function useScrollToTop() {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, [router.pathname]);

  return null;
}
