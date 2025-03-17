import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingInterviews, getInterviewsInDateRange } from '../../api/interviewApi';
import Loader from '../ui/Loader';
import Card from '../ui/Card';
import Button from '../ui/Button';

const InterviewCalendar = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchInterviews();
    }, [currentMonth]);

    const fetchInterviews = async () => {
        setLoading(true);
        try {
            // Get the first and last day of the current month
            const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0, 23, 59, 59);

            const data = await getInterviewsInDateRange(firstDay.toISOString(), lastDay.toISOString());
            setInterviews(data);
        } catch (err) {
            setError('Failed to load interviews');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const renderCalendarHeader = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        return (
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return (
            <div className="calendar-days-header">
                {days.map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                ))}
            </div>
        );
    };

    const renderCalendarDays = () => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();

            // Check if there are interviews on this day
            const dayInterviews = interviews.filter(interview => {
                const interviewDate = new Date(interview.dateTime);
                return interviewDate.getDate() === day &&
                    interviewDate.getMonth() === currentMonth.getMonth() &&
                    interviewDate.getFullYear() === currentMonth.getFullYear();
            });

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayInterviews.length > 0 ? 'has-interviews' : ''}`}
                    onClick={() => setSelectedDate(date)}
                >
                    <span className="day-number">{day}</span>
                    {dayInterviews.length > 0 && (
                        <span className="interview-indicator">{dayInterviews.length}</span>
                    )}
                </div>
            );
        }

        return <div className="calendar-days">{days}</div>;
    };

    const renderInterviewsForSelectedDate = () => {
        const selectedInterviews = interviews.filter(interview => {
            const interviewDate = new Date(interview.dateTime);
            return interviewDate.toDateString() === selectedDate.toDateString();
        });

        if (selectedInterviews.length === 0) {
            return (
                <div className="no-interviews">
                    <p>No interviews scheduled for this date</p>
                    <Button as={Link} to="/interviews/new">Schedule Interview</Button>
                </div>
            );
        }

        return (
            <div className="interviews-list">
                <h3>Interviews on {selectedDate.toLocaleDateString()}</h3>
                {selectedInterviews.map(interview => (
                    <Card key={interview.id} className="interview-card">
                        <div className="interview-time">
                            {new Date(interview.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="interview-title">{interview.title}</div>
                        <div className="interview-location">{interview.location}</div>
                        <div className="interview-actions">
                            <Link to={`/interviews/${interview.id}`}>View Details</Link>
                        </div>
                    </Card>
                ))}
            </div>
        );
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="interview-calendar">
            <div className="calendar-container">
                {renderCalendarHeader()}
                {renderDaysOfWeek()}
                {renderCalendarDays()}
            </div>
            <div className="interviews-container">
                {renderInterviewsForSelectedDate()}
            </div>
        </div>
    );
};

export default InterviewCalendar;