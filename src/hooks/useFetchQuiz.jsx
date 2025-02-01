import { useState, useEffect } from "react";
import axios from "axios";

const useFetchQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api")
            .then(response => {
                setQuestions(response.data.questions);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load quiz data");
                setLoading(false);
            });
    }, []);

    return { questions, loading, error };
};

export default useFetchQuiz;
