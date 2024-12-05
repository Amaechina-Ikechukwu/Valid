import React from "react";
import { CardSpotlight } from "../UI/CardSpotlight";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Obiagu Prince",
      position: "General Year Representative",
      testinomy:
        "I wish Valid existed years ago, my department have a wonderful dinner night instead of being burdened with fund collection issues and non-payments",
    },
    {
      id: 2,
      name: "Adetunde Mark",

      position: "Helping Initiative",
      testinomy:
        "No awkward comments when it come to who will handle contribution funds. Valid makes it so even though the money is sent, it is still in the sender's control",
    },
    {
      id: 3,
      name: "Chidera Magnus",
      position: "Technical Analyst",
      testinomy:
        "Trusted collector, easy setup, works on multiple devices and screen, clean user interface and understandable directives. Valid is just the best",
    },
  ];
  return (
    <div>
      <h1 className="relative z-10 text-5xl md:text-5xl  bg-clip-text text-transparent  bg-gradient-to-r from-blue-500 to-purple-600  w-fit h-fit font-josefin font-bold mt-[150px] p-4">
        Feedback From Users
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-[40px]">
        {testimonials.map((test) => (
          <div key={test.id} className="">
            <CardSpotlight className=" space-y-4">
              <h4 className="text-2xl font-bold mb-4 ">{test.testinomy}</h4>
              <div>
                <p className="text-xl font-bold mt-4 bg-clip-text text-transparent  bg-gradient-to-r from-blue-500 to-purple-600">
                  {test.name}
                </p>
                <p className="text-xl">{test.position}</p>
              </div>
            </CardSpotlight>
          </div>
        ))}
      </div>
    </div>
  );
}
