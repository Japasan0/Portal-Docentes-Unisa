import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandIcon, type BrandIconName } from "@/components/brand-icons";
import { socialNetworks } from "@/components/portal-layout";

// The footer is the portal's only place for institutional social channels: each
// entry must point at the verified official address and carry its own brand mark.
describe("Footer social channels", () => {
  it("publishes the five official Unisa channels at their exact addresses", () => {
    expect(socialNetworks.map((s) => s.url)).toEqual([
      "https://www.instagram.com/unisaoficial/",
      "https://www.facebook.com/unisaoficial",
      "https://x.com/unisaoficial",
      "https://www.linkedin.com/school/universidade-de-santo-amaro",
      "https://www.youtube.com/@UnisaOficial",
    ]);
  });

  it("draws a real brand mark for every listed network", () => {
    const names: BrandIconName[] = socialNetworks.map((s) => s.name);
    expect(names).toEqual(["instagram", "facebook", "x", "linkedin", "youtube"]);
    for (const name of names) {
      const { container } = render(<BrandIcon name={name} size={17} />);
      const path = container.querySelector("svg path");
      expect(path?.getAttribute("d")?.length).toBeGreaterThan(40);
    }
  });
});
