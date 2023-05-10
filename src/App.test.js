import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';




describe("App", () => {
  it('should render input element', () => {
      render(
          <App/>
      );
      const inputElement = screen.getByPlaceholderText(/Enter Location/i);
      expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type into input', () => {
    render(
        <App/>
    );
    const inputElement = screen.getByPlaceholderText(/Enter Location/i);
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "Cluj" } })
        expect(inputElement.value).toBe("Cluj");
  });

});