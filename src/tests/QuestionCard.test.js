import * as React from "react";
import { render, screen } from "@testing-library/react";
import QuestionCard from "../components/QuestionCard";
import '@testing-library/jest-dom';

describe("QuestionCard", () => {
  it("displays the question and all the answers", () => {
    render(
      <QuestionCard
        question="What is the Capital of Canada?"
        wrongAnswer={["Toronto", "Montreal", "Vancouver"]}
        correctAnswer="Ottawa"
      />
    );

    expect(screen.getByText('What is the Capital of Canada?')).toBeInTheDocument();
    expect(screen.getByText('Toronto')).toBeInTheDocument();
    expect(screen.getByText('Ottawa')).toBeInTheDocument();
    expect(screen.getByText('Montreal')).toBeInTheDocument();
    expect(screen.getByText('Vancouver')).toBeInTheDocument();
  });
});
