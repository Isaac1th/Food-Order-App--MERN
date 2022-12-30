import React from 'react';
import aboutImage from '../assets/images/about.jpg';

const About = () => {
  return (
    <div className="bg-white">
      <div className="p-24 grid grid-cols-2">
        <div className="">
          <h2 className="text-2xl font-medium">About Us</h2>
          <p className="text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            molestias dolores, quas unde minus facilis repellat a repellendus,
            provident deserunt beatae accusantium dolorem autem ullam. Minima
            minus obcaecati porro aliquid odio unde expedita cum beatae!
            Adipisci, error provident excepturi fugit ullam assumenda doloremque
            voluptatem qui quidem amet veritatis sint illo?
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={aboutImage}
            alt="about"
            className="w-[400px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
