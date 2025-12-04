import React from 'react';
import './NorselLogo.css';

interface NorselLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const NorselLogo: React.FC<NorselLogoProps> = ({
  width = 800,
  height = 600,
  className = ''
}) => {
  return (
    <div className={`norsel-logo-container ${className}`}>
      <svg
        viewBox="0 0 700 200"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Linhas de energia animadas - simplificadas */}
        <path className="energy-line line-1" d="M 20 80 L 75 80"/>
        <path className="energy-line line-2" d="M 75 80 L 75 100"/>
        <path className="energy-line line-3" d="M 75 100 L 105 100"/>

        {/* Sol com animação */}
        <g className="sun-group" transform="translate(120, 100)">
          {/* Raios do sol - apenas 4 principais */}
          <line className="sun-ray" x1="0" y1="-30" x2="0" y2="-40"/>
          <line className="sun-ray" x1="30" y1="0" x2="40" y2="0"/>
          <line className="sun-ray" x1="0" y1="30" x2="0" y2="40"/>
          <line className="sun-ray" x1="-30" y1="0" x2="-40" y2="0"/>

          {/* Círculo do sol */}
          <circle className="sun-circle" cx="0" cy="0" r="22"/>
        </g>

        {/* Texto NORSEL */}
        <text className="text text-norsel" x="165" y="125">NORSEL</text>

        {/* Texto ENGENHARIA */}
        <text className="text text-engenharia" x="165" y="155">ENGENHARIA</text>
      </svg>
    </div>
  );
};

export default NorselLogo;
