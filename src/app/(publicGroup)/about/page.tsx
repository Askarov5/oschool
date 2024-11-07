import React from "react";

const About = () => {
  return (
    <div className="container p-6 mx-auto flex flex-col gap-4">
      <div>
        <h2 className="text-lg">Our mission</h2>
        <p>
          At oSchool, our mission is simple: To make quality education
          accessible to everyone, everywhere. We are committed to providing
          students with the tools they need to succeed, whether they are just
          beginning their learning journey or are preparing for advanced
          studies.
        </p>
        <p>
          We aim to bridge the gap in educational accessibility by combining
          digital textbooks, interactive lessons, and advanced AI to create a
          learning environment that is both engaging and effective.
        </p>
      </div>
      <div>
        <h3 className="text-lg">We Offer</h3>
        <ul className="">
          <li>
            <strong>Comprehensive Curriculum</strong>: Our platform covers Grade
            1 to Grade 12, aligned with local and global standards. We offer
            subjects such as Mathematics, Science, Literature, History, and
            more.
          </li>
          <li>
            <strong>Interactive Learning</strong>: Dive deep into each subject
            with interactive video lessons, quizzes, and real-time feedback.
          </li>
          <li>
            <strong>AI-Powered Tutoring</strong>: Our intelligent AI tutor
            adapts to your learning style, helping you with personalized
            guidance and support.
          </li>
          <li>
            <strong>Track Your Progress</strong>: Stay motivated by tracking
            your achievements, completing exercises, and earning badges as you
            progress through the curriculum.
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg">Why choose us?</h3>
        <ul>
          <li>
            <strong>Personalized Experience</strong>: We understand every
            learner is unique. That’s why our platform adjusts to your learning
            pace and preferences.
          </li>
          <li>
            <strong>Accessible Anywhere, Anytime</strong>: Whether you're at
            home, at school, or on the go, our platform is available on multiple
            devices, ensuring that learning never stops.
          </li>
          <li>
            <strong>Supporting Teachers &amp; Parents</strong>: Teachers can
            create customized learning plans, while parents can track their
            child’s progress, making it easy to stay involved in the learning
            process.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg">Our Vision</h2>
        <p>
          We believe that every student deserves the best chance to succeed, no
          matter where they are in the world. Our vision is to create a future
          where education is no longer limited by location, resources, or time.
        </p>
      </div>
    </div>
  );
};

export default About;
