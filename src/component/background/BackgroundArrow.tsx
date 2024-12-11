function BackgroundArrow() {
    return (
      <div className="flex animate-fade-up animate-duration-2000 animate-ease-in-out">
        <div
          className="w-0 h-0 
            border-l-[10px] border-l-transparent
            border-t-[12px] border-t-white
            border-r-[10px] border-r-transparent"
        ></div>
      </div>
    );
  }
  
  function BackgroundArrowsLoop() {
    const arrows = Array.from({ length:17 });
  
    return (
      <div className="flex "> 
        {arrows.map((_, index) => (
          <BackgroundArrow key={index} />
        ))}
      </div>
    );
  }
  
  export default BackgroundArrowsLoop;
  