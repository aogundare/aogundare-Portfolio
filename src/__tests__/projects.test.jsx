import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "../components/sections/ProjectSection";

// ─── Mock Theme ───────────────────────────────────────────────────────────────
// Projects requires activeTheme — we pass real light token values so
// all colors resolve correctly during tests without a real PortfolioPage.
const mockTheme = {
  primaryNameColor:          "#2c1e18",
  accentNameColor:           "#c87060",
  bodyTextColor:             "#2c1e18",
  navLinkColor:              "#4a3428",
  navUnderlineColor:         "#6366f1",
  badgeBg:                   "rgba(240,236,232,0.92)",
  badgeBorderColor:          "#d8c8b8",
  badgeTextColor:            "#4a3428",
  overlayBg:                 "rgba(240,236,232,0.12)",
  primaryBtnBg:              "linear-gradient(135deg,#c87060,#e8a898)",
  primaryBtnShadow:          "rgba(200,112,96,0.38)",
  portraitPlaceholderBg:     "#f0ece8",
  portraitPlaceholderBorder: "rgba(200,112,96,0.30)",
  speechBubbleBg:            "rgba(240,236,232,0.94)",
  speechBubbleTextColor:     "#6366f1",
  speechBubbleBorderColor:   "rgba(99,102,241,0.18)",
};

// Renders Projects with the mock theme — reused in every test
const renderProjects = () => render(<Projects activeTheme={mockTheme} />);

// ─── Rendering ────────────────────────────────────────────────────────────────
describe("Projects — rendering", () => {
  it("shows the section heading", () => {
    renderProjects();
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
  });

  it("renders all 3 project cards on initial load", () => {
    renderProjects();
    expect(screen.getByRole("article", { name: /Employee Onboarding Portal/i })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: /Active Directory Ticketing System/i })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: /Technical Documentation Hub/i })).toBeInTheDocument();
  });

  it("renders all filter buttons", () => {
    renderProjects();
    ["All", "React", "Vite", "Python", "Linux", "Automation"].forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });
});

// ─── Status badges ────────────────────────────────────────────────────────────
describe("Projects — status badges", () => {
  it("shows Planned badge on the onboarding card", () => {
    renderProjects();
    expect(screen.getByLabelText(/Status: Planned/i)).toBeInTheDocument();
  });

  it("shows Completed badge on the ticketing card", () => {
    renderProjects();
    expect(screen.getByLabelText(/Status: Completed/i)).toBeInTheDocument();
  });

  it("shows In Progress badge on the documentation card", () => {
    renderProjects();
    expect(screen.getByLabelText(/Status: In Progress/i)).toBeInTheDocument();
  });
});

// ─── Filtering ────────────────────────────────────────────────────────────────
describe("Projects — filtering", () => {
  it("shows only React projects when React filter is active", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: "React" }));

    expect(screen.getByRole("article", { name: /Employee Onboarding Portal/i })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: /Active Directory/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("article", { name: /Technical Documentation/i })).not.toBeInTheDocument();
  });

  it("shows only Linux projects when Linux filter is active", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: "Linux" }));

    expect(screen.getByRole("article", { name: /Active Directory/i })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: /Employee Onboarding/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("article", { name: /Technical Documentation/i })).not.toBeInTheDocument();
  });

  it("shows all projects when All filter is clicked after another filter", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: "Linux" }));
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("shows only 1 project when Vite filter is active", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: "Vite" }));

    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────
describe("Projects — accessibility", () => {
  it("marks the active filter button as aria-pressed=true", async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole("button", { name: "Python" }));

    expect(screen.getByRole("button", { name: "Python" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  });

  it("gives each live link a descriptive aria-label", () => {
    renderProjects();
    expect(
      screen.getByRole("link", { name: /View Employee Onboarding Portal live site/i })
    ).toBeInTheDocument();
  });

  it("gives each code link a descriptive aria-label", () => {
    renderProjects();
    expect(
      screen.getByRole("link", { name: /View Active Directory Ticketing System source code/i })
    ).toBeInTheDocument();
  });

  it("features list is accessible with aria-label", () => {
    renderProjects();
    expect(screen.getAllByRole("list", { name: /Key features/i })).toHaveLength(3);
  });

  it("tags list is accessible with aria-label", () => {
    renderProjects();
    expect(screen.getAllByRole("list", { name: /Technologies used/i })).toHaveLength(3);
  });
});