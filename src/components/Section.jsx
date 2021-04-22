import React from "react";

export const Section = ({ background }) => {
  return (
    <section className="section">
      <div className="section_outer">
        <div className="section_inner">
          <div className="section_background">
            <div
              style={{ backgroundImage: `url(${background})` }}
              className="section_background_image"
            />

            <div className="section_background_lines">
              <div>
                <span className="vertical_lines"></span>
                <span className="vertical_lines"></span>
                <span className="vertical_lines"></span>
                <span className="vertical_lines"></span>
                <span className="vertical_lines"></span>
              </div>

              <div>
                <span className="horizontal_lines"></span>
                <span className="horizontal_lines"></span>
                <span className="horizontal_lines"></span>
              </div>
            </div>
          </div>

          <div className="section_text"></div>
        </div>
      </div>
    </section>
  );
};
