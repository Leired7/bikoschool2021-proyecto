import { render, screen, waitFor } from "@testing-library/react";
import GuifAffinity from "./GuifAffinity";

describe("GuifAffinity", () => {
  it("makes a request from the main application and render image", async () => {
    // Arrange

    // Act
    render(<GuifAffinity />);

    // Assert
    await waitFor(() => {
      const image = screen.getByAltText("guif");
      expect(image).toHaveAttribute(
        "src",
        expect.stringMatching("https://media4.giphy.com/media")
      );
    });
  });
});
