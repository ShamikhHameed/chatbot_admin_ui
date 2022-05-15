import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer"
import ChatBot from "../Chatbot";

afterEach(cleanup);

test('renders without crashing', async () => {
    const div = document.createElement("div");
    render(<ChatBot></ChatBot>, div)
})

test('renders header correctly', async () => {
    const { getByTestId } = render(<ChatBot />)
    expect(getByTestId("chatbot-header")).toHaveTextContent("Hi, You can start chatting here!");
})

test('renders header correctly', async () => {
    const { getByTestId } = render(<ChatBot />)
    expect(getByTestId("chatbot-header")).not.toHaveTextContent("This is not the heading");
})

test('matches snapshot', async () => {
    const chatTree = renderer.create(<ChatBot></ChatBot>).toJSON();
    expect(chatTree).toMatchSnapshot();
})
