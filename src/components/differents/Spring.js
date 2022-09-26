import React from "react";
import "./spring.scss";

export default function Spring() {
   return (
      <div className="spring">
         <svg viewBox="0 0 960 300">
            <symbol id="s-text">
               <text text-anchor="middle" x="50%" y="80%">
                  Loading...
               </text>
            </symbol>

            <g className="g-ants">
               <use href="#s-text" className="text-copy"></use>
               <use href="#s-text" className="text-copy"></use>
               <use href="#s-text" className="text-copy"></use>
               <use href="#s-text" className="text-copy"></use>
               <use href="#s-text" className="text-copy"></use>
            </g>
         </svg>
      </div>
   );
}
