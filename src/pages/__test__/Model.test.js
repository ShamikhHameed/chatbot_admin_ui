import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer"
import Model from "../Model";


afterEach(cleanup);

test('renders without crashing', async () => {
    const div = document.createElement("div");
    render(<Model></Model>, div)
})

test('renders header correctly', async () => {
    const { getByTestId } = render(<Model />)
    expect(getByTestId("model-header")).toHaveTextContent("View all your trained models here!");
})

test('renders header correctly', async () => {
    const { getByTestId } = render(<Model />)
    expect(getByTestId("model-header")).not.toHaveTextContent("This is not the heading");
})

test('matches snapshot', async () => {
    const modelTree = await renderer.create(<Model></Model>).toJSON();
    expect(modelTree).toMatchSnapshot();
})
