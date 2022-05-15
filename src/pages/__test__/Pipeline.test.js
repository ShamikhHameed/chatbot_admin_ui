import { render, screen, cleanup } from '@testing-library/react'
import renderer from "react-test-renderer"
import Pipeline from "../Pipeline";

afterEach(cleanup);

test('renders without crashing', async () => {
    const div = document.createElement("div");
    render(<Pipeline></Pipeline>, div)
})

test('renders header correctly', async () => {
    const { getByTestId } = render(<Pipeline />)
    expect(getByTestId("pipeline-header")).toHaveTextContent("Configure your own pipeline and policies right here!");
})

test('renders header correctly', async () => {
    const { getByTestId } = render(<Pipeline />)
    expect(getByTestId("pipeline-header")).not.toHaveTextContent("This is not the heading");
})

test('matches snapshot', async () => {
    const pipelineTree = renderer.create(<Pipeline></Pipeline>).toJSON();
    expect(pipelineTree).toMatchSnapshot();
})