import { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
} from "@mui/material";

const QuizQuestion = ({ question, onNext, score, setScore }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Extract options from the question object
    const options = question.options.map((option) => option.description);

    // Update score when answer is selected
    const handleAnswerSelection = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        setIsAnswered(true);

        const correctAnswer = question.options.find(option => option.is_correct);
        if (selectedOption === correctAnswer.description) {
            setScore(prevScore => prevScore + 4.0);  // Add 4.0 points for correct answer
        } else {
            setScore(prevScore => prevScore - 1.0);  // Deduct 1.0 point for incorrect answer
        }
    };

    const handleNext = () => {
        onNext();  // Trigger callback to move to the next question

        // Reset the selected answer and answer state for the next question
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
                padding: 3,
            }}
        >
            <Card
                sx={{
                    maxWidth: 650,
                    width: "90%",
                    boxShadow: 5,
                    borderRadius: 3,
                    padding: 3,
                    backgroundColor: "white",
                    textAlign: "center",
                }}
                key={question.id}
            >
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                        {question.description}
                    </Typography>

                    <RadioGroup
                        value={selectedAnswer}
                        onChange={(e) => handleAnswerSelection(e.target.value)}
                        sx={{ textAlign: "left", marginLeft: 2 }}
                    >
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={<Radio color="secondary" />}
                                label={
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: "1rem",
                                            padding: "10px",
                                            width: "100%",
                                            borderRadius: "8px",
                                            backgroundColor: selectedAnswer === option ? "#f3e5f5" : "white",
                                            transition: "all 0.3s ease-in-out",
                                            "&:hover": { backgroundColor: "#fce4ec" },
                                        }}
                                    >
                                        {option}
                                    </Typography>
                                }
                                sx={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    transition: "all 0.3s ease-in-out",
                                }}
                            />
                        ))}
                    </RadioGroup>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        disabled={!isAnswered}
                        sx={{
                            mt: 3,
                            width: "100%",
                            fontSize: "1.1rem",
                            borderRadius: "50px",
                            textTransform: "none",
                            backgroundColor: isAnswered ? "#6200ea" : "#ccc",
                            "&:hover": { backgroundColor: "#4b0082" },
                        }}
                    >
                        Next ➡️
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default QuizQuestion;
