import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ id, name, createdBy, time, image }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-all duration-500 w-fit">
      <div className="flex flex-col relative">
        <img className= "aspect-square rounded-sm w-60 h-60" src={image} alt={name} />
        <span className="text-lg font-bold">{name}</span>
        <div className="flex justify-between items-center">
          <span>Recipe by {createdBy}</span>
          <button 
          onClick={() => navigate(`/recipe/${id}`)}
          className="bg-slate-500 hover:bg-opacity-80 text-white rounded-md px-2 py-1">
            View
          </button>
        </div>
        <div className="absolute top-2 left-2 bg-slate-200 rounded-full bg-opacity-60">
          <span className="p-2">{time} mins</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
