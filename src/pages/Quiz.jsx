import { useState } from "react";
import useFetchQuiz from "../hooks/useFetchQuiz";
import QuizStart from "../components/QuizStart";
import QuizQuestion from "../components/QuizQuestion";
import QuizResult from "../components/QuizResult";
import { CircularProgress, Container, Typography } from "@mui/material";

const Quiz = () => {
    const { questions, loading, error } = useFetchQuiz();
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const handleStart = () => setStep(1);
    const handleNext = (points) => {
        setScore(score + points);
        setStep((prev) => prev + 1);
    };

    const handleRestart = () => {
        setStep(0);
        setScore(0);
    };

    if (loading) return <Container sx={{ textAlign: "center", marginTop: 5 }}><CircularProgress /></Container>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            {step === 0 && <QuizStart onStart={handleStart} />}
            {step > 0 && step <= questions.length && <QuizQuestion question={questions[step - 1]} onNext={handleNext} />}
            {step > questions.length && <QuizResult score={score} onRestart={handleRestart} />}
        </>
    );
};

export default Quiz;
