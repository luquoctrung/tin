import { useEffect, useState, useRef } from "react";
import "./App.css";

function TodoList() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs"));
    return storedJobs || [];
  });
  const [filter, setFilter] = useState("all");
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newJob = { title: job, completed: false };
      setJobs((prev) => [...prev, newJob]);

      setJob("");

      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
    }
  };
  const toggleClass = (index) => {
    setJobs((prevJobs) =>
      prevJobs.map((job, i) =>
        i === index ? { ...job, completed: !job.completed } : job
      )
    );
  };

  const handleDelete = (indexToDelete, e) => {
    e.stopPropagation();
    setJobs((prevJobs) =>
      prevJobs.filter((job, index) => index !== indexToDelete)
    );
  };

  const filterJobs = jobs.filter((job) => {
    if (filter === "active") {
      return !job.completed;
    } else if (filter === "complete") {
      return job.completed;
    } else {
      return true;
    }
  });

  const leftJob = jobs.filter((job) => !job.completed).length;

  return (
    <div className="App">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />

      <ul>
        {filterJobs.map((job, index) => (
          <li
            onClick={() => toggleClass(index)}
            className={job.completed ? "complete" : ""}
            key={index}
          >
            {job.title}
            <span onClick={(e) => handleDelete(index, e)}>X</span>
          </li>
        ))}
      </ul>
      <span id="todoCount">{leftJob} item left</span>
      <div id="filter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
      </div>
    </div>
  );
}

export default TodoList;
