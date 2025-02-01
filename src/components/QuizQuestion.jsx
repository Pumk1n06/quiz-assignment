import { useState } from "react";
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

const QuizQuestion = ({ question, onNext }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    console.log("Rendering Question:", question);

    if (!question || !question.description) {
        return <Typography color="error">No question available</Typography>;
    }

    // Temporary Dummy Options (since API doesn't provide any)
    const defaultOptions = ["Option A", "Option B", "Option C", "Option D"];

    const handleNext = () => {
        // Trigger the callback to move to the next question
        onNext(selectedAnswer);

        // Reset the selected answer for the next question
        setSelectedAnswer(null);
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
                key={question.id}  // Ensure this key changes when question changes
            >
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                        {question.description}
                    </Typography>

                    <RadioGroup
                        value={selectedAnswer}  // Bind value to selectedAnswer
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        sx={{ textAlign: "left", marginLeft: 2 }}
                    >
                        {defaultOptions.map((option, index) => (
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
                        disabled={!selectedAnswer}
                        sx={{
                            mt: 3,
                            width: "100%",
                            fontSize: "1.1rem",
                            borderRadius: "50px",
                            textTransform: "none",
                            backgroundColor: selectedAnswer ? "#6200ea" : "#ccc",
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
