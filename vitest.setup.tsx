import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom does not implement IntersectionObserver, which next/image uses.
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
}

// Render next/image as a plain img in tests (jsdom has no image optimizer).
vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    className,
  }: {
    alt?: string;
    src?: string | { src?: string };
    className?: string;
  }) => {
    const resolved = typeof src === "string" ? src : (src?.src ?? "");
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolved} alt={alt ?? ""} className={className} />;
  },
}));
