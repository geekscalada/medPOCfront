import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddAllergenModal from "../../src/components/AddAllergenModal";
import React from "react";

describe("AddAllergenModal Component", () => {
  // Función simulada para cerrar el modal. Viene de Vitest y se usa para simular funciones y su llamada.
  const mockCloseModal = vi.fn();

  it("is rendered correctly", async () => {
    // 'render' renderiza el componente en un entorno virtual para poder interactuar con él en las pruebas.
    // 'asFragment' toma una instantánea del DOM renderizado por el componente. Esto es útil para comparar cambios en el DOM a lo largo del tiempo.
    const { asFragment } = render(
      <AddAllergenModal closeModal={mockCloseModal} />
    );

    // 'expect' con 'toMatchSnapshot' comprueba que el fragmento capturado coincida con una versión anterior guardada. Si no hay una versión anterior, guarda la actual.
    expect(asFragment()).toMatchSnapshot();
  });

  it("update the searchterm when we write on the searchbar", async () => {
    render(<AddAllergenModal closeModal={mockCloseModal} />);

    // 'screen' es una utilidad de '@testing-library/react' que proporciona métodos para seleccionar elementos del DOM renderizado, similar a cómo lo harías en un navegador.
    const searchBar = screen.getByTestId("allergens-searchbar");

    // 'fireEvent' es una utilidad que simula eventos del usuario en la interfaz. En este caso, simula la escritura en un campo de entrada (input).
    // Tiene click, etc.
    fireEvent.change(searchBar, { target: { value: "Milk" } });

    // 'waitFor' se utiliza para esperar a que aparezca un elemento en el documento, útil para pruebas que involucran actualizaciones asíncronas del DOM.
    // ToBeInTheDocument es una utilidad de '@testing-library/jest-dom' que verifica si un elemento está presente en el documento.
    // getByDisplayValue es una utilidad de '@testing-library/react' que selecciona un elemento por su valor.
    await waitFor(() => {
      expect(screen.getByDisplayValue("Milk")).toBeInTheDocument();
    });
  });
});

//TODO:
// Additional tests could include:

// - Verifying the behavior when the search term is cleared.
// - Testing error handling if the data fetching fails.
// - Ensuring the add button behaves correctly.
