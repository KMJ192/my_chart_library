function debounceFrame(callback: FrameRequestCallback) {
  let nextFrameCallback = 0;

  const nextEexcution = () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };

  return nextEexcution;
}

export default debounceFrame;
