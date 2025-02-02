import { Quiz } from "@/types/data-types";
import React, { Suspense } from "react";
import Loading from "./loading";
import QuizLanding from "@/components/quiz/QuizLanding";

const Home = async () => {
  const response = await fetch("https://api.jsonserve.com/Uw5CrX");
  const quiz: Quiz = await response.json();

  return (
    <div>
      <main className="container">
        
        <Suspense fallback={<Loading />}>
          <QuizLanding quiz={quiz} />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
