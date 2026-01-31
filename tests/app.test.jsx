/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

describe("App Component - TDD Coverage", () => {

  // 1 Render test
  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

  // 2 Initial state test and Added [0] to target the element in the array
  test("initial count is 0", () => {
    render(<App />);
    expect(screen.getAllByRole("button")[0]).toHaveTextContent("count is 0");
  });

  // 3 Button click increments count and added Target button[0] for click and assertion
  test("increments count on button click", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    const counterButton = buttons[0]; 

    fireEvent.click(counterButton);
    expect(counterButton).toHaveTextContent("count is 1");

    fireEvent.click(counterButton);
    expect(counterButton).toHaveTextContent("count is 2");
  });

    // 4 Static paragraph text
  test("renders instruction paragraph", () => {
    render(<App />);
    
    const paragraphs = screen.getAllByText((content, node) => {
      const hasText = (node) => node.textContent === "Edit src/App.jsx and save to test HMR";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });

    // Target the first one in the array
    expect(paragraphs[0]).toBeInTheDocument();
  });

  // 5 Documentation text
  test("renders documentation hint", () => {
    render(<App />);
    expect(
      screen.getAllByText(/Click on the Vite and React logos to learn more/i)[0]
    ).toBeInTheDocument();
  });

 // 6 Links have correct URLs
  test("vite and react links have correct hrefs", () => {
    render(<App />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "https://vite.dev");
    expect(links[1]).toHaveAttribute("href", "https://react.dev");
  });

  // 7 Images render with alt text
  test("renders Vite and React logos", () => {
    render(<App />);
    // Note: If you only have ONE of each logo, use getByAltText instead of getAllBy
    expect(screen.getAllByAltText("Vite logo")[0]).toBeInTheDocument();
    expect(screen.getAllByAltText("React logo")[0]).toBeInTheDocument();
  });

  // 8 check user hover event

  test("hover over Vite logo", async () => {
  render(<App />);
  const user = userEvent.setup();

  const viteLogo = screen.getAllByAltText("Vite logo")[0];
  await user.hover(viteLogo);

  // Assert side-effect (if any)
});

  test("hover over React logo", async () => {
  render(<App />);
  const user = userEvent.setup();

  const reactLogo = screen.getAllByAltText("React logo")[0];
  await user.hover(reactLogo);

  // Assert side-effect (if any)
});

});