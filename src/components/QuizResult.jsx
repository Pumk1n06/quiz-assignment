import { useState, useEffect } from "react";
import {
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import { motion } from "framer-motion"; // For animations
import Confetti from "react-confetti"; // Celebration effect

const QuizResult = ({ answers = [], onRestart }) => {  // Set default value for answers to an empty array
    const [showConfetti, setShowConfetti] = useState(false);
    const [score, setScore] = useState(0);
    const totalQuestions = answers.length;

    const correctAnswerMarks = 4.0;  // Marks for correct answers
    const negativeMarks = -1.0;  // Marks for incorrect answers

    useEffect(() => {
        if (totalQuestions === 0) return; // Avoid calculations if no answers

        let totalScore = 0;
        answers.forEach((answer) => {
            if (answer.isCorrect) {
                totalScore += correctAnswerMarks;  // Correct answer adds points
            } else {
                totalScore += negativeMarks;  // Incorrect answer deducts points
            }
        });
        setScore(totalScore);

        // Trigger confetti animation after calculating the score
        if (totalScore >= totalQuestions * 0.7) {
            setShowConfetti(true);
            const confettiTimeout = setTimeout(() => {
                setShowConfetti(false);
            }, 4000);  // 4 seconds of confetti

            // Cleanup timeout if the component unmounts before the timeout completes
            return () => clearTimeout(confettiTimeout);
        }
    }, [answers, totalQuestions]);

    const getScoreMessage = () => {
        if (score === totalQuestions * correctAnswerMarks) return "🎉 Perfect Score! You're a genius!";
        if (score >= totalQuestions * correctAnswerMarks * 0.7) return "👏 Great Job! You did amazing!";
        if (score >= totalQuestions * correctAnswerMarks * 0.5) return "😊 Good Effort! Keep practicing!";
        return "😅 Don't worry, try again!";
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                textAlign: "center",
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
                padding: 3,
            }}
        >
            {showConfetti && <Confetti />}

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card sx={{ width: "100%", boxShadow: 5, padding: "20px", borderRadius: 3, backgroundColor: "white" }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#0072ff" }}>
                            🎯 Quiz Completed!
                        </Typography>
                        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                            {getScoreMessage()}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3, fontSize: "1.2rem" }}>
                            Your Score: <strong>{score} / {totalQuestions * correctAnswerMarks}</strong>
                        </Typography>

                        {/* Table Format */}
                        {answers.length > 0 ? (
                            <TableContainer component={Paper} sx={{ mb: 3, borderRadius: "10px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#0072ff", color: "white" }}>
                                            <TableCell align="center" sx={{ color: "white" }}><strong>#</strong></TableCell>
                                            <TableCell sx={{ color: "white" }}><strong>Question</strong></TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}><strong>Your Answer</strong></TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}><strong>Correct Answer</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {answers.map((answer, index) => (
                                            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f0f8ff" : "white", "&:hover": { backgroundColor: "#e3f2fd" } }}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell>{answer.question}</TableCell>
                                                <TableCell align="center" sx={{ color: answer.isCorrect ? "green" : "red", fontWeight: "bold" }}>
                                                    {answer.userAnswer}
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: "blue", fontWeight: "bold" }}>
                                                    {answer.correctAnswer}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography variant="h6" color="error" sx={{ mb: 3 }}>
                                No answers available.
                            </Typography>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={onRestart}
                                sx={{
                                    paddingX: 3,
                                    fontSize: "1rem",
                                    borderRadius: "25px",
                                    textTransform: "none",
                                    backgroundColor: "#ff4081",
                                    "&:hover": { backgroundColor: "#e91e63" },
                                }}
                            >
                                🔄 Restart Quiz
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </Container>
    );
};

export default QuizResult;
