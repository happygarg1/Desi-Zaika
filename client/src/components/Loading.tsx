// components/LoadingPage.tsx
const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
