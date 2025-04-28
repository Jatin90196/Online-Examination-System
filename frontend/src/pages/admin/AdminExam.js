import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminExam() {
  const navigate = useNavigate();
  const [examDetails, setExamDetails] = useState({
    name: '',
    date: '',
    duration: 60,
    instructions: ''
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  // Question form state
  const [questionType, setQuestionType] = useState('mcq');
  const [questionText, setQuestionText] = useState('');
  const [marks, setMarks] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [message, setMessage] = useState('');

  // Load exam if editing (optional)
  useEffect(() => {
    // Add logic to load existing exam if needed
  }, []);

  const resetQuestionForm = () => {
    setQuestionType('mcq');
    setQuestionText('');
    setMarks('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('A');
    setCurrentQuestion(null);
    setEditMode(false);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    
    if (!questionText || !marks) {
      setMessage('Please fill all required fields');
      return;
    }

    if (questionType === 'mcq' && options.some(opt => !opt)) {
      setMessage('All MCQ options must be filled');
      return;
    }

    const newQuestion = {
      type: questionType,
      question_text: questionText,
      marks: parseInt(marks),
      options: questionType === 'mcq' ? options : null,
      correct_answer: questionType === 'mcq' ? correctAnswer : null
    };

    if (editMode && currentQuestion !== null) {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestion] = newQuestion;
      setQuestions(updatedQuestions);
    } else {
      // Add new question
      setQuestions([...questions, newQuestion]);
    }

    resetQuestionForm();
    setMessage('');
  };

  const handleEditQuestion = (index) => {
    const question = questions[index];
    setQuestionType(question.type);
    setQuestionText(question.question_text);
    setMarks(question.marks.toString());
    if (question.type === 'mcq') {
      setOptions(question.options);
      setCorrectAnswer(question.correct_answer);
    }
    setCurrentQuestion(index);
    setEditMode(true);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveExam = async () => {
    if (!examDetails.name || !examDetails.date || questions.length === 0) {
      setMessage('Please fill exam details and add at least one question');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          ...examDetails,
          questions
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Exam saved successfully!');
        setTimeout(() => navigate('/admin/exams'), 2000);
      } else {
        setMessage(data.message || 'Error saving exam');
      }
    } catch (err) {
      setMessage('Network error - please try again');
    }
  };

  return (
    <div className="admin-exam-container">
      <h2>Create New Exam</h2>
      
      {/* Exam Details */}
      <div className="exam-details">
        <h3>Exam Information</h3>
        <div>
          <label>Exam Name:</label>
          <input
            type="text"
            value={examDetails.name}
            onChange={e => setExamDetails({...examDetails, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Exam Date:</label>
          <input
            type="date"
            value={examDetails.date}
            onChange={e => setExamDetails({...examDetails, date: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={examDetails.duration}
            onChange={e => setExamDetails({...examDetails, duration: e.target.value})}
            min="1"
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={examDetails.instructions}
            onChange={e => setExamDetails({...examDetails, instructions: e.target.value})}
          />
        </div>
      </div>

      {/* Question Form */}
      <div className="question-form">
        <h3>{editMode ? 'Edit Question' : 'Add New Question'}</h3>
        <form onSubmit={handleAddQuestion}>
          <div className="form-group">
            <label>Question Type:</label>
            <select
              value={questionType}
              onChange={e => setQuestionType(e.target.value)}
            >
              <option value="mcq">Multiple Choice (MCQ)</option>
              <option value="subjective">Subjective</option>
            </select>
          </div>

          <div className="form-group">
            <label>Question Text:</label>
            <textarea
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Marks:</label>
            <input
              type="number"
              value={marks}
              onChange={e => setMarks(e.target.value)}
              min="1"
              required
            />
          </div>

          {questionType === 'mcq' && (
            <div className="mcq-options">
              <label>Options:</label>
              {options.map((option, index) => (
                <div key={index} className="option-input">
                  <input
                    type="text"
                    value={option}
                    onChange={e => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    required
                  />
                  <label>
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={correctAnswer === String.fromCharCode(65 + index)}
                      onChange={() => setCorrectAnswer(String.fromCharCode(65 + index))}
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editMode ? 'Update Question' : 'Add Question'}
            </button>
            {editMode && (
              <button
                type="button"
                className="btn-secondary"
                onClick={resetQuestionForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        <h3>Added Questions ({questions.length})</h3>
        {questions.length === 0 ? (
          <p>No questions added yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Type</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {question.question_text}
                    {question.type === 'mcq' && (
                      <div className="mcq-preview">
                        {question.options.map((opt, i) => (
                          <div key={i}>
                            {String.fromCharCode(65 + i)}. {opt}
                            {question.correct_answer === String.fromCharCode(65 + i) && ' ✓'}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td>{question.type.toUpperCase()}</td>
                  <td>{question.marks}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditQuestion(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Save Exam Section */}
      <div className="exam-actions">
        {message && <div className="message">{message}</div>}
        <button
          className="btn-save-exam"
          onClick={handleSaveExam}
          disabled={questions.length === 0}
        >
          Save Exam
        </button>
      </div>
    </div>
  );
}

export default AdminExam;
